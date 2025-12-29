"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
    id: number;
    className?: string;
}

export function FavoriteButton({ id, className }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const active = isFavorite(id);

    return (
        <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(id);
            }}
            className={cn(
                "relative z-20 p-2 rounded-full transition-colors",
                active ? "bg-red-500 text-white" : "bg-white/50 text-neutral-400 hover:bg-white/80 hover:text-red-500",
                "backdrop-blur-sm border border-border/10",
                className
            )}
            aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={active ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        </motion.button>
    );
}
