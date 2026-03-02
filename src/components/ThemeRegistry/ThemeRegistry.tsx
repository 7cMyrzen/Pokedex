'use client';

import * as React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { ColorModeContext } from './ColorModeContext';
// import theme from './theme'; // We will recreate theme dynamically

// Copying themeOptions generator from theme.ts or importing it? 
// Better to export a function from theme.ts
import { getThemeOptions } from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    // Add effect to read from localStorage on mount (client-side only)
    React.useEffect(() => {
        const storedMode = localStorage.getItem('theme-mode');
        if (storedMode === 'light' || storedMode === 'dark') {
            setMode(storedMode);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setMode('dark');
        }
    }, []);

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('theme-mode', newMode);
                    return newMode;
                });
            },
            mode,
        }),
        [mode],
    );

    const theme = React.useMemo(() => createTheme(getThemeOptions(mode)), [mode]);

    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </NextAppDirEmotionCacheProvider>
    );
}
