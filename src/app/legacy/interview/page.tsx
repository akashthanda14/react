"use client";

import { useState } from "react";
import { Mic, MicOff, Play, RotateCcw } from "lucide-react";

const interviewQuestions = [
    "Design a URL shortener like bit.ly",
    "Design Instagram",
    "Design a rate limiter",
    "Design a notification system",
    "Design YouTube",
];

export default function InterviewModePage() {
    const [isActive, setIsActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0);

    const startInterview = () => {
        const randomQuestion = interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)];
        setCurrentQuestion(randomQuestion);
        setIsActive(true);
        setAnswer("");
        setTimeElapsed(0);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        Interview Mode
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        Practice system design interviews with AI evaluation. Get real-time feedback like in actual interviews.
                    </p>
                </div>

                {!isActive ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mic className="w-12 h-12 text-neon" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            Ready to Start?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            You'll get a random system design question. Take 45 minutes to design the system.
                        </p>
                        <button
                            onClick={startInterview}
                            className="px-8 py-4 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all inline-flex items-center gap-2"
                        >
                            <Play className="w-5 h-5" />
                            Start Interview
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="p-6 bg-card border border-neon/30 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-foreground">
                                    {currentQuestion}
                                </h2>
                                <div className="text-neon font-mono text-lg">
                                    {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                                </div>
                            </div>
                            <p className="text-muted-foreground">
                                Design this system step by step. Consider requirements, scale, architecture, and tradeoffs.
                            </p>
                        </div>

                        <div className="p-6 bg-card border border-border rounded-xl">
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Start designing your system here..."
                                className="w-full min-h-[400px] p-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon/50 resize-none font-mono text-sm"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsActive(false)}
                                className="flex-1 px-6 py-3 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all"
                            >
                                Submit for Evaluation
                            </button>
                            <button
                                onClick={startInterview}
                                className="px-6 py-3 bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-card/80 transition-all flex items-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                New Question
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
