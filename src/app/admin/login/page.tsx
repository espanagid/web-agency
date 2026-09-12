"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) router.push("/admin");
    else setError(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow">
        <h1 className="text-xl font-bold">Panel de administración</h1>
        <input
          name="password"
          type="password"
          required
          placeholder="Contraseña"
          className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 font-semibold text-white disabled:opacity-50"
        >
          {busy ? "Entrando…" : "Entrar"}
        </button>
        {error && <p className="mt-3 text-sm text-red-600">Contraseña incorrecta.</p>}
      </form>
    </main>
  );
}
