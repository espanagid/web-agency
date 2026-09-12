import { getDb } from "./connection";
import { leads, leadFiles, type InsertLead, type Lead } from "@db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function createLead(
  data: Omit<InsertLead, "id" | "createdAt">,
  files: { filename: string; mime: string; dataBase64: string }[]
): Promise<number> {
  const db = getDb();
  const res = await db.insert(leads).values(data);
  const leadId = Number(res[0].insertId);
  if (files.length) {
    await db.insert(leadFiles).values(
      files.map((f) => ({
        leadId,
        filename: f.filename.slice(0, 250),
        mime: f.mime.slice(0, 110),
        size: Math.round((f.dataBase64.length * 3) / 4),
        data: f.dataBase64,
      }))
    );
  }
  return leadId;
}

export type LeadListItem = Lead & { filesCount: number };

export async function listLeads(): Promise<LeadListItem[]> {
  const db = getDb();
  const rows = await db
    .select({
      lead: leads,
      filesCount: sql<number>`(select count(*) from ${leadFiles} where ${leadFiles.leadId} = ${leads.id})`,
    })
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(200);
  return rows.map((r) => ({ ...r.lead, filesCount: Number(r.filesCount) }));
}

export async function getLeadFile(id: number) {
  const db = getDb();
  const rows = await db.select().from(leadFiles).where(eq(leadFiles.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function listLeadFilesMeta(leadId: number) {
  const db = getDb();
  return db
    .select({ id: leadFiles.id, filename: leadFiles.filename, mime: leadFiles.mime, size: leadFiles.size })
    .from(leadFiles)
    .where(eq(leadFiles.leadId, leadId));
}

export async function setLeadStatus(id: number, status: "new" | "contacted" | "done") {
  const db = getDb();
  await db.update(leads).set({ status }).where(eq(leads.id, id));
}
