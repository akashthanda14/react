import Link from "next/link";

export const metadata = {
    title: "System Design Interviews",
    description: "A focused system design reading page with side navigation, article content, and progress tracking.",
};

const sidebarGroups = [
    {
        title: "Welcome",
        progress: "0/3",
        items: ["Course Roadmap", "Join the Community"],
    },
    {
        title: "Introduction",
        progress: "2/2",
        items: ["What are System Design Interviews?", "Types of System Design Questions"],
    },
    {
        title: "Core Concepts",
        progress: "3/9",
        items: ["Scalability", "Availability", "Reliability", "CAP Theorem", "Consistency Models"],
    },
    {
        title: "Networking",
        progress: "0/8",
        items: ["DNS", "TCP/IP", "Latency", "CDNs"],
    },
    {
        title: "Load Balancing",
        progress: "0/4",
        items: ["Round Robin", "Least Connections", "Sticky Sessions"],
    },
    {
        title: "API Fundamentals",
        progress: "0/15",
        items: ["HTTP Methods", "REST", "Pagination", "Authentication"],
    },
    {
        title: "Communication Patterns",
        progress: "0/11",
        items: ["Synchronous", "Asynchronous", "Queues", "Pub/Sub"],
    },
];

const toc = [
    "Measuring Availability",
    "Common Failure Modes",
    "Redundancy: The Foundation of Availability",
    "High Availability Patterns",
];

const relatedTopics = [
    "Scalability",
    "Reliability",
    "Latency vs Throughput",
    "CAP Theorem",
    "Load Balancing",
    "Caching",
];

function SidebarSection({
    title,
    progress,
    items,
}: {
    title: string;
    progress: string;
    items: string[];
}) {
    return (
        <section className="border-b border-border/70 pb-4 last:border-b-0 last:pb-0">
            <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-display text-[15px] font-semibold text-foreground">{title}</h3>
                <span className="text-[11px] text-foreground/35">{progress}</span>
            </div>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-foreground/55">
                        <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function TocLink({ label, active = false }: { label: string; active?: boolean }) {
    return (
        <a
            href={`#${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className={`block rounded-lg px-2 py-1.5 text-[13px] transition-colors ${
                active ? "bg-neon/10 text-neon" : "text-foreground/50 hover:text-foreground"
            }`}
        >
            {label}
        </a>
    );
}

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/6 p-5">
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
                <span className="text-lg">▣</span>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
            </div>
            <div className="text-[15px] leading-relaxed text-foreground/75">{children}</div>
        </div>
    );
}

export default function SystemDesignPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
            <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" aria-hidden="true" />
            <div
                className="absolute right-0 top-0 h-[520px] w-[520px] pointer-events-none opacity-60"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0,212,255,0.14) 0%, rgba(0,212,255,0.05) 42%, transparent 70%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1600px] px-3 py-3 sm:px-4 lg:px-5">
                <div className="flex min-h-[calc(100vh-1.5rem)] gap-4">
                    <aside className="hidden w-[320px] shrink-0 xl:block">
                        <div className="sticky top-3 rounded-2xl border border-border bg-surface/90 p-4 shadow-neon-sm backdrop-blur-xl">
                            <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-4">
                                <div>
                                    <div className="flex items-center gap-2 text-neon">
                                        <span className="text-lg">📗</span>
                                        <h2 className="font-display text-[17px] font-semibold leading-tight text-foreground">
                                            System Design Interviews
                                        </h2>
                                    </div>
                                    <p className="mt-1 text-[12px] text-foreground/35">Progress</p>
                                    <div className="mt-2 h-1.5 rounded-full bg-foreground/10">
                                        <div className="h-full w-[5%] rounded-full bg-neon" />
                                    </div>
                                    <p className="mt-1 text-[11px] text-foreground/35">0/169 chapters</p>
                                </div>
                                <button className="grid h-8 w-8 place-items-center rounded-full border border-border bg-background/60 text-foreground/55">
                                    ←
                                </button>
                            </div>

                            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background/55 px-3 py-2">
                                <span className="text-foreground/35">⌕</span>
                                <input
                                    aria-label="Search topics"
                                    placeholder="Search topics..."
                                    className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-foreground/30"
                                />
                                <button className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface text-foreground/50">⛃</button>
                            </div>

                            <div className="mt-4 space-y-4 max-h-[calc(100vh-13rem)] overflow-y-auto pr-1">
                                {sidebarGroups.map((group) => (
                                    <SidebarSection key={group.title} {...group} />
                                ))}
                            </div>

                            <div className="mt-4 rounded-xl border border-border bg-background/55 p-3 text-[12px] text-foreground/40">
                                <p className="font-medium text-foreground/65">Vote/Request Content</p>
                                <p className="mt-1">Help shape the next topics in the course roadmap.</p>
                            </div>
                        </div>
                    </aside>

                    <main className="min-w-0 flex-1">
                        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
                            <article className="rounded-2xl border border-border bg-surface/90 px-4 py-4 shadow-neon-sm backdrop-blur-xl sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                                <div className="flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">Availability</h1>
                                        <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-foreground/45">
                                            <span className="inline-flex items-center gap-1.5">
                                                <span className="h-2 w-2 rounded-full bg-neon" />
                                                Ashish Pratap Singh
                                            </span>
                                            <span className="hidden h-1 w-1 rounded-full bg-foreground/25 sm:inline-block" />
                                            <span>3 min read</span>
                                        </div>
                                    </div>
                                    <div className="text-[13px] text-foreground/35">Last Updated: January 6, 2026</div>
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/55 p-3 sm:p-4">
                                    <button className="flex items-center gap-2 rounded-full bg-neon/10 px-4 py-2 text-[13px] font-medium text-neon">
                                        ▶ Listen to this article
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <button className="rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground/70">Male Voice</button>
                                        <button className="rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground/45">Female Voice</button>
                                        <button className="rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground/45">1x</button>
                                    </div>
                                </div>

                                <div className="prose prose-invert mt-6 max-w-none prose-p:text-[16px] prose-p:leading-8 prose-p:text-foreground/72 prose-h2:font-display prose-h2:text-3xl prose-h2:text-foreground prose-h3:font-display prose-h3:text-2xl prose-h3:text-foreground prose-strong:text-foreground">
                                    <p>
                                        In the previous chapter, we learned how to scale systems to handle growing load. But scaling solves only half the problem. What good is a system that can handle millions of requests if it crashes when a single server fails?
                                    </p>

                                    <p>
                                        This is where <strong>availability</strong> comes in.
                                    </p>

                                    <Callout title="What Availability Measures">
                                        Availability measures how often your system is operational and accessible to users. A highly available system continues functioning even when individual components fail.
                                    </Callout>

                                    <p>
                                        One important distinction before we begin: <strong>availability</strong> is not the same as <strong>reliability</strong>. A system can be highly available (always up) but unreliable (sometimes gives wrong answers). We will explore reliability in the next chapter, but keep this distinction in mind.
                                    </p>

                                    <h2 id="measuring-availability">Measuring Availability</h2>
                                    <p>
                                        Availability is typically expressed as a percentage of uptime over a given period. The formula is straightforward: total uptime divided by total time, multiplied by 100.
                                    </p>

                                    <div className="rounded-2xl border border-border bg-background/55 p-5 not-prose">
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            {[
                                                ["99%", "About 3.65 days of downtime per year"],
                                                ["99.9%", "About 8.76 hours of downtime per year"],
                                                ["99.99%", "About 52.6 minutes of downtime per year"],
                                            ].map(([value, label]) => (
                                                <div key={value} className="rounded-2xl border border-border bg-surface p-4">
                                                    <div className="font-mono text-2xl font-bold text-neon">{value}</div>
                                                    <div className="mt-2 text-[13px] leading-relaxed text-foreground/45">{label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <h2 id="common-failure-modes">Common Failure Modes</h2>
                                    <p>
                                        Most outages are not dramatic. They usually come from ordinary problems like process crashes, network partitions, bad deployments, database saturation, or one dependency failing and taking the rest of the system down with it.
                                    </p>

                                    <h3>Single points of failure</h3>
                                    <p>
                                        Any component that can take the whole system down by itself is a risk. That includes a single app instance, a single database primary, or a shared queue without failover.
                                    </p>

                                    <h2 id="redundancy-the-foundation-of-availability">Redundancy: The Foundation of Availability</h2>
                                    <p>
                                        The simplest availability strategy is redundancy. If one instance fails, another should be able to take over. Redundancy shows up in app servers, databases, caches, queues, and even network paths.
                                    </p>

                                    <h2 id="high-availability-patterns">High Availability Patterns</h2>
                                    <p>
                                        High availability is usually achieved by combining redundancy with health checks, load balancing, failover, and graceful degradation. The goal is not to prevent every failure. The goal is to make failures invisible to users whenever possible.
                                    </p>
                                </div>

                                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    <Link href="/learn/system-design" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-[13px] text-foreground/70 transition-colors hover:border-neon/30 hover:text-neon">
                                        ‹ Scalability
                                    </Link>
                                    <div className="flex items-center gap-3">
                                        <button className="rounded-xl border border-border bg-background px-4 py-2 text-[13px] text-foreground/70">Take Notes</button>
                                        <button className="rounded-xl border border-border bg-background px-4 py-2 text-[13px] text-foreground/70">☆ Star</button>
                                        <button className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-[13px] font-medium text-emerald-400">● Completed</button>
                                        <button className="rounded-xl border border-border bg-background px-4 py-2 text-[13px] text-foreground/70">Ask AI</button>
                                    </div>
                                    <Link href="/learn/system-design" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-[13px] text-foreground/70 transition-colors hover:border-neon/30 hover:text-neon">
                                        Reliability ›
                                    </Link>
                                </div>
                            </article>

                            <aside className="hidden xl:block">
                                <div className="sticky top-3 space-y-4 rounded-2xl border border-border bg-surface/90 p-4 shadow-neon-sm backdrop-blur-xl">
                                    <div>
                                        <div className="flex items-center justify-between text-[12px] text-foreground/45">
                                            <span>Reading Progress</span>
                                            <span>0%</span>
                                        </div>
                                        <div className="mt-2 h-1.5 rounded-full bg-foreground/10">
                                            <div className="h-full w-0 rounded-full bg-neon" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-3 text-[13px] font-medium text-foreground/70">On this page</p>
                                        <div className="space-y-1">
                                            {toc.map((item, index) => (
                                                <TocLink key={item} label={item} active={index === 0} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-border bg-background/55 p-4">
                                        <p className="text-[12px] font-medium text-foreground/70">Quick Links</p>
                                        <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] text-foreground/50">
                                            {relatedTopics.map((topic) => (
                                                <span key={topic} className="rounded-lg border border-border bg-surface px-2 py-2 text-center">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </main>
                </div>
            </div>

            <button className="fixed right-0 top-1/2 z-20 -translate-y-1/2 rounded-l-xl bg-neon px-3 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-background shadow-neon-sm xl:block">
                Feedback
            </button>
        </div>
    );
}
