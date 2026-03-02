"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Typography, Button, Container } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotFound() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (sectionRef.current) {
                gsap.from(sectionRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: "power3.out"
                });
            }

            const elements = contentRef.current?.querySelectorAll("h1, h2, p, a") || [];
            if (elements.length > 0) {
                gsap.from(elements, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power3.out",
                });
            }

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
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
            }}
        >
            <Box ref={sectionRef} sx={{ width: '100%', maxWidth: 900, mx: 'auto', textAlign: 'center', py: 10 }}>
                <Box ref={contentRef} sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '6rem', md: '12rem' },
                                fontWeight: 'bold',
                                background: 'linear-gradient(to right, #ef4444, #dc2626)',
                                backgroundClip: 'text',
                                textFillColor: 'transparent',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <span className="number-404">4</span>
                            <span className="number-404" style={{ animationDelay: '0.2s' }}>0</span>
                            <span className="number-404" style={{ animationDelay: '0.4s' }}>4</span>
                        </Typography>
                    </Box>

                    <Typography variant="h3" fontWeight="bold" sx={{ color: '#ef4444' }}>
                        Oups ! Page introuvable
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                        Désolé, la page que vous recherchez semble avoir pris des vacances.
                        Elle est peut-être en pause café ou a décidé de faire une petite sieste.
                    </Typography>

                    <Box sx={{ pt: 4 }}>
                        <Link href="/" passHref style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    borderRadius: '9999px',
                                    px: 4, py: 1.5, fontSize: '1.1rem',
                                    background: 'linear-gradient(to right, #ef4444, #dc2626)',
                                    boxShadow: 4
                                }}
                            >
                                Retour à l'accueil
                            </Button>
                        </Link>
                    </Box>

                    <Typography variant="body2" color="text.disabled" sx={{ pt: 6 }}>
                        Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à me contacter.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
