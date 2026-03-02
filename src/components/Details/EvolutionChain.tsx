"use client";

import { useEffect, useState } from "react";
import { getPokemonDetails } from "@/lib/pokeapi";
import type { Pokemon } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Typography, Avatar, useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface EvolutionChainProps {
    url: string;
}

interface ChainLink {
    species: { name: string; url: string };
    evolves_to: ChainLink[];
}

interface EvolutionData {
    chain: ChainLink;
}

export function EvolutionChain({ url }: EvolutionChainProps) {
    const language = useLanguage();
    const t = useTranslation();
    const [chainPokemons, setChainPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        if (!url) return;

        async function fetchChain() {
            try {
                const res = await fetch(url);
                const data: EvolutionData = await res.json();

                const speciesList: { name: string; url: string }[] = [];

                const traverse = (node: ChainLink) => {
                    speciesList.push(node.species);
                    node.evolves_to.forEach(traverse);
                };

                traverse(data.chain);

                const promises = speciesList.map(async (s) => {
                    const parts = s.url.split("/");
                    const id = parts[parts.length - 2];
                    return getPokemonDetails(parseInt(id));
                });

                const pokemons = await Promise.all(promises);
                setChainPokemons(pokemons);
            } catch (err) {
                console.error("Failed to fetch evolution chain", err);
            } finally {
                setLoading(false);
            }
        }

        fetchChain();
    }, [url]);

    if (loading) return <Box sx={{ height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1.5s infinite' }}><Typography color="text.secondary">{t.pokemon.loadingEvolution}</Typography></Box>;
    if (chainPokemons.length === 0) return null;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>{t.pokemon.evolution}</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: { xs: 2, sm: 4 } }}>
                {chainPokemons.map((p, index) => (
                    <Box key={p.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        {index > 0 && (
                            <ArrowForwardIcon sx={{ color: 'text.disabled', mx: { xs: 1, sm: 2 } }} />
                        )}
                        <Link href={`/others/${p.id}`} passHref style={{ textDecoration: 'none' }}>
                            <Box
                                component={motion.div}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, cursor: 'pointer', textAlign: 'center' }}
                            >
                                <Box sx={{
                                    position: 'relative', width: { xs: 80, sm: 96 }, height: { xs: 80, sm: 96 },
                                    borderRadius: '50%', border: 1, borderColor: 'divider', bgcolor: 'background.paper',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 1,
                                    transition: 'border-color 0.2s',
                                    '&:hover': { borderColor: 'primary.main' }
                                }}>
                                    <Image
                                        src={p.image}
                                        alt={p.names["en"] || p.names["fr"] || "Pokemon"}
                                        width={80}
                                        height={80}
                                        style={{ objectFit: 'contain', width: '75%', height: '75%' }}
                                    />
                                </Box>
                                <Typography variant="body2" fontWeight="medium" color="text.primary" sx={{ textTransform: 'capitalize' }}>
                                    {p.names[language] || p.names["en"] || p.names["fr"]}
                                </Typography>
                            </Box>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
