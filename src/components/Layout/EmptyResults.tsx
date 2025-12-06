"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface EmptyResultsProps {
    query?: string;
    className?: string;
}

export function EmptyResults({ query, className }: EmptyResultsProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center",
                "rounded-3xl border border-border/30 bg-background/60 shadow-sm p-10",
                className
            )}
        >
            <div className="relative mb-4 h-24 w-24">
                <div className="absolute inset-0 rounded-full animate-pulse border-2 border-red-500/50" />
                <div className="absolute inset-2 flex items-center justify-center">
                    <Image
                        src="/logo.png"
                        alt="Pokédex"
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                    />
                </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Aucun résultat</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                {query ? (
                    <>Aucun Pokémon ne correspond à « {query} ».</>
                ) : (
                    <>Aucun Pokémon à afficher.</>
                )}
            </p>
        </div>
    );
}
