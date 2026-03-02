"use client";

import { useState, useEffect } from "react";
import { PokemonSelector } from "@/components/Comparator/PokemonSelector";
import { RadarChart } from "@/components/Comparator/RadarChart";
import { getPokemonDetails } from "@/lib/pokeapi";
import { type Pokemon, type TypesMap, getTypes } from "@/lib/api";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Box, Typography, Paper, alpha, Card } from "@mui/material";

export default function ComparatorPage() {
    const language = useLanguage();
    const t = useTranslation();
    const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
    const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [typesMap, setTypesMap] = useState<TypesMap>({});

    useEffect(() => {
        getTypes().then(setTypesMap).catch(console.error);
    }, []);

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

    const renderPokemonCard = (pokemon: Pokemon | null, loading: boolean, label: string, onSelect: (id: number) => void) => (
        <Card variant="outlined" sx={{ p: 4, borderRadius: 4, height: '100%', bgcolor: 'background.paper' }}>
            <PokemonSelector onSelect={onSelect} label={label} />

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                {loading ? (
                    <Box sx={{ width: '100%', aspectRatio: '1/1', bgcolor: 'action.hover', borderRadius: 4, animation: 'pulse 2s infinite', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">{t.common.loading}</Typography>
                    </Box>
                ) : pokemon ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ position: 'relative', width: 200, height: 200, mx: 'auto', mb: 2 }}>
                            <Image
                                src={pokemon.image}
                                alt={pokemon.names["en"] || "Pokemon"}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                        <Typography variant="h5" fontWeight="bold" textTransform="capitalize" gutterBottom>
                            {pokemon.names[language] || pokemon.names["en"]}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                            {pokemon.types.map(type => (
                                <Box
                                    key={type}
                                    sx={{
                                        px: 1.5, py: 0.5, borderRadius: '9999px',
                                        fontSize: '0.75rem', fontWeight: 'medium',
                                        color: 'white',
                                        bgcolor: typesMap[type]?.backgroundColor || 'grey.500',
                                        boxShadow: 1
                                    }}
                                >
                                    {typesMap[type]?.translations?.[language] || typesMap[type]?.translations?.["en"] || type}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{
                        width: '100%', aspectRatio: '1/1', borderRadius: 4,
                        border: 2, borderStyle: 'dashed', borderColor: 'divider',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: 'action.hover', color: 'text.secondary'
                    }}>
                        {t.comparator.selectPokemon}
                    </Box>
                )}
            </Box>
        </Card>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{
                    background: 'linear-gradient(to right, #2563eb, #4f46e5)', // blue to indigo
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {t.comparator.title}
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                    {t.comparator.subtitle}
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr' }, gap: 4, alignItems: 'start' }}>
                <Box>
                    {renderPokemonCard(pokemon1, loading1, t.comparator.selectPokemon, handleSelect1)}
                </Box>

                <Box>
                    <Card variant="outlined" sx={{
                        p: 2, borderRadius: 4, bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
                        backdropFilter: 'blur(10px)', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {pokemon1 ? (
                            <RadarChart pokemon1={pokemon1} pokemon2={pokemon2} lang={language} />
                        ) : (
                            <Typography color="text.secondary">{t.comparator.selectPokemon}</Typography>
                        )}
                    </Card>
                </Box>

                <Box>
                    {renderPokemonCard(pokemon2, loading2, t.comparator.selectPokemon, handleSelect2)}
                </Box>
            </Box>
        </Container>
    );
}
