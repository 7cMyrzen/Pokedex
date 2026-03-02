"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Scale } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Container, Typography, Grid } from "@mui/material";

export function FeaturesBlock() {
    const t = useTranslation();

    const features = [
        {
            title: t.nav.favorites,
            description: t.home.features.favorites.desc,
            icon: Heart,
            href: "/favorites",
            color: "linear-gradient(135deg, #ef4444 0%, #e11d48 100%)", // red-500 to rose-600
            delay: 0.1
        },
        {
            title: t.nav.comparator,
            description: t.home.features.comparator.desc,
            icon: Scale,
            href: "/comparator",
            color: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)", // blue-500 to indigo-600
            delay: 0.2
        }
    ];

    return (
        <Box component="section" sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'text.primary' }}>{t.home.features.title}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                        {t.home.features.subtitle}
                    </Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                    {features.map((feature, index) => (
                        <Box key={index}>
                            <Link href={feature.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                                <Box
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: feature.delay } as any}
                                    whileHover={{ y: -5 }}
                                    sx={{
                                        position: 'relative', height: '100%', overflow: 'hidden',
                                        borderRadius: 4, border: 1, borderColor: 'divider',
                                        bgcolor: 'background.paper', p: 4,
                                        transition: 'background-color 0.2s',
                                        '&:hover': { bgcolor: 'action.hover' }
                                    }}
                                >
                                    {/* Icon */}
                                    <Box sx={{
                                        mb: 3, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        width: 48, height: 48, borderRadius: 3,
                                        background: feature.color, color: 'white', boxShadow: 3
                                    }}>
                                        <feature.icon size={24} />
                                    </Box>

                                    <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        {feature.description}
                                    </Typography>

                                    <Box sx={{ display: 'inline-flex', alignItems: 'center', fontWeight: 600, color: 'primary.main', fontSize: '0.875rem' }}>
                                        {t.common.explore} <Box component="span" sx={{ ml: 1 }}>→</Box>
                                    </Box>
                                </Box>
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
