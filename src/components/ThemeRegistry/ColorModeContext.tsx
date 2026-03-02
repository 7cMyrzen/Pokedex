'use client';

import * as React from 'react';
import { PaletteMode } from '@mui/material';

export const ColorModeContext = React.createContext({
    toggleColorMode: () => { },
    mode: 'light' as PaletteMode,
});

export const useColorMode = () => React.useContext(ColorModeContext);
