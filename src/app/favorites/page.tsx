"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import { PokemonGrid } from "@/components/Layout/PokemonGrid";
import { PokemonCard } from "@/components/Layout/PokemonCard";
import { getPokemonDetails } from "@/lib/pokeapi";
import type { Pokemon } from "@/lib/api";
import { getTypes } from "@/lib/api";
import type { TypesMap } from "@/lib/api";
import { Box, Typography, CircularProgress, Container, Button } from "@mui/material";
import Link from "next/link";

export default function FavoritesPage() {
    const { favorites } = useFavorites();
    const lang = useLanguage();
    const t = useTranslation();
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
            <Container maxWidth="xl" sx={{ py: 8, minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <CircularProgress color="primary" />
                    <Typography color="text.secondary" sx={{ animation: 'pulse 2s infinite' }}>{t.common.loading}</Typography>
                </Box>
            </Container>
        );
    }

    if (favorites.length === 0) {
        return (
            <Container maxWidth="xl" sx={{ py: 16, textAlign: 'center' }}>
                <Box sx={{ maxWidth: 480, mx: 'auto', bgcolor: 'background.paper', p: 4, borderRadius: 4, border: 1, borderColor: 'divider', boxShadow: 1 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">{t.favorites.title}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>{t.favorites.empty}</Typography>
                    <Link href="/others" passHref>
                        <Button variant="contained" size="large" sx={{ borderRadius: 3 }}>
                            {t.nav.others}
                        </Button>
                    </Link>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box component="header" sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    <Box component="span" className="gradient-text">
                        {t.favorites.title} ({favorites.length})
                    </Box>
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {t.favorites.subtitle}
                </Typography>
            </Box>

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
                        href={`/others/${p.id}`} // Assuming detailed view is shared or routed specifically. Original was /others/id for favorites too? Ah, actually original was generic.
                    />
                ))}
            </PokemonGrid>
        </Container>
    );
}
