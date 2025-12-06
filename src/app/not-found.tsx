"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NotFound() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Vérifier que nous sommes côté client
        if (typeof window === 'undefined') return;

        // Enregistrer les plugins GSAP
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
            const elements = contentRef.current?.querySelectorAll("h1, p, button") || [];
            if (elements.length > 0) {
                gsap.from(elements, {
                    opacity: 0,
                    y: 30,
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

            // Animation du numéro 404
            gsap.to(".number-404", {
                y: -10,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center text-foreground p-4">
            <section
                ref={sectionRef}
                className="w-full max-w-4xl mx-auto py-20 md:py-32 text-center"
            >
                <div ref={contentRef} className="space-y-8">
                    <div className="relative inline-block">
                        <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            <span className="number-404">4</span>
                            <span className="number-404" style={{ animationDelay: '0.2s' }}>0</span>
                            <span className="number-404" style={{ animationDelay: '0.4s' }}>4</span>
                        </h1>
                        <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full blur-3xl -z-10" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Oups ! Page introuvable
                    </h2>

                    <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
                        Désolé, la page que vous recherchez semble avoir pris des vacances.
                        Elle est peut-être en pause café ou a décidé de faire une petite sieste.
                    </p>

                    <div className="pt-8">
                        <Link
                            href="/"
                            className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 rounded-full group hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                        >
                            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-600 to-red-700"></span>
                            <span className="relative flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Retour à l'accueil
                            </span>
                        </Link>
                    </div>

                    <div className="pt-12">
                        <p className="text-sm text-foreground/60">
                            Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à me contacter.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
