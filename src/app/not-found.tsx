import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon to-blue-500 mb-4">
                404
            </h2>
            <h1 className="text-2xl font-semibold text-foreground mb-4">
                Page Not Found
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all"
            >
                Return Home
            </Link>
        </div>
    );
}
