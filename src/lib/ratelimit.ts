// Rate limiter en memoria (proceso único). Para multi-instancia: Redis.
const hits = new Map<string, number[]>();

export function rateLimitOk(key: string, limit: number, windowMs: number): boolean {
  if (hits.size > 50_000) hits.clear(); // salvaguarda de memoria
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    hits.set(key, arr);
    return false;
  }
  arr.push(now);
  hits.set(key, arr);
  return true;
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
