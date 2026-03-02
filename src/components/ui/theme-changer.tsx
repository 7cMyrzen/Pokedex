"use client"

import * as React from "react"
import { useTheme } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from "@/components/ThemeRegistry/ColorModeContext";

export function ThemeChanger() {
    const theme = useTheme();
    const colorMode = useColorMode();

    return (
        <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            title={`Current theme: ${theme.palette.mode}. Click to toggle.`}
            sx={{ color: 'text.secondary' }}
        >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    )
}
