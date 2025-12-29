"use client";

import { useEffect, useRef, useState } from "react";
import { getTypes, type TypesMap, type Pokemon } from "@/lib/api";
import {
    getAllPokemonList,
    getPokemonDetails,
    getPokemonByType
} from "@/lib/pokeapi";

export const OTHERS_STATE_KEY = "others_search_state";
const ITEMS_PER_PAGE = 100;

/**
 * Hook managing the business logic for the Others page.
 * Handles:
 * - Data fetching (Global list + Details).
 * - Client-side Filtering: Simple name/ID match.
 * - Complex Type Filtering: Fetches Pokemon for each active type and intersects results (AND logic).
 * - Pagination & Session State Restoration.
 */
export function useOthersPokemon(lang: string) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Data
    const [allPokemonList, setAllPokemonList] = useState<{ name: string; url: string }[]>([]);
    const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
    const [typesMap, setTypesMap] = useState<TypesMap | null>(null);

    // Filters & Pagination
    const [query, setQuery] = useState<string>("");
    const [activeTypes, setActiveTypes] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    const restoreScrollRef = useRef<number | null>(null);

    // Initial load: Types, Global List, and Session State restoration
    useEffect(() => {
        let cancelled = false;

        getTypes(lang).then(map => {
            if (!cancelled) setTypesMap(map);
        });

        getAllPokemonList().then(list => {
            if (!cancelled) {
                setAllPokemonList(list);
                // Initialize totalItems if no state is restored
                if (activeTypes.length === 0 && query === "") {
                    setTotalItems(list.length);
                }
            }
        }).catch(() => {
            if (!cancelled) setError("Impossible de charger la liste globale.");
        });

        try {
            const raw = window.sessionStorage.getItem(OTHERS_STATE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed.query !== undefined) setQuery(parsed.query);
                if (Array.isArray(parsed.activeTypes)) setActiveTypes(parsed.activeTypes);
                if (typeof parsed.currentPage === "number") setCurrentPage(parsed.currentPage);
                if (typeof parsed.scrollY === "number") restoreScrollRef.current = parsed.scrollY;
            }
        } catch { }

        return () => { cancelled = true; };
    }, [lang]);

    // Core logic: Filter and paginate data whenever state changes
    useEffect(() => {
        if (allPokemonList.length === 0) return;

        let cancelled = false;
        setLoading(true);
        setError(null);

        const fetchData = async () => {
            let filteredList = allPokemonList;

            // 1. Filter by Name/ID
            const q = query.trim().toLowerCase();
            if (q) {
                filteredList = filteredList.filter(p => {
                    const idFromUrl = p.url.split("/").filter(Boolean).pop();
                    return idFromUrl === q || p.name.includes(q);
                });
            }

            // 2. Filter by Type (Intersection)
            if (activeTypes.length > 0) {
                try {
                    const typePromises = activeTypes.map(t => getPokemonByType(t));
                    const results = await Promise.all(typePromises);

                    // Count occurrences to ensure Pokemon satisfies ALL selected types (AND logic)
                    const typeMapCounts = new Map<string, number>();
                    results.flat().forEach(p => {
                        typeMapCounts.set(p.name, (typeMapCounts.get(p.name) || 0) + 1);
                    });

                    filteredList = filteredList.filter(p => {
                        return (typeMapCounts.get(p.name) || 0) === activeTypes.length;
                    });
                } catch (e) {
                    console.error(e);
                    throw new Error("Erreur lors du filtrage par type");
                }
            }

            if (cancelled) return;

            setTotalItems(filteredList.length);

            // 3. Paginate
            const start = currentPage * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            const pageItems = filteredList.slice(start, end);

            // 4. Hydrate details
            const detailPromises = pageItems.map(p => getPokemonDetails(p.url));
            const details = await Promise.all(detailPromises);

            if (!cancelled) {
                setDisplayedPokemons(details);
                setLoading(false);
            }
        };

        fetchData().catch(() => {
            if (!cancelled) {
                setError("Erreur lors du chargement des données.");
                setLoading(false);
            }
        });

        return () => { cancelled = true; };
    }, [allPokemonList, query, activeTypes, currentPage]);

    // Restore scroll position after data load if applicable
    useEffect(() => {
        if (!loading && displayedPokemons.length > 0 && restoreScrollRef.current !== null) {
            window.scrollTo({ top: restoreScrollRef.current, behavior: "instant" });
            restoreScrollRef.current = null;
        }
    }, [loading, displayedPokemons]);

    return {
        loading,
        error,
        displayedPokemons,
        typesMap,
        query,
        setQuery,
        activeTypes,
        setActiveTypes,
        currentPage,
        setCurrentPage,
        totalItems,
        totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };
}
