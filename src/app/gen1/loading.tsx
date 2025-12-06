export default function Loading() {
    return (
        <main className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-12">
            <div className="grid w-full gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-3xl border border-border/30 bg-background/60 shadow-sm overflow-hidden"
                    >
                        <div className="aspect-square w-full bg-muted/40 animate-pulse" />
                        <div className="p-4 space-y-3">
                            <div className="h-4 w-1/2 bg-muted/50 rounded animate-pulse" />
                            <div className="flex gap-2">
                                <span className="h-6 w-16 bg-muted/40 rounded-full animate-pulse" />
                                <span className="h-6 w-14 bg-muted/40 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
