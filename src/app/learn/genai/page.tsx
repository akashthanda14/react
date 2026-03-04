import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const phases = [
    {
        id: 1,
        name: "AI/ML Fundamentals",
        learn: "Machine learning basics, neural networks, transformers, LLM concepts",
        outcome: "Understand how large language models work and their capabilities",
        milestones: [
            "Explain how transformers and attention mechanisms work",
            "Understand LLM training and fine-tuning concepts",
            "Compare different LLM architectures and use cases",
        ],
    },
    {
        id: 2,
        name: "Prompt Engineering",
        learn: "Prompt design, few-shot learning, chain-of-thought, prompt optimization",
        outcome: "Craft effective prompts for various LLM tasks and use cases",
        milestones: [
            "Design prompts for classification and extraction tasks",
            "Implement chain-of-thought reasoning prompts",
            "Optimize prompts for accuracy and cost efficiency",
        ],
    },
    {
        id: 3,
        name: "LLM Integration",
        learn: "OpenAI API, LangChain, vector databases, embeddings, semantic search",
        outcome: "Build applications that integrate LLMs and handle context",
        milestones: [
            "Build an application using OpenAI API",
            "Implement semantic search with embeddings",
            "Create a chatbot with conversation memory",
        ],
    },
    {
        id: 4,
        name: "RAG Systems",
        learn: "Retrieval-augmented generation, chunking strategies, vector stores, reranking",
        outcome: "Build knowledge-grounded AI systems with custom data",
        milestones: [
            "Build a RAG system with custom knowledge base",
            "Implement chunking and retrieval strategies",
            "Optimize retrieval accuracy with reranking",
        ],
    },
    {
        id: 5,
        name: "Production AI",
        learn: "Fine-tuning, evaluation, monitoring, cost optimization, safety",
        outcome: "Deploy and maintain production-grade GenAI applications",
        milestones: [
            "Fine-tune an LLM for specific domain tasks",
            "Implement LLM output monitoring and evaluation",
            "Design cost-effective LLM architecture with caching",
        ],
    },
];

export default function GenAIRoadmapPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Tracks
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        GenAI Engineer Roadmap
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Master LLM integration, prompt engineering, RAG systems, and production AI through practical phases.
                    </p>
                </div>

                {/* Phases */}
                <div className="space-y-6">
                    {phases.map((phase) => (
                        <div
                            key={phase.id}
                            className="p-6 bg-card border border-border rounded-xl hover:border-neon/30 transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <span className="text-xl font-bold text-neon">
                                            {phase.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-foreground mb-4">
                                        {phase.name}
                                    </h3>

                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-foreground/70 mb-1">
                                                What you learn:
                                            </p>
                                            <p className="text-muted-foreground">
                                                {phase.learn}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-foreground/70 mb-1">
                                                Outcome:
                                            </p>
                                            <p className="text-muted-foreground">
                                                {phase.outcome}
                                            </p>
                                        </div>

                                        {/* Milestones */}
                                        <div className="pt-3 mt-3 border-t border-border/50">
                                            <p className="text-sm font-medium text-foreground/70 mb-2">
                                                Milestones:
                                            </p>
                                            <ul className="space-y-2">
                                                {phase.milestones.map((milestone, idx) => (
                                                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                        <span className="text-neon mt-0.5">•</span>
                                                        <span>{milestone}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-muted-foreground/30" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info */}
                <div className="mt-12 p-6 bg-card/50 border border-border rounded-xl">
                    <p className="text-sm text-muted-foreground">
                        Each phase builds on the previous. Complete validation checkpoints before progressing to the next phase.
                    </p>
                </div>
            </div>
        </div>
    );
}
