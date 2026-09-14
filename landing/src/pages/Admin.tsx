import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";

/**
 * Админка заявок с бесплатных демо.
 * Доступ — только для владельца (роль admin через Kimi-логин).
 * Заявка: бриф, транскрипт диалога с ИИ, прикреплённые файлы, статус.
 */

type LeadStatus = "new" | "contacted" | "done";

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Новая",
  contacted: "В работе",
  done: "Готово",
};

const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-lime text-ink",
  contacted: "bg-cream/15 text-cream",
  done: "bg-cream/5 text-sage",
};

function downloadBase64(filename: string, mime: string, base64: string) {
  const byteChars = atob(base64);
  const bytes = new Uint8Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) bytes[i] = byteChars.charCodeAt(i);
  const blob = new Blob([bytes], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function LeadFiles({ leadId }: { leadId: number }) {
  const utils = trpc.useUtils();
  const meta = trpc.leads.filesMeta.useQuery({ leadId });
  const [downloading, setDownloading] = useState<number | null>(null);

  if (!meta.data?.length) return null;

  const handleDownload = async (id: number) => {
    setDownloading(id);
    try {
      const f = await utils.leads.file.fetch({ id });
      if (f) downloadBase64(f.filename, f.mime, f.dataBase64);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="mt-4">
      <div className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-sage">Файлы</div>
      <ul className="mt-2 space-y-1.5">
        {meta.data.map((f) => (
          <li key={f.id}>
            <button
              onClick={() => handleDownload(f.id)}
              disabled={downloading === f.id}
              className="u-link text-sm text-lime disabled:opacity-50"
            >
              {downloading === f.id ? "Скачиваю..." : `⬇ ${f.filename}`}
              <span className="ml-2 text-xs text-sage">({Math.round(f.size / 1024)} КБ)</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Admin() {
  const { user, isLoading, logout } = useAuth({ redirectOnUnauthenticated: true });
  const leads = trpc.leads.list.useQuery(undefined, { retry: false });
  const setStatus = trpc.leads.setStatus.useMutation({
    onSuccess: () => leads.refetch(),
  });
  const [openId, setOpenId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-sage">
        Загрузка...
      </div>
    );
  }

  if (leads.error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
        <p className="text-cream">Нет доступа. Эта страница — только для владельца.</p>
        <p className="text-sm text-sage">Вы вошли как {user?.name ?? user?.email ?? "—"}</p>
        <button onClick={logout} className="u-link text-sm text-lime">
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink px-5 py-10 text-cream sm:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-baseline justify-between gap-4 border-b border-cream/10 pb-6">
          <div>
            <h1 className="font-display text-3xl italic">Заявки на демо</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-sage">
              Webalo · {leads.data?.length ?? 0} заявок
            </p>
          </div>
          <button onClick={logout} className="u-link text-sm text-sage hover:text-cream">
            Выйти
          </button>
        </header>

        {!leads.data?.length && (
          <p className="py-20 text-center text-sage">Заявок пока нет — они появятся здесь.</p>
        )}

        <ul className="mt-8 space-y-4">
          {leads.data?.map((lead) => {
            const open = openId === lead.id;
            return (
              <li
                key={lead.id}
                className="rounded-2xl border border-cream/12 bg-olive-deep/50 transition-colors hover:border-lime/30"
              >
                <button
                  onClick={() => setOpenId(open ? null : lead.id)}
                  className="grid w-full grid-cols-[1fr_auto] items-center gap-4 px-6 py-5 text-left"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-xl italic text-cream">
                        {lead.businessName || "Без названия"}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] ${STATUS_STYLE[lead.status]}`}>
                        {STATUS_LABEL[lead.status]}
                      </span>
                      {lead.filesCount > 0 && (
                        <span className="text-xs text-sage">📎 {lead.filesCount}</span>
                      )}
                    </div>
                    <div className="mt-1.5 text-sm text-sage">
                      {lead.name || "—"} · {lead.contact || "нет контакта"} · {lead.sector || "—"} ·{" "}
                      <span className="tnum">{new Date(lead.createdAt).toLocaleString("ru-RU")}</span>
                    </div>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-sage transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {open && (
                  <div className="border-t border-cream/10 px-6 py-5">
                    {lead.summary && (
                      <pre className="tnum whitespace-pre-wrap rounded-xl bg-ink/70 p-4 text-xs leading-relaxed text-cream/85">
                        {lead.summary}
                      </pre>
                    )}
                    {lead.notes && (
                      <div className="mt-4">
                        <div className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-sage">
                          Информация от клиента
                        </div>
                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-cream/85">
                          {lead.notes}
                        </p>
                      </div>
                    )}
                    <LeadFiles leadId={lead.id} />
                    {lead.transcript && (
                      <details className="mt-4">
                        <summary className="u-link inline-block cursor-pointer text-sm text-sage hover:text-cream">
                          Диалог с ИИ
                        </summary>
                        <pre className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-xl bg-ink/50 p-4 text-xs leading-relaxed text-sage">
                          {lead.transcript}
                        </pre>
                      </details>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(["new", "contacted", "done"] as LeadStatus[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus.mutate({ id: lead.id, status: s })}
                          disabled={lead.status === s || setStatus.isPending}
                          className={`rounded-full px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] transition-opacity ${
                            lead.status === s
                              ? "bg-lime text-ink"
                              : "border border-cream/20 text-sage hover:border-lime hover:text-lime"
                          }`}
                        >
                          {STATUS_LABEL[s]}
                        </button>
                      ))}
                      {lead.contact && (
                        <a
                          href={`https://wa.me/${lead.contact.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-[#25D366] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink"
                        >
                          WhatsApp клиенту
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
