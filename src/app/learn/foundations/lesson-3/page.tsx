"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

const lessonContent = {
    title: "Horizontal vs Vertical Scaling",
    content: `
## What is Scaling?

Scaling is the ability of a system to handle increased load. There are two primary approaches:

### Vertical Scaling (Scale Up)
Adding more resources (CPU, RAM, storage) to existing machines. Simple but has limits.

**Pros:**
- Simple to implement
- No code changes needed
- Maintains data consistency

**Cons:**
- Hardware limits
- Single point of failure
- Expensive at scale

### Horizontal Scaling (Scale Out)
Adding more machines to distribute load. More complex but infinitely scalable.

**Pros:**
- No theoretical limit
- Better fault tolerance
- Cost-effective at scale

**Cons:**
- Requires load balancing
- Data consistency challenges
- More complex architecture

## Key Takeaways

- Vertical scaling is simpler but has limits
- Horizontal scaling is more complex but scales better
- Most large systems use horizontal scaling
  `,
};

const questions = [
    {
        id: 1,
        question: "When would you choose vertical scaling over horizontal scaling?",
        type: "short-text",
        expectedConcepts: ["simple", "small scale", "consistency", "monolith", "quick"],
        difficulty: "easy",
    },
    {
        id: 2,
        question: "What are the main challenges of horizontal scaling?",
        type: "short-text",
        expectedConcepts: ["load balancing", "data consistency", "distributed", "complexity", "state management"],
        difficulty: "medium",
    },
    {
        id: 3,
        question: "A startup with 1000 users wants to scale. What would you recommend?",
        type: "short-text",
        expectedConcepts: ["vertical", "simple", "cost", "premature optimization"],
        difficulty: "easy",
    },
];

export default function LessonPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<any>(null);
    const [isEvaluating, setIsEvaluating] = useState(false);

    const handleSubmit = async () => {
        setIsEvaluating(true);

        // Rule-based evaluation
        const question = questions[currentQuestion];
        const lowerAnswer = answer.toLowerCase();
        let score = 0;
        const foundConcepts: string[] = [];
        const missingConcepts: string[] = [];

        question.expectedConcepts.forEach((concept) => {
            if (lowerAnswer.includes(concept.toLowerCase())) {
                score += 20;
                foundConcepts.push(concept);
            } else {
                missingConcepts.push(concept);
            }
        });

        // Simulate AI feedback for missing concepts
        setTimeout(() => {
            setFeedback({
                score,
                foundConcepts,
                missingConcepts,
                suggestion: missingConcepts.length > 0
                    ? `Consider mentioning: ${missingConcepts.slice(0, 2).join(", ")}. These concepts are important for a complete answer.`
                    : "Great answer! You covered all key concepts.",
            });
            setIsEvaluating(false);
        }, 1000);
    };

    const handleNext = () => {
        setAnswer("");
        setFeedback(null);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/learn/foundations"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Foundations
                </Link>

                {/* Lesson Content */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-6">
                        {lessonContent.title}
                    </h1>

                    <div className="prose prose-invert max-w-none">
                        <div className="text-foreground/90 space-y-4 leading-relaxed">
                            {lessonContent.content.split('\n').map((line, i) => {
                                if (line.startsWith('## ')) {
                                    return <h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">{line.replace('## ', '')}</h2>;
                                }
                                if (line.startsWith('### ')) {
                                    return <h3 key={i} className="text-xl font-semibold text-foreground mt-6 mb-3">{line.replace('### ', '')}</h3>;
                                }
                                if (line.startsWith('**') && line.endsWith('**')) {
                                    return <p key={i} className="font-semibold text-foreground mt-4">{line.replace(/\*\*/g, '')}</p>;
                                }
                                if (line.startsWith('- ')) {
                                    return <li key={i} className="ml-6 text-muted-foreground">{line.replace('- ', '')}</li>;
                                }
                                if (line.trim()) {
                                    return <p key={i} className="text-muted-foreground">{line}</p>;
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>

                {/* Questions Section */}
                <div className="border-t border-border pt-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                        Practice Questions
                    </h2>

                    <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Question {currentQuestion + 1} of {questions.length}</span>
                        <span>•</span>
                        <span className="capitalize">{questions[currentQuestion].difficulty}</span>
                    </div>

                    <div className="p-6 bg-card border border-border rounded-xl mb-6">
                        <p className="text-lg text-foreground mb-4">
                            {questions[currentQuestion].question}
                        </p>

                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Type your answer here..."
                            className="w-full min-h-[150px] p-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon/50 resize-none"
                            disabled={!!feedback}
                        />

                        {!feedback ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!answer.trim() || isEvaluating}
                                className="mt-4 px-6 py-3 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isEvaluating ? "Evaluating..." : "Submit Answer"}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="mt-4 px-6 py-3 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all"
                            >
                                {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Lesson"}
                            </button>
                        )}
                    </div>

                    {/* Feedback */}
                    {feedback && (
                        <div className={`p-6 rounded-xl border ${feedback.score >= 60
                                ? "bg-blue-900/20 border-blue-500/30"
                                : "bg-yellow-900/20 border-yellow-500/30"
                            }`}>
                            <div className="flex items-start gap-3 mb-4">
                                {feedback.score >= 60 ? (
                                    <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        Score: {feedback.score}%
                                    </h3>

                                    {feedback.foundConcepts.length > 0 && (
                                        <div className="mb-3">
                                            <p className="text-sm font-medium text-foreground mb-1">Covered Concepts:</p>
                                            <ul className="text-sm text-muted-foreground space-y-1">
                                                {feedback.foundConcepts.map((concept: string, i: number) => (
                                                    <li key={i}>• {concept}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {feedback.missingConcepts.length > 0 && (
                                        <div className="mb-3">
                                            <p className="text-sm font-medium text-foreground mb-1">Missing Concepts:</p>
                                            <ul className="text-sm text-muted-foreground space-y-1">
                                                {feedback.missingConcepts.map((concept: string, i: number) => (
                                                    <li key={i}>• {concept}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="mt-4 p-3 bg-background/50 rounded-lg">
                                        <p className="text-sm text-foreground">
                                            <span className="font-medium">Suggestion: </span>
                                            {feedback.suggestion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
