"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = ["All", "Backend", "System Design", "DevOps", "GenAI", "Career", "Frontend"];

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    author: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
}

const posts: BlogPost[] = [
    {
        slug: "stop-building-crud-apps",
        title: "Stop Building CRUD Apps — Start Designing Systems",
        excerpt: "Every junior engineer builds CRUD apps. Senior engineers design systems. Here's the mental shift that separates the two — and how to make it before your next interview.",
        category: "System Design",
        tags: ["System Design", "Career", "Interviews"],
        author: "Akash", date: "Mar 4, 2026", readTime: "8 min read",
        image: "/blog/system-design-whiteboard.png", featured: true,
    },
    {
        slug: "backend-scaling-checklist",
        title: "The Backend Scaling Checklist I Wish I Had 5 Years Ago",
        excerpt: "After scaling services at production companies, here are the 12 things I check every time before a backend goes to production — from connection pooling to circuit breakers.",
        category: "Backend",
        tags: ["Backend", "Production", "Scaling"],
        author: "Akash", date: "Feb 28, 2026", readTime: "12 min read",
        image: "/blog/backend-best-practices.png",
    },
    {
        slug: "microservices-communication-patterns",
        title: "Microservices Communication: When to Use REST, gRPC, and Message Queues",
        excerpt: "Choosing the wrong communication pattern can kill your microservice architecture. Here's a decision framework based on real production trade-offs.",
        category: "System Design",
        tags: ["Microservices", "Architecture", "Backend"],
        author: "Akash", date: "Feb 22, 2026", readTime: "10 min read",
        image: "/blog/system-design-interview.png",
    },
    {
        slug: "kubernetes-zero-to-production",
        title: "Kubernetes: From 'What Is a Pod?' to Production in 30 Days",
        excerpt: "A no-BS guide to learning Kubernetes. I'll show you the exact sequence — skip the fluff, focus on what actually matters when deploying real applications.",
        category: "DevOps",
        tags: ["DevOps", "Kubernetes", "Docker"],
        author: "Akash", date: "Feb 15, 2026", readTime: "15 min read",
        image: "/blog/devops-pipeline.png",
    },
    {
        slug: "building-rag-production",
        title: "Building a Production RAG System: Lessons from Real Failures",
        excerpt: "RAG looks simple in tutorials. Production is a different story. Here are the chunking disasters, retrieval failures, and cost explosions I've encountered — and how to fix them.",
        category: "GenAI",
        tags: ["GenAI", "RAG", "LLMs"],
        author: "Akash", date: "Feb 8, 2026", readTime: "14 min read",
        image: "/blog/rag-production.png",
    },
    {
        slug: "api-design-principles",
        title: "7 API Design Principles That Will Make Your Backend Unforgettable",
        excerpt: "Good APIs aren't accidents. They're designed. These 7 principles from building production APIs will change how you think about endpoint design forever.",
        category: "Backend",
        tags: ["Backend", "API Design", "REST"],
        author: "Akash", date: "Feb 1, 2026", readTime: "9 min read",
        image: "/blog/api-design.png",
    },
];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
    const featured = posts.find((p) => p.featured);
    const rest = filtered.filter((p) => !p.featured || activeCategory !== "All");

    return (
        <div className="min-h-screen bg-background">

            {/* Hero */}
            <section className="border-b border-border">
                <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="font-mono text-xs font-semibold text-neon uppercase tracking-[0.12em]">
                                Engineering Blog
                            </span>
                            <h1 className="font-display font-bold text-foreground leading-tight mt-3"
                                style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
                                Deep Dives, System Design,{" "}
                                <span className="text-neon">&amp; Production Lessons</span>
                            </h1>

                            <form className="mt-8 flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 h-11 px-4 rounded-xl bg-surface border border-border text-foreground text-[13px] placeholder:text-foreground/25 focus:outline-none focus:border-neon/30 transition-colors"
                                />
                                <button type="submit" className="h-11 px-6 rounded-xl bg-neon text-background font-bold text-[13px] hover:bg-neon/90 transition-colors flex-shrink-0">
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-[11px] text-foreground/20 mt-2">No spam, unsubscribe anytime. New articles every week.</p>
                        </div>

                        <div className="hidden lg:block text-right">
                            <p className="text-[15px] text-foreground/40 leading-relaxed max-w-[380px] ml-auto mb-4">
                                Subscribe to get weekly engineering deep-dives — system design breakdowns, production war stories, and the skills that actually get you hired.
                            </p>
                            <div className="flex items-center justify-end gap-4 text-[12px] text-foreground/25">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                                    {posts.length} articles
                                </span>
                                <span>·</span>
                                <span>Updated weekly</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featured && activeCategory === "All" && (
                <section className="max-w-[1200px] mx-auto px-6 py-12">
                    <Link href={`/blog/${featured.slug}`}
                        className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-surface border border-border rounded-2xl overflow-hidden hover:border-neon/30 transition-all">
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <Image src={featured.image} alt={featured.title} fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1.5 bg-neon text-background text-[10px] font-mono font-black uppercase tracking-[0.08em] rounded-full">
                                    Featured
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center p-8 lg:p-10">
                            <div className="flex items-center gap-2 text-[11px] text-foreground/30 mb-4">
                                <span className="font-medium text-foreground/60">{featured.author}</span>
                                <span>·</span>
                                <span>{featured.date}</span>
                                <span>·</span>
                                <span>{featured.readTime}</span>
                            </div>
                            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground group-hover:text-neon transition-colors mb-4 leading-tight">
                                {featured.title}
                            </h2>
                            <p className="text-[14px] text-foreground/40 leading-relaxed mb-6 line-clamp-3">
                                {featured.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {featured.tags.map((tag) => (
                                    <span key={tag} className="px-2.5 py-0.5 text-[10px] font-medium rounded-full border border-border text-foreground/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Category Tabs */}
            <section className="max-w-[1200px] mx-auto px-6">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? "bg-neon/10 text-neon"
                                : "text-foreground/30 hover:text-foreground/60 hover:bg-surface-raised"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Blog Grid */}
            <section className="max-w-[1200px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rest.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}
                            className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-neon/30 hover:-translate-y-0.5 transition-all duration-200">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <Image src={post.image} alt={post.title} fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col p-7">
                                <div className="flex items-center gap-2 text-[11px] text-foreground/25 mb-3">
                                    <span className="font-medium text-foreground/50">{post.author}</span>
                                    <span>·</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="font-display font-bold text-foreground text-[16px] leading-snug mb-3 group-hover:text-neon transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-[13px] text-foreground/40 leading-relaxed mb-5 line-clamp-3 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="px-2.5 py-0.5 text-[10px] font-medium rounded-full border border-border text-foreground/25">
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="ml-auto text-[11px] text-foreground/20 self-center">{post.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {rest.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-foreground/30 text-sm">No articles in this category yet.</p>
                    </div>
                )}
            </section>

            {/* Bottom CTA */}
            <section className="max-w-[1200px] mx-auto px-6 pb-24">
                <div className="border border-border rounded-2xl p-12 text-center bg-surface">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                        Want structured learning?
                    </h2>
                    <p className="text-[14px] text-foreground/40 mb-8 max-w-md mx-auto leading-relaxed">
                        Our phase-based roadmaps turn these concepts into a clear, step-by-step path.
                    </p>
                    <Link href="/learn" className="inline-flex px-8 py-4 bg-neon text-background font-bold text-[15px] rounded-xl hover:bg-neon/90 transition-colors shadow-neon-sm active:scale-[0.98]">
                        Explore Learning Tracks →
                    </Link>
                </div>
            </section>
        </div>
    );
}
