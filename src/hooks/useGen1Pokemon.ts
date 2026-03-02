"use client";

import { useEffect, useRef, useState } from "react";
import { getPokemons, getTypes, type TypesMap } from "@/lib/api";

export const GEN1_STATE_KEY = "gen1_search_state";

/**
 * Hook managing the business logic for the Gen1 page.
 * Handles data fetching (JSON), client-side filtering (name/type/ID), 
 * and session state restoration.
 */
export function useGen1Pokemon(lang: string) {
    const [pokemons, setPokemons] = useState<Awaited<ReturnType<typeof getPokemons>> | null>(null);
    const [typesMap, setTypesMap] = useState<TypesMap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const [query, setQuery] = useState<string>("");
    const [activeTypes, setActiveTypes] = useState<string[]>([]);
    const restoreScrollRef = useRef<number | null>(null);

    // 1. Initial Load & Restore
    useEffect(() => {
        // Restore State
        if (typeof window !== "undefined") {
            try {
                const raw = window.sessionStorage.getItem(GEN1_STATE_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed.query !== undefined) setQuery(parsed.query);
                    if (Array.isArray(parsed.activeTypes)) setActiveTypes(parsed.activeTypes.filter(Boolean));
                    if (typeof parsed.scrollY === "number") restoreScrollRef.current = parsed.scrollY;
                }
            } catch { }
        }
    }, []);

    // 2. Fetch Data
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        getPokemons(lang)
            .then((data) => {
                if (!cancelled) setPokemons(data);
            })
            .catch(() => {
                if (!cancelled) setError("Impossible de charger les pokémons.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [lang]);

    useEffect(() => {
        let cancelled = false;
        getTypes(lang)
            .then((map) => {
                if (!cancelled) setTypesMap(map);
            })
            .catch(() => { });
        return () => { cancelled = true; };
    }, [lang]);

    // 3. Restore Scroll Position
    useEffect(() => {
        if (!loading && pokemons && restoreScrollRef.current !== null) {
            window.scrollTo({ top: restoreScrollRef.current, behavior: "instant" });
            restoreScrollRef.current = null;
        }
    }, [loading, pokemons]);

    /**
     * Filters the Pokemon list based on:
     * 1. Search Query: Matches against Name (localized), ID, or Type Name.
     * 2. Active Types: Strict intersection (AND logic) - Pokemon must possess ALL selected types.
     */
    const filteredPokemons = !pokemons
        ? []
        : pokemons.filter((p) => {
            const q = query.trim().toLowerCase();
            const hasQuery = q.length > 0;
            const name = (p.names?.[lang] || p.names?.["en"] || String(p.id)).toLowerCase();
            const byName = hasQuery ? name.includes(q) : false;

            // Allow searching by ID (stripping leading zeros)
            const qNum = q.replace(/^0+/, "");
            const byId = hasQuery ? (qNum === "" ? true : (/^\d+$/.test(qNum) && Number(qNum) === p.id)) : false;

            // Search by Type Name
            const byType = hasQuery ? p.types.some((t) => {
                const labelLang = typesMap?.[t]?.translations?.[lang ?? ""];
                const labelEn = typesMap?.[t]?.translations?.["en"];
                const candidates = [labelLang, labelEn, t]
                    .filter(Boolean)
                    .map((s) => String(s).toLowerCase());
                return candidates.some((lab) => lab.includes(q));
            }) : false;

            const byActiveTypes = activeTypes.length > 0 ? activeTypes.every((t) => p.types.includes(t)) : true;
            const matchesQuery = hasQuery ? (byName || byId || byType) : true;

            return matchesQuery && byActiveTypes;
        });

    return {
        loading,
        error,
        filteredPokemons,
        typesMap,
        query,
        setQuery,
        activeTypes,
        setActiveTypes,
    };
}
