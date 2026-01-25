"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const questions = [
    {
        id: 1,
        question: "What's your current experience level?",
        options: [
            "Just starting out",
            "1-2 years of experience",
            "3-5 years of experience",
            "5+ years of experience",
        ],
    },
    {
        id: 2,
        question: "What role are you targeting?",
        options: [
            "Backend / Fullstack Engineer",
            "DevOps Engineer",
            "System Design Specialist",
            "GenAI Engineer",
        ],
    },
    {
        id: 3,
        question: "How much time can you commit weekly?",
        options: [
            "1-3 hours per week",
            "4-6 hours per week",
            "7-10 hours per week",
            "10+ hours per week",
        ],
    },
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleSelectOption = (option: string) => {
        const newAnswers = { ...answers, [currentQuestion]: option };
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            // Move to next question
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
            }, 200);
        }
    };

    const handleComplete = () => {
        // For now, just redirect to roadmap page
        // Later: save answers to database/localStorage
        router.push("/roadmap");
    };

    const isComplete = Object.keys(answers).length === questions.length;

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        Personalize Your Roadmap
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Answer a few questions to get a tailored learning path.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-sm font-medium text-neon">
                            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                        </span>
                    </div>
                    <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-neon rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="p-8 bg-card border border-border rounded-xl mb-6">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">
                        {questions[currentQuestion].question}
                    </h2>

                    <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => {
                            const isSelected = answers[currentQuestion] === option;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelectOption(option)}
                                    className={`w-full p-4 text-left rounded-lg border transition-all ${isSelected
                                        ? "bg-blue-500/10 border-neon text-foreground"
                                        : "bg-card border-border text-muted-foreground hover:border-neon/30 hover:text-foreground"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{option}</span>
                                        {isSelected && (
                                            <div className="w-5 h-5 bg-neon rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-background" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                        className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>

                    {isComplete && (
                        <button
                            onClick={handleComplete}
                            className="px-8 py-3 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                        >
                            View My Roadmap
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Skip Option */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => router.push("/learn")}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
}
