import Link from "next/link";
import { BookOpen, Layers, CheckSquare, List } from "lucide-react";

const adminSections = [
    {
        title: "Tracks",
        description: "Manage engineering tracks (Backend, DevOps, etc.)",
        href: "/admin/tracks",
        icon: BookOpen,
        color: "text-blue-500",
    },
    {
        title: "Phases",
        description: "Manage learning phases within tracks",
        href: "/admin/phases",
        icon: Layers,
        color: "text-purple-500",
    },
    {
        title: "Skills",
        description: "Manage skills and topics",
        href: "/admin/skills",
        icon: List,
        color: "text-green-500",
    },
    {
        title: "Milestones",
        description: "Manage validation milestones and questions",
        href: "/admin/milestones",
        icon: CheckSquare,
        color: "text-orange-500",
    },
];

export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminSections.map((section) => (
                    <Link
                        key={section.title}
                        href={section.href}
                        className="p-6 bg-card border border-border rounded-xl hover:border-neon/50 transition-all group"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-lg bg-background ${section.color}`}>
                                <section.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-neon transition-colors">
                                {section.title}
                            </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {section.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
