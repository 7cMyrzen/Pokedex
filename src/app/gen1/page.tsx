"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useGen1Pokemon, GEN1_STATE_KEY } from "@/hooks/useGen1Pokemon";
import { PokemonGrid } from "@/components/Layout/PokemonGrid";
import { PokemonCard } from "@/components/Layout/PokemonCard";
import { EmptyResults } from "@/components/Layout/EmptyResults";
import { Modal } from "@/components/Layout/Modal";

export default function Pokedex() {
    const lang = useLanguage();
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
    const typesRef = useRef<HTMLDivElement | null>(null);

    return (
        <main className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-12">
            {/* Search Input */}
            <div className="mb-6 flex items-center">
                <label htmlFor="gen1-search" className="sr-only">Rechercher</label>
                <input
                    id="gen1-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher par nom, type ou ID..."
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
                                {Object.keys(typesMap ?? {}).map((t) => {
                                    const label = typesMap?.[t]?.translations?.[lang ?? ""] || typesMap?.[t]?.translations?.["en"] || t;
                                    const checked = activeTypes.includes(t);
                                    return (
                                        <label key={t} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-muted/30 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={(e) => {
                                                    setActiveTypes((prev) => e.target.checked ? [...prev, t] : prev.filter((x) => x !== t));
                                                }}
                                                className="h-4 w-4 rounded border-border/40 bg-background"
                                            />
                                            <span className="inline-flex items-center gap-2 text-sm text-foreground/90">
                                                <span
                                                    className="inline-block h-3 w-3 rounded-full border border-border/30"
                                                    style={typesMap?.[t]?.backgroundColor ? { backgroundColor: typesMap[t]!.backgroundColor } : undefined}
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
                        onClick={() => setActiveTypes([])}
                        disabled={activeTypes.length === 0}
                        className="inline-flex items-center gap-2 rounded-2xl border border-border/30 bg-background/60 px-4 py-2 text-sm text-foreground shadow-sm hover:bg-background/70 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                        Supprimer les filtres
                    </button>
                </div>
            )}

            {error && (
                <p className="mb-4 text-sm text-red-500">
                    {error}
                </p>
            )}

            {loading ? (
                <PokemonGrid>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-3xl border border-border/30 bg-background/60 shadow-sm overflow-hidden"
                        >
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
            ) : filteredPokemons.length === 0 ? (
                <EmptyResults query={query} />
            ) : (
                <PokemonGrid>
                    {filteredPokemons.map((p) => (
                        <PokemonCard
                            key={p.id}
                            name={p.names?.[lang] || p.names?.["en"] || String(p.id)}
                            image={p.image}
                            types={p.types}
                            typesMap={typesMap ?? undefined}
                            lang={lang}
                            onClick={() => {
                                // Save state before navigation
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
        </main>
    );
}
