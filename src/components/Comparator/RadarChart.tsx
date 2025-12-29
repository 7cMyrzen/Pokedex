"use client";

import { ResponsiveContainer, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import type { Pokemon } from "@/lib/api";

interface RadarChartProps {
    pokemon1: Pokemon;
    pokemon2?: Pokemon | null;
    lang: string;
}

const STATS_TRANSLATIONS: Record<string, Record<string, string>> = {
    hp: { en: "HP", fr: "PV" },
    attack: { en: "Attack", fr: "Attaque" },
    defense: { en: "Defense", fr: "Défense" },
    specialAttack: { en: "Sp. Atk", fr: "Atq. Spé" },
    specialDefense: { en: "Sp. Def", fr: "Déf. Spé" },
    speed: { en: "Speed", fr: "Vitesse" }
};

export function RadarChart({ pokemon1, pokemon2, lang }: RadarChartProps) {
    const t = (key: string) => STATS_TRANSLATIONS[key]?.[lang] || STATS_TRANSLATIONS[key]?.["en"] || key;

    const data = [
        { subject: t("hp"), A: pokemon1.stats.hp, B: pokemon2?.stats.hp || 0, fullMark: 255 },
        { subject: t("attack"), A: pokemon1.stats.attack, B: pokemon2?.stats.attack || 0, fullMark: 255 },
        { subject: t("defense"), A: pokemon1.stats.defense, B: pokemon2?.stats.defense || 0, fullMark: 255 },
        { subject: t("specialAttack"), A: pokemon1.stats.specialAttack, B: pokemon2?.stats.specialAttack || 0, fullMark: 255 },
        { subject: t("specialDefense"), A: pokemon1.stats.specialDefense, B: pokemon2?.stats.specialDefense || 0, fullMark: 255 },
        { subject: t("speed"), A: pokemon1.stats.speed, B: pokemon2?.stats.speed || 0, fullMark: 255 },
    ];

    return (
        <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsRadar cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 255]} />
                    <Radar
                        name={pokemon1.names[lang] || pokemon1.names["en"] || "Pokemon 1"}
                        dataKey="A"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.6}
                    />
                    {pokemon2 && (
                        <Radar
                            name={pokemon2.names[lang] || pokemon2.names["en"] || "Pokemon 2"}
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
