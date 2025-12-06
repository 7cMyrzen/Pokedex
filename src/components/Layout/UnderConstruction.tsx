"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UnderConstructionProps {
    title: string;
    description: string;
    ctaText?: string;
    ctaHref?: string;
}

export function UnderConstruction({
    title,
    description,
    ctaText = "Retour à l'accueil",
    ctaHref = "/"
}: UnderConstructionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animation d'entrée de la section
            gsap.from(sectionRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out"
            });

            // Animation du contenu
            const elements = contentRef.current?.querySelectorAll("h1, p, a") || [];
            if (elements.length > 0) {
                gsap.from(elements, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            }

            // Animation de l'icône
            gsap.to(".construction-icon", {
                y: -5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-[70vh] flex items-center justify-center py-12 md:py-24"
        >
            <div ref={contentRef} className="container px-4 md:px-6 text-center">
                <div className="construction-icon mb-8 text-6xl">🚧</div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {description}
                </p>
                {ctaHref && (
                    <Link
                        href={ctaHref}
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                    >
                        {ctaText}
                    </Link>
                )}
            </div>
        </section>
    );
}
