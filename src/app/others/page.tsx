"use client";

import { useOthersPokemon, OTHERS_STATE_KEY } from "@/hooks/useOthersPokemon";
import { useLanguage } from "@/hooks/useLanguage";
import { PokemonGrid } from "@/components/Layout/PokemonGrid";
import { PokemonCard } from "@/components/Layout/PokemonCard";
import { EmptyResults } from "@/components/Layout/EmptyResults";
import { Modal } from "@/components/Layout/Modal";
import { Pagination } from "@/components/ui/pagination";
import { useState, useRef } from "react";

export default function OthersPage() {
    const lang = useLanguage();
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
    } = useOthersPokemon(lang);

    const [typesOpen, setTypesOpen] = useState<boolean>(false);
    const typesRef = useRef<HTMLDivElement | null>(null);

    // Navigation Handlers
    const handlePageChange = (p: number) => {
        setCurrentPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSearch = (val: string) => {
        setQuery(val);
        setCurrentPage(0);
    };

    const handleTypeToggle = (t: string) => {
        setActiveTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
        setCurrentPage(0);
    };

    return (
        <main className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-12">
            {/* Search Input */}
            <div className="mb-6 flex items-center">
                <label htmlFor="others-search" className="sr-only">Rechercher</label>
                <input
                    id="others-search"
                    type="search"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Rechercher par nom (anglais) ou ID..."
                    className="w-full rounded-2xl border border-border/30 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shadow-sm"
                />
            </div>

            {/* Filters */}
            {typesMap && (
                <div className="mb-6 flex items-center gap-3">
                    <div className="relative" ref={typesRef}>
                        <button
                            type="button"
                            onClick={() => setTypesOpen(true)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-border/30 bg-background/60 px-4 py-2 text-sm text-foreground shadow-sm hover:bg-background/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        >
                            Filtrer par types {activeTypes.length > 0 && `(${activeTypes.length})`}
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                        </button>
                        <Modal open={typesOpen} onClose={() => setTypesOpen(false)} title="Filtrer par types" contentClassName="max-h-[85vh] sm:max-h-[75vh]">
                            <div className="p-1">
                                {Object.keys(typesMap).map((t) => {
                                    const label = typesMap[t]?.translations?.[lang] || typesMap[t]?.translations?.["en"] || t;
                                    const checked = activeTypes.includes(t);
                                    return (
                                        <label key={t} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-muted/30 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => handleTypeToggle(t)}
                                                className="h-4 w-4 rounded border-border/40 bg-background"
                                            />
                                            <span className="inline-flex items-center gap-2 text-sm text-foreground/90">
                                                <span
                                                    className="inline-block h-3 w-3 rounded-full border border-border/30"
                                                    style={typesMap[t]?.backgroundColor ? { backgroundColor: typesMap[t]!.backgroundColor } : undefined}
                                                />
                                                {label}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </Modal>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setActiveTypes([]); setCurrentPage(0); }}
                        disabled={activeTypes.length === 0}
                        className="inline-flex items-center gap-2 rounded-2xl border border-border/30 bg-background/60 px-4 py-2 text-sm text-foreground shadow-sm hover:bg-background/70 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                        Supprimer les filtres
                    </button>
                </div>
            )}

            {/* Disclaimer */}
            <div className="mb-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-600 dark:text-blue-400">
                <p>
                    <strong>Note :</strong> La recherche fonctionne actuellement avec les noms anglais ou les numéros, car les données proviennent de la base mondiale PokéAPI. Les noms français sont chargés à l'affichage.
                </p>
            </div>

            {error && (
                <p className="mb-4 text-sm text-red-500">
                    {error}
                </p>
            )}

            {loading ? (
                <PokemonGrid>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="rounded-3xl border border-border/30 bg-background/60 shadow-sm overflow-hidden">
                            <div className="aspect-square w-full bg-muted/40 animate-pulse" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 w-1/2 bg-muted/50 rounded animate-pulse" />
                                <div className="flex gap-2">
                                    <span className="h-6 w-16 bg-muted/40 rounded-full animate-pulse" />
                                    <span className="h-6 w-14 bg-muted/40 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>
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
                                name={p.names?.[lang] || p.names?.["en"] || p.names?.["en"] || String(p.id)}
                                image={p.image}
                                types={p.types}
                                typesMap={typesMap ?? undefined}
                                lang={lang}
                                href={`/others/${p.id}`}
                                onClick={() => {
                                    // Manually save state to sessionStorage before navigation to ensure scroll position is captured
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

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </main>
    );
}
