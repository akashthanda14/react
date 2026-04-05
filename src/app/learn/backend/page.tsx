import Link from "next/link";

export const metadata = {
    title: "Backend Engineering",
    description:
        "A branching backend roadmap covering fundamentals, architecture, data, scaling, and production systems.",
};

type Phase = {
    id: number;
    title: string;
    learn: string;
    outcome: string;
    milestones: string[];
    concepts: string[];
    project: string;
};

type DecisionBranch = {
    title: string;
    whenToUse: string;
    decision: string;
    task: string;
};

type Layer = {
    title: string;
    items: string[];
};

const phases: Phase[] = [
    {
        id: 1,
        title: "Fundamentals",
        learn: "HTTP request lifecycle, REST API design, relational databases, SQL vs NoSQL basics, authentication patterns",
        outcome: "Ship a CRUD API with clean endpoints, secure auth, and a durable database schema.",
        milestones: [
            "Build a REST API with CRUD operations",
            "Implement JWT-based authentication",
            "Design and query a relational database schema",
        ],
        concepts: [
            "HTTP methods, status codes, headers",
            "REST resource naming and pagination",
            "Tables, keys, indexes, transactions",
            "Session vs JWT trade-offs",
        ],
        project: "Task manager API with auth and Postgres",
    },
    {
        id: 2,
        title: "Architecture Patterns",
        learn: "MVC layering, service boundaries, microservices, event-driven communication, API versioning",
        outcome: "Design backend systems with separation of concerns and predictable change management.",
        milestones: [
            "Refactor a monolith into smaller services",
            "Implement event-driven communication between services",
            "Design API contracts with a versioning strategy",
        ],
        concepts: [
            "Controller → service → repository",
            "Monolith vs microservices",
            "Events, queues, and async workflows",
            "Idempotency and retry-safe APIs",
        ],
        project: "Refactor a blog API into layered modules",
    },
    {
        id: 3,
        title: "Data & Caching",
        learn: "Database optimization, indexing, Redis caching, message queues, consistency trade-offs",
        outcome: "Reduce latency and move expensive work off the critical path.",
        milestones: [
            "Implement Redis caching for frequently accessed data",
            "Optimize database queries with indexing",
            "Set up a message queue for async processing",
        ],
        concepts: [
            "Query plans and index selection",
            "Cache-aside pattern",
            "Write-through vs write-back",
            "Dead-letter queues and retries",
        ],
        project: "High-traffic content API with cache + queue",
    },
    {
        id: 4,
        title: "Scale & Performance",
        learn: "Load balancing, horizontal scaling, CDN delivery, sharding, read replicas, throughput tuning",
        outcome: "Handle growth with systems that stay fast under load.",
        milestones: [
            "Configure load balancer across multiple instances",
            "Implement database sharding strategy",
            "Explain horizontal vs vertical scaling trade-offs",
        ],
        concepts: [
            "Stateless services and autoscaling",
            "Read replicas and partitioning",
            "Latency vs throughput",
            "Edge caching and CDNs",
        ],
        project: "Design a media upload pipeline for scale",
    },
    {
        id: 5,
        title: "Production Systems",
        learn: "Monitoring, logs, tracing, error handling, zero-downtime deploys, security hardening",
        outcome: "Operate backend systems with visibility, reliability, and safe deployment practices.",
        milestones: [
            "Set up monitoring and alerting for a production system",
            "Implement structured logging and error tracking",
            "Deploy with a zero-downtime strategy",
        ],
        concepts: [
            "SLOs, alerts, and incident response",
            "Timeouts, retries, circuit breakers",
            "Secrets management and access control",
            "Rollback and blue-green deploys",
        ],
        project: "Production-ready SaaS backend with observability",
    },
];

const decisionBranches: DecisionBranch[] = [
    {
        title: "SQL vs NoSQL",
        whenToUse: "Use SQL when you need joins, transactions, and strong consistency. Use NoSQL when schema flexibility or write scaling matters more.",
        decision: "Choose the database by access pattern and consistency needs, not by hype.",
        task: "Model an e-commerce catalog in SQL, then compare it with a NoSQL activity-feed design.",
    },
    {
        title: "Monolith vs Microservices",
        whenToUse: "Keep a monolith when the team is small and the domain is still evolving. Split only when boundaries are clear and scale demands it.",
        decision: "Split by business boundaries, not by technical curiosity.",
        task: "Refactor one feature into an isolated service with its own database and async events.",
    },
    {
        title: "Cache-aside vs Write-through",
        whenToUse: "Use cache-aside for most backend APIs; reserve write-through for cases that demand strict cache freshness.",
        decision: "Start with cache-aside and add invalidation discipline before reaching for more complex caching models.",
        task: "Add Redis caching to one read-heavy endpoint and measure the latency win.",
    },
];

const advancedLayers: Layer[] = [
    {
        title: "Scaling",
        items: [
            "Design for stateless services and autoscaling",
            "Use read replicas and sharding for heavy traffic",
            "Plan capacity before traffic forces you to react",
        ],
    },
    {
        title: "System Design",
        items: [
            "Design a URL shortener",
            "Design a notification pipeline",
            "Design a file upload and processing flow",
        ],
    },
    {
        title: "Production Practices",
        items: [
            "Define SLOs and alert thresholds",
            "Build rollback and incident-response habits",
            "Make failures visible, not silent",
        ],
    },
];

const plan30_60_90 = [
    {
        window: "Days 1–30",
        points: [
            "Learn HTTP, REST design, auth flows, and relational schema modeling.",
            "Build one CRUD API with JWT auth and database integration.",
            "Ship a small project: task manager or notes API.",
        ],
    },
    {
        window: "Days 31–60",
        points: [
            "Add caching, queues, and service layering to one project.",
            "Practice API versioning and error-handling patterns.",
            "Ship a medium project: blog backend or ecommerce API.",
        ],
    },
    {
        window: "Days 61–90",
        points: [
            "Add observability, load testing, and deployment hardening.",
            "Study scaling patterns and system design trade-offs.",
            "Ship a production-style capstone with monitoring and rollback.",
        ],
    },
];

const mistakes = [
    "Learning frameworks before understanding HTTP, SQL, and auth.",
    "Treating caching as default instead of a measured optimization.",
    "Using microservices before boundaries and ownership are clear.",
    "Skipping logs, metrics, and error handling until production breaks.",
    "Copying auth code without understanding session and JWT trade-offs.",
];

const top1 = [
    "They explain trade-offs, not just syntax.",
    "They measure performance with real numbers.",
    "They design for failure from day one.",
    "They debug databases, caches, and queues quickly.",
    "They ship deployable, observable projects.",
];

function SectionTitle({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neon">
                {eyebrow}
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/45">
                {description}
            </p>
        </div>
    );
}

function TreeDot({ label }: { label: string }) {
    return (
        <div className="absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-neon/30 bg-background text-[10px] font-mono font-bold text-neon shadow-neon-sm">
            {label}
        </div>
    );
}

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-2xl border border-border bg-background/55 px-4 py-3 backdrop-blur-sm">
            <div className="font-mono text-2xl font-bold text-neon">{value}</div>
            <div className="mt-1 text-[12px] text-foreground/35">{label}</div>
        </div>
    );
}

export default function BackendRoadmapPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
            <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" aria-hidden="true" />
            <div
                className="absolute top-0 right-0 h-[560px] w-[560px] pointer-events-none opacity-60"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0,229,153,0.12) 0%, rgba(0,229,153,0.04) 42%, transparent 70%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 text-[13px] text-foreground/35 transition-colors hover:text-foreground"
                >
                    ← All Tracks
                </Link>

                <header className="mt-6 rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="text-3xl">⚙️</span>
                                <span className="rounded-full border border-neon/20 bg-neon/8 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-neon">
                                    5 phases · 40h
                                </span>
                            </div>
                            <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                                Backend Engineering
                                <span className="block text-neon">Branching roadmap for building production systems</span>
                            </h1>
                            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/45">
                                Master server-side development through a tree-structured path: fundamentals,
                                architecture, data and caching, scale, and production systems — with explicit
                                decision branches and practical checkpoints.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[420px]">
                            <StatCard value="5" label="phases" />
                            <StatCard value="12+" label="projects & tasks" />
                            <StatCard value="3" label="decision branches" />
                            <StatCard value="90" label="day execution plan" />
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {["HTTP", "REST", "Databases", "Redis", "Queues", "Load Balancing", "Monitoring"].map((pill) => (
                            <span
                                key={pill}
                                className="rounded-full border border-border bg-background/45 px-3 py-1 text-[12px] text-foreground/45"
                            >
                                {pill}
                            </span>
                        ))}
                    </div>
                </header>

                <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="space-y-6">
                        <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                            <SectionTitle
                                eyebrow="Root Goal"
                                title="Backend Engineering"
                                description="Build APIs, data layers, caches, queues, and production-grade services that can survive real traffic."
                            />

                            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {[
                                    ["Goal", "Ship production-ready backend systems"],
                                    ["Outcome", "Clean APIs, reliable data flow, observability"],
                                    ["Execution", "Learn → build → measure → harden"],
                                    ["Checkpoints", "Phase milestone + project idea"],
                                ].map(([label, value]) => (
                                    <div key={label} className="rounded-2xl border border-border bg-background/55 p-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/30">
                                            {label}
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-foreground/65">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                            <SectionTitle
                                eyebrow="Core Branch"
                                title="Fundamentals → Architecture → Data → Scale → Production"
                                description="Each phase expands the trunk of the roadmap and then branches into a project task, checkpoint, and real-world skills."
                            />

                            <div className="relative mt-8 pl-8">
                                <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-neon/50 via-border to-transparent" />
                                <div className="space-y-5">
                                    {phases.map((phase) => (
                                        <div key={phase.id} className="relative">
                                            <TreeDot label={String(phase.id)} />
                                            <div className="ml-10 rounded-2xl border border-border bg-background/55 p-5 transition-colors hover:border-neon/20 hover:bg-surface-raised">
                                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                                    <div>
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neon">
                                                                Phase {phase.id}
                                                            </span>
                                                            <span className="h-1 w-1 rounded-full bg-foreground/25" />
                                                            <h3 className="font-display text-xl font-bold text-foreground">
                                                                {phase.title}
                                                            </h3>
                                                        </div>
                                                        <p className="max-w-2xl text-[14px] leading-relaxed text-foreground/45">
                                                            {phase.learn}
                                                        </p>
                                                    </div>
                                                    <span className="w-fit rounded-full border border-neon/20 bg-neon/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neon">
                                                        {phase.project}
                                                    </span>
                                                </div>

                                                <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
                                                    <div>
                                                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/25">
                                                            Outcome
                                                        </p>
                                                        <p className="mt-2 text-[14px] leading-relaxed text-foreground/60">
                                                            {phase.outcome}
                                                        </p>

                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            {phase.concepts.map((concept) => (
                                                                <span
                                                                    key={concept}
                                                                    className="rounded-full border border-border bg-background/50 px-3 py-1 text-[12px] text-foreground/55"
                                                                >
                                                                    {concept}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="rounded-2xl border border-border bg-background/45 p-4">
                                                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/25">
                                                            Milestones
                                                        </p>
                                                        <ul className="mt-3 space-y-2">
                                                            {phase.milestones.map((milestone) => (
                                                                <li key={milestone} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/45">
                                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon" />
                                                                    <span>{milestone}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                            <SectionTitle
                                eyebrow="Decision Branches"
                                title="Pick the right path when the problem changes"
                                description="These are the common backend trade-offs that separate textbook knowledge from production judgment."
                            />

                            <div className="mt-6 grid gap-4 xl:grid-cols-3">
                                {decisionBranches.map((branch) => (
                                    <div key={branch.title} className="rounded-2xl border border-border bg-background/55 p-5">
                                        <div className="mb-3 flex items-center justify-between gap-3">
                                            <h3 className="font-display text-lg font-bold text-foreground">{branch.title}</h3>
                                            <span className="rounded-full border border-neon/20 bg-neon/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neon">
                                                Branch
                                            </span>
                                        </div>
                                        <p className="text-[13px] leading-relaxed text-foreground/45">
                                            {branch.whenToUse}
                                        </p>
                                        <div className="mt-4 rounded-2xl border border-neon/15 bg-neon/5 p-4">
                                            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neon/70">
                                                Decision rule
                                            </p>
                                            <p className="mt-2 text-[13px] leading-relaxed text-foreground/70">
                                                {branch.decision}
                                            </p>
                                        </div>
                                        <p className="mt-4 text-[13px] leading-relaxed text-foreground/45">
                                            Task: {branch.task}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                        <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                            <SectionTitle
                                eyebrow="Advanced Layer"
                                title="Scaling, System Design, Production"
                                description="The upper branches of the roadmap where you apply backend fundamentals to real constraints."
                            />
                            <div className="mt-6 space-y-4">
                                {advancedLayers.map((layer) => (
                                    <div key={layer.title} className="rounded-2xl border border-border bg-background/55 p-4">
                                        <h3 className="font-display text-lg font-bold text-foreground">{layer.title}</h3>
                                        <ul className="mt-3 space-y-2">
                                            {layer.items.map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/45">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                            <SectionTitle
                                eyebrow="30-60-90 Days"
                                title="How to actually follow this roadmap"
                                description="Use the roadmap as a progression plan instead of a content list."
                            />
                            <div className="mt-6 space-y-4">
                                {plan30_60_90.map((slot) => (
                                    <div key={slot.window} className="rounded-2xl border border-border bg-background/55 p-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neon">
                                            {slot.window}
                                        </p>
                                        <ul className="mt-3 space-y-2">
                                            {slot.points.map((point) => (
                                                <li key={point} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/45">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground/30" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                            <SectionTitle
                                eyebrow="Common Mistakes"
                                title="What to avoid"
                                description="These are the habits that slow backend learners down the most."
                            />
                            <ul className="mt-6 space-y-3">
                                {mistakes.map((mistake) => (
                                    <li key={mistake} className="rounded-2xl border border-border bg-background/55 p-4 text-[13px] leading-relaxed text-foreground/45">
                                        {mistake}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                            <SectionTitle
                                eyebrow="Top 1%"
                                title="What separates elite learners"
                                description="They don't just consume — they build, measure, and explain trade-offs well."
                            />
                            <ul className="mt-6 space-y-3">
                                {top1.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/45">
                                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </section>

                <div className="mt-6 rounded-3xl border border-border bg-surface/90 p-6 text-center shadow-neon-sm backdrop-blur-xl">
                    <p className="text-[14px] leading-relaxed text-foreground/35">
                        Each phase builds on the previous. Work through them in order, build the project,
                        and make one real-world deployment per phase.
                    </p>
                </div>
            </div>
        </div>
    );
}
