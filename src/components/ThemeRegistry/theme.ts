'use client';

import { ThemeOptions } from '@mui/material/styles';

// Based on source globals.css variables
export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
    typography: {
        fontFamily: 'var(--font-geist-sans), sans-serif',
    },
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Light Mode
                primary: {
                    main: '#EE1515', // Accent color
                },
                secondary: {
                    main: '#404040', // Original "primary" from tailwind config (dark gray)
                },
                background: {
                    default: '#f4f4f5', // zinc-100 approx
                    paper: '#ffffff',
                },
            }
            : {
                // Dark Mode
                primary: {
                    main: '#EE1515', // Accent color (brighter? 0 85% 60%)
                    // hsl(0, 85%, 60%) -> #F53636
                },
                secondary: {
                    main: '#FAFAFA', // Whiteish
                },
                background: {
                    default: '#0d0d0d',
                    paper: '#171717', // Slightly lighter dark
                },
            }),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '0.5rem', // rounded-lg
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '1rem', // rounded-xl mostly
                }
            }
        }
    },
});

/* Default export for initial load if needed, but strict mode usage suggests function */
// const theme = createTheme(getThemeOptions('light'));
// export default theme;
