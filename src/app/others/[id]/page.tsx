"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PokemonData } from "@/components/Layout/PokemonData";
import { getPokemonDetails } from "@/lib/pokeapi";
import { getTypes, type TypesMap, type Pokemon } from "@/lib/api";
import { useLanguage } from "@/hooks/useLanguage";
import { Container, Box, Typography, Skeleton } from "@mui/material";

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

    // Fetch Types
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
        <Container maxWidth="xl" sx={{ py: 6 }}>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
            )}

            {loading || !pokemon ? (
                <Box sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { lg: '1fr 1fr' }, gap: 4 }}>
                        <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 4 }} />
                        <Box>
                            <Skeleton width="60%" height={60} />
                            <Skeleton width="30%" height={40} />
                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                <Skeleton width={80} height={32} sx={{ borderRadius: 16 }} />
                                <Skeleton width={80} height={32} sx={{ borderRadius: 16 }} />
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mt: 4 }}>
                                <Skeleton height={100} sx={{ borderRadius: 4 }} />
                                <Skeleton height={100} sx={{ borderRadius: 4 }} />
                                <Skeleton height={100} sx={{ borderRadius: 4 }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <PokemonData
                    pokemon={pokemon}
                    lang={lang}
                    typesMap={typesMap ?? undefined}
                    backHref="/others"
                />
            )}
        </Container>
    );
}
