"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

const MOVE_CACHE = new Map<string, Record<string, string>>();

interface MoveBadgeProps {
    move: string;
    className?: string;
}

export function MoveBadge({ move, className }: MoveBadgeProps) {
    const lang = useLanguage();
    const [translated, setTranslated] = useState<string | null>(null);

    // Initial formatting (remove hyphens, capitalize)
    const formatted = move
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    useEffect(() => {
        // Check cache first
        if (MOVE_CACHE.has(move)) {
            const translations = MOVE_CACHE.get(move)!;
            if (translations[lang]) {
                setTranslated(translations[lang]);
                return;
            }
        }

        let cancelled = false;

        async function fetchMove() {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
                if (!res.ok) throw new Error("Move fetch failed");
                const data = await res.json();

                // Map names
                const map: Record<string, string> = {};
                data.names.forEach((n: any) => {
                    map[n.language.name] = n.name;
                });

                // Update cache
                const existing = MOVE_CACHE.get(move) || {};
                MOVE_CACHE.set(move, { ...existing, ...map });

                if (!cancelled && map[lang]) {
                    setTranslated(map[lang]);
                }
            } catch (e) {
                // Silently fail, keep english/formatted
            }
        }

        fetchMove();

        return () => { cancelled = true; };
    }, [move, lang]);

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium border border-border/30 bg-background/50 text-foreground/90 whitespace-nowrap",
                className
            )}
            title={formatted}
        >
            {translated || formatted}
        </span>
    );
}
