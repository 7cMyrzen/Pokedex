import { cn } from "@/lib/utils";

interface PokemonGridProps {
    className?: string;
    children: React.ReactNode;
}

export function PokemonGrid({ className, children }: PokemonGridProps) {
    return (
        <div
            className={cn(
                "grid w-full gap-2 sm:gap-4",
                "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
                className
            )}
        >
            {children}
        </div>
    );
}
