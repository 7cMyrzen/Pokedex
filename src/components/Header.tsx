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

const LANG_STORAGE_KEY = "pokedex_lang";

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
        <div className={className}>
            <select
                className="w-full rounded-md border border-border/60 bg-background/80 text-foreground px-4 py-2 text-xs sm:text-sm font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {SUPPORTED_LANGS.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function Header() {
    const navItems = [
        {
            name: "Accueil",
            link: "/",
        },
        {
            name: "Génération 1",
            link: "/gen1",
        },
        {
            name: "Autres",
            link: "/others",
        },
        {
            name: "Favoris",
            link: "/favorites",
        },
        {
            name: "Comparateur",
            link: "/comparator",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lang, setLang] = useState<string>("fr");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
        if (stored) {
            setLang(stored);
        } else {
            window.localStorage.setItem(LANG_STORAGE_KEY, "fr");
            setLang("fr");
        }
    }, []);

    const handleLangChange = (value: string) => {
        setLang(value);
        if (typeof window !== "undefined") {
            window.localStorage.setItem(LANG_STORAGE_KEY, value);
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
                    <div className="relative z-[70] flex items-center gap-3">
                        <NavbarButton variant="gradient" href="https://github.com/7cMyrzen/Pokedex">GitHub</NavbarButton>
                        <LanguageSelect value={lang} onChange={handleLangChange} />
                    </div>
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
                                className="relative text-neutral-900 hover:text-neutral-950 dark:text-neutral-300 text-lg font-medium transition-colors duration-200"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <LanguageSelect
                            value={lang}
                            onChange={handleLangChange}
                            className="mt-4"
                        />
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="gradient"
                                className="w-full"
                                href="https://github.com/7cMyrzen"
                            >
                                GitHub
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}