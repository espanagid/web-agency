import { z } from "zod";
import { adminQuery, createRouter, publicQuery } from "./middleware";
import {
  createLead,
  getLeadFile,
  listLeadFilesMeta,
  listLeads,
  setLeadStatus,
} from "./queries/leads";
import { readLeadFileBase64 } from "./lib/storage";

/** антиспам: не более 5 заявок в час с одного IP */
const submitRate = new Map<string, { count: number; reset: number }>();

function submitRateLimited(ip: string): boolean {
  const now = Date.now();
  const slot = submitRate.get(ip);
  if (!slot || slot.reset < now) {
    submitRate.set(ip, { count: 1, reset: now + 3600_000 });
    return false;
  }
  slot.count++;
  return slot.count > 5;
}

const fileInput = z.object({
  filename: z.string().min(1).max(250),
  mime: z.string().max(110),
  dataBase64: z.string().max(12 * 1024 * 1024), // ~9 МБ на файл
});

export const leadsRouter = createRouter({
  /** Публичная отправка заявки из ИИ-интейка */
  submit: publicQuery
    .input(
      z.object({
        lang: z.string().max(5),
        name: z.string().max(255).optional(),
        contact: z.string().max(255).optional(),
        businessName: z.string().max(255).optional(),
        sector: z.string().max(255).optional(),
        colors: z.string().max(255).optional(),
        hasLogo: z.string().max(20).optional(),
        notes: z.string().max(8000).optional(),
        transcript: z.string().max(60000).optional(),
        summary: z.string().max(12000).optional(),
        files: z.array(fileInput).max(6).default([]),
        // honeypot: невидимое поле; люди его не заполняют, боты — да
        website: z.string().max(200).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // бот, заполнивший honeypot, получает фейковый успех — заявка не сохраняется
      if (input.website) return { id: -1 };
      const ip =
        ctx.req.headers.get("x-real-ip") ||
        (ctx.req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
        "unknown";
      if (submitRateLimited(ip)) return { id: -1 };
      const { files, website: _hp, ...lead } = input;
      const id = await createLead(lead, files);
      return { id };
    }),

  /** Админка: список заявок */
  list: adminQuery.query(() => listLeads()),

  /** Админка: метаданные файлов заявки */
  filesMeta: adminQuery
    .input(z.object({ leadId: z.number() }))
    .query(({ input }) => listLeadFilesMeta(input.leadId)),

  /** Админка: скачать файл (base64) */
  file: adminQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const f = await getLeadFile(input.id);
      if (!f) return null;
      // новые файлы — с диска; старые записи — legacy base64 из БД
      const dataBase64 = f.path ? readLeadFileBase64(f.path) : f.data;
      return { filename: f.filename, mime: f.mime, dataBase64 };
    }),

  setStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(["new", "contacted", "done"]) }))
    .mutation(async ({ input }) => {
      await setLeadStatus(input.id, input.status);
      return { ok: true };
    }),
});
