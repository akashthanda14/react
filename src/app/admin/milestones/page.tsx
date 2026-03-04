import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus, Edit, ArrowLeft, HelpCircle } from "lucide-react";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function AdminMilestonesPage() {
    const milestones = await prisma.milestone.findMany({
        take: 50,
        orderBy: [
            { phase: { track: { order: "asc" } } },
            { phase: { order: "asc" } },
            { order: "asc" }
        ],
        include: {
            phase: {
                include: {
                    track: true,
                },
            },
            _count: {
                select: { questions: true },
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
                    <h1 className="text-3xl font-bold text-foreground">Milestones</h1>
                </div>

                <Link
                    href="/admin/milestones/new"
                    className="px-4 py-2 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    New Milestone
                </Link>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Track / Phase</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Order</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Title</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Questions</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {milestones.map((milestone) => (
                            <tr key={milestone.id} className="hover:bg-muted/30">
                                <td className="px-6 py-4 text-sm">
                                    <div className="font-medium text-neon">{milestone.phase.track.name}</div>
                                    <div className="text-muted-foreground text-xs">{milestone.phase.name}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {milestone.order}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-foreground">
                                    {milestone.title}
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <HelpCircle className="w-4 h-4" />
                                        {milestone._count.questions}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/admin/milestones/${milestone.id}`}
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
            <p className="mt-4 text-center text-sm text-muted-foreground">
                Showing first 50 milestones.
            </p>
        </div>
    );
}
