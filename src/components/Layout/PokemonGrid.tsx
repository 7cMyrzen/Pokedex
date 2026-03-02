import { Box } from "@mui/material";
import { ReactNode } from "react";

interface PokemonGridProps {
    className?: string;
    children: ReactNode;
}

export function PokemonGrid({ className, children }: PokemonGridProps) {
    return (
        <Box
            sx={{
                display: 'grid',
                width: '100%',
                gap: { xs: 1, sm: 2 },
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                    xl: 'repeat(5, 1fr)',
                },
            }}
            className={className}
        >
            {children}
        </Box>
    );
}
