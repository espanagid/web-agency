import { authRouter } from "./auth-router";
import { leadsRouter } from "./leads-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  leads: leadsRouter,
});

export type AppRouter = typeof appRouter;
