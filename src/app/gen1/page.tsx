"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import { useGen1Pokemon, GEN1_STATE_KEY } from "@/hooks/useGen1Pokemon";
import { PokemonGrid } from "@/components/Layout/PokemonGrid";
import { PokemonCard } from "@/components/Layout/PokemonCard";
import { EmptyResults } from "@/components/Layout/EmptyResults";
import { Modal } from "@/components/Layout/Modal";
import { Container, TextField, Box, Button, Typography, Checkbox, FormControlLabel, Chip } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

export default function Pokedex() {
    const lang = useLanguage();
    const t = useTranslation();
    const {
        loading,
        error,
        filteredPokemons,
        typesMap,
        query,
        setQuery,
        activeTypes,
        setActiveTypes
    } = useGen1Pokemon(lang);

    const [typesOpen, setTypesOpen] = useState<boolean>(false);

    return (
        <Container maxWidth="xl" sx={{ py: 6 }}>
            {/* Search Input */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    id="gen1-search"
                    fullWidth
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.search.placeholderGen1}
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                            boxShadow: 1
                        }
                    }}
                />
            </Box>

            {/* Filters */}
            {typesMap && (
                <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        onClick={() => setTypesOpen(true)}
                        sx={{ borderRadius: 3, textTransform: 'none', px: 3, bgcolor: 'background.paper' }}
                    >
                        {t.common.filterByTypes} {activeTypes.length > 0 && `(${activeTypes.length})`}
                    </Button>

                    <Modal open={typesOpen} onClose={() => setTypesOpen(false)} title={t.common.filterByTypes}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 1 }}>
                            {Object.keys(typesMap ?? {}).map((type) => {
                                const label = typesMap?.[type]?.translations?.[lang ?? ""] || typesMap?.[type]?.translations?.["en"] || type;
                                const checked = activeTypes.includes(type);
                                return (
                                    <Box
                                        key={type}
                                        onClick={() => {
                                            setActiveTypes(checked ? activeTypes.filter(x => x !== type) : [...activeTypes, type]);
                                        }}
                                        sx={{
                                            display: 'flex', alignItems: 'center', gap: 1, p: 1, borderRadius: 2, cursor: 'pointer',
                                            bgcolor: checked ? 'action.selected' : 'transparent',
                                            '&:hover': { bgcolor: 'action.hover' }
                                        }}
                                    >
                                        <Checkbox
                                            checked={checked}
                                            size="small"
                                            disableRipple
                                            sx={{ p: 0 }}
                                            tabIndex={-1}
                                        />
                                        <Box
                                            component="span"
                                            sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: typesMap?.[type]?.backgroundColor }}
                                        />
                                        <Typography variant="body2">{label}</Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setTypesOpen(false)}>Done</Button>
                        </Box>
                    </Modal>

                    <Button
                        onClick={() => setActiveTypes([])}
                        disabled={activeTypes.length === 0}
                        startIcon={<CloseIcon />}
                        sx={{ textTransform: 'none', borderRadius: 3 }}
                    >
                        {t.common.clearFilters}
                    </Button>
                </Box>
            )}

            {activeTypes.length > 0 && (
                <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {activeTypes.map(type => (
                        <Chip
                            key={type}
                            label={typesMap?.[type]?.translations?.[lang ?? ""] || type}
                            onDelete={() => setActiveTypes(activeTypes.filter(x => x !== type))}
                            sx={{
                                bgcolor: typesMap?.[type]?.backgroundColor,
                                color: 'white',
                                fontWeight: 'medium'
                            }}
                        />
                    ))}
                </Box>
            )}

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {loading ? (
                <PokemonGrid>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                width: '100%', height: '100%', aspectRatio: '1/1.2',
                                borderRadius: 4, bgcolor: 'background.paper',
                                display: 'flex', flexDirection: 'column', p: 2, gap: 2,
                                border: 1, borderColor: 'divider'
                            }}
                        >
                            <Box sx={{ flex: 1, bgcolor: 'action.hover', borderRadius: 2, animation: 'pulse 1.5s infinite' }}>
                            </Box>
                            <Box sx={{ height: 20, bgcolor: 'action.hover', borderRadius: 1, animation: 'pulse 1.5s infinite' }}></Box>
                        </Box>
                    ))}
                </PokemonGrid>
            ) : filteredPokemons.length === 0 ? (
                <EmptyResults query={query} />
            ) : (
                <PokemonGrid>
                    {filteredPokemons.map((p) => (
                        <PokemonCard
                            key={p.id}
                            id={p.id}
                            name={p.names?.[lang] || p.names?.["en"] || String(p.id)}
                            image={p.image}
                            types={p.types}
                            typesMap={typesMap ?? undefined}
                            lang={lang}
                            onClick={() => {
                                try {
                                    if (typeof window !== "undefined") {
                                        const state = {
                                            query,
                                            activeTypes,
                                            scrollY: window.scrollY || window.pageYOffset || 0,
                                            lang,
                                        };
                                        window.sessionStorage.setItem(GEN1_STATE_KEY, JSON.stringify(state));
                                    }
                                } catch { }
                            }}
                            href={`/gen1/${p.id}`}
                        />
                    ))}
                </PokemonGrid>
            )}
        </Container>
    );
}
