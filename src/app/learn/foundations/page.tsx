import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, Circle } from "lucide-react";

const lessons = [
    {
        id: 1,
        title: "What is System Design?",
        duration: "15 min",
        completed: true,
    },
    {
        id: 2,
        title: "Scalability Fundamentals",
        duration: "20 min",
        completed: true,
    },
    {
        id: 3,
        title: "Horizontal vs Vertical Scaling",
        duration: "18 min",
        completed: false,
    },
    {
        id: 4,
        title: "Load Balancing Basics",
        duration: "22 min",
        completed: false,
    },
    {
        id: 5,
        title: "Caching Strategies",
        duration: "20 min",
        completed: false,
    },
    {
        id: 6,
        title: "Database Fundamentals",
        duration: "25 min",
        completed: false,
    },
    {
        id: 7,
        title: "CAP Theorem",
        duration: "18 min",
        completed: false,
    },
    {
        id: 8,
        title: "Consistency Patterns",
        duration: "20 min",
        completed: false,
    },
];

export default function FoundationsPage() {
    const completedCount = lessons.filter(l => l.completed).length;
    const totalLessons = lessons.length;
    const progressPercent = Math.round((completedCount / totalLessons) * 100);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Modules
                </Link>

                {/* Module Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-neon" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold text-foreground">
                                Foundations
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Core concepts every system designer must know
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">
                                Progress
                            </span>
                            <span className="text-sm font-bold text-neon">
                                {completedCount}/{totalLessons} lessons • {progressPercent}%
                            </span>
                        </div>
                        <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-neon rounded-full transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Learning Outcomes */}
                <div className="mb-12 p-6 bg-card border border-border rounded-xl">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        Learning Outcomes
                    </h2>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                            <span>Understand core system design principles and trade-offs</span>
                        </li>
                        <li className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                            <span>Make informed decisions about scalability approaches</span>
                        </li>
                        <li className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                            <span>Identify when to use different consistency patterns</span>
                        </li>
                    </ul>
                </div>

                {/* Lessons List */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Lessons</h2>
                    {lessons.map((lesson) => (
                        <Link
                            key={lesson.id}
                            href={`/learn/foundations/lesson-${lesson.id}`}
                            className="group block p-5 bg-card border border-border rounded-xl hover:shadow-lg hover:border-neon/30 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    {lesson.completed ? (
                                        <CheckCircle2 className="w-6 h-6 text-neon flex-shrink-0" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-neon transition-colors">
                                            {lesson.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {lesson.duration}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-neon opacity-0 group-hover:opacity-100 transition-opacity">
                                    →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
