import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useTranslation } from "react-i18next";
import { CONTENT } from "../data/content";
import type { Translation } from "../data/types";
import { useSanityContent } from "../sanity/SanityContentProvider";

export function withViewTransition(updateFn: () => void): void {
  if (typeof document === "undefined" || typeof document.startViewTransition !== "function") {
    updateFn();
    return;
  }
  document.startViewTransition(() => {
    flushSync(updateFn);
  });
}

export function useT(): {
  t: Translation;
  lang: "es" | "en";
  setLang: (lang: "es" | "en") => void;
} {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage === "en" ? "en" : "es") as "es" | "en";
  const sanity = useSanityContent();

  const setLang = useCallback(
    (next: "es" | "en") => {
      if (next === lang) return;
      withViewTransition(() => {
        void i18n.changeLanguage(next);
      });
    },
    [i18n, lang]
  );

  const t = sanity ? sanity.getTranslation(lang) : CONTENT[lang];

  return { t, lang, setLang };
}
