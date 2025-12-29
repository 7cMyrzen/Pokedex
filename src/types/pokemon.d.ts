declare module 'pokemon' {
    export function all(lang?: 'en' | 'de' | 'fr' | 'ja' | 'it' | 'es'): string[];
    export function getName(id: number, lang?: 'en' | 'de' | 'fr' | 'ja' | 'it' | 'es'): string;
    export function getId(name: string, lang?: 'en' | 'de' | 'fr' | 'ja' | 'it' | 'es'): number;
    export function random(lang?: 'en' | 'de' | 'fr' | 'ja' | 'it' | 'es'): string;
    export const languages: Set<string>;
}
