"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { PokemonGrid } from "@/components/Layout/PokemonGrid";
import { PokemonCard } from "@/components/Layout/PokemonCard";
import { getPokemonDetails } from "@/lib/pokeapi";
import type { Pokemon } from "@/lib/api";
import { getTypes } from "@/lib/api";
import type { TypesMap } from "@/lib/api";

export default function FavoritesPage() {
    const { favorites } = useFavorites();
    const lang = useLanguage();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [typesMap, setTypesMap] = useState<TypesMap | null>(null);

    useEffect(() => {
        getTypes(lang).then(setTypesMap);
    }, [lang]);

    useEffect(() => {
        if (favorites.length === 0) {
            setPokemons([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        // Fetch details for all favorite IDs
        const promises = favorites.map((id) => getPokemonDetails(id));
        Promise.all(promises)
            .then((data) => {
                setPokemons(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [favorites]);

    if (loading) {
        return (
            <main className="max-w-screen-2xl mx-auto px-4 py-8 text-center min-h-[50vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted-foreground animate-pulse">Chargement de votre équipe...</p>
                </div>
            </main>
        );
    }

    if (favorites.length === 0) {
        return (
            <main className="max-w-screen-2xl mx-auto px-4 py-16 text-center">
                <div className="max-w-md mx-auto bg-background/60 p-8 rounded-3xl border border-border/30 shadow-sm">
                    <h1 className="text-2xl font-bold mb-4">Votre équipe est vide</h1>
                    <p className="text-muted-foreground mb-6">Ajoutez des Pokémon à vos favoris en cliquant sur le cœur ❤️ sur leur carte.</p>
                    <a href="/" className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                        Explorer le Pokédex
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-screen-2xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-rose-600">
                    Mon Équipe ({favorites.length})
                </h1>
                <p className="text-muted-foreground mt-2">
                    Retrouvez ici tous vos Pokémon favoris sauvegardés.
                </p>
            </header>

            <PokemonGrid>
                {pokemons.map((p) => (
                    <PokemonCard
                        key={p.id}
                        id={p.id}
                        name={p.names?.[lang] || p.names?.["en"] || String(p.id)}
                        image={p.image}
                        types={p.types}
                        typesMap={typesMap || undefined}
                        lang={lang}
                        href={`/others/${p.id}`}
                    />
                ))}
            </PokemonGrid>
        </main>
    );
}
