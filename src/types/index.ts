export interface TypeInfo {
    id: number;
    name: string;
    names: Array<{
        language: {
            name: string;
            url: string;
        };
        name: string;
    }>;
    pokemon: Array<{
        pokemon: {
            name: string;
            url: string;
        };
        slot: number;
    }>;
}

export type TypesMap = Record<string, TypeInfo>;

export interface Pokemon {
    id: number;
    name: string;
    types: Array<{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }>;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    species: {
        name: string;
        url: string;
    };
}
