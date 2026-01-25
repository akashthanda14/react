import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus, Edit, ArrowLeft } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminPhasesPage() {
    const phases = await prisma.phase.findMany({
        orderBy: [
            { track: { order: "asc" } },
            { order: "asc" }
        ],
        include: {
            track: true,
            _count: {
                select: { skills: true, milestones: true },
            },
        },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin"
                        className="p-2 hover:bg-card rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground">Phases</h1>
                </div>

                <Link
                    href="/admin/phases/new"
                    className="px-4 py-2 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    New Phase
                </Link>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Track</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Order</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Skills</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Milestones</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {phases.map((phase) => (
                            <tr key={phase.id} className="hover:bg-muted/30">
                                <td className="px-6 py-4 text-sm font-medium text-neon">
                                    {phase.track.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {phase.order}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-foreground">
                                    {phase.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {phase._count.skills}
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {phase._count.milestones}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/admin/phases/${phase.id}`}
                                        className="text-neon hover:text-neon/80 transition-colors"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
