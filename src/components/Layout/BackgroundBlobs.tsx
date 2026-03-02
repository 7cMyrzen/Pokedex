"use client";

import { Box } from "@mui/material";

export function BackgroundBlobs() {
    return (
        <Box sx={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {/* Red Blob */}
            <Box className="animate-blob animation-delay-2000" sx={{
                position: 'absolute', top: '33%', left: '25%', width: '30rem', height: '30rem',
                borderRadius: '9999px',
                background: 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.2), rgba(225, 29, 72, 0.2))', // red-500/20 to rose-600/20
                filter: 'blur(64px)',
                mixBlendMode: 'multiply',
                opacity: (theme) => theme.palette.mode === 'dark' ? 0.7 : 0.9,
            }} />
            {/* Rose Blob */}
            <Box className="animate-blob animation-delay-4000" sx={{
                position: 'absolute', bottom: '-80px', right: '-80px', width: '30rem', height: '30rem',
                borderRadius: '9999px',
                background: 'linear-gradient(to bottom right, rgba(225, 29, 72, 0.2), rgba(185, 28, 28, 0.2))', // rose-600/20 to red-700/20
                filter: 'blur(64px)',
                mixBlendMode: 'multiply',
                opacity: (theme) => theme.palette.mode === 'dark' ? 0.7 : 0.9,
            }} />
            {/* Red-Rose Blob */}
            <Box className="animate-blob" sx={{
                position: 'absolute', top: '66%', left: '66%', width: '30rem', height: '30rem',
                borderRadius: '9999px',
                background: 'linear-gradient(to bottom right, rgba(220, 38, 38, 0.2), rgba(190, 18, 60, 0.2))', // red-600/20 to rose-700/20
                filter: 'blur(64px)',
                mixBlendMode: 'multiply',
                opacity: (theme) => theme.palette.mode === 'dark' ? 0.7 : 0.9,
            }} />
        </Box>
    );
}
