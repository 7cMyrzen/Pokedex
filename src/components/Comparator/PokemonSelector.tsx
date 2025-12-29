"use client";

import { useState, useEffect, useRef } from "react";
import { getAllPokemonList } from "@/lib/pokeapi";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

interface PokemonSelectorProps {
    onSelect: (id: number) => void;
    label?: string;
    className?: string;
}

export function PokemonSelector({ onSelect, label, className }: PokemonSelectorProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [allPokemons, setAllPokemons] = useState<{ name: string; url: string; id: number }[]>([]);
    const [filtered, setFiltered] = useState<{ name: string; url: string; id: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Fetch all pokemon names on mount
    useEffect(() => {
        setLoading(true);
        getAllPokemonList().then((res) => {
            const mapped = res.map((p) => {
                const parts = p.url.split("/");
                const id = parseInt(parts[parts.length - 2]);
                return { ...p, id };
            });
            setAllPokemons(mapped);
            setLoading(false);
        });
    }, []);

    // Filter logic
    useEffect(() => {
        if (!searchTerm) {
            setFiltered([]);
            return;
        }
        const term = searchTerm.toLowerCase();
        // Simple limit to 10 results for performance
        const results = allPokemons
            .filter(p => p.name.includes(term) || String(p.id).includes(term))
            .slice(0, 10);
        setFiltered(results);
    }, [searchTerm, allPokemons]);

    // Outside click handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("relative w-full", className)} ref={wrapperRef}>
            {label && <label className="block text-sm font-medium mb-2 text-foreground/80">{label}</label>}
            <input
                type="text"
                placeholder="Chercher un Pokémon..."
                value={searchTerm}
                onFocus={() => setIsOpen(true)}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                }}
                className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
            />

            {isOpen && searchTerm && (
                <div className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-border/30 bg-background/95 backdrop-blur-md shadow-xl p-1">
                    {loading ? (
                        <div className="p-3 text-center text-xs text-muted-foreground">Chargement...</div>
                    ) : filtered.length === 0 ? (
                        <div className="p-3 text-center text-xs text-muted-foreground">Aucun résultat</div>
                    ) : (
                        <ul>
                            {filtered.map((p) => (
                                <li key={p.id}>
                                    <button
                                        onClick={() => {
                                            onSelect(p.id);
                                            setSearchTerm(p.name);
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between"
                                    >
                                        <span className="capitalize">{p.name}</span>
                                        <span className="text-xs text-muted-foreground">#{p.id}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
