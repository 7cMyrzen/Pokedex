"use client";

import { useOthersPokemon, OTHERS_STATE_KEY } from "@/hooks/useOthersPokemon";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import { PokemonGrid } from "@/components/Layout/PokemonGrid";
import { PokemonCard } from "@/components/Layout/PokemonCard";
import { EmptyResults } from "@/components/Layout/EmptyResults";
import { Modal } from "@/components/Layout/Modal";
import { Pagination } from "@/components/ui/pagination"; // Need to port this one too?
import { useSearchParams } from "next/navigation";
import { useState, useRef, Suspense } from "react";
import { Container, Box, TextField, Button, Checkbox, Typography, Chip, Alert } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

export default function OthersPage() {
    return (
        <Suspense fallback={<Container maxWidth="xl" sx={{ py: 6 }}><Typography>Loading...</Typography></Container>}>
            <OthersPageContent />
        </Suspense>
    );
}

function OthersPageContent() {
    const lang = useLanguage();
    const t = useTranslation();
    const searchParams = useSearchParams();
    const limit = Number(searchParams.get("limit")) || 100;

    const {
        loading,
        error,
        displayedPokemons,
        typesMap,
        query,
        setQuery,
        activeTypes,
        setActiveTypes,
        currentPage,
        setCurrentPage,
        totalPages
    } = useOthersPokemon(lang, limit);

    const [typesOpen, setTypesOpen] = useState<boolean>(false);

    // Navigation Handlers
    const handlePageChange = (p: number) => {
        setCurrentPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSearch = (val: string) => {
        setQuery(val);
        setCurrentPage(0);
    };
    const handleTypeToggle = (type: string) => {
        setActiveTypes(prev => prev.includes(type) ? prev.filter(x => x !== type) : [...prev, type]);
        setCurrentPage(0);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 6 }}>
            {/* Search Input */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    id="others-search"
                    fullWidth
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={t.search.placeholderOthers}
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
                        {t.common.filter} {activeTypes.length > 0 && `(${activeTypes.length})`}
                    </Button>
                    <Modal open={typesOpen} onClose={() => setTypesOpen(false)} title={t.common.filters}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 1 }}>
                            {Object.keys(typesMap).map((typeKey) => {
                                const label = typesMap[typeKey]?.translations?.[lang] || typesMap[typeKey]?.translations?.["en"] || typeKey;
                                const checked = activeTypes.includes(typeKey);
                                return (
                                    <Box
                                        key={typeKey}
                                        onClick={() => handleTypeToggle(typeKey)}
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
                                            sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: typesMap[typeKey]?.backgroundColor }}
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
                        onClick={() => { setActiveTypes([]); setCurrentPage(0); }}
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
                            label={typesMap?.[type]?.translations?.[lang] || type}
                            onDelete={() => handleTypeToggle(type)}
                            sx={{
                                bgcolor: typesMap?.[type]?.backgroundColor,
                                color: 'white',
                                fontWeight: 'medium'
                            }}
                        />
                    ))}
                </Box>
            )}

            {/* Disclaimer */}
            <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
                <strong>Note :</strong> {t.search.disclaimerOthers}
            </Alert>

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
            ) : displayedPokemons.length === 0 ? (
                <EmptyResults query={query} />
            ) : (
                <>
                    <PokemonGrid>
                        {displayedPokemons.map((p) => (
                            <PokemonCard
                                key={p.id}
                                id={p.id}
                                name={p.names?.[lang] || p.names?.["en"] || p.names?.["en"] || String(p.id)}
                                image={p.image}
                                types={p.types}
                                typesMap={typesMap ?? undefined}
                                lang={lang}
                                href={`/others/${p.id}`} // Same note on href
                                onClick={() => {
                                    try {
                                        if (typeof window !== "undefined") {
                                            const state = {
                                                query,
                                                activeTypes,
                                                currentPage,
                                                scrollY: window.scrollY || window.pageYOffset || 0,
                                            };
                                            window.sessionStorage.setItem(OTHERS_STATE_KEY, JSON.stringify(state));
                                        }
                                    } catch { }
                                }}
                            />
                        ))}
                    </PokemonGrid>

                    <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </Box>
                </>
            )}
        </Container>
    );
}
