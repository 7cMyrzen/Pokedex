"use client";

import { useState, useEffect } from "react";
import { getAllPokemonList } from "@/lib/pokeapi";
import { matchesSearch } from "@/lib/search";
import { useTranslation } from "@/hooks/useTranslation";
import { Autocomplete, TextField, CircularProgress, Typography, Box } from "@mui/material";

interface PokemonSelectorProps {
    onSelect: (id: number) => void;
    label?: string;
    className?: string;
}

interface PokemonOption {
    name: string;
    url: string;
    id: number;
}

export function PokemonSelector({ onSelect, label, className }: PokemonSelectorProps) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<PokemonOption[]>([]);
    const [loading, setLoading] = useState(false);
    const t = useTranslation();

    useEffect(() => {
        let active = true;

        if (options.length === 0) {
            setLoading(true);
            getAllPokemonList().then((res) => {
                if (active) {
                    const mapped = res.map((p) => {
                        const parts = p.url.split("/");
                        const id = parseInt(parts[parts.length - 2]);
                        return { ...p, id };
                    });
                    setOptions(mapped);
                    setLoading(false);
                }
            });
        }

        return () => {
            active = false;
        };
    }, []);

    return (
        <Box className={className}>
            {label && <Typography variant="body2" fontWeight="medium" sx={{ mb: 1, color: 'text.secondary' }}>{label}</Typography>}
            <Autocomplete
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                options={options}
                loading={loading}
                getOptionLabel={(option) => option.name}
                filterOptions={(options, { inputValue }) => {
                    const term = inputValue.toLowerCase();
                    return options.filter(p => matchesSearch(p.id, term, p.name)).slice(0, 10);
                }}
                onChange={(_, value) => {
                    if (value) onSelect(value.id);
                }}
                renderOption={(props, option) => {
                    const { key, ...otherProps } = props;
                    return (
                        <li key={key} {...otherProps}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', textTransform: 'capitalize' }}>
                                <span>{option.name}</span>
                                <Typography variant="caption" color="text.secondary">#{option.id}</Typography>
                            </Box>
                        </li>
                    )
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={t.comparator.placeholder}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                            sx: { borderRadius: 3 }
                        }}
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </Box>
    );
}
