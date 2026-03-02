/**
 * Centralized store for all application translations.
 * Organizes strings by language code ('fr', 'en', etc.) and by application section (nav, common, pokemon, etc.).
 *
 * Usage:
 * const t = useTranslation();
 * <h1>{t.home.title}</h1>
 */
export const DICTIONARIES = {
    fr: {
        nav: {
            home: "Accueil",
            gen1: "Gen 1",
            others: "PokeAPI",
            comparator: "Comparateur",
            favorites: "Favoris",
        },
        common: {
            back: "Retour",
            loading: "Chargement...",
            error: "Erreur",
            search: "Rechercher",
            filter: "Filtrer",
            filters: "Filtres",
            clearFilters: "Supprimer les filtres",
            viewMore: "Voir plus",
            viewLess: "Voir moins",
            andMore: "PokeAPI",
            explore: "Explorer",
            filterByTypes: "Filtrer par types"
        },
        pokemon: {
            height: "Taille",
            weight: "Poids",
            moves: "Attaques",
            movesList: "Liste des attaques",
            stats: "Statistiques",
            evolution: "Évolution",
            types: "Types",
            loadingEvolution: "Chargement des évolutions..."
        },
        search: {
            placeholder: "Rechercher un Pokémon...",
            placeholderGen1: "Rechercher par nom (FR) ou ID...",
            placeholderOthers: "Rechercher par nom (multi-langue) ou ID...",
            noResults: "Aucun résultat trouvé pour",
            noResultsTitle: "Aucun résultat",
            noResultsQuery: "Aucun Pokémon ne correspond à",
            noResultsGeneric: "Aucun Pokémon à afficher.",
            disclaimerOthers: "La recherche supporte désormais plusieurs langues (Français, Anglais, Allemand, Japonais, etc.) ! 🌍 Vous pouvez chercher un Pokémon par son nom dans n'importe quelle langue ou par son numéro."
        },
        comparator: {
            title: "Comparateur de Pokémon",
            subtitle: "Comparez les statistiques de deux Pokémon",
            selectPokemon: "Sélectionnez un Pokémon",
            placeholder: "Rechercher...",
            stat: "Statistique",
            value: "Valeur",
        },
        favorites: {
            title: "Vos Favoris",
            subtitle: "Retrouvez ici tous vos Pokémon préférés",
            empty: "Vous n'avez pas encore de favoris. Ajoutez-en en cliquant sur le cœur !",
            add: "Ajouter aux favoris",
            remove: "Retirer des favoris"
        },
        home: {
            welcome: "Bienvenue sur le Pokédex",
            subtitle: "Découvrez le monde des Pokémon",
            features: {
                title: "Fonctionnalités Avancées",
                subtitle: "Profitez de nouveaux outils pour analyser et organiser votre collection.",
                gen1: {
                    title: "Génération 1",
                    desc: "Explorez les 151 premiers Pokémon de Kanto avec des descriptions détaillées."
                },
                others: {
                    title: "Tous les Pokémon",
                    desc: "Accédez à la base de données mondiale de tous les Pokémon existants."
                },
                comparator: {
                    title: "Comparateur",
                    desc: "Comparez les statistiques de vos Pokémon préférés côte à côte."
                },
                favorites: {
                    title: "Favoris",
                    desc: "Sauvegardez vos Pokémon préférés pour les retrouver facilement."
                }
            },
            hero: {
                cta: "Pokédex – Découvrez, comparez et explorez les Pokémon",
                title: "Attrapez-les tous avec votre Pokédex",
                description: "Parcourez la liste complète des Pokémon, filtrez par type et accédez aux fiches détaillées. Un guide rapide et moderne pour les dresseurs.",
                featuresTitle: "FONCTIONNALITÉS",
                updatedData: "Données à jour",
                tags: ["Liste complète", "Recherche", "Filtres par type", "Détails", "Performant"]
            },
            details: {
                gen1: {
                    title: "1ère Génération",
                    p1: "Explorez les 151 Pokémon emblématiques de la première génération dans une interface moderne et intuitive.",
                    p2: "Notre application utilise une API spécialisée qui fournit des données essentielles sur chaque Pokémon, y compris leurs types, statistiques de base, et plus encore.",
                    p3: "Parfait pour les dresseurs qui souhaitent retrouver rapidement les informations de base sur leurs Pokémon préférés de la première heure.",
                    cta: "Découvrir"
                },
                api: {
                    title: "PokéAPI Complète",
                    p1: "Accédez à une base de données complète de tous les Pokémon à travers les générations, avec des informations détaillées sur chaque créature.",
                    p2: "Grâce à l'API PokéAPI, bénéficiez de données exhaustives incluant les capacités, les évolutions, les faiblesses et bien plus encore.",
                    p3: "Cette section est actuellement en développement actif et proposera bientôt des fonctionnalités avancées pour les dresseurs les plus exigeants.",
                    cta: "Voir plus"
                }
            }
        },
        footer: {
            description: "Site web de Pokédex contenant des informations sur les Pokémon. Trouvez votre Pokémon favori et découvrez ses détails.",
            navigation: "Navigation",
            appCode: "Code de l'application",
            repo: "Repository GitHub",
            followMe: "Me suivre",
            rights: "Tous droits réservés."
        }
    },
    en: {
        nav: {
            home: "Home",
            gen1: "Gen 1",
            others: "Others",
            comparator: "Comparator",
            favorites: "Favorites",
        },
        common: {
            back: "Back",
            loading: "Loading...",
            error: "Error",
            search: "Search",
            filter: "Filter",
            filters: "Filters",
            clearFilters: "Clear filters",
            viewMore: "View more",
            viewLess: "View less",
            andMore: "others",
            explore: "Explore",
            filterByTypes: "Filter by types"
        },
        pokemon: {
            height: "Height",
            weight: "Weight",
            moves: "Moves",
            movesList: "Moves List",
            stats: "Stats",
            evolution: "Evolution",
            types: "Types",
            loadingEvolution: "Loading evolutions..."
        },
        search: {
            placeholder: "Search for a Pokemon...",
            placeholderGen1: "Search by name or ID...",
            placeholderOthers: "Search by name (multi-lang) or ID...",
            noResults: "No results found for",
            noResultsTitle: "No results",
            noResultsQuery: "No Pokemon matches",
            noResultsGeneric: "No Pokemon to display.",
            disclaimerOthers: "Search now supports multiple languages (French, English, German, Japanese, etc.)! 🌍 You can search for a Pokemon by its name in any language or by its ID."
        },
        comparator: {
            title: "Pokemon Comparator",
            subtitle: "Compare stats of two Pokemon",
            selectPokemon: "Select a Pokemon",
            placeholder: "Search...",
            stat: "Stat",
            value: "Value",
        },
        favorites: {
            title: "Your Favorites",
            subtitle: "Find all your favorite Pokemon here",
            empty: "You don't have any favorites yet. Add some by clicking the heart!",
            add: "Add to favorites",
            remove: "Remove from favorites"
        },
        home: {
            welcome: "Welcome to the Pokedex",
            subtitle: "Discover the world of Pokemon",
            features: {
                title: "Advanced Features",
                subtitle: "Enjoy new tools to analyze and organize your collection.",
                gen1: {
                    title: "Generation 1",
                    desc: "Explore the first 151 Kanto Pokemon with detailed descriptions."
                },
                others: {
                    title: "All Pokemon",
                    desc: "Access the global database of all existing Pokemon."
                },
                comparator: {
                    title: "Comparator",
                    desc: "Compare stats of your favorite Pokemon side by side."
                },
                favorites: {
                    title: "Favorites",
                    desc: "Save your favorite Pokemon to find them easily."
                }
            },
            hero: {
                cta: "Pokedex – Discover, compare and explore Pokemon",
                title: "Catch them all with your Pokedex",
                description: "Browse the complete Pokemon list, filter by type and access detailed data. A fast and modern guide for trainers.",
                featuresTitle: "FEATURES",
                updatedData: "Data updated",
                tags: ["Complete list", "Search", "Type filters", "Details", "Performant"]
            },
            details: {
                gen1: {
                    title: "Generation 1",
                    p1: "Explore the 151 iconic Pokemon of the first generation in a modern and intuitive interface.",
                    p2: "Our application uses a specialized API that provides essential data on each Pokemon, including their types, base stats, and more.",
                    p3: "Perfect for trainers who want to quickly find basic information on their favorite Pokemon from the early days.",
                    cta: "Discover"
                },
                api: {
                    title: "Complete PokéAPI",
                    p1: "Access a complete database of all Pokemon across generations, with detailed information on each creature.",
                    p2: "Thanks to PokéAPI, benefit from exhaustive data including moves, evolutions, weaknesses and much more.",
                    p3: "This section is currently under active development and will soon offer advanced features for the most demanding trainers.",
                    cta: "View more"
                }
            }
        },
        footer: {
            description: "Pokedex website containing information about Pokemon. Find your favorite Pokemon and discover its details.",
            navigation: "Navigation",
            appCode: "Application Code",
            repo: "GitHub Repository",
            followMe: "Follow me",
            rights: "All rights reserved."
        }
    },
    de: {
        nav: {
            home: "Startseite",
            gen1: "Gen 1",
            others: "Andere",
            comparator: "Vergleich",
            favorites: "Favoriten",
        },
        common: {
            back: "Zurück",
            loading: "Laden...",
            error: "Fehler",
            search: "Suchen",
            filter: "Filtern",
            filters: "Filter",
            clearFilters: "Filter löschen",
            viewMore: "Mehr sehen",
            viewLess: "Weniger sehen",
            andMore: "andere",
            explore: "Erkunden",
            filterByTypes: "Nach Typen filtern"
        },
        pokemon: {
            height: "Größe",
            weight: "Gewicht",
            moves: "Attacken",
            movesList: "Attackenliste",
            stats: "Werte",
            evolution: "Entwicklung",
            types: "Typen",
            loadingEvolution: "Lade Entwicklungen..."
        },
        search: {
            placeholder: "Nach einem Pokemon suchen...",
            placeholderGen1: "Suche nach Name oder ID...",
            placeholderOthers: "Suche nach Name (mehrsprachig) oder ID...",
            noResults: "Keine Ergebnisse für",
            noResultsTitle: "Keine Ergebnisse",
            noResultsQuery: "Kein Pokemon entspricht",
            noResultsGeneric: "Keine Pokemon anzuzeigen.",
            disclaimerOthers: "Die Suche unterstützt jetzt mehrere Sprachen (Französisch, Englisch, Deutsch, Japanisch usw.)! 🌍 Sie können nach einem Pokemon mit seinem Namen in jeder Sprache oder nach seiner ID suchen."
        },
        comparator: {
            title: "Pokemon-Vergleich",
            subtitle: "Vergleiche die Werte von zwei Pokemon",
            selectPokemon: "Wähle ein Pokemon",
            placeholder: "Suchen...",
            stat: "Wert",
            value: "Wert",
        },
        favorites: {
            title: "Deine Favoriten",
            subtitle: "Finde hier alle deine Lieblings-Pokemon",
            empty: "Du hast noch keine Favoriten. Füge welche hinzu, indem du auf das Herz klickst!",
            add: "Zu Favoriten hinzufügen",
            remove: "Aus Favoriten entfernen"
        },
        home: {
            welcome: "Willkommen im Pokedex",
            subtitle: "Entdecke die Welt der Pokemon",
            features: {
                title: "Erweiterte Funktionen",
                subtitle: "Nutzen Sie neue Tools, um Ihre Sammlung zu analysieren und zu organisieren.",
                gen1: {
                    title: "Generation 1",
                    desc: "Erkunde die ersten 151 Kanto-Pokemon mit detaillierten Beschreibungen."
                },
                others: {
                    title: "Alle Pokemon",
                    desc: "Zugriff auf die globale Datenbank aller existierenden Pokemon."
                },
                comparator: {
                    title: "Vergleich",
                    desc: "Vergleiche die Werte deiner Lieblings-Pokemon nebeneinander."
                },
                favorites: {
                    title: "Favoriten",
                    desc: "Speichere deine Lieblings-Pokemon, um sie leicht wiederzufinden."
                }
            },
            hero: {
                cta: "Pokedex – Entdecken, vergleichen und erkunden",
                title: "Schnapp sie dir alle mit deinem Pokedex",
                description: "Durchsuche die vollständige Pokemon-Liste, filtere nach Typ und greife auf detaillierte Daten zu. Ein schneller und moderner Leitfaden für Trainer.",
                featuresTitle: "FUNKTIONEN",
                updatedData: "Daten aktualisiert",
                tags: ["Vollständige Liste", "Suche", "Typenfilter", "Details", "Leistungsstark"]
            },
            details: {
                gen1: {
                    title: "Generation 1",
                    p1: "Entdecken Sie die 151 ikonischen Pokemon der ersten Generation in einer modernen und intuitiven Benutzeroberfläche.",
                    p2: "Unsere Anwendung verwendet eine spezialisierte API, die wesentliche Daten zu jedem Pokemon liefert, einschließlich Typen, Basiswerte und mehr.",
                    p3: "Perfekt für Trainer, die schnell grundlegende Informationen zu ihren Lieblings-Pokemon der ersten Stunde finden möchten.",
                    cta: "Entdecken"
                },
                api: {
                    title: "Vollständige PokéAPI",
                    p1: "Greifen Sie auf eine vollständige Datenbank aller Pokemon über Generationen hinweg zu, mit detaillierten Informationen zu jeder Kreatur.",
                    p2: "Dank PokéAPI profitieren Sie von umfassenden Daten, einschließlich Attacken, Entwicklungen, Schwächen und vielem mehr.",
                    p3: "Dieser Bereich befindet sich derzeit in aktiver Entwicklung und wird bald erweiterte Funktionen für die anspruchsvollsten Trainer bieten.",
                    cta: "Mehr sehen"
                }
            }
        },
        footer: {
            description: "Pokedex-Website mit Informationen über Pokemon. Finde dein Lieblings-Pokemon und entdecke seine Details.",
            navigation: "Navigation",
            appCode: "Anwendungscode",
            repo: "GitHub-Repository",
            followMe: "Folge mir",
            rights: "Alle Rechte vorbehalten."
        }
    },
    es: {
        nav: {
            home: "Inicio",
            gen1: "Gen 1",
            others: "Otros",
            comparator: "Comparador",
            favorites: "Favoritos",
        },
        common: {
            back: "Volver",
            loading: "Cargando...",
            error: "Error",
            search: "Buscar",
            filter: "Filtrar",
            filters: "Filtros",
            clearFilters: "Borrar filtros",
            viewMore: "Ver más",
            viewLess: "Ver menos",
            andMore: "otros",
            explore: "Explorar",
            filterByTypes: "Filtrar por tipos"
        },
        pokemon: {
            height: "Altura",
            weight: "Peso",
            moves: "Movimientos",
            movesList: "Lista de movimientos",
            stats: "Estadísticas",
            evolution: "Evolución",
            types: "Tipos",
            loadingEvolution: "Cargando evoluciones..."
        },
        search: {
            placeholder: "Buscar un Pokémon...",
            placeholderGen1: "Buscar por nombre o ID...",
            placeholderOthers: "Buscar por nombre (multilingüe) o ID...",
            noResults: "No se encontraron resultados para",
            noResultsTitle: "Sin resultados",
            noResultsQuery: "Ningún Pokémon coincide con",
            noResultsGeneric: "No hay Pokémon para mostrar.",
            disclaimerOthers: "¡La búsqueda ahora admite varios idiomas (francés, inglés, alemán, japonés, etc.)! 🌍 Puedes buscar un Pokémon por su nombre en cualquier idioma o por su ID."
        },
        comparator: {
            title: "Comparador de Pokémon",
            subtitle: "Compara las estadísticas de dos Pokémon",
            selectPokemon: "Selecciona un Pokémon",
            placeholder: "Buscar...",
            stat: "Estadística",
            value: "Valor",
        },
        favorites: {
            title: "Tus Favoritos",
            subtitle: "Encuentra aquí todos tus Pokémon favoritos",
            empty: "Aún no tienes favoritos. ¡Añade algunos haciendo clic en el corazón!",
            add: "Añadir a favoritos",
            remove: "Eliminar de favoritos"
        },
        home: {
            welcome: "Bienvenido a la Pokédex",
            subtitle: "Descubre el mundo de los Pokémon",
            features: {
                title: "Características Avanzadas",
                subtitle: "Disfruta de nuevas herramientas para analizar y organizar tu colección.",
                gen1: {
                    title: "Generación 1",
                    desc: "Explora los primeros 151 Pokémon de Kanto con descripciones detalladas."
                },
                others: {
                    title: "Todos los Pokémon",
                    desc: "Accede a la base de datos mundial de todos los Pokémon existentes."
                },
                comparator: {
                    title: "Comparador",
                    desc: "Compara las estadísticas de tus Pokémon favoritos lado a lado."
                },
                favorites: {
                    title: "Favoritos",
                    desc: "Guarda tus Pokémon favoritos para encontrarlos fácilmente."
                }
            },
            hero: {
                cta: "Pokédex – Descubre, compara y explora Pokémon",
                title: "Atrápalos a todos con tu Pokédex",
                description: "Explora la lista completa de Pokémon, filtra por tipo y accede a datos detallados. Una guía rápida y moderna para entrenadores.",
                featuresTitle: "CARACTERÍSTICAS",
                updatedData: "Datos actualizados",
                tags: ["Lista completa", "Búsqueda", "Filtros de tipo", "Detalles", "Rápido"]
            },
            details: {
                gen1: {
                    title: "Generación 1",
                    p1: "Explora los 151 Pokémon icónicos de la primera generación en una interfaz moderna e intuitiva.",
                    p2: "Nuestra aplicación utiliza una API especializada que proporciona datos esenciales sobre cada Pokémon, incluidos sus tipos, estadísticas base y más.",
                    p3: "Perfecto para entrenadores que desean encontrar rápidamente información básica sobre sus Pokémon favoritos de los primeros tiempos.",
                    cta: "Descubrir"
                },
                api: {
                    title: "PokéAPI Completa",
                    p1: "Accede a una base de datos completa de todos los Pokémon de todas las generaciones, con información detallada sobre cada criatura.",
                    p2: "Gracias a PokéAPI, benefíciate de datos exhaustivos que incluyen movimientos, evoluciones, debilidades y mucho más.",
                    p3: "Esta sección está actualmente en desarrollo activo y pronto ofrecerá características avanzadas para los entrenadores más exigentes.",
                    cta: "Ver más"
                }
            }
        },
        footer: {
            description: "Sitio web de Pokedex con información sobre Pokémon. Encuentra tu Pokémon favorito y descubre sus detalles.",
            navigation: "Navegación",
            appCode: "Código de la aplicación",
            repo: "Repositorio GitHub",
            followMe: "Sígueme",
            rights: "Todos los derechos reservados."
        }
    },
    it: {
        nav: {
            home: "Home",
            gen1: "Gen 1",
            others: "Altri",
            comparator: "Confronto",
            favorites: "Preferiti",
        },
        common: {
            back: "Indietro",
            loading: "Caricamento...",
            error: "Errore",
            search: "Cerca",
            filter: "Filtra",
            filters: "Filtri",
            clearFilters: "Cancella filtri",
            viewMore: "Vedi altro",
            viewLess: "Vedi meno",
            andMore: "altri",
            explore: "Esplora",
            filterByTypes: "Filtra per tipi"
        },
        pokemon: {
            height: "Altezza",
            weight: "Peso",
            moves: "Mosse",
            movesList: "Lista delle mosse",
            stats: "Statistiche",
            evolution: "Evoluzione",
            types: "Tipi",
            loadingEvolution: "Caricamento evoluzioni..."
        },
        search: {
            placeholder: "Cerca un Pokemon...",
            placeholderGen1: "Cerca per nome o ID...",
            placeholderOthers: "Cerca per nome (multilingue) o ID...",
            noResults: "Nessun risultato trovato per",
            noResultsTitle: "Nessun risultato",
            noResultsQuery: "Nessun Pokemon corrisponde a",
            noResultsGeneric: "Nessun Pokemon da mostrare.",
            disclaimerOthers: "La ricerca ora supporta più lingue (francese, inglese, tedesco, giapponese, ecc.)! 🌍 Puoi cercare un Pokemon con il suo nome in qualsiasi lingua o con il suo ID."
        },
        comparator: {
            title: "Confronto Pokemon",
            subtitle: "Confronta le statistiche di due Pokemon",
            selectPokemon: "Seleziona un Pokemon",
            placeholder: "Cerca...",
            stat: "Statistica",
            value: "Valore",
        },
        favorites: {
            title: "I tuoi Preferiti",
            subtitle: "Trova qui tutti i tuoi Pokemon preferiti",
            empty: "Non hai ancora preferiti. Aggiungine alcuni cliccando sul cuore!",
            add: "Aggiungi ai preferiti",
            remove: "Rimuovi dai preferiti"
        },
        home: {
            welcome: "Benvenuto nel Pokedex",
            subtitle: "Scopri il mondo dei Pokemon",
            features: {
                title: "Funzionalità Avanzate",
                subtitle: "Goditi nuovi strumenti per analizzare e organizzare la tua collezione.",
                gen1: {
                    title: "Generazione 1",
                    desc: "Esplora i primi 151 Pokemon di Kanto con descrizioni dettagliate."
                },
                others: {
                    title: "Tutti i Pokemon",
                    desc: "Accedi al database globale di tutti i Pokemon esistenti."
                },
                comparator: {
                    title: "Confronto",
                    desc: "Confronta le statistiche dei tuoi Pokemon preferiti fianco a fianco."
                },
                favorites: {
                    title: "Preferiti",
                    desc: "Salva i tuoi Pokemon preferiti per trovarli facilmente."
                }
            },
            hero: {
                cta: "Pokedex – Scopri, confronta ed esplora i Pokemon",
                title: "Acchiappali tutti con il tuo Pokedex",
                description: "Sfoglia l'elenco completo dei Pokemon, filtra per tipo e accedi a dati dettagliati. Una guida rapida e moderna per gli allenatori.",
                featuresTitle: "FUNZIONALITÀ",
                updatedData: "Dati aggiornati",
                tags: ["Lista completa", "Cerca", "Filtri per tipo", "Dettagli", "Performante"]
            },
            details: {
                gen1: {
                    title: "Generazione 1",
                    p1: "Esplora i 151 Pokemon iconici della prima generazione in un'interfaccia moderna e intuitiva.",
                    p2: "La nostra applicazione utilizza un'API specializzata che fornisce dati essenziali su ogni Pokemon, inclusi tipi, statistiche di base e altro.",
                    p3: "Perfetto per gli allenatori che vogliono trovare rapidamente informazioni di base sui loro Pokemon preferiti dei primi tempi.",
                    cta: "Scopri"
                },
                api: {
                    title: "PokéAPI Completa",
                    p1: "Accedi a un database completo di tutti i Pokemon di tutte le generazioni, con informazioni dettagliate su ogni creatura.",
                    p2: "Grazie a PokéAPI, approfitta di dati esaustivi che includono mosse, evoluzioni, debolezze e molto altro.",
                    p3: "Questa sezione è attualmente in fase di sviluppo attivo e offrirà presto funzionalità avanzate per gli allenatori più esigenti.",
                    cta: "Vedi altro"
                }
            }
        },
        footer: {
            description: "Sito web Pokedex contenente informazioni sui Pokemon. Trova il tuo Pokemon preferito e scopri i suoi dettagli.",
            navigation: "Navigazione",
            appCode: "Codice dell'applicazione",
            repo: "Repository GitHub",
            followMe: "Seguimi",
            rights: "Tutti i diritti riservati."
        }
    },
    ja: {
        nav: {
            home: "ホーム",
            gen1: "第1世代",
            others: "その他",
            comparator: "比較",
            favorites: "お気に入り",
        },
        common: {
            back: "戻る",
            loading: "読み込み中...",
            error: "エラー",
            search: "検索",
            filter: "フィルター",
            filters: "フィルター",
            clearFilters: "フィルターをクリア",
            viewMore: "もっと見る",
            viewLess: "表示を減らす",
            andMore: "その他",
            explore: "探索",
            filterByTypes: "タイプでフィルタリング"
        },
        pokemon: {
            height: "高さ",
            weight: "重さ",
            moves: "技",
            movesList: "技リスト",
            stats: "ステータス",
            evolution: "進化",
            types: "タイプ",
            loadingEvolution: "進化を読み込んでいます..."
        },
        search: {
            placeholder: "ポケモンを検索...",
            placeholderGen1: "名前またはIDで検索...",
            placeholderOthers: "名前（多言語）またはIDで検索...",
            noResults: "見つかりませんでした：",
            noResultsTitle: "結果なし",
            noResultsQuery: "一致するポケモンはいません",
            noResultsGeneric: "表示するポケモンがいません。",
            disclaimerOthers: "検索機能が多言語に対応しました（フランス語、英語、ドイツ語、日本語など）！🌍 どの言語の名前でも、IDでも検索できます。"
        },
        comparator: {
            title: "ポケモン比較",
            subtitle: "2匹のポケモンのステータスを比較",
            selectPokemon: "ポケモンを選択",
            placeholder: "検索...",
            stat: "ステータス",
            value: "値",
        },
        favorites: {
            title: "お気に入り",
            subtitle: "お気に入りのポケモン一覧",
            empty: "お気に入りはまだありません。ハートをクリックして追加してください！",
            add: "お帳に追加",
            remove: "お気に入りから削除"
        },
        home: {
            welcome: "ポケモン図鑑へようこそ",
            subtitle: "ポケモンの世界を探索しよう",
            features: {
                title: "高度な機能",
                subtitle: "コレクションを分析および整理するための新しいツールをお楽しみください。",
                gen1: {
                    title: "第1世代",
                    desc: "カントー地方の最初の151匹を詳細な説明と共に探索しましょう。"
                },
                others: {
                    title: "すべてのポケモン",
                    desc: "既存のすべてのポケモンのグローバルデータベースにアクセスします。"
                },
                comparator: {
                    title: "比較ツール",
                    desc: "お気に入りのポケモンのステータスを並べて比較します。"
                },
                favorites: {
                    title: "お気に入り",
                    desc: "お気に入りのポケモンを保存して、簡単に見つけられるようにします。"
                }
            },
            hero: {
                cta: "ポケモン図鑑 – ポケモンを発見、比較、探索",
                title: "ポケモン図鑑ですべてを捕まえよう",
                description: "ポケモンの完全なリストを閲覧し、タイプでフィルタリングし、詳細なデータにアクセスします。\nトレーナーのための高速でモダンなガイド。",
                featuresTitle: "機能",
                updatedData: "最新データ",
                tags: ["完全なリスト", "検索", "タイプフィルター", "詳細", "高性能"]
            },
            details: {
                gen1: {
                    title: "第1世代",
                    p1: "モダンで直感的なインターフェースで、第1世代の象徴的な151匹のポケモンを探索しましょう。",
                    p2: "当社のアプリは、タイプ、種族値などを含む各ポケモンの重要なデータを提供する特化したAPIを使用しています。",
                    p3: "初期の時代のお気に入りポケモンに関する基本情報をすばやく見つけたいトレーナーに最適です。",
                    cta: "発見する"
                },
                api: {
                    title: "完全なPokéAPI",
                    p1: "世代を超えたすべてのポケモンの完全なデータベースにアクセスし、各クリーチャーの詳細情報を確認できます。",
                    p2: "PokéAPIのおかげで、技、進化、弱点などを含む包括的なデータを利用できます。",
                    p3: "このセクションは現在開発中であり、まもなく最も要求の厳しいトレーナー向けの高度な機能を提供する予定です。",
                    cta: "もっと見る"
                }
            }
        },
        footer: {
            description: "ポケモンに関する情報を含むポケモン図鑑ウェブサイト。お気に入りのポケモンを見つけて詳細を発見してください。",
            navigation: "ナビゲーション",
            appCode: "アプリケーションコード",
            repo: "GitHubリポジトリ",
            followMe: "フォローする",
            rights: "無断転載を禁じます。"
        }
    }
} as const;

/**
 * Union type representing valid language keys derived from the dictionary.
 */
export type Language = keyof typeof DICTIONARIES;

/**
 * Type representing the structure of a single language dictionary (inferred from 'fr').
 */
export type Dictionary = typeof DICTIONARIES['fr'];
