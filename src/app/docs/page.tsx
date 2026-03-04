
import { BookOpen, Code, Users } from "lucide-react";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-extrabold text-foreground mb-4">
                    Documentation
                </h1>
                <p className="text-lg text-muted-foreground mb-12">
                    Everything you need to know about using the platform.
                </p>

                <div className="space-y-6">
                    <div className="p-6 bg-card border border-border rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <BookOpen className="w-6 h-6 text-neon" />
                            <h2 className="text-xl font-semibold text-foreground">Getting Started</h2>
                        </div>
                        <p className="text-muted-foreground">
                            Learn how to navigate the platform and start your system design journey.
                        </p>
                    </div>

                    <div className="p-6 bg-card border border-border rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <Code className="w-6 h-6 text-neon" />
                            <h2 className="text-xl font-semibold text-foreground">Using the Playground</h2>
                        </div>
                        <p className="text-muted-foreground">
                            Master the interactive playground and get the most out of practice sessions.
                        </p>
                    </div>

                    <div className="p-6 bg-card border border-border rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <Users className="w-6 h-6 text-neon" />
                            <h2 className="text-xl font-semibold text-foreground">Interview Preparation</h2>
                        </div>
                        <p className="text-muted-foreground">
                            Tips and strategies for acing system design interviews.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
