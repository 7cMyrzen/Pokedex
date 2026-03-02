import { Pokemon } from '@/types';

export function filterPokemons(
    pokemons: Pokemon[],
    query: string,
    activeTypes: string[]
): Pokemon[] {
    if (!pokemons) return [];

    return pokemons.filter((pokemon) => {
        // Filter by search query
        const matchesSearch = pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
            pokemon.id.toString().includes(query);

        // Filter by types
        const matchesTypes = activeTypes.length === 0 ||
            activeTypes.every(type =>
                pokemon.types.some(t => t.type.name === type)
            );

        return matchesSearch && matchesTypes;
    });
}
