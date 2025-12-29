"use client";

import Link from "next/link";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { ThemeChanger } from "./ui/theme-changer";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Application Footer.
 * Displays site links, social media contacts, and copyright information.
 * Fully localized manually using t.footer keys.
 */
const Footer = () => {
    const t = useTranslation();

    return (
        <footer className="w-full bg-background/50 border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Grille principale */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Colonne 1 : À propos */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Pokédex</h3>
                        <p className="text-sm text-muted-foreground">
                            {t.footer.description}
                        </p>
                    </div>

                    {/* Colonne 2 : Navigation */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">{t.footer.navigation}</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.home}</Link></li>
                                <li><Link href="/gen1" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.gen1}</Link></li>
                                <li><Link href="/others" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.others}</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Colonne 3 : Code */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">{t.footer.appCode}</h4>
                            <ul className="space-y-2">
                                <li><Link href="https://github.com/7cMyrzen/Pokedex" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.repo}</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Colonne 4 : Contact et Réseaux */}
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">{t.footer.followMe}</h4>
                        <div className="flex space-x-4">
                            <Link
                                href="https://github.com/7cMyrzen"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="GitHub"
                            >
                                <FaGithub size={20} />
                            </Link>
                            <Link
                                href="https://linkedin.com/in/frédéric-sturm-992848313"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Ligne de séparation */}
                <div className="border-t border-border/30 my-8"></div>

                {/* Bas du footer */}
                <div className="flex flex-col items-center space-y-4 w-full">
                    <div className="w-full flex justify-center">
                        <ThemeChanger />
                    </div>
                    <p className="text-xs text-muted-foreground text-center w-full">
                        &copy; {new Date().getFullYear()} Sturm Frédéric. {t.footer.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
