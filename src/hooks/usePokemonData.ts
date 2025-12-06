import { useState, useEffect } from 'react';
import { getPokemons, getTypes } from '@/lib/api';
import type { TypesMap } from '@/lib/api';

export function usePokemonData() {
    const [pokemons, setPokemons] = useState<Awaited<ReturnType<typeof getPokemons>> | null>(null);
    const [typesMap, setTypesMap] = useState<TypesMap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [pokemonData, typesData] = await Promise.all([
                    getPokemons(),
                    getTypes(),
                ]);

                setPokemons(pokemonData);

                setTypesMap(typesData);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load Pokémon data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { pokemons, typesMap, loading, error };
}
