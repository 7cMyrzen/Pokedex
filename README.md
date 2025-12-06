Un Pokédex moderne développé avec Next.js, TypeScript et Tailwind CSS, offrant une expérience utilisateur fluide pour explorer les Pokémon de la première génération.

## Fonctionnalités

- 🎨 **Interface moderne et réactive**
- 🔍 **Recherche avancée** par nom numéro
- 🌍 **Support multilingue** (français, anglais, etc.)
- 📱 **Design responsive** pour tous les appareils
- ⚡ **Performances optimisées** avec Next.js
- 🎭 **Thème sombre/clair** (selon les préférences système)

## Prérequis

- Node.js 18 ou supérieur
- npm ou yarn
- Un navigateur web moderne

## Installation

1. **Cloner le dépôt**

   ```

   git clone https://github.com/7cMyrzen/Pokedex.git

   cd Pokedex

   ```
2. **Installer les dépendances**

   ```

   npm install

   ```

   ou

   ```

   yarn install

   ```
3. **Configuration de l'environnement**

   Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

   ```

   NEXT_PUBLIC_POKEMONS_API = https://pokedex-jgabriele.vercel.app/pokemons.json

   NEXT_PUBLIC_TYPES_API = https://pokedex-jgabriele.vercel.app/types.json 

   ```
4. **Démarrer le serveur de développement**

   ```

   npm run dev

   ```

   ou

   ```

   yarn dev

   ```
5. **Ouvrez votre navigateur** à l'adresse [http://localhost:3000](http://localhost:3000)

## Structure du projet

```

src/

├── app/                    # Pages de l'application

│   ├── gen1/               # Page de la première génération

│   ├── other/              # Page PokéAPI complète (en développement)

│   └── not-found.tsx       # Page 404 personnalisée

├── components/             # Composants réutilisables

│   ├── Home/               # Composants de la page d'accueil

│   ├── Layout/             # Composants de mise en page

│   └── ui/                 # Composants d'interface utilisateur

├── hooks/                  # Hooks personnalisés

├── lib/                    # Utilitaires et configurations

└── public/                 # Fichiers statiques

```

## Technologies utilisées

- **Framework** : Next.js 16 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Animations** : GSAP

## Déploiement

Le projet peut être déployé sur Vercel, Netlify ou tout autre hébergeur supportant Next.js.

[![Déployer avec Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F7cMyrzen%2FPokedex)

## Auteur

👤 **7cMyrzen** - [@7cMyrzen](https://github.com/7cMyrzen)
