"use client";

import { useEffect, useRef, useState } from "react";
import { PokemonGrid } from "@/components/Layout/PokemonGrid";
import { PokemonCard } from "@/components/Layout/PokemonCard";
import { getPokemons, getTypes, type TypesMap } from "@/lib/api";
import { EmptyResults } from "@/components/Layout/EmptyResults";
import { Modal } from "@/components/Layout/Modal";

const LANG_STORAGE_KEY = "pokedex_lang";
const GEN1_STATE_KEY = "gen1_search_state";

export default function Pokedex() {
    const [lang, setLang] = useState<string>("fr");
    const [pokemons, setPokemons] = useState<Awaited<ReturnType<typeof getPokemons>> | null>(null);
    const [typesMap, setTypesMap] = useState<TypesMap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>("");
    const [activeTypes, setActiveTypes] = useState<string[]>([]);
    const [typesOpen, setTypesOpen] = useState<boolean>(false);
    const typesRef = useRef<HTMLDivElement | null>(null);
    const restoreScrollRef = useRef<number | null>(null);

    useEffect(() => {
        const stored = typeof window !== "undefined" ? window.localStorage.getItem(LANG_STORAGE_KEY) : null;
        const effectiveLang = stored || "fr";
        setLang(effectiveLang);

        if (typeof window === "undefined") return;

        const handleLangChange = (event: Event) => {
            const custom = event as CustomEvent<string>;
            const newLang = custom.detail || (window.localStorage.getItem(LANG_STORAGE_KEY) || "fr");
            setLang(newLang);
        };

        window.addEventListener("pokedex-lang-changed", handleLangChange as EventListener);

        return () => {
            window.removeEventListener("pokedex-lang-changed", handleLangChange as EventListener);
        };
    }, []);

    // Restore search state from sessionStorage (query, types, scroll)
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = window.sessionStorage.getItem(GEN1_STATE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw) as { query?: string; activeTypes?: string[]; scrollY?: number; lang?: string };
            if (parsed.query !== undefined) setQuery(parsed.query);
            if (Array.isArray(parsed.activeTypes)) setActiveTypes(parsed.activeTypes.filter(Boolean));
            if (typeof parsed.scrollY === "number") restoreScrollRef.current = parsed.scrollY;
            // Optionally restore lang if matching available
            if (parsed.lang && parsed.lang !== lang) setLang(parsed.lang);
        } catch { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        getPokemons(lang)
            .then((data) => {
                if (!cancelled) setPokemons(data);
            })
            .catch(() => {
                if (!cancelled) setError("Impossible de charger les pokémons.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [lang]);

    // Outside click handler removed: Modal handles backdrop/escape closing.

    useEffect(() => {
        let cancelled = false;
        setTypesMap(null);
        getTypes(lang)
            .then((map) => {
                if (!cancelled) setTypesMap(map);
            })
            .catch(() => {
            });
        return () => {
            cancelled = true;
        };
    }, [lang]);

    // After data load, restore scroll position once
    useEffect(() => {
        if (!loading && pokemons && restoreScrollRef.current !== null) {
            window.scrollTo({ top: restoreScrollRef.current, behavior: "instant" as ScrollBehavior });
            restoreScrollRef.current = null;
        }
    }, [loading, pokemons]);

    const filteredPokemons = !pokemons
        ? []
        : pokemons.filter((p) => {
            const q = query.trim().toLowerCase();
            const hasQuery = q.length > 0;
            const name = (p.names?.[lang] || p.names?.["en"] || String(p.id)).toLowerCase();
            const byName = hasQuery ? name.includes(q) : false;
            const qNum = q.replace(/^0+/, "");
            const byId = hasQuery ? (qNum === "" ? true : (/^\d+$/.test(qNum) && Number(qNum) === p.id)) : false;
            const byType = hasQuery ? p.types.some((t) => {
                const labelLang = typesMap?.[t]?.translations?.[lang ?? ""];
                const labelEn = typesMap?.[t]?.translations?.["en"];
                const candidates = [labelLang, labelEn, t]
                    .filter(Boolean)
                    .map((s) => String(s).toLowerCase());
                return candidates.some((lab) => lab.includes(q));
            }) : false;
            const byActiveTypes = activeTypes.length > 0 ? activeTypes.every((t) => p.types.includes(t)) : true;
            const matchesQuery = hasQuery ? (byName || byId || byType) : true;
            return matchesQuery && byActiveTypes;
        });

    return (
        <main className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-12">
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

            {loading || !pokemons ? (
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
