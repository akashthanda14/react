export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-neon/30 border-t-neon rounded-full animate-spin" />
                <p className="text-muted-foreground animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
