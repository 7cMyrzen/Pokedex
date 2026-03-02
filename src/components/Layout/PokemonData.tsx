"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Pokemon, TypesMap } from "@/lib/api";
import { FavoriteButton } from "../Favorites/FavoriteButton";
import { EvolutionChain } from "../Details/EvolutionChain";
import { MoveBadge } from "../Details/MoveBadge";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Typography, Button, Paper, alpha, Card, useTheme } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PokemonDataProps {
    pokemon: Pokemon;
    lang: string;
    typesMap?: TypesMap;
    className?: string; // Compat
    backHref?: string;
}

export function PokemonData({ pokemon, lang, typesMap, className, backHref }: PokemonDataProps) {
    const displayName = pokemon.names?.[lang] || pokemon.names?.["en"] || String(pokemon.id);
    const [showAllMoves, setShowAllMoves] = useState(false);
    const t = useTranslation();
    const theme = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const visibleMoves = showAllMoves ? pokemon.moves : pokemon.moves.slice(0, 30);

    return (
        <Card sx={{ p: { xs: 3, lg: 5 }, borderRadius: 4, overflow: 'visible' }} className={className}>
            <Box sx={{ mb: 4 }}>
                <Link href={backHref || "/gen1"} passHref style={{ textDecoration: 'none' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: '9999px', textTransform: 'none', color: 'text.secondary', borderColor: 'divider' }}
                    >
                        {t.common.back}
                    </Button>
                </Link>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6 }}>
                {/* Image Section */}
                <Box>
                    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 4, overflow: 'hidden' }}>
                        <Box sx={{
                            position: 'absolute', inset: 0,
                            background: `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.common.white, 0.05)}, transparent 40%), radial-gradient(circle at 70% 80%, ${alpha(theme.palette.common.black, 0.06)}, transparent 40%)`
                        }} />
                        <Box
                            component={motion.div}
                            layoutId={`pokemon-image-${pokemon.id}`}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}
                        >
                            <Image
                                src={pokemon.image}
                                alt={displayName}
                                width={384}
                                height={384}
                                style={{ objectFit: 'contain', width: '80%', height: '80%' }}
                                priority
                            />
                        </Box>
                        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
                            <FavoriteButton id={pokemon.id} />
                        </Box>
                    </Box>
                </Box>

                {/* Details Section */}
                <Box>
                    <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
                        <Box component={motion.div} variants={itemVariants} sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h3" fontWeight="bold" noWrap>{displayName}</Typography>
                            <Typography variant="h5" color="text.secondary">#{pokemon.id}</Typography>
                        </Box>

                        <Box component={motion.div} variants={itemVariants} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                            {pokemon.types.map((type) => (
                                <Box
                                    key={type}
                                    component={motion.span}
                                    whileHover={{ scale: 1.1 }}
                                    sx={{
                                        px: 2, py: 0.5, borderRadius: '9999px',
                                        bgcolor: typesMap?.[type]?.backgroundColor || 'grey.500',
                                        color: 'white', fontSize: '0.875rem', fontWeight: 'medium', boxShadow: 1
                                    }}
                                >
                                    {typesMap?.[type]?.translations?.[lang] || typesMap?.[type]?.translations?.["en"] || type}
                                </Box>
                            ))}
                        </Box>

                        <Box component={motion.div} variants={itemVariants} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 4 }}>
                            {[
                                { label: t.pokemon.height, val: `${pokemon.height / 10} m (${pokemon.height * 10} cm)` },
                                { label: t.pokemon.weight, val: `${pokemon.weight / 10} kg (${pokemon.weight * 100} g)` },
                                { label: t.pokemon.moves, val: pokemon.moves.length }
                            ].map((stat, i) => (
                                <Box key={i} sx={{ p: 2, borderRadius: 3, border: 1, borderColor: 'divider', bgcolor: 'background.paper', textAlign: 'center' }}>
                                    <Typography variant="caption" color="text.secondary" display="block">{stat.label}</Typography>
                                    <Typography variant="body1" fontWeight="bold">{stat.val}</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box component={motion.div} variants={itemVariants}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>{t.pokemon.movesList}</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {visibleMoves.map((m) => (
                                    <MoveBadge key={m} move={m} />
                                ))}
                                {!showAllMoves && pokemon.moves.length > 30 && (
                                    <Button onClick={() => setShowAllMoves(true)} size="small" sx={{ textTransform: 'none' }}>
                                        +{pokemon.moves.length - 30} {t.common.andMore}
                                    </Button>
                                )}
                                {showAllMoves && pokemon.moves.length > 30 && (
                                    <Button onClick={() => setShowAllMoves(false)} size="small" sx={{ textTransform: 'none' }}>
                                        {t.common.viewLess}
                                    </Button>
                                )}
                            </Box>
                        </Box>

                        {pokemon.evolutionChainUrl && (
                            <Box component={motion.div} variants={itemVariants}>
                                <EvolutionChain url={pokemon.evolutionChainUrl} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}
