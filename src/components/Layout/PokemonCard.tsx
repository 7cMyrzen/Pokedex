"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { TypesMap } from "@/lib/api";

interface PokemonCardProps {
    name: string;
    image: string;
    types: string[];
    typesMap?: TypesMap;
    lang?: string;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export function PokemonCard({ name, image, types, typesMap, lang, href, onClick, className }: PokemonCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        let didAnimate = false;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !didAnimate) {
                        didAnimate = true;
                        setIsVisible(true);
                        gsap.fromTo(
                            el,
                            { autoAlpha: 0, y: 16 },
                            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }
                        );
                        observer.unobserve(entry.target);
                    }
                });
            },
            { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const innerContent = isVisible ? (
        <>
            <div className="relative aspect-square w-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(0,0%,100%,0.05),transparent_40%),radial-gradient(circle_at_70%_80%,hsl(0,0%,0%,0.06),transparent_40%)]" />
                <div className="flex h-full w-full items-center justify-center p-4 sm:p-6">
                    <Image
                        src={image}
                        alt={name}
                        width={256}
                        height={256}
                        className="object-contain w-4/5 h-4/5 sm:w-5/6 sm:h-5/6 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="p-4 sm:p-5">
                <div className="text-base sm:text-lg font-semibold text-foreground truncate">{name}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {types.map((t) => {
                        const label = typesMap?.[t]?.translations?.[lang ?? ""] || typesMap?.[t]?.translations?.["en"] || t;
                        return (
                            <span
                                key={t}
                                className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] sm:px-3 sm:py-1 sm:text-xs font-medium",
                                    "border border-border/30 text-foreground/90 bg-background/50"
                                )}
                                style={typesMap?.[t]?.backgroundColor ? { backgroundColor: typesMap[t].backgroundColor } : undefined}
                            >
                                {label}
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    ) : (
        <>
            <div className="aspect-square w-full bg-muted/40 animate-pulse" />
            <div className="p-4 sm:p-5 space-y-3">
                <div className="h-4 w-1/2 bg-muted/50 rounded animate-pulse" />
                <div className="flex gap-2">
                    <span className="h-6 w-16 bg-muted/40 rounded-full animate-pulse" />
                    <span className="h-6 w-14 bg-muted/40 rounded-full animate-pulse" />
                </div>
            </div>
        </>
    );

    const content = (
        <div
            ref={cardRef}
            className={cn(
                "group relative h-full w-full overflow-hidden",
                "rounded-3xl border border-border/30 bg-background/60",
                "shadow-sm transition-shadow transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg",
                className
            )}
        >
            {innerContent}
        </div>
    );

    if (href) {
        return (
            <Link href={href} onClick={onClick} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-3xl">
                {content}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className="w-full text-left">
            {content}
        </button>
    );
}
