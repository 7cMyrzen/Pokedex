"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/hooks/useTranslation";

gsap.registerPlugin(ScrollTrigger);

export function Details() {
    const t = useTranslation();
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
                            {t.home.details.gen1.title}
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                {t.home.details.gen1.p1}
                            </p>
                            <p>
                                {t.home.details.gen1.p2}
                            </p>
                            <p>
                                {t.home.details.gen1.p3}
                            </p>
                        </div>
                        <Link
                            href="/gen1"
                            className="inline-block mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                            {t.home.details.gen1.cta}
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
                            {t.home.details.api.title}
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                {t.home.details.api.p1}
                            </p>
                            <p>
                                {t.home.details.api.p2}
                            </p>
                            <p>
                                {t.home.details.api.p3}
                            </p>
                        </div>
                        <Link
                            href="/others"
                            className="inline-block mt-6 px-6 py-2 border border-border rounded-md hover:bg-accent/50 transition-colors"
                        >
                            {t.home.details.api.cta}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
