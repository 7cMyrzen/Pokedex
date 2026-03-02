"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { IconButton, alpha, useTheme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface FavoriteButtonProps {
    id: number;
    className?: string; // Kept for compatibility but might not be used heavily
}

export function FavoriteButton({ id, className }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const t = useTranslation();
    const active = isFavorite(id);
    const theme = useTheme();

    return (
        <IconButton
            component={motion.button}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(id);
            }}
            aria-label={active ? t.favorites.remove : t.favorites.add}
            sx={{
                position: 'relative',
                zIndex: 20,
                p: 1,
                bgcolor: active
                    ? 'error.main'
                    : alpha(theme.palette.background.paper, 0.5),
                color: active ? 'white' : 'text.secondary',
                backdropFilter: 'blur(4px)',
                border: 1,
                borderColor: 'divider',
                '&:hover': {
                    bgcolor: active ? 'error.dark' : alpha(theme.palette.background.paper, 0.8),
                    color: active ? 'white' : 'error.main'
                }
            }}
            className={className}
        >
            {active ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
    );
}
