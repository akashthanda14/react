import Link from "next/link";
import { Users, MessageSquare, Github } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-extrabold text-foreground mb-4">
                    Community
                </h1>
                <p className="text-lg text-muted-foreground mb-12">
                    Connect with other learners and share your system design journey.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8 bg-card border border-border rounded-xl text-center">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-8 h-8 text-neon" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Discord</h3>
                        <p className="text-muted-foreground mb-4">
                            Join our Discord server to chat with other learners
                        </p>
                        <button className="px-6 py-2 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all">
                            Join Discord
                        </button>
                    </div>

                    <div className="p-8 bg-card border border-border rounded-xl text-center">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Github className="w-8 h-8 text-neon" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">GitHub</h3>
                        <p className="text-muted-foreground mb-4">
                            Contribute to our open-source content
                        </p>
                        <button className="px-6 py-2 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all">
                            View on GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
