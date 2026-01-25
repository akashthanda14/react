import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/auth/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
                    <div className="text-sm text-muted-foreground">
                        {session.user.email} (Admin)
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
