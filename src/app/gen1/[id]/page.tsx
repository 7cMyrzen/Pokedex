"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PokemonData } from "@/components/Layout/PokemonData";
import { getPokemons, getTypes, type TypesMap, type Pokemon } from "@/lib/api";
import { useLanguage } from "@/hooks/useLanguage";
import { Container, Box, Typography, Skeleton } from "@mui/material";

export default function PokemonDetailsPage() {
    const params = useParams<{ id: string }>();
    const id = useMemo(() => Number(params?.id), [params]);

    const lang = useLanguage();
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
    const [typesMap, setTypesMap] = useState<TypesMap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch All Gen1 Pokemons
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

        return () => { cancelled = true; };
    }, [lang, id]);

    // Fetch Types
    useEffect(() => {
        let cancelled = false;
        setTypesMap(null);
        getTypes(lang)
            .then((map) => {
                if (!cancelled) setTypesMap(map);
            })
            .catch(() => { });
        return () => { cancelled = true; };
    }, [lang]);

    const selected = useMemo(() => {
        if (!pokemons) return null;
        return pokemons.find((p) => p.id === id) || null;
    }, [pokemons, id]);

    return (
        <Container maxWidth="xl" sx={{ py: 6 }}>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
            )}

            {loading || !selected ? (
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
                <PokemonData pokemon={selected} lang={lang} typesMap={typesMap ?? undefined} backHref="/gen1" />
            )}
        </Container>
    );
}
