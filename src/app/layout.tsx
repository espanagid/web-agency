import type { Metadata } from "next";
import "./globals.css";
import { getSite } from "@/lib/tenant";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: site ? `${site.name}${site.tagline ? ` — ${site.tagline}` : ""}` : "Webs con IA",
    description: site?.tagline ?? "Webs que trabajan mientras duermes",
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  const colors = (site?.colors ?? {}) as { primary?: string; accent?: string };

  return (
    <html lang="es">
      <body className="bg-white text-slate-800 antialiased">
        {colors.primary && (
          <style>{`:root{--color-primary:${colors.primary};--color-accent:${colors.accent ?? "#f59e0b"}}`}</style>
        )}
        {children}
      </body>
    </html>
  );
}
