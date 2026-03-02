"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const FAVORITES_KEY = "pokedex_favorites";

interface FavoritesContextType {
    favorites: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = window.localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setFavorites(parsed);
                }
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => {
            if (prev.includes(id)) {
                return prev.filter((fav) => fav !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const isFavorite = (id: number) => favorites.includes(id);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
