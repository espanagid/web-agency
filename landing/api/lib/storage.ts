import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, normalize } from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Файловое хранилище вложений заявок.
 * Файлы лежат на диске (UPLOAD_DIR, в Docker — volume /data/uploads),
 * в БД — только путь и метаданные.
 */

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";

/** безопасное имя файла: только буквы/цифры/точка/дефис, без путей */
function safeName(name: string): string {
  const cleaned = name.replace(/[^\p{L}\p{N}._-]+/gu, "_").slice(-120);
  return cleaned || "file";
}

/** Сохраняет base64 на диск, возвращает относительный путь (leadId/имя). */
export function saveLeadFile(leadId: number, filename: string, dataBase64: string): string {
  const rel = join(String(leadId), `${randomUUID().slice(0, 8)}-${safeName(filename)}`);
  const abs = normalize(join(UPLOAD_DIR, rel));
  if (!abs.startsWith(normalize(UPLOAD_DIR))) throw new Error("bad path");
  mkdirSync(join(UPLOAD_DIR, String(leadId)), { recursive: true });
  writeFileSync(abs, Buffer.from(dataBase64, "base64"));
  return rel;
}

/** Читает файл с диска по относительному пути, возвращает base64. */
export function readLeadFileBase64(relPath: string): string {
  const abs = normalize(join(UPLOAD_DIR, relPath));
  if (!abs.startsWith(normalize(UPLOAD_DIR))) throw new Error("bad path");
  return readFileSync(abs).toString("base64");
}
