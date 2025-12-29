import { useLanguage } from "./useLanguage";
import { DICTIONARIES, Language } from "@/lib/dictionaries";

export function useTranslation() {
    const lang = useLanguage() as Language;
    // Fallback to 'fr' if lang is not supported (though type ensures it mostly is)
    return DICTIONARIES[lang] || DICTIONARIES['fr'];
}
