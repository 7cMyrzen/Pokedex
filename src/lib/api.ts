const POKEMONS_API = process.env.NEXT_PUBLIC_POKEMONS_API as string;
const TYPES_API = process.env.NEXT_PUBLIC_TYPES_API as string;

export type LocaleCode =
    | "en" | "fr" | "de" | "es" | "it" | "ja" | "ja-Hrkt" | "roomaji"
    | "ko" | "zh-Hans" | "zh-Hant";

export type LocalizedNames = Partial<Record<LocaleCode | string, string>>;

export interface Pokemon {
    id: number;
    height: number;
    weight: number;
    image: string;
    types: string[];
    moves: string[];
    names: LocalizedNames;
}

export interface TypeInfo {
    backgroundColor: string;
    translations: Partial<Record<LocaleCode | string, string>>;
}

export type TypesMap = Record<string, TypeInfo>;

function withLang(base: string, lang?: string) {
    try {
        const url = new URL(base);
        if (lang) url.searchParams.set("lang", lang);
        return url.toString();
    } catch {
        return base;
    }
}

async function fetchJson<T = unknown>(input: string, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json() as Promise<T>;
}

export async function getPokemons(lang?: string): Promise<Pokemon[]> {
    if (!POKEMONS_API) throw new Error("NEXT_PUBLIC_POKEMONS_API is not set");
    const url = withLang(POKEMONS_API, lang);
    return fetchJson<Pokemon[]>(url);
}

export async function getTypes(lang?: string): Promise<TypesMap> {
    if (!TYPES_API) throw new Error("NEXT_PUBLIC_TYPES_API is not set");
    const url = withLang(TYPES_API, lang);
    return fetchJson<TypesMap>(url);
}
