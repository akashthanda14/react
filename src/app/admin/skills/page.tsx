import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus, Edit, ArrowLeft } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminSkillsPage() {
    const skills = await prisma.skill.findMany({
        take: 50, // Limit for performance, real app would paginate
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
                    <h1 className="text-3xl font-bold text-foreground">Skills</h1>
                </div>

                <Link
                    href="/admin/skills/new"
                    className="px-4 py-2 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    New Skill
                </Link>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Track / Phase</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Order</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Description</th>
                            <th className="px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {skills.map((skill) => (
                            <tr key={skill.id} className="hover:bg-muted/30">
                                <td className="px-6 py-4 text-sm">
                                    <div className="font-medium text-neon">{skill.phase.track.name}</div>
                                    <div className="text-muted-foreground text-xs">{skill.phase.name}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {skill.order}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-foreground">
                                    {skill.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                                    {skill.description}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/admin/skills/${skill.id}`}
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
                Showing first 50 skills. Implementation note: Add pagination for full list.
            </p>
        </div>
    );
}
