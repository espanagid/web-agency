import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { es, type Dict, type Lang } from "./es";
import { en } from "./en";
import { ru } from "./ru";

const translations: Record<Lang, Dict> = { es, en, ru };

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const Ctx = createContext<LangCtx>({ lang: "es", setLang: () => {}, t: es });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("wci-lang");
    return saved === "en" || saved === "ru" || saved === "es" ? saved : "es";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("wci-lang", l);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
export type { Lang, Dict };
