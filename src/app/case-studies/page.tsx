import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

const caseStudies = [
    {
        id: "twitter",
        title: "Twitter / X",
        description: "Real-time social media platform with millions of concurrent users",
        difficulty: "Hard",
        topics: ["Scalability", "Real-time", "Caching", "Data Storage"],
    },
    {
        id: "uber",
        title: "Uber",
        description: "Ride-sharing platform with location tracking and matching",
        difficulty: "Hard",
        topics: ["Geolocation", "Matching", "Real-time", "Payments"],
    },
    {
        id: "whatsapp",
        title: "WhatsApp",
        description: "Messaging app with end-to-end encryption",
        difficulty: "Medium",
        topics: ["Messaging", "Security", "Real-time", "Mobile"],
    },
    {
        id: "dropbox",
        title: "Dropbox",
        description: "File storage and synchronization service",
        difficulty: "Medium",
        topics: ["Storage", "Sync", "Versioning", "CDN"],
    },
];

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        Case Studies
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        Learn from real-world systems. Each case study breaks down architecture, scale, and design decisions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {caseStudies.map((study) => (
                        <Link
                            key={study.id}
                            href={`/case-studies/${study.id}`}
                            className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-neon/30 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-neon" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground group-hover:text-neon transition-colors">
                                            {study.title}
                                        </h3>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-neon opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <p className="text-muted-foreground mb-4">
                                {study.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-3">
                                {study.topics.map((topic) => (
                                    <span
                                        key={topic}
                                        className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>

                            <span className={`text-xs px-2 py-1 rounded ${study.difficulty === "Easy"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : study.difficulty === "Medium"
                                        ? "bg-yellow-500/20 text-yellow-400"
                                        : "bg-red-500/20 text-red-400"
                                }`}>
                                {study.difficulty}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
