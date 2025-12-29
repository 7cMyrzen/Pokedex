import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
    return (
        <div className={cn("flex items-center justify-center gap-4 py-8", className)}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 0}
                className="rounded-xl border border-border/30 bg-background/60 px-4 py-2 text-sm font-medium hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Précédent
            </button>
            <span className="text-sm font-medium text-foreground/80">
                Page {currentPage + 1} / {Math.max(1, totalPages)}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="rounded-xl border border-border/30 bg-background/60 px-4 py-2 text-sm font-medium hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Suivant
            </button>
        </div>
    );
}
