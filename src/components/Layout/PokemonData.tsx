"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Pokemon, TypesMap } from "@/lib/api";

interface PokemonDataProps {
    pokemon: Pokemon;
    lang: string;
    typesMap?: TypesMap;
    className?: string;
    backHref?: string;
}

export function PokemonData({ pokemon, lang, typesMap, className, backHref }: PokemonDataProps) {
    const displayName = pokemon.names?.[lang] || pokemon.names?.["en"] || String(pokemon.id);

    return (
        <section
            className={cn(
                "rounded-3xl border border-border/30 bg-background/60 shadow-sm overflow-hidden",
                "p-4 sm:p-6 lg:p-8",
                className
            )}
        >

            <div className="mb-4 sm:mb-6">
                <Link
                    href={backHref || "/gen1"}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
                        "border border-border/30 bg-background/50 text-sm text-foreground/80",
                        "hover:text-foreground hover:bg-background/70",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    )}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="text-foreground/80"
                    >
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Retour</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                <div className="relative">
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(0,0%,100%,0.05),transparent_40%),radial-gradient(circle_at_70%_80%,hsl(0,0%,0%,0.06),transparent_40%)]" />
                        <div className="flex h-full w-full items-center justify-center p-6">
                            <Image
                                src={pokemon.image}
                                alt={displayName}
                                width={384}
                                height={384}
                                className="object-contain w-4/5 h-4/5 sm:w-5/6 sm:h-5/6 drop-shadow-sm"
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-baseline justify-between gap-4">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground truncate">{displayName}</h1>
                        <span className="text-muted-foreground">#{pokemon.id}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {pokemon.types.map((t) => (
                            <span
                                key={t}
                                className={cn(
                                    "inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-medium",
                                    "border border-border/30 text-foreground/90 bg-background/50"
                                )}
                                style={typesMap?.[t]?.backgroundColor ? { backgroundColor: typesMap[t].backgroundColor } : undefined}
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                        <div className="rounded-2xl border border-border/30 bg-background/50 p-4 text-center">
                            <div className="text-xs text-muted-foreground">Taille</div>
                            <div className="mt-1 text-lg font-semibold text-foreground">
                                {pokemon.height / 10} m
                                <span className="text-sm text-muted-foreground ml-1">({pokemon.height * 10} cm)</span>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-border/30 bg-background/50 p-4 text-center">
                            <div className="text-xs text-muted-foreground">Poids</div>
                            <div className="mt-1 text-lg font-semibold text-foreground">
                                {pokemon.weight / 10} kg
                                <span className="text-sm text-muted-foreground ml-1">({pokemon.weight * 100} g)</span>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-border/30 bg-background/50 p-4 text-center">
                            <div className="text-xs text-muted-foreground">Mouvements</div>
                            <div className="mt-1 text-lg font-semibold text-foreground">{pokemon.moves.length}</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-sm font-semibold text-foreground/90">Liste des mouvements</h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {pokemon.moves.map((m) => (
                                <span
                                    key={m}
                                    className="inline-flex items-center rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium border border-border/30 bg-background/50 text-foreground/90"
                                >
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
