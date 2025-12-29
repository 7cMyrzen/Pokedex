# 🦅 Pokédex Moderne

Une application Pokédex haute performance développée avec **Next.js 16**, **TypeScript**, **Tailwind CSS** et **Framer Motion**.
Ce projet offre une interface fluide et réactive pour explorer à la fois les Pokémon de la **Première Génération** (via API statique) et l'ensemble du **Pokédex National** (via PokéAPI).

![Status](https://img.shields.io/badge/Status-Stable-success) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Fonctionnalités Clés

- 🎨 **UX/UI Moderne** : Interface soignée, animations **Framer Motion** (Hero Transitions, Stagger Effects) et design responsive.
- ⚡ **Performance** : Architecture optimisée avec Next.js App Router (SSR/CSR).
- 🔍 **Double Mode de Recherche** :
  - **Gen 1** : Recherche instantanée et filtrage par type sur un jeu de données statique optimisé.
  - **Global (API)** : Exploration paginée de tous les Pokémon avec recherche et filtres dynamiques.
- ❤️ **Mon Équipe (Favoris)** : Système de favoris persistant (LocalStorage) pour constituer votre équipe de rêve.
- ⚖️ **Comparateur de Stats** : Outil interactif avec graphique Radar pour comparer les performances de deux Pokémon.
- 🧬 **Chaîne d'Évolution** : Visualisation complète et navigable des évolutions.
- 🌍 **Internationalisation** : Support multi-langue avec persistance des préférences.
- 💾 **Persistance d'État** : Sauvegarde intelligente de la position de scroll et des filtres lors de la navigation.
- 🏗️ **Architecture Clean** : Logique métier encapsulée dans des Custom Hooks pour une maintenabilité maximale.

## 🛠️ Stack Technique

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript (Strict Mode)
- **Styles** : Tailwind CSS
- **Animations** : Framer Motion, GSAP
- **Graphiques** : Recharts
- **Icônes** : Lucide React
- **API** : PokéAPI v2 & API Statique Personnalisée

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/7cMyrzen/Pokedex.git
cd Pokedex
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

```env
# API Statique pour la Génération 1
NEXT_PUBLIC_POKEMONS_API = https://pokedex-jgabriele.vercel.app/pokemons.json
NEXT_PUBLIC_TYPES_API = https://pokedex-jgabriele.vercel.app/types.json

# API Officielle pour le Pokédex Global (facultatif, valeur par défaut ci-dessous)
NEXT_PUBLIC_POKEAPI_URL = https://pokeapi.co/api/v2
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## 📂 Structure du Projet

```bash
src/
├── app/                  # Routes et Pages (App Router)
│   ├── gen1/             # Module Génération 1
│   ├── others/           # Module Pokédex Global (PokéAPI)
│   ├── favorites/        # Module Favoris (Mon Équipe)
│   ├── comparator/       # Module Comparateur
│   └── layout.tsx        # Layout racine
├── components/           # Bibliothèque de composants UI
│   ├── Layout/           # Cartes, Grid, Modales...
│   ├── Comparator/       # Composants spécifiques au comparateur
│   ├── Details/          # Composants détails (Evolution...)
│   ├── Favorites/        # Composants favoris (Bouton...)
│   └── ui/               # Ui kits
├── context/              # Contextes React (FavoritesContext...)
├── hooks/                # Logique métier (Custom Hooks)
│   ├── useGen1Pokemon.ts # Logique Gen 1 + Filtres
│   ├── useOthersPokemon.ts # Logique API + Pagination
│   └── useLanguage.ts    # Gestion globale de la langue
├── lib/                  # Utilitaires et Clients API
│   ├── api.ts            # Client API Statique + Types
│   └── pokeapi.ts        # Client PokéAPI
└── public/               # Assets statiques
```

## 👤 Auteur

**7cMyrzen** - [@7cMyrzen](https://github.com/7cMyrzen)

---
*Développé dans le cadre du cursus Ynov Web Avance.*
