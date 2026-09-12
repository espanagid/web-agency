import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "admin_session";

function secret(): string {
  return process.env.ADMIN_SECRET ?? "dev-secret-cambiar";
}

export function sessionValue(): string {
  return crypto.createHmac("sha256", secret()).update("admin").digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  const c = await cookies();
  return c.get(COOKIE)?.value === sessionValue();
}

export const sessionCookie = {
  name: COOKIE,
  value: sessionValue(),
  options: { httpOnly: true, sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 30 },
};
