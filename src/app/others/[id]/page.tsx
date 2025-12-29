"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PokemonData } from "@/components/Layout/PokemonData";
import { getPokemonDetails } from "@/lib/pokeapi";
import { getTypes, type TypesMap, type Pokemon } from "@/lib/api";
import { useLanguage } from "@/hooks/useLanguage";

export default function PokemonDetailsPage() {
    const params = useParams<{ id: string }>();
    const id = useMemo(() => Number(params?.id), [params]);

    const lang = useLanguage();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [typesMap, setTypesMap] = useState<TypesMap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch Pokemon Details
    useEffect(() => {
        if (!id || Number.isNaN(id)) return;
        let cancelled = false;
        setLoading(true);
        setError(null);

        getPokemonDetails(id)
            .then((data) => {
                if (!cancelled) {
                    setPokemon(data);
                    setLoading(false);
                }
            })
            .catch((e) => {
                if (!cancelled) {
                    console.error(e);
                    setError("Impossible de charger le pokémon.");
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    // Fetch Types (for UI colors/translations)
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

    return (
        <main className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-12">
            {error && (
                <p className="mb-4 text-sm text-red-500">{error}</p>
            )}

            {loading || !pokemon ? (
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
                <PokemonData
                    pokemon={pokemon}
                    lang={lang}
                    typesMap={typesMap ?? undefined}
                    backHref="/others"
                />
            )}
        </main>
    );
}
