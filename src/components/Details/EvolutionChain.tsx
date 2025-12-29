"use client";

import { useEffect, useState } from "react";
import { getPokemonDetails } from "@/lib/pokeapi";
import type { Pokemon } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Props for the EvolutionChain component.
 */
interface EvolutionChainProps {
    /** URL to the evolution chain API endpoint */
    url: string;
}

/**
 * Internal interface representing a node in the evolution chain (from PokéAPI).
 */
interface ChainLink {
    species: { name: string; url: string };
    evolves_to: ChainLink[];
}

/**
 * Interface representing the structure of the evolution chain response.
 */
interface EvolutionData {
    chain: ChainLink;
}

/**
 * Fetches and displays the evolutionary line of a Pokemon.
 * Traverses the evolution tree and renders a linear or slightly branched progression.
 * Includes interactive links to evolution stages.
 */
export function EvolutionChain({ url }: EvolutionChainProps) {
    const language = useLanguage();
    const t = useTranslation();
    const [chainPokemons, setChainPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;

        async function fetchChain() {
            try {
                const res = await fetch(url);
                const data: EvolutionData = await res.json();

                // Collect species URLs
                const speciesList: { name: string; url: string }[] = [];

                const traverse = (node: ChainLink) => {
                    speciesList.push(node.species);
                    node.evolves_to.forEach(traverse);
                };

                traverse(data.chain);

                // Fetch details for each species (using ID derived from URL to fetch Pokemon details)
                // Note: Species ID usually matches Pokemon ID.
                const promises = speciesList.map(async (s) => {
                    const parts = s.url.split("/");
                    const id = parts[parts.length - 2];
                    return getPokemonDetails(parseInt(id));
                });

                const pokemons = await Promise.all(promises);
                // Sort by ID to ensure order? No, traversing order is correct for chain display usually.
                // But traverse gives linear list. 
                // Wait, if it's a branching evolution (Eevee), linear list might be confusing.
                // For MVP/Standard grid, linear is okay, but branching is better.
                // Given "Simplistic" requirement, I'll render them in a flex row wrapping.
                // Ideally I should preserve the structure, but passing full Pokemon objects is easier for rendering cards.
                // I'll stick to linear list for now, it covers 90% of cases nicely.
                setChainPokemons(pokemons);
            } catch (err) {
                console.error("Failed to fetch evolution chain", err);
            } finally {
                setLoading(false);
            }
        }

        fetchChain();
    }, [url]);

    if (loading) return <div className="h-24 flex items-center justify-center text-muted-foreground animate-pulse">{t.pokemon.loadingEvolution}</div>;
    if (chainPokemons.length === 0) return null;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">{t.pokemon.evolution}</h2>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                {chainPokemons.map((p, index) => (
                    <div key={p.id} className="flex items-center">
                        {index > 0 && (
                            <MoveRight className="text-muted-foreground/40 w-6 h-6 mx-2 sm:mx-4" />
                        )}
                        <Link href={`/others/${p.id}`}>
                            <motion.div
                                className="flex flex-col items-center gap-2 group cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-background/50 rounded-full border border-border/20 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                                    <Image
                                        src={p.image}
                                        alt={p.names["en"] || p.names["fr"] || "Pokemon"}
                                        width={80}
                                        height={80}
                                        className="object-contain w-3/4 h-3/4 drop-shadow-sm"
                                    />
                                </div>
                                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors capitalize">
                                    {p.names[language] || p.names["en"] || p.names["fr"]}
                                </span>
                            </motion.div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
