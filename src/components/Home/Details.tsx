"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Container, Typography, Button, Grid, Divider } from "@mui/material";

export function Details() {
    const t = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

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
        <Box component="section" sx={{ py: 8 }}>
            <Container maxWidth="lg" ref={containerRef}>
                {/* Section 1 */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 6, mb: 8, alignItems: 'center' }}>
                    <Box>
                        <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: 300, borderRadius: 3, overflow: 'hidden' }}>
                            <Image
                                src="/gen1.jpg"
                                alt="Pokémon de la première génération"
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'text.primary' }}>{t.home.details.gen1.title}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: 'text.secondary' }}>
                            <Typography>{t.home.details.gen1.p1}</Typography>
                            <Typography>{t.home.details.gen1.p2}</Typography>
                            <Typography>{t.home.details.gen1.p3}</Typography>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Link href="/gen1" passHref>
                                <Button variant="contained" color="primary" disableElevation>
                                    {t.home.details.gen1.cta}
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 6 }} />

                {/* Section 2 */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 6, alignItems: 'center' }}>
                    <Box>
                        <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: 300, borderRadius: 3, overflow: 'hidden' }}>
                            <Image
                                src="/other.jpg"
                                alt="Pokémon de toutes les générations"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'text.primary' }}>{t.home.details.api.title}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: 'text.secondary' }}>
                            <Typography>{t.home.details.api.p1}</Typography>
                            <Typography>{t.home.details.api.p2}</Typography>
                            <Typography>{t.home.details.api.p3}</Typography>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Link href="/others" passHref>
                                <Button variant="outlined" color="primary">
                                    {t.home.details.api.cta}
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
