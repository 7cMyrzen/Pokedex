"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Scale } from "lucide-react";

export function FeaturesBlock() {
    const features = [
        {
            title: "Mon Équipe",
            description: "Créez votre équipe de rêve en ajoutant vos Pokémon préférés aux favoris.",
            icon: Heart,
            href: "/favorites",
            color: "from-red-500 to-rose-600",
            delay: 0.1
        },
        {
            title: "Comparateur",
            description: "Comparez les statistiques de deux Pokémon côte à côte avec un graphique radar.",
            icon: Scale,
            href: "/comparator",
            color: "from-blue-500 to-indigo-600",
            delay: 0.2
        }
    ];

    return (
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Fonctionnalités Avancées</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Profitez de nouveaux outils pour analyser et organiser votre collection.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <Link key={index} href={feature.href} className="group relative block h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: feature.delay }}
                            whileHover={{ y: -5 }}
                            className="relative h-full overflow-hidden rounded-3xl border border-border/40 bg-background/40 backdrop-blur-sm p-8 transition-colors hover:bg-background/60"
                        >
                            <div className={`absolute top-0 right-0 p-32 opacity-[0.03] group-hover:opacity-10 transition-opacity bg-gradient-to-br ${feature.color} blur-3xl rounded-full translate-x-12 -translate-y-12`} />

                            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                                <feature.icon size={24} />
                            </div>

                            <h3 className="mb-3 text-2xl font-bold">{feature.title}</h3>
                            <p className="text-muted-foreground mb-6">
                                {feature.description}
                            </p>

                            <span className="inline-flex items-center text-sm font-semibold text-primary">
                                Explorer <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                            </span>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
