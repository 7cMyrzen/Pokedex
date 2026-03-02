"use client";

import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Typography } from "@mui/material";

interface EmptyResultsProps {
    query?: string;
    className?: string;
}

export function EmptyResults({ query, className }: EmptyResultsProps) {
    const t = useTranslation();

    return (
        <Box
            className={className}
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                p: 5, borderRadius: 4, border: 1, borderColor: 'divider', bgcolor: 'background.paper', boxShadow: 1
            }}
        >
            <Box sx={{ position: 'relative', mb: 2, height: 96, width: 96 }}>
                <Box sx={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: 2, borderColor: 'error.main', opacity: 0.5,
                    animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }} />
                <Box sx={{ position: 'absolute', inset: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        src="/logo.png"
                        alt="Pokédex"
                        width={48}
                        height={48}
                        style={{ objectFit: 'contain', width: 48, height: 48 }}
                    />
                </Box>
            </Box>
            <Typography variant="h6" fontWeight="semibold" gutterBottom>{t.search.noResultsTitle}</Typography>
            <Typography variant="body2" color="text.secondary">
                {query ? (
                    <>{t.search.noResultsQuery} « {query} ».</>
                ) : (
                    <>{t.search.noResultsGeneric}</>
                )}
            </Typography>
        </Box>
    );
}
