# 🦅 Pokédex Ultimate

![Version](https://img.shields.io/badge/version-2.0.0-blue) ![Next.js](https://img.shields.io/badge/Next.js-15+-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![License](https://img.shields.io/badge/License-MIT-green)

Une application web **moderne**, **rapide** et **internationale** pour explorer le monde des Pokémon. Conçue avec les dernières technologies web pour offrir une expérience utilisateur fluide et haut de gamme.

## ✨ Fonctionnalités Uniques

### 🌍 Internationalisation (i18n) Native
Support complet et instantané de **6 langues** :
*   🇫🇷 Français
*   🇺🇸 English
*   🇩🇪 Deutsch
*   🇪🇸 Español
*   🇮🇹 Italiano
*   🇯🇵 日本語 (Japonais)

### 🚀 Double Mode d'Exploration
1.  **Génération 1 (Optimisée)** : Accès ultra-rapide aux 151 premiers Pokémon avec filtrage instantané (Nom, ID, Type).
2.  **Pokédex Global (API)** : Exploration infinie de **toutes les générations** via l'intégration PokéAPI v2.

### ⚔️ Outils Avancés
*   **Comparateur Radar** : Visualisez et comparez les statistiques de base de deux Pokémon sur un graphique en toile d'araignée dynamique.
*   **Mon Équipe (Favoris)** : Construisez votre équipe idéale. Vos favoris sont sauvegardés localement et persistent entre les sessions.
*   **Détails Complets** : Évolutions interactives, liste de capacités, statistiques détaillées, taille, poids et descriptions localisées.

### 🎨 Expérience Utilisateur (UX)
*   **Animations Fluides** : Transitions inter-pages et micro-interactions powered by *Framer Motion*.
*   **Design Responsive** : Interface adaptative du mobile au desktop, avec sidebar rétractable et mode sombre/clair en développement.
*   **Navigation Intelligente** : Mémorisation de la position de scroll et des filtres actifs.

## 🛠️ Architecture Technique

Ce projet respecte les standards de développement modernes et l'architecture "Clean Code".

*   **Piliers** :
    *   [Next.js 15+](https://nextjs.org/) (App Router, Server Components)
    *   [TypeScript](https://www.typescriptlang.org/) (Typage strict, Interfaces API robustes)
    *   [Tailwind CSS](https://tailwindcss.com/) (Système de design, Dark Mode support)
*   **UI & Graphiques** :
    *   [Framer Motion](https://www.framer.com/motion/) (Animations complexes)
    *   [Recharts](https://recharts.org/) (Data visualization)
    *   [Lucide React](https://lucide.dev/) (Icônes vectorielles)
*   **Données** :
    *   [PokéAPI](https://pokeapi.co/) (REST API)
    *   Custom Hooks (`useGen1Pokemon`, `useOthersPokemon`) pour la logique métier.
    *   Système de Dictionnaire Type-Safe pour l'i18n (sans librairie lourde).

## 📂 Structure du Projet

```bash
src/
├── app/                  # Routes (App Router)
│   ├── gen1/             # Page Génération 1
│   ├── others/           # Page Recherche Globale
│   ├── comparator/       # Page Comparateur
│   └── favorites/        # Page Favoris
├── components/           # Bibliothèque de composants (Atomic Design)
│   ├── Layout/           # PokemonCard, Header, Footer
│   ├── Details/          # EvolutionChain, MoveBadge...
│   ├── Comparator/       # RadarChart, PokemonSelector...
│   └── ui/               # Composants génériques
├── hooks/                # Logique métier réutilisable
│   ├── useTranslation.ts # Hook i18n
│   ├── useLanguage.ts    # Gestion état de langue
│   └── ...
└── lib/                  # Cœur fonctionnel
    ├── api.ts            # Client API & Interfaces
    ├── dictionaries.ts   # Traductions (JSON-like)
    └── search.ts         # Moteur de recherche multilingue
```

## 🚀 Démarrage Rapide

### Prérequis
*   Node.js 18+
*   npm ou yarn

### Installation

1.  **Cloner le dépôt**
    ```bash
    git clone https://github.com/7cMyrzen/Pokedex.git
    cd Pokedex
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Configurer l'environnement**
    Créez un fichier `.env.local` à la racine :
    ```env
    NEXT_PUBLIC_POKEMONS_API=https://pokedex-jgabriele.vercel.app/pokemons.json
    NEXT_PUBLIC_TYPES_API=https://pokedex-jgabriele.vercel.app/types.json
    NEXT_PUBLIC_POKEMON_API=https://pokeapi.co/api/v2/pokemon/
    ```

4.  **Lancer le serveur de développement**
    ```bash
    npm run dev
    ```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.


**Auteur** : [7cMyrzen](https://github.com/7cMyrzen)