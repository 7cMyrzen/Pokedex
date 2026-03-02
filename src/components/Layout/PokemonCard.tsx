"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import type { TypesMap } from "@/lib/api";
import { FavoriteButton } from "../Favorites/FavoriteButton";
import { Box, Typography, Card, CardActionArea, CardContent, alpha } from "@mui/material";

interface PokemonCardProps {
    id: number;
    name: string;
    image: string;
    types: string[];
    typesMap?: TypesMap;
    lang?: string;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export function PokemonCard({ id, name, image, types, typesMap, lang, href, onClick, className }: PokemonCardProps) {
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

    const InnerContent = () => (
        <>
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                <Box
                    sx={(theme) => ({
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.common.white, 0.05)}, transparent 40%), radial-gradient(circle at 70% 80%, ${alpha(theme.palette.common.black, 0.06)}, transparent 40%)`
                    })}
                />
                <Box
                    component={motion.div}
                    layoutId={`pokemon-image-${id}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    sx={{
                        height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2
                    }}
                >
                    <Image
                        src={image}
                        alt={name}
                        width={256}
                        height={256}
                        style={{ objectFit: 'contain', width: '80%', height: '80%' }}
                        className="drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </Box>
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <FavoriteButton id={id} />
                </Box>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap color="text.primary">
                    {name}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {types.map((t) => {
                        const label = typesMap?.[t]?.translations?.[lang ?? ""] || typesMap?.[t]?.translations?.["en"] || t;
                        const bgColor = typesMap?.[t]?.backgroundColor;
                        return (
                            <Box
                                component={motion.span}
                                key={t}
                                whileHover={{ scale: 1.1, filter: "brightness(1.1)" }}
                                whileTap={{ scale: 0.95 }}
                                sx={{
                                    display: 'inline-flex', alignItems: 'center', borderRadius: '9999px',
                                    px: 1, py: 0.5, fontSize: '0.75rem', fontWeight: 'medium',
                                    bgcolor: bgColor || 'background.paper',
                                    color: 'text.primary',
                                    border: 1,
                                    borderColor: 'divider'
                                }}
                            >
                                {label}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </>
    );

    const LoadingContent = () => (
        <>
            <Box sx={{ width: '100%', aspectRatio: '1/1', bgcolor: 'action.hover', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ height: 20, width: '50%', bgcolor: 'action.hover', borderRadius: 1 }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ height: 24, width: 64, bgcolor: 'action.hover', borderRadius: 12 }} />
                </Box>
            </Box>
        </>
    );

    const wrapperSx = {
        position: 'relative', height: '100%', width: '100%', overflow: 'hidden',
        borderRadius: 4,
        border: 1, borderColor: 'divider',
        bgcolor: 'background.paper', // Slightly transparent in source but card usually opaque
        // In source it was bg-background/60. 
        backgroundColor: (theme: any) => alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(10px)',
        transition: 'all 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
    };

    if (href) {
        return (
            <Box ref={cardRef} sx={wrapperSx} className={className}>
                <Link href={href} onClick={onClick} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                    {isVisible ? <InnerContent /> : <LoadingContent />}
                </Link>
            </Box>
        );
    }

    return (
        <Box ref={cardRef} sx={wrapperSx} className={className}>
            <Box component="button" onClick={onClick} sx={{ width: '100%', textAlign: 'left', border: 0, bgcolor: 'transparent', p: 0, cursor: 'pointer' }}>
                {isVisible ? <InnerContent /> : <LoadingContent />}
            </Box>
        </Box>
    );
}
