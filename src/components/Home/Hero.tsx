"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function HomeHero() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const visualRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                defaults: { ease: "power3.out" },
            });

            tl.from(sectionRef.current, { opacity: 0, y: 24, duration: 0.6 });

            tl.from(
                textRef.current?.querySelectorAll("h1, p, .cta, .stack") || [],
                {
                    opacity: 0,
                    x: "-120%",
                    stagger: 0.08,
                    duration: 0.9,
                },
                "<0.1"
            );

            tl.from(
                visualRef.current,
                { opacity: 0, x: "120%", duration: 0.9 },
                "<0.05"
            );

            const rotEl = visualRef.current?.querySelector("[data-rot]");
            if (rotEl) {
                tl.to(rotEl, { rotate: 360, repeat: -1, ease: "none", duration: 20 }, ">"
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full min-h-[calc(100vh-4rem)] flex items-center overflow-visible">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div ref={textRef} className="relative z-10 space-y-8">
                        <div className="inline-flex items-center rounded-full border border-border/40 px-4 py-2 text-sm font-medium text-foreground shadow-sm cta">
                            Pokédex – Découvrez, comparez et explorez les Pokémon
                        </div>

                        <h1 className="font-epoch text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                            <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground animate-gradient">
                                Attrapez-les tous avec votre Pokédex
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                            Parcourez la liste complète des Pokémon, filtrez par type et accédez aux fiches détaillées.
                            <span className="block mt-2">Un guide rapide et moderne pour les dresseurs.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href="/gen1"
                                className="bg-accent-gradient px-8 py-6 text-base font-semibold rounded-lg text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 flex items-center justify-center"
                            >
                                Première génération
                                <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Button asChild variant="outline" size="lg" className="group relative overflow-hidden border-2 px-8 py-6 text-base font-semibold transition-all duration-300 hover:bg-transparent hover:text-primary">
                                <Link href="/others" className="relative z-10 flex items-center">
                                    <span>Autres générations</span>
                                    <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </Button>
                        </div>

                        <div className="pt-8 stack">
                            <p className="text-sm text-muted-foreground mb-3">FONCTIONNALITÉS</p>
                            <div className="flex flex-wrap items-center gap-4">
                                {["Liste complète", "Recherche", "Filtres par type", "Détails", "Performant"].map((feat) => (
                                    <span key={feat} className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-foreground/90 border border-border/30 shadow-sm hover:bg-background/50 transition-colors duration-200">
                                        {feat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div ref={visualRef} className="relative z-10">
                        <div className="relative mx-auto aspect-square w-full max-w-md">
                            <div className="absolute inset-0 rounded-3xl bg-background/50 -z-10"></div>
                            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/30 shadow-xl bg-background">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 gap-6">
                                    <Image
                                        src="/logo.png"
                                        alt="Pokédex logo"
                                        width={512}
                                        height={512}
                                        priority
                                        className="object-contain w-3/4 h-3/4"
                                    />
                                    <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-foreground/90 border border-border/30 shadow-sm">
                                        <span className="relative flex h-2 w-2 mr-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Données à jour
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeHero;

