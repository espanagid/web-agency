import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login"); // /admin/login vive fuera: app/(auth)/admin/login

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="flex items-center gap-5 border-b bg-white px-6 py-3 text-sm font-medium">
        <Link href="/admin" className="font-bold">Webs con IA</Link>
        <Link href="/admin" className="text-slate-600 hover:text-slate-900">Sitios</Link>
        <Link href="/admin/leads" className="text-slate-600 hover:text-slate-900">Leads</Link>
        <Link href="/" className="ml-auto text-slate-500 hover:text-slate-900">← Ver dominio principal</Link>
      </nav>
      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
    </div>
  );
}
