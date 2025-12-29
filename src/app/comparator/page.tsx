"use client";

import { useState } from "react";
import { PokemonSelector } from "@/components/Comparator/PokemonSelector";
import { RadarChart } from "@/components/Comparator/RadarChart";
import { getPokemonDetails } from "@/lib/pokeapi";
import type { Pokemon } from "@/lib/api";
import Image from "next/image";

export default function ComparatorPage() {
    const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
    const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const handleSelect1 = async (id: number) => {
        setLoading1(true);
        try {
            const data = await getPokemonDetails(id);
            setPokemon1(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading1(false);
        }
    };

    const handleSelect2 = async (id: number) => {
        setLoading2(true);
        try {
            const data = await getPokemonDetails(id);
            setPokemon2(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading2(false);
        }
    };

    return (
        <main className="max-w-screen-xl mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                    Comparateur de Stats
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Sélectionnez deux Pokémon pour comparer leurs statistiques de base sur le graphique radar.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
                {/* Left Selector */}
                <div className="flex flex-col gap-6 p-6 rounded-3xl border border-border/40 bg-background/40 backdrop-blur-sm">
                    <PokemonSelector onSelect={handleSelect1} label="Pokémon 1 (Rouge)" />
                    {loading1 ? (
                        <div className="aspect-square w-full flex items-center justify-center bg-muted/20 rounded-2xl animate-pulse">Chargement...</div>
                    ) : pokemon1 ? (
                        <div className="text-center">
                            <div className="relative aspect-square w-full max-w-[200px] mx-auto mb-4">
                                <Image
                                    src={pokemon1.image}
                                    alt={pokemon1.names["en"] || "Pokemon"}
                                    fill
                                    className="object-contain drop-shadow-md"
                                />
                            </div>
                            <h2 className="text-2xl font-bold capitalize">{pokemon1.names["en"]}</h2>
                            <div className="flex justify-center gap-2 mt-2">
                                {pokemon1.types.map(t => (
                                    <span key={t} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">{t}</span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="aspect-square w-full flex items-center justify-center bg-muted/10 rounded-2xl border-2 border-dashed border-border/30 text-muted-foreground text-sm">
                            Sélectionnez un Pokémon
                        </div>
                    )}
                </div>

                {/* Center Chart */}
                <div className="flex flex-col items-center justify-center min-h-[400px] p-2 sm:p-6 rounded-3xl border border-border/40 bg-white/50 dark:bg-black/20 backdrop-blur-md shadow-sm order-last lg:order-none lg:mt-12">
                    {pokemon1 ? (
                        <RadarChart pokemon1={pokemon1} pokemon2={pokemon2} />
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <p>Veuillez sélectionner au moins un premier Pokémon pour voir le graphique.</p>
                        </div>
                    )}
                </div>

                {/* Right Selector */}
                <div className="flex flex-col gap-6 p-6 rounded-3xl border border-border/40 bg-background/40 backdrop-blur-sm">
                    <PokemonSelector onSelect={handleSelect2} label="Pokémon 2 (Bleu)" />
                    {loading2 ? (
                        <div className="aspect-square w-full flex items-center justify-center bg-muted/20 rounded-2xl animate-pulse">Chargement...</div>
                    ) : pokemon2 ? (
                        <div className="text-center">
                            <div className="relative aspect-square w-full max-w-[200px] mx-auto mb-4">
                                <Image
                                    src={pokemon2.image}
                                    alt={pokemon2.names["en"] || "Pokemon"}
                                    fill
                                    className="object-contain drop-shadow-md"
                                />
                            </div>
                            <h2 className="text-2xl font-bold capitalize">{pokemon2.names["en"]}</h2>
                            <div className="flex justify-center gap-2 mt-2">
                                {pokemon2.types.map(t => (
                                    <span key={t} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">{t}</span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="aspect-square w-full flex items-center justify-center bg-muted/10 rounded-2xl border-2 border-dashed border-border/30 text-muted-foreground text-sm">
                            Sélectionnez un Pokémon
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
