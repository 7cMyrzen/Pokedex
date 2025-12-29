"use client";

import { ResponsiveContainer, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import type { Pokemon } from "@/lib/api";

interface RadarChartProps {
    pokemon1: Pokemon;
    pokemon2?: Pokemon | null;
}

export function RadarChart({ pokemon1, pokemon2 }: RadarChartProps) {
    // Transform Pokemon stats into Recharts format
    // Standardize stat names if key doesn't match label, but PokeAPI has: hp, attack, defense, special-attack, special-defense, speed
    // We need to fetch stats. Oh wait, `api.ts` Pokemon interface DOES NOT HAVE STATS yet!
    // I need to update `Pokemon` interface and `getPokemonDetails` to include stats.

    const data = [
        { subject: 'HP', A: pokemon1.stats.hp, B: pokemon2?.stats.hp || 0, fullMark: 255 },
        { subject: 'Attaque', A: pokemon1.stats.attack, B: pokemon2?.stats.attack || 0, fullMark: 255 },
        { subject: 'Défense', A: pokemon1.stats.defense, B: pokemon2?.stats.defense || 0, fullMark: 255 },
        { subject: 'Atq. Spé', A: pokemon1.stats.specialAttack, B: pokemon2?.stats.specialAttack || 0, fullMark: 255 },
        { subject: 'Déf. Spé', A: pokemon1.stats.specialDefense, B: pokemon2?.stats.specialDefense || 0, fullMark: 255 },
        { subject: 'Vitesse', A: pokemon1.stats.speed, B: pokemon2?.stats.speed || 0, fullMark: 255 },
    ];

    return (
        <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsRadar cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 255]} />
                    <Radar
                        name={pokemon1.names["fr"] || pokemon1.names["en"] || "Pokemon 1"}
                        dataKey="A"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.6}
                    />
                    {pokemon2 && (
                        <Radar
                            name={pokemon2.names["fr"] || pokemon2.names["en"] || "Pokemon 2"}
                            dataKey="B"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                        />
                    )}
                    <Legend />
                    <Tooltip />
                </RechartsRadar>
            </ResponsiveContainer>
        </div>
    );
}
