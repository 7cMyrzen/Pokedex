import { useState, useRef, useEffect } from 'react';
import { Modal } from './Layout/Modal';
import { TypeInfo, TypesMap } from '@/types';

interface SearchAndFilterProps {
    query: string;
    setQuery: (query: string) => void;
    activeTypes: string[];
    setActiveTypes: (types: string[]) => void;
    typesMap: TypesMap | null;
}

export function SearchAndFilter({
    query,
    setQuery,
    activeTypes,
    setActiveTypes,
    typesMap,
}: SearchAndFilterProps) {
    const [typesOpen, setTypesOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const toggleType = (typeName: string) => {
        setActiveTypes(
            activeTypes.includes(typeName)
                ? activeTypes.filter((t) => t !== typeName)
                : [...activeTypes, typeName]
        );
    };

    const clearFilters = () => {
        setActiveTypes([]);
        setQuery('');
        searchInputRef.current?.focus();
    };

    return (
        <div className="mb-6 flex w-full flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="relative w-full max-w-md">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Rechercher un Pokémon..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-2xl border border-border/30 bg-background/60 px-5 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground/80"
                        aria-label="Effacer la recherche"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="flex w-full items-center gap-2 sm:w-auto">
                <button
                    type="button"
                    onClick={() => setTypesOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-border/30 bg-background/60 px-4 py-3 text-sm text-foreground shadow-sm hover:bg-background/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                    Filtrer par types {activeTypes.length > 0 && `(${activeTypes.length})`}
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>

                {(query || activeTypes.length > 0) && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="rounded-2xl border border-border/30 bg-background/60 px-4 py-3 text-sm text-foreground/80 hover:bg-background/70 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                        Réinitialiser
                    </button>
                )}
            </div>

            <Modal
                open={typesOpen}
                onClose={() => setTypesOpen(false)}
                title="Filtrer par types"
                contentClassName="max-h-[85vh] sm:max-h-[75vh] w-full max-w-2xl"
            >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {typesMap &&
                        Object.entries(typesMap).map(([typeName, typeData]) => (
                            <button
                                key={typeName}
                                type="button"
                                onClick={() => toggleType(typeName)}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${activeTypes.includes(typeName)
                                        ? 'bg-primary/90 text-primary-foreground'
                                        : 'bg-muted/50 text-foreground hover:bg-muted/70'
                                    }`}
                            >
                                <span className="capitalize">{typeName}</span>
                                <span className="text-xs opacity-80">
                                    {Object.values(typesMap).filter((t) => t.name === typeName).length}
                                </span>
                            </button>
                        ))}
                </div>
            </Modal>
        </div>
    );
}
