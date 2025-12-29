"use client";

import { useEffect, useState } from "react";

const LANG_STORAGE_KEY = "pokedex_lang";

/**
 * Hook to retrieve and synchronize the current application language.
 * Listens to "pokedex-lang-changed" custom events to update state across components.
 */
export function useLanguage() {
    const [lang, setLang] = useState<string>("fr");

    useEffect(() => {
        const stored = typeof window !== "undefined" ? window.localStorage.getItem(LANG_STORAGE_KEY) : null;
        const effectiveLang = stored || "fr";
        setLang(effectiveLang);

        if (typeof window === "undefined") return;

        const handleLangChange = (event: Event) => {
            const custom = event as CustomEvent<string>;
            const newLang = custom.detail || (window.localStorage.getItem(LANG_STORAGE_KEY) || "fr");
            setLang(newLang);
        };

        window.addEventListener("pokedex-lang-changed", handleLangChange as EventListener);

        return () => {
            window.removeEventListener("pokedex-lang-changed", handleLangChange as EventListener);
        };
    }, []);

    return lang;
}
