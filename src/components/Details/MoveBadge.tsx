"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Chip } from "@mui/material";

const MOVE_CACHE = new Map<string, Record<string, string>>();

interface MoveBadgeProps {
    move: string;
    className?: string; // Kept for compat
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

                const existing = MOVE_CACHE.get(move) || {};
                MOVE_CACHE.set(move, { ...existing, ...map });

                if (!cancelled && map[lang]) {
                    setTranslated(map[lang]);
                }
            } catch (e) {
                // Silently fail
            }
        }

        fetchMove();

        return () => { cancelled = true; };
    }, [move, lang]);

    return (
        <Chip
            label={translated || formatted}
            size="small"
            variant="outlined"
            sx={{
                bgcolor: 'background.paper',
                fontSize: { xs: '0.65rem', sm: '0.75rem' }
            }}
            className={className}
        />
    );
}
