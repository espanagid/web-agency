"use client";

import { useState } from "react";

export function DeleteSiteButton({ action }: { action: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirming) {
          e.preventDefault();
          setConfirming(true);
        }
      }}
      onBlur={() => setConfirming(false)}
      className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
    >
      {confirming ? "Pulsa de nuevo para confirmar" : "Eliminar sitio"}
    </button>
  );
}
