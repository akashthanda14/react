import Link from "next/link";
import { ArrowRight, BookOpen, Code, Target, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-24 max-w-6xl relative">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight">
              Your Personalized Engineering
              <span className="block text-neon mt-2">Roadmap Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get structured roadmaps, milestones, and validation for Backend, DevOps, System Design, Fullstack, and GenAI engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/onboarding"
                className="px-8 py-4 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                Start Your Roadmap
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/playground"
                className="px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-card/80 transition-all inline-flex items-center gap-2"
              >
                Explore Playground
                <Code className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Problem
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Engineering paths are unclear. Resources are scattered. You need structure, milestones, and validation to progress efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Personalized roadmaps with clear milestones and AI-powered validation for your engineering track.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-neon" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Structured Roadmaps
              </h3>
              <p className="text-muted-foreground">
                Clear paths for Backend, DevOps, System Design, Fullstack, and GenAI. Know exactly what to learn next.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-neon" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Milestone Validation
              </h3>
              <p className="text-muted-foreground">
                Track progress through checkpoints. Validate understanding before moving forward.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-neon" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                AI-Powered Feedback
              </h3>
              <p className="text-muted-foreground">
                Get evaluated on your solutions. Understand gaps and improve systematically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="text-4xl font-bold text-neon mb-2">01</div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Choose Your Track
                </h3>
                <p className="text-muted-foreground">
                  Select your engineering path. Get a personalized roadmap with clear milestones and checkpoints.
                </p>
              </div>
              <div className="flex-1 bg-card border border-border rounded-xl p-8 min-h-[200px] flex items-center justify-center">
                <Target className="w-24 h-24 text-neon/20" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="flex-1">
                <div className="text-4xl font-bold text-neon mb-2">02</div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Complete Milestones
                </h3>
                <p className="text-muted-foreground">
                  Work through structured content. Validate understanding at each checkpoint before progressing.
                </p>
              </div>
              <div className="flex-1 bg-card border border-border rounded-xl p-8 min-h-[200px] flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-neon/20" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="text-4xl font-bold text-neon mb-2">03</div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Get Validated
                </h3>
                <p className="text-muted-foreground">
                  Practice in the playground. Receive AI feedback on your solutions and track your progress.
                </p>
              </div>
              <div className="flex-1 bg-card border border-border rounded-xl p-8 min-h-[200px] flex items-center justify-center">
                <Zap className="w-24 h-24 text-neon/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Engineering Tracks
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose your path. Each track has a structured roadmap with milestones and validation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Backend", "DevOps", "System Design", "Fullstack", "GenAI"].map((track) => (
              <div key={track} className="p-6 bg-card border border-border rounded-xl hover:border-neon/30 transition-all">
                <h3 className="text-xl font-semibold text-foreground mb-2">{track}</h3>
                <p className="text-sm text-muted-foreground">
                  Structured roadmap with milestones
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-600/10 border border-neon/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start Your Engineering Roadmap
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get structure, milestones, and validation for your engineering journey.
            </p>
            <Link
              href="/onboarding"
              className="px-8 py-4 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Begin Your Roadmap
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
