"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PokemonData } from "@/components/Layout/PokemonData";
import { getPokemons, getTypes, type TypesMap, type Pokemon } from "@/lib/api";

const LANG_STORAGE_KEY = "pokedex_lang";

export default function PokemonDetailsPage() {
    const params = useParams<{ id: string }>();
    const id = useMemo(() => Number(params?.id), [params]);

    const [lang, setLang] = useState<string>("fr");
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
    const [typesMap, setTypesMap] = useState<TypesMap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        if (!id || Number.isNaN(id)) return;
        let cancelled = false;
        setLoading(true);
        setError(null);

        getPokemons(lang)
            .then((data) => {
                if (!cancelled) setPokemons(data);
            })
            .catch(() => {
                if (!cancelled) setError("Impossible de charger le pokémon.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [lang, id]);

    useEffect(() => {
        let cancelled = false;
        setTypesMap(null);
        getTypes(lang)
            .then((map) => {
                if (!cancelled) setTypesMap(map);
            })
            .catch(() => { });
        return () => {
            cancelled = true;
        };
    }, [lang]);

    const selected = useMemo(() => {
        if (!pokemons) return null;
        return pokemons.find((p) => p.id === id) || null;
    }, [pokemons, id]);

    return (
        <main className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-12">
            {error && (
                <p className="mb-4 text-sm text-red-500">{error}</p>
            )}

            {loading || !selected ? (
                <div className="rounded-3xl border border-border/30 bg-background/60 shadow-sm overflow-hidden p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                        <div className="aspect-square w-full bg-muted/40 animate-pulse rounded-2xl" />
                        <div className="space-y-4">
                            <div className="h-8 w-2/3 bg-muted/50 rounded animate-pulse" />
                            <div className="flex gap-2">
                                <span className="h-6 w-16 bg-muted/40 rounded-full animate-pulse" />
                                <span className="h-6 w-14 bg-muted/40 rounded-full animate-pulse" />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="h-16 bg-muted/40 rounded-2xl animate-pulse" />
                                <div className="h-16 bg-muted/40 rounded-2xl animate-pulse" />
                                <div className="h-16 bg-muted/40 rounded-2xl animate-pulse" />
                            </div>
                            <div className="h-5 w-40 bg-muted/40 rounded animate-pulse" />
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <span key={i} className="h-6 w-20 bg-muted/30 rounded-full animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <PokemonData pokemon={selected} lang={lang} typesMap={typesMap ?? undefined} />
            )}
        </main>
    );
}
