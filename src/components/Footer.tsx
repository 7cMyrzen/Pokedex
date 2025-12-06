"use client";

import Link from "next/link";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { ThemeChanger } from "./ui/theme-changer";

const Footer = () => {
    return (
        <footer className="w-full bg-background/50 border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Grille principale */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Colonne 1 : À propos */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Pokédex</h3>
                        <p className="text-sm text-muted-foreground">
                            Site web de Pokédex contenant des informations sur les Pokémon. Trouvez votre Pokémon favori et découvrez ses détails.
                        </p>
                    </div>

                    {/* Colonne 2 : Navigation */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Navigation</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accueil</Link></li>
                                <li><Link href="/gen1" className="text-sm text-muted-foreground hover:text-foreground transition-colors">1ère Génération</Link></li>
                                <li><Link href="/others" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Autres</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Colonne 3 : Code */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Code de l'application</h4>
                            <ul className="space-y-2">
                                <li><Link href="https://github.com/7cMyrzen/Pokedex" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Repository GitHub</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Colonne 4 : Contact et Réseaux */}
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Me suivre</h4>
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
                        &copy; {new Date().getFullYear()} Sturm Frédéric. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
