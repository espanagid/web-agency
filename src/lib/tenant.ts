import { headers } from "next/headers";
import { cache } from "react";
import { prisma } from "./db";

/**
 * Multitenancy por hostname:
 *  - slug.BASE_DOMAIN  -> site.slug
 *  - dominio propio    -> site.domain
 */
export const getSite = cache(async () => {
  const host = (await headers()).get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const base = (process.env.BASE_DOMAIN ?? "localhost").toLowerCase();

  if (!host || host === base || host === `www.${base}`) return null;

  const include = { sections: { orderBy: { order: "asc" as const } } };

  if (host.endsWith(`.${base}`)) {
    const slug = host.slice(0, host.length - base.length - 1);
    return prisma.site.findUnique({ where: { slug }, include });
  }

  return prisma.site.findUnique({ where: { domain: host }, include });
});
