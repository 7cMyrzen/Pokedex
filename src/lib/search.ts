import pokemon from "pokemon";

// Languages supported by 'pokemon' package: 'en', 'de', 'fr', 'ja', 'it', 'es'.
// These match our SUPPORTED_LANGS keys exactly (except ja is sometimes used as 'ja' in code).
// Note: 'ja' in pokemon package returns Katakana names usually.

const LANGUAGES = ['en', 'fr', 'de', 'es', 'it', 'ja'] as const;

// Cache map: ID -> Set of names (normalized lower case)
let searchCache: Map<number, Set<string>> | null = null;

/**
 * Initializes the name cache by iterating through all supported languages
 * in the 'pokemon' package and mapping names to Pokedex IDs.
 * This is performed lazily on the first search request.
 */
function initializeCache() {
    if (searchCache) return;
    searchCache = new Map();

    LANGUAGES.forEach(lang => {
        try {
            const allNames = pokemon.all(lang);
            allNames.forEach((name, index) => {
                const id = index + 1;
                if (!searchCache!.has(id)) {
                    searchCache!.set(id, new Set());
                }
                searchCache!.get(id)!.add(name.toLowerCase());
            });
        } catch (e) {
            console.warn(`Could not load names for language ${lang}`, e);
        }
    });
}

/**
 * Checks if a Pokemon matches a search query across all supported languages.
 * @param id The Pokemon ID
 * @param query The search query (will be normalized)
 * @param englishName Optional english name from API to ensure fallback/Gen 9 support
 */
export function matchesSearch(id: number, query: string, englishName?: string): boolean {
    if (!query) return true;

    // Initialize cache on first use
    if (!searchCache) initializeCache();

    const q = query.trim().toLowerCase();

    // Check ID
    if (String(id).includes(q)) return true;

    // Check English Name from API (most reliable for recent Gen)
    if (englishName && englishName.toLowerCase().includes(q)) return true;

    // Check localized names
    const names = searchCache!.get(id);
    if (names) {
        for (const name of names) {
            if (name.includes(q)) return true;
        }
    }

    return false;
}
