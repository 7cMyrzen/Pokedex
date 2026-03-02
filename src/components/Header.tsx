"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import { Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";

const SUPPORTED_LANGS = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "es", label: "Español" },
    { code: "it", label: "Italiano" },
    { code: "ja", label: "日本語" },
];

function LanguageSelect({ value, onChange, className }: { value: string; onChange: (value: string) => void; className?: string }) {
    return (
        <Box className={className}>
            <Select
                value={value}
                onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                    height: 36,
                    fontSize: '0.875rem',
                    bgcolor: 'background.paper',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'divider'
                    }
                }}
            >
                {SUPPORTED_LANGS.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                        {lang.label}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}

export function Header() {
    const t = useTranslation();

    const navItems = [
        { name: t.nav.home, link: "/" },
        { name: t.nav.gen1, link: "/gen1" },
        { name: t.nav.others, link: "/others" },
        { name: t.nav.favorites, link: "/favorites" },
        { name: t.nav.comparator, link: "/comparator" },
        { name: "test", link: "/tester" },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const currentLang = useLanguage();

    const handleLangChange = (value: string) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("pokedex_lang", value);
            window.dispatchEvent(new CustomEvent("pokedex-lang-changed", { detail: value }));
        }
    };

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <Box sx={{ position: 'relative', zIndex: 70, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <NavbarButton variant="gradient" href="https://github.com/7cMyrzen/Pokedex">GitHub</NavbarButton>
                        <LanguageSelect value={currentLang} onChange={handleLangChange} />
                    </Box>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{ display: 'block', fontSize: '1.125rem', fontWeight: 500, color: 'inherit', textDecoration: 'none' }}
                            >
                                <span>{item.name}</span>
                            </a>
                        ))}
                        <LanguageSelect
                            value={currentLang}
                            onChange={handleLangChange}
                            className="mt-4"
                        />
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="gradient"
                                className="w-full"
                                href="https://github.com/7cMyrzen"
                            >
                                GitHub
                            </NavbarButton>
                        </Box>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}
