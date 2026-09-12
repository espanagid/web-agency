import { createSite } from "../../actions";

export default function NewSitePage() {
  const input =
    "w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:outline-none";

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold">Nuevo sitio</h1>
      <form action={createSite} className="mt-6 space-y-4 rounded-2xl border bg-white p-6">
        <div>
          <label className="text-sm font-medium">Nombre del negocio</label>
          <input name="name" required placeholder="Barbería El Corte" className={input} />
        </div>
        <div>
          <label className="text-sm font-medium">Subdominio</label>
          <input name="slug" required placeholder="elcorte" pattern="[a-z0-9-]+" className={input} />
          <p className="mt-1 text-xs text-slate-500">
            Será accesible en elcorte.TUDOMINIO.es — se puede cambiar después.
          </p>
        </div>
        <div>
          <label className="text-sm font-medium">WhatsApp (solo dígitos)</label>
          <input name="whatsapp" placeholder="34600123456" className={input} />
        </div>
        <div>
          <label className="text-sm font-medium">Plan</label>
          <select name="plan" className={input} defaultValue="recepcion">
            <option value="presencia">Presencia — 490€</option>
            <option value="recepcion">Recepción IA — 990€</option>
            <option value="todo-incluido">Todo Incluido — 59€/mes</option>
          </select>
        </div>
        <button className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white">
          Crear sitio
        </button>
      </form>
    </div>
  );
}
