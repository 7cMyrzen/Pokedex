import { Pokemon, TypesMap, LocalizedNames } from "./api";

const BASE_URL = process.env.NEXT_PUBLIC_POKEAPI_URL || "https://pokeapi.co/api/v2";

export interface PokeApiListResult {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
}

export interface PokeApiPokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string | null;
        other?: {
            "official-artwork"?: {
                front_default: string | null;
            };
            home?: {
                front_default: string | null;
            };
        };
    };
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    moves: {
        move: {
            name: string;
            url: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

export interface PokeApiSpecies {
    names: {
        language: { name: string };
        name: string;
    }[];
    evolution_chain: {
        url: string;
    };
}

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    return res.json();
}

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokeApiListResult> {
    return fetchJson(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
}

export async function getAllPokemonList(): Promise<{ name: string; url: string }[]> {
    // Limit 10000 to get "all" (currently ~1300)
    const data = await fetchJson<PokeApiListResult>(`${BASE_URL}/pokemon?limit=10000`);
    return data.results;
}

/**
 * Fetches detailed Pokemon data.
 * - Resolves localized names by fetching the `pokemon-species` resource (optimistic).
 * - Applies a robust image fallback strategy (Official Artwork -> Home -> Default -> Placeholder).
 */
export async function getPokemonDetails(urlOrId: string | number): Promise<Pokemon> {
    const url = typeof urlOrId === "number" ? `${BASE_URL}/pokemon/${urlOrId}` : urlOrId;
    const data = await fetchJson<PokeApiPokemon>(url);

    // Fetch species for names
    let names: LocalizedNames = {};
    let evolutionChainUrl: string | undefined = undefined;
    try {
        const species = await fetchJson<PokeApiSpecies>(`${BASE_URL}/pokemon-species/${data.id}`);
        species.names.forEach((n) => {
            names[n.language.name] = n.name;
        });
        evolutionChainUrl = species.evolution_chain?.url;
    } catch {
        names = { en: data.name };
    }

    // Image Fallback
    const official = data.sprites.other?.["official-artwork"]?.front_default;
    const home = data.sprites.other?.home?.front_default;
    const def = data.sprites.front_default;
    const image = official || home || def || "/pokeball.webp";

    return {
        id: data.id,
        height: data.height,
        weight: data.weight,
        image: image,
        types: data.types.map((t) => t.type.name),
        moves: data.moves.map((m) => m.move.name),
        names: names,
        stats: {
            hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
            attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
            defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
            specialAttack: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
            specialDefense: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
            speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
        },
        evolutionChainUrl: evolutionChainUrl
    };
}

export async function getPokemonByType(type: string): Promise<{ name: string; url: string }[]> {
    const data = await fetchJson<{ pokemon: { pokemon: { name: string; url: string } }[] }>(
        `${BASE_URL}/type/${type}`
    );
    return data.pokemon.map((p) => p.pokemon);
}
