const POKEMONS_API = process.env.NEXT_PUBLIC_POKEMONS_API as string;
const TYPES_API = process.env.NEXT_PUBLIC_TYPES_API as string;

/**
 * Supported locale codes for the application.
 * Includes standard ISO codes and specific variants (e.g., roomaji).
 */
export type LocaleCode =
    | "en" | "fr" | "de" | "es" | "it" | "ja" | "ja-Hrkt" | "roomaji"
    | "ko" | "zh-Hans" | "zh-Hant";

/**
 * Record of localized names indexed by locale code.
 * Example: { "en": "Bulbasaur", "fr": "Bulbizarre" }
 */
export type LocalizedNames = Partial<Record<LocaleCode | string, string>>;

/**
 * Represents a Pokemon entity with all its essential details.
 * Derived from the API response structure.
 */
export interface Pokemon {
    /** Unique identifier (Pokedex number) */
    id: number;
    /** Height in decimeters */
    height: number;
    /** Weight in hectograms */
    weight: number;
    /** URL to the official artwork image */
    image: string;
    /** List of type identifiers (e.g., "grass", "poison") */
    types: string[];
    /** List of move names available to the Pokemon */
    moves: string[];
    /** Localized names of the Pokemon */
    names: LocalizedNames;
    /** Base statistics */
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
    /** Optional URL to the evolution chain resource */
    evolutionChainUrl?: string;
}

/**
 * Information regarding a specific Pokemon type.
 */
export interface TypeInfo {
    /** Color code associated with the type (hex or css name) */
    backgroundColor: string;
    /** Localized names for the type */
    translations: Partial<Record<LocaleCode | string, string>>;
}

/**
 * Map of type identifiers to their detailed information.
 * Key: type name (e.g., "grass"), Value: TypeInfo
 */
export type TypesMap = Record<string, TypeInfo>;

/**
 * Appends the language query parameter to a base URL.
 * Safely handles invalid URLs by returning the base.
 * @param base The base URL string
 * @param lang The language code to append (optional)
 * @returns The URL with the lang query parameter
 */
function withLang(base: string, lang?: string) {
    try {
        const url = new URL(base);
        if (lang) url.searchParams.set("lang", lang);
        return url.toString();
    } catch {
        return base;
    }
}

/**
 * Generic fetch wrapper for JSON responses.
 * @template T The expected return type
 * @param input The resource URL
 * @param init Optional fetch init settings
 * @returns A promise resolving to the parsed JSON data
 * @throws Error if the response status is not ok
 */
async function fetchJson<T = unknown>(input: string, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json() as Promise<T>;
}

/**
 * Fetches the list of all Pokemons.
 * @param lang Optional language code to request localized data
 * @returns A promise resolving to an array of Pokemon objects
 * @throws Error if the API environment variable is not set or network fails
 */
export async function getPokemons(lang?: string): Promise<Pokemon[]> {
    if (!POKEMONS_API) throw new Error("NEXT_PUBLIC_POKEMONS_API is not set");
    const url = withLang(POKEMONS_API, lang);
    return fetchJson<Pokemon[]>(url);
}

/**
 * Fetches the map of Pokemon types and their translations.
 * @param lang Optional language code
 * @returns A promise resolving to the TypesMap
 * @throws Error if the API environment variable is not set or network fails
 */
export async function getTypes(lang?: string): Promise<TypesMap> {
    if (!TYPES_API) throw new Error("NEXT_PUBLIC_TYPES_API is not set");
    const url = withLang(TYPES_API, lang);
    return fetchJson<TypesMap>(url);
}
