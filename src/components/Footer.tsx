"use client";

import Link from "next/link";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { ThemeChanger } from "./ui/theme-changer";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Container, Grid, Typography, Divider, IconButton } from "@mui/material";

const Footer = () => {
    const t = useTranslation();

    return (
        <Box component="footer" sx={{ width: '100%', bgcolor: 'background.default', borderTop: 1, borderColor: 'divider' }}>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 4, mb: 4 }}>
                    {/* Column 1: About */}
                    <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 1' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary' }}>Pokédex</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t.footer.description}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Column 2: Navigation */}
                    <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 1' } }}>
                        <Typography variant="subtitle2" fontWeight="medium" gutterBottom sx={{ color: 'text.primary' }}>{t.footer.navigation}</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <li><Link href="/" passHref style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'text.primary' } }}>{t.nav.home}</Typography></Link></li>
                            <li><Link href="/gen1" passHref style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'text.primary' } }}>{t.nav.gen1}</Typography></Link></li>
                            <li><Link href="/others" passHref style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'text.primary' } }}>{t.nav.others}</Typography></Link></li>
                            <li><Link href="/favorites" passHref style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'text.primary' } }}>{t.nav.favorites}</Typography></Link></li>
                            <li><Link href="/comparator" passHref style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'text.primary' } }}>{t.nav.comparator}</Typography></Link></li>
                        </Box>
                    </Box>

                    {/* Column 3: Code */}
                    <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 1' } }}>
                        <Typography variant="subtitle2" fontWeight="medium" gutterBottom sx={{ color: 'text.primary' }}>{t.footer.appCode}</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <li><Link href="https://github.com/7cMyrzen/Pokedex" passHref style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'text.primary' } }}>{t.footer.repo}</Typography></Link></li>
                        </Box>
                    </Box>

                    {/* Column 4: Social */}
                    <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 1' } }}>
                        <Typography variant="subtitle2" fontWeight="medium" gutterBottom sx={{ color: 'text.primary' }}>{t.footer.followMe}</Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <IconButton component={Link} href="https://github.com/7cMyrzen" target="_blank" rel="noopener noreferrer" aria-label="GitHub" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                                <FaGithub size={20} />
                            </IconButton>
                            <IconButton component={Link} href="https://linkedin.com/in/frédéric-sturm-992848313" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" sx={{ color: 'text.secondary', '&:hover': { color: '#0A66C2' } }}>
                                <FaLinkedin size={20} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <ThemeChanger />
                    </Box>
                    <Typography variant="caption" color="text.secondary" align="center">
                        &copy; {new Date().getFullYear()} Sturm Frédéric. {t.footer.rights}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
