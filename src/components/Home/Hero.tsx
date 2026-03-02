"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Typography, Container, Grid, useTheme } from "@mui/material";

function HomeHero() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const visualRef = useRef<HTMLDivElement | null>(null);
    const t = useTranslation();
    const theme = useTheme();

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

            if (sectionRef.current) tl.from(sectionRef.current, { opacity: 0, y: 24, duration: 0.6 });

            const textElements = textRef.current?.querySelectorAll("h1, p, .cta, .stack") || [];
            if (textElements.length > 0) {
                tl.from(textElements, { opacity: 0, x: "-120%", stagger: 0.08, duration: 0.9 }, "<0.1");
            }

            if (visualRef.current) tl.from(visualRef.current, { opacity: 0, x: "120%", duration: 0.9 }, "<0.05");

            const rotEl = visualRef.current?.querySelector("[data-rot]");
            if (rotEl) {
                tl.to(rotEl, { rotate: 360, repeat: -1, ease: "none", duration: 20 }, ">");
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <Box
            component="section"
            ref={sectionRef}
            sx={{
                width: '100%',
                minHeight: 'calc(100vh - 4rem)',
                display: 'flex',
                alignItems: 'center',
                overflow: 'visible',
                py: { xs: 8, lg: 12 }
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6, alignItems: 'center' }}>
                    <Box>
                        <Box ref={textRef} sx={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {/* CTA Tag */}
                            <Box className="cta" sx={{
                                display: 'inline-flex', alignItems: 'center', borderRadius: '9999px',
                                border: 1, borderColor: 'divider', px: 2, py: 1,
                                fontSize: '0.875rem', fontWeight: 500, color: 'text.primary',
                                bgcolor: 'background.paper', // Added explicit background
                                boxShadow: 1, alignSelf: 'flex-start'
                            }}>
                                {t.home.hero.cta}
                            </Box>

                            {/* Title */}
                            <Typography component="h1" variant="h2" fontWeight="bold" sx={{ lineHeight: 1.1 }}>
                                <Box component="span" className="gradient-text" sx={{ display: 'block', mb: 1 }}>
                                    {t.home.hero.title}
                                </Box>
                            </Typography>

                            {/* Description */}
                            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', whiteSpace: 'pre-line' }}>
                                {t.home.hero.description}
                            </Typography>

                            {/* Buttons */}
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, pt: 2 }}>
                                <Link href="/gen1" style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant="default" // Using our adapter
                                        size="lg"
                                        sx={{
                                            bgcolor: 'primary.main',
                                            backgroundImage: 'linear-gradient(135deg, #EE1515, #ff4d4d)',
                                            color: 'white',
                                            px: 4, py: 3, fontWeight: 'bold'
                                        }}
                                    >
                                        {t.home.features.gen1.title}
                                        {/* Icon arrow? */}
                                    </Button>
                                </Link>
                                <Link href="/others" style={{ textDecoration: 'none' }}>
                                    <Button variant="outline" size="lg" sx={{ px: 4, py: 3 }}>
                                        {t.home.features.others.title}
                                    </Button>
                                </Link>
                            </Box>

                            {/* Tags */}
                            <Box className="stack" sx={{ pt: 2 }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {t.home.hero.featuresTitle}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    {t.home.hero.tags.map((feat: string) => (
                                        <Box key={feat} sx={{
                                            display: 'inline-flex', alignItems: 'center', borderRadius: '9999px',
                                            px: 2, py: 1, fontSize: '0.875rem', fontWeight: 500,
                                            border: 1, borderColor: 'divider', boxShadow: 1,
                                            bgcolor: 'background.paper', // Added explicit background
                                            color: 'text.primary', // Added explicit color
                                            '&:hover': { bgcolor: 'action.hover' }
                                        }}>
                                            {feat}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Box ref={visualRef} sx={{ position: 'relative', zIndex: 10 }}>
                            <Box sx={{ position: 'relative', mx: 'auto', width: '100%', maxWidth: 450, aspectRatio: '1/1' }}>
                                {/* Background shape */}
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: 3, bgcolor: 'background.paper', opacity: 0.5, zIndex: -10 }} />

                                <Box sx={{
                                    position: 'relative', height: '100%', width: '100%', overflow: 'hidden',
                                    borderRadius: 3, border: 1, borderColor: 'divider', boxShadow: 6,
                                    bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Image
                                        src="/logo.png"
                                        alt="Pokédex logo"
                                        width={512}
                                        height={512}
                                        priority
                                        style={{ objectFit: 'contain', width: '75%', height: '75%' }}
                                    />
                                    {/* Update badge */}
                                    <Box sx={{
                                        position: 'absolute', bottom: 32,
                                        display: 'inline-flex', alignItems: 'center', borderRadius: '9999px',
                                        px: 2, py: 1, fontSize: '0.875rem', fontWeight: 500,
                                        border: 1, borderColor: 'divider', boxShadow: 1, bgcolor: 'background.paper',
                                        color: 'text.primary'
                                    }}>
                                        <Box sx={{ position: 'relative', display: 'flex', height: 8, width: 8, mr: 1 }}>
                                            <Box sx={{
                                                animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                                                position: 'absolute', height: '100%', width: '100%', borderRadius: '50%',
                                                bgcolor: 'success.main', opacity: 0.75
                                            }} />
                                            <Box sx={{ position: 'relative', borderRadius: '50%', height: 8, width: 8, bgcolor: 'success.main', color: 'text.primary' }} />
                                        </Box>
                                        {t.home.hero.updatedData}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default HomeHero;
