"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Details() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll('h2, p');

        gsap.from(elements, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, []);

    return (
        <section className="py-12 md:py-16">
            <div ref={containerRef} className="px-4 md:px-6 max-w-6xl mx-auto">
                {/* Première section */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                src="/gen1.jpg"
                                alt="Pokémon de la première génération"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            1ère Génération
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Explorez les 151 Pokémon emblématiques de la première génération dans une interface moderne et intuitive.
                            </p>
                            <p>
                                Notre application utilise une API spécialisée qui fournit des données essentielles sur chaque Pokémon, y compris leurs types, statistiques de base, et plus encore.
                            </p>
                            <p>
                                Parfait pour les dresseurs qui souhaitent retrouver rapidement les informations de base sur leurs Pokémon préférés de la première heure.
                            </p>
                        </div>
                        <Link
                            href="/gen1"
                            className="inline-block mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Découvrir
                        </Link>
                    </div>
                </div>

                <div className="h-px bg-border/30 my-12"></div>

                {/* Deuxième section */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                src="/other.jpg"
                                alt="Pokémon de toutes les générations"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            PokéAPI Complète
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Accédez à une base de données complète de tous les Pokémon à travers les générations, avec des informations détaillées sur chaque créature.
                            </p>
                            <p>
                                Grâce à l'API PokéAPI, bénéficiez de données exhaustives incluant les capacités, les évolutions, les faiblesses et bien plus encore.
                            </p>
                            <p>
                                Cette section est actuellement en développement actif et proposera bientôt des fonctionnalités avancées pour les dresseurs les plus exigeants.
                            </p>
                        </div>
                        <Link
                            href="/others"
                            className="inline-block mt-6 px-6 py-2 border border-border rounded-md hover:bg-accent/50 transition-colors"
                        >
                            Voir plus
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
