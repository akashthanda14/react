"use client";

import { useState } from "react";
import { Code, Play, RotateCcw } from "lucide-react";

const scenarios = [
    {
        id: 1,
        title: "Design a URL Shortener",
        description: "Design a system like bit.ly that shortens URLs and tracks clicks",
        difficulty: "Easy",
    },
    {
        id: 2,
        title: "Design Instagram",
        description: "Photo sharing platform with feed, likes, and comments",
        difficulty: "Medium",
    },
    {
        id: 3,
        title: "Design Netflix",
        description: "Video streaming service with recommendations",
        difficulty: "Hard",
    },
];

const sections = [
    { id: "requirements", title: "Requirements", placeholder: "List functional and non-functional requirements..." },
    { id: "scale", title: "Scale Estimation", placeholder: "Calculate DAU, storage, bandwidth..." },
    { id: "architecture", title: "High Level Architecture", placeholder: "Describe main components and data flow..." },
    { id: "storage", title: "Data Storage", placeholder: "Database choice, schema design..." },
    { id: "bottlenecks", title: "Bottlenecks", placeholder: "Identify potential issues..." },
    { id: "tradeoffs", title: "Tradeoffs", placeholder: "Discuss design decisions..." },
];

export default function PlaygroundPage() {
    const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<any>(null);
    const [isEvaluating, setIsEvaluating] = useState(false);

    const handleAnswerChange = (sectionId: string, value: string) => {
        setAnswers({ ...answers, [sectionId]: value });
    };

    const handleEvaluate = () => {
        setIsEvaluating(true);

        // Simulate AI evaluation
        setTimeout(() => {
            const completedSections = Object.keys(answers).filter(key => answers[key]?.trim()).length;
            const score = Math.round((completedSections / sections.length) * 100);

            setFeedback({
                score,
                completedSections,
                totalSections: sections.length,
                strengths: [
                    "Good identification of functional requirements",
                    "Considered scalability from the start",
                ],
                improvements: [
                    "Add more detail on caching strategy",
                    "Consider failure scenarios",
                    "Discuss monitoring approach",
                ],
            });
            setIsEvaluating(false);
        }, 2000);
    };

    const handleReset = () => {
        setAnswers({});
        setFeedback(null);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        System Design Playground
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        Practice designing systems. Answer each section and get AI-powered feedback on your architecture decisions.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Scenario Selector */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            Choose a System
                        </h2>
                        <div className="space-y-3">
                            {scenarios.map((scenario) => (
                                <button
                                    key={scenario.id}
                                    onClick={() => {
                                        setSelectedScenario(scenario);
                                        handleReset();
                                    }}
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${selectedScenario.id === scenario.id
                                            ? "bg-blue-500/10 border-neon"
                                            : "bg-card border-border hover:border-neon/30"
                                        }`}
                                >
                                    <h3 className="font-semibold text-foreground mb-1">
                                        {scenario.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {scenario.description}
                                    </p>
                                    <span className={`text-xs px-2 py-1 rounded ${scenario.difficulty === "Easy"
                                            ? "bg-blue-500/20 text-blue-400"
                                            : scenario.difficulty === "Medium"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-red-500/20 text-red-400"
                                        }`}>
                                        {scenario.difficulty}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-6 space-y-3">
                            <button
                                onClick={handleEvaluate}
                                disabled={isEvaluating || Object.keys(answers).length === 0}
                                className="w-full px-4 py-3 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                {isEvaluating ? "Evaluating..." : "Evaluate Design"}
                            </button>
                            <button
                                onClick={handleReset}
                                className="w-full px-4 py-3 bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-card/80 transition-all flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>
                        </div>

                        {/* Feedback */}
                        {feedback && (
                            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
                                <h3 className="font-semibold text-foreground mb-3">
                                    Evaluation Results
                                </h3>
                                <div className="text-3xl font-bold text-neon mb-2">
                                    {feedback.score}%
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {feedback.completedSections}/{feedback.totalSections} sections completed
                                </p>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-foreground mb-2">Strengths:</p>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        {feedback.strengths.map((item: string, i: number) => (
                                            <li key={i}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-foreground mb-2">Improvements:</p>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        {feedback.improvements.map((item: string, i: number) => (
                                            <li key={i}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Design Sections */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                <Code className="w-6 h-6 text-neon" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    {selectedScenario.title}
                                </h2>
                                <p className="text-muted-foreground">
                                    {selectedScenario.description}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {sections.map((section) => (
                                <div key={section.id} className="p-6 bg-card border border-border rounded-xl">
                                    <h3 className="text-lg font-semibold text-foreground mb-3">
                                        {section.title}
                                    </h3>
                                    <textarea
                                        value={answers[section.id] || ""}
                                        onChange={(e) => handleAnswerChange(section.id, e.target.value)}
                                        placeholder={section.placeholder}
                                        className="w-full min-h-[120px] p-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon/50 resize-none"
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Limit: 150 words
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
