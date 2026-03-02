import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [

    // ============================================================
    // TRACK 1: Full Stack Engineer
    // ============================================================
    {
        name: 'Full Stack Engineer',
        slug: 'backend',
        description: 'Master frontend, backend, databases, APIs, and deployment to ship production-grade full stack applications',
        icon: 'Code',
        order: 1,
        phases: [
            {
                name: 'Phase 1 — Foundations',
                description: 'Build rock-solid fundamentals in HTML, CSS, JavaScript, TypeScript, Git, and HTTP that every full stack engineer must master before anything else.',
                outcome: 'Build and deploy a responsive static site with DOM interactions, version-controlled with Git, served over HTTP',
                order: 1,
                skills: [
                    { name: 'HTML5 & Semantic CSS', description: 'Semantic elements, Flexbox, Grid, responsive design, accessibility basics', order: 1 },
                    { name: 'JavaScript Core', description: 'ES6+, closures, async/await, Promises, event loop, DOM manipulation', order: 2 },
                    { name: 'TypeScript Fundamentals', description: 'Types, interfaces, generics, enums, strict mode — typed JS from day one', order: 3 },
                    { name: 'Git & GitHub Workflow', description: 'Branching, rebasing, PRs, code reviews, conventional commits, .gitignore', order: 4 },
                    { name: 'HTTP & Web Fundamentals', description: 'Request/response lifecycle, status codes, headers, cookies, REST basics', order: 5 },
                ],
                milestones: [
                    { title: 'Build a responsive portfolio site with semantic HTML, CSS Grid, and vanilla JS', order: 1 },
                    { title: 'Write a TypeScript CLI tool with strict mode enabled', order: 2 },
                    { title: 'Set up a Git workflow with branches, PRs, and conventional commits on GitHub', order: 3 },
                ],
            },
            {
                name: 'Phase 2 — Core Stack',
                description: 'Learn React, Next.js, Node.js, and PostgreSQL — the core technologies powering most modern full stack applications.',
                outcome: 'Build a full stack CRUD app with a React frontend, Node.js/Express backend, and PostgreSQL database with authentication',
                order: 2,
                skills: [
                    { name: 'React & Next.js', description: 'Components, hooks, state, RSC, App Router, SSR/SSG, React Query, Zustand', order: 1 },
                    { name: 'Node.js & API Design', description: 'Express/Fastify, REST API design, middleware, error handling, input validation (Zod)', order: 2 },
                    { name: 'PostgreSQL & Prisma ORM', description: 'Schema design, relations, migrations, indexing, raw SQL, Prisma client', order: 3 },
                    { name: 'Authentication & Security', description: 'JWT, sessions, NextAuth/Auth.js, OAuth2, bcrypt, HTTPS, CORS, rate limiting', order: 4 },
                    { name: 'Tailwind CSS & UI Systems', description: 'Utility-first CSS, component libraries (shadcn/ui), dark mode, design tokens', order: 5 },
                ],
                milestones: [
                    { title: 'Build a full stack task manager with React, Next.js App Router, and PostgreSQL via Prisma', order: 1 },
                    { title: 'Implement authentication (sign up, login, OAuth) using NextAuth with JWT sessions', order: 2 },
                    { title: 'Design a RESTful API with Zod validation, error handling middleware, and Swagger docs', order: 3 },
                ],
            },
            {
                name: 'Phase 3 — Advanced & Production-Grade',
                description: 'Level up with performance optimization, testing, WebSockets, caching, Docker, and production deployment patterns.',
                outcome: 'Deploy a production-grade full stack app with CI/CD, containerization, tests, and real-time features',
                order: 3,
                skills: [
                    { name: 'Testing (Unit, Integration, E2E)', description: 'Vitest, Jest, Supertest, Playwright, React Testing Library — test pyramid strategy', order: 1 },
                    { name: 'Performance & Core Web Vitals', description: 'LCP, FID, CLS, code splitting, lazy loading, image optimization, bundle analysis', order: 2 },
                    { name: 'WebSockets & Real-Time', description: 'Socket.io, Server-Sent Events, WebRTC basics, presence systems', order: 3 },
                    { name: 'Redis & Caching Strategy', description: 'Session storage, cache-aside pattern, pub/sub, job queues (BullMQ)', order: 4 },
                    { name: 'Docker & CI/CD Basics', description: 'Dockerfile, docker-compose, GitHub Actions for auto-deploy, environment management', order: 5 },
                ],
                milestones: [
                    { title: 'Add unit + integration + E2E tests achieving 80%+ coverage on a full stack project', order: 1 },
                    { title: 'Build a real-time collaborative feature (e.g. live cursors or chat) using WebSockets', order: 2 },
                    { title: 'Containerize the app with Docker and set up a GitHub Actions CI/CD pipeline', order: 3 },
                ],
            },
            {
                name: 'Phase 4 — Real-World Projects',
                description: 'Build portfolio-worthy projects that demonstrate senior-level skills: SaaS, e-commerce, developer tools, and real-time apps.',
                outcome: 'Ship 2–3 complete, publicly deployed full stack products with clean code, documentation, and CI/CD',
                order: 4,
                skills: [
                    { name: 'SaaS Architecture', description: 'Multi-tenancy, subscription billing (Stripe), usage limits, org/user management, webhooks', order: 1 },
                    { name: 'File Uploads & Media', description: 'S3/Cloudflare R2, presigned URLs, image processing (Sharp), video streaming', order: 2 },
                    { name: 'Search & Recommendations', description: 'Full-text search (Postgres tsvector, Elasticsearch), fuzzy matching, filters', order: 3 },
                    { name: 'Email & Notifications', description: 'Transactional email (Resend, Postmark), push notifications, in-app notifications', order: 4 },
                    { name: 'Feature Flags & Analytics', description: 'Posthog, LaunchDarkly, A/B testing, event tracking, funnel analysis', order: 5 },
                ],
                milestones: [
                    { title: 'Build and deploy a SaaS starter with Stripe subscriptions, auth, and a dashboard', order: 1 },
                    { title: 'Build a real-time chat application with file sharing, read receipts, and presence', order: 2 },
                    { title: 'Build a developer tool (e.g. API playground, schema editor) with public launch', order: 3 },
                ],
            },
            {
                name: 'Phase 5 — Interview Preparation',
                description: 'Prepare for senior full stack roles with coding challenges, system design for web apps, and behavioral interviews.',
                outcome: 'Pass technical screens at top-tier companies with strong code quality, system thinking, and clear communication',
                order: 5,
                skills: [
                    { name: 'JavaScript / TypeScript Deep Dive', description: 'Prototypes, closures, event loop, garbage collection, TS advanced types', order: 1 },
                    { name: 'React Internals', description: 'Reconciliation, fiber, concurrent rendering, hydration, Suspense boundaries', order: 2 },
                    { name: 'Backend & Database Design Q&A', description: 'N+1 queries, indexing strategies, API versioning, caching trade-offs', order: 3 },
                    { name: 'Coding Challenges', description: 'LeetCode (medium), sliding window, trees, graphs, DP basics for frontend-focused roles', order: 4 },
                    { name: 'System Design for Web Apps', description: 'Design Instagram, URL shortener, notification service — with web-specific trade-offs', order: 5 },
                ],
                milestones: [
                    { title: 'Solve 50 LeetCode medium problems with clean, typed TypeScript solutions', order: 1 },
                    { title: 'Present a system design for a social feed or content platform in 45 minutes', order: 2 },
                    { title: 'Complete 5 take-home projects or coding screens with full test coverage', order: 3 },
                ],
            },
            {
                name: 'Phase 6 — Industry Tools & Best Practices',
                description: 'Master the tools, workflows, and standards used by senior engineers at top companies to ship reliable, secure, scalable software.',
                outcome: 'Operate like a senior engineer — owning deployment, monitoring, security, and developer experience end-to-end',
                order: 6,
                skills: [
                    { name: 'Observability & Monitoring', description: 'Sentry (error tracking), Datadog / Grafana (APM), structured logging, alerting', order: 1 },
                    { name: 'Security Best Practices', description: 'OWASP Top 10, CSP headers, SQL injection, XSS, CSRF, dependency audits (npm audit)', order: 2 },
                    { name: 'Developer Experience (DX)', description: 'Monorepos (Turborepo), linting (ESLint), formatting (Prettier), husky pre-commit hooks', order: 3 },
                    { name: 'Cloud Deployment', description: 'Vercel, Railway, Fly.io, AWS (EC2 + RDS + S3), environment management, secrets handling', order: 4 },
                    { name: 'Documentation & APIs', description: 'OpenAPI/Swagger, README standards, ADRs, Storybook for UI component docs', order: 5 },
                ],
                milestones: [
                    { title: 'Set up full observability (error tracking + APM + structured logs) on a production app', order: 1 },
                    { title: 'Perform a security audit (OWASP checklist) on an existing project and fix all critical issues', order: 2 },
                    { title: 'Configure a Turborepo monorepo with shared packages, CI/CD, and auto-deploy to Vercel', order: 3 },
                ],
            },
        ],
    },

    // ============================================================
    // TRACK 2: DevOps Engineer
    // ============================================================
    {
        name: 'DevOps Engineer',
        slug: 'devops',
        description: 'Master Linux, CI/CD, containers, Kubernetes, cloud infrastructure, and observability to build and operate production systems',
        icon: 'Cloud',
        order: 2,
        phases: [
            {
                name: 'Phase 1 — Foundations',
                description: 'Build the bedrock skills every DevOps engineer needs: Linux mastery, networking, shell scripting, Git, and DevOps culture.',
                outcome: 'Manage Linux servers confidently, write automation scripts, understand networking, and explain DevOps principles',
                order: 1,
                skills: [
                    { name: 'Linux & Shell Mastery', description: 'File system, permissions, processes, systemd, cron, package managers (apt/yum)', order: 1 },
                    { name: 'Bash Scripting & Automation', description: 'Variables, loops, functions, error handling, cron jobs, script debugging', order: 2 },
                    { name: 'Networking Fundamentals', description: 'TCP/IP, DNS, HTTP/HTTPS, subnetting, firewalls, load balancers, VPNs', order: 3 },
                    { name: 'Git & Branching Strategies', description: 'Git Flow, trunk-based development, PR workflows, conventional commits, rebase', order: 4 },
                    { name: 'DevOps Culture & SDLC', description: 'DevOps principles, SDLC phases, Agile/Scrum, SRE vs DevOps, feedback loops', order: 5 },
                ],
                milestones: [
                    { title: 'Configure, harden, and automate setup of a bare Linux server using a bash script', order: 1 },
                    { title: 'Write a monitoring script that sends alerts when disk/CPU thresholds are exceeded', order: 2 },
                    { title: 'Implement Git Flow with branch protection rules on a team repository', order: 3 },
                ],
            },
            {
                name: 'Phase 2 — Core Stack',
                description: 'Learn the tools every DevOps engineer uses daily: Docker, CI/CD pipelines, Kubernetes basics, Terraform, and cloud fundamentals.',
                outcome: 'Containerize apps, build CI/CD pipelines, deploy to Kubernetes, and provision cloud infrastructure with Terraform',
                order: 2,
                skills: [
                    { name: 'Docker & Containerization', description: 'Dockerfile best practices, multi-stage builds, docker-compose, container registries, security scanning', order: 1 },
                    { name: 'CI/CD Pipelines', description: 'GitHub Actions, Jenkins, GitLab CI — pipeline design, caching, secrets, matrix builds, rollback', order: 2 },
                    { name: 'Kubernetes Fundamentals', description: 'Pods, deployments, services, ingress, ConfigMaps, Secrets, namespaces, kubectl', order: 3 },
                    { name: 'Terraform & IaC', description: 'HCL syntax, providers, state management, modules, workspaces, plan/apply workflow', order: 4 },
                    { name: 'Cloud Fundamentals (AWS/GCP/Azure)', description: 'Compute, storage, networking, IAM, managed databases, serverless, billing basics', order: 5 },
                ],
                milestones: [
                    { title: 'Containerize a multi-service app with Docker Compose and push images to a registry', order: 1 },
                    { title: 'Build a full CI/CD pipeline with testing, Docker build, and deployment to Kubernetes', order: 2 },
                    { title: 'Provision a multi-tier cloud environment (VPC, EC2, RDS, S3) using Terraform modules', order: 3 },
                ],
            },
            {
                name: 'Phase 3 — Advanced & Production-Grade',
                description: 'Master Kubernetes at scale, observability, DevSecOps, GitOps, and service mesh to operate production systems reliably.',
                outcome: 'Run and debug production Kubernetes clusters, implement full observability, and embed security into every pipeline stage',
                order: 3,
                skills: [
                    { name: 'Kubernetes Advanced', description: 'Helm, HPA/VPA, RBAC, network policies, StatefulSets, PVCs, cluster upgrades, Kustomize', order: 1 },
                    { name: 'Observability Stack', description: 'Prometheus + Grafana, ELK/OpenSearch, Jaeger/OpenTelemetry, alerting, SLIs/SLOs/error budgets', order: 2 },
                    { name: 'DevSecOps', description: 'Snyk, Trivy, SAST/DAST in pipelines, Vault for secrets, Zero Trust, compliance (SOC2, GDPR)', order: 3 },
                    { name: 'GitOps (ArgoCD / Flux)', description: 'Git as source of truth, sync strategies, rollback, progressive delivery (Argo Rollouts)', order: 4 },
                    { name: 'Service Mesh (Istio / Linkerd)', description: 'mTLS, traffic management, canary routing, circuit breaking, observability sidecar', order: 5 },
                ],
                milestones: [
                    { title: 'Set up a Prometheus + Grafana monitoring stack with custom alerts and SLO dashboards', order: 1 },
                    { title: 'Implement GitOps with ArgoCD — git push to staging triggers automated deploy to K8s', order: 2 },
                    { title: 'Integrate Trivy + Snyk into CI pipeline and configure Vault for secrets injection', order: 3 },
                ],
            },
            {
                name: 'Phase 4 — Real-World Projects',
                description: 'Build the capstone DevOps projects that showcase senior-level competence: end-to-end pipelines, platform engineering, and multi-cloud infra.',
                outcome: 'Portfolio of complete, documented DevOps projects demonstrating real production patterns',
                order: 4,
                skills: [
                    { name: 'Platform Engineering', description: 'Internal developer platforms, golden paths, self-service infra (Backstage, Port)', order: 1 },
                    { name: 'Multi-Cloud & Hybrid Strategy', description: 'Cloud-agnostic Terraform, cost optimization, disaster recovery, multi-region setup', order: 2 },
                    { name: 'Kubernetes Deployment Patterns', description: 'Blue-green, canary, rolling updates, feature flags in K8s, Argo Rollouts', order: 3 },
                    { name: 'Database Operations (DBOps)', description: 'Automated backups, point-in-time recovery, schema migrations in pipelines, RDS, CloudSQL', order: 4 },
                    { name: 'Performance & Cost Engineering', description: 'Right-sizing instances, Spot/Preemptible VMs, cluster auto-scaler, KEDA, FinOps', order: 5 },
                ],
                milestones: [
                    { title: 'Build a complete Jenkins + ArgoCD GitOps pipeline for a microservices app on K8s', order: 1 },
                    { title: 'Deploy a multi-region, highly available infrastructure on AWS using Terraform with DR plan', order: 2 },
                    { title: 'Implement progressive delivery (canary) with Argo Rollouts, linked to Prometheus metrics', order: 3 },
                ],
            },
            {
                name: 'Phase 5 — Interview Preparation',
                description: 'Prepare for senior DevOps / SRE / platform engineering roles with scenario-based questions, live troubleshooting, and system design.',
                outcome: 'Confidently answer DevOps interview questions, K8s troubleshooting scenarios, and cloud architecture problems',
                order: 5,
                skills: [
                    { name: 'DevOps Scenario Q&A', description: 'CI/CD bottlenecks, zero-downtime deploys, rollback strategies, incident response scenarios', order: 1 },
                    { name: 'Kubernetes Troubleshooting', description: 'CrashLoopBackOff, OOMKilled, ImagePullBackOff, network policy debugging, resource limits', order: 2 },
                    { name: 'Cloud Architecture Questions', description: 'VPC design, IAM least privilege, HA patterns, cost trade-offs, multi-AZ vs multi-region', order: 3 },
                    { name: 'SRE Concepts', description: 'SLIs, SLOs, error budgets, toil reduction, postmortems, chaos engineering basics', order: 4 },
                    { name: 'Case Studies', description: 'Netflix chaos engineering, GitHub outage analysis, Cloudflare post-mortems, Slack K8s migration', order: 5 },
                ],
                milestones: [
                    { title: 'Record a 30-min session debugging a broken Kubernetes deployment from scratch', order: 1 },
                    { title: 'Solve 10 real-world DevOps scenario problems and document the root cause + fix', order: 2 },
                    { title: 'Present a system design for a multi-region, zero-downtime deployment architecture', order: 3 },
                ],
            },
            {
                name: 'Phase 6 — Industry Tools & Best Practices',
                description: 'Master the engineering culture, on-call practices, compliance, FinOps, and emerging tools used by top DevOps teams at scale.',
                outcome: 'Operate like a senior SRE/DevOps engineer — owning reliability, cost, security, and developer experience organization-wide',
                order: 6,
                skills: [
                    { name: 'SRE Practices & On-Call', description: 'Runbooks, escalation policies, PagerDuty, blameless postmortems, Game Days', order: 1 },
                    { name: 'FinOps & Cost Management', description: 'Reserved instances, Spot VMs, cost tagging, budgets, Infracost, Kubecost', order: 2 },
                    { name: 'Compliance & Governance', description: 'SOC2, GDPR, HIPAA controls in infra, audit logging, policy-as-code (OPA/Kyverno)', order: 3 },
                    { name: 'Emerging Tools', description: 'WebAssembly (WASM), eBPF, Cilium, Crossplane, Dapr, OpenFeature for feature flags', order: 4 },
                    { name: 'Documentation & RFC Culture', description: 'Runbooks, ADRs, design docs, incident reports, ops wiki, on-call handoff templates', order: 5 },
                ],
                milestones: [
                    { title: 'Write 5 production-quality runbooks covering common failure scenarios', order: 1 },
                    { title: 'Implement policy-as-code with OPA/Kyverno to enforce security standards in K8s', order: 2 },
                    { title: 'Set up a FinOps dashboard showing per-team cloud costs with budget alerts', order: 3 },
                ],
            },
        ],
    },

    // ============================================================
    // TRACK 3: System Design Specialist
    // ============================================================
    {
        name: 'System Design Specialist',
        slug: 'system-design',
        description: 'Master distributed systems, scalability, data modeling, and architectural patterns to design systems used by millions',
        icon: 'Cpu',
        order: 3,
        phases: [
            {
                name: 'Phase 1 — Foundations',
                description: 'Build a rock-solid mental model of distributed systems fundamentals: CAP theorem, consistency, availability, and basic architecture patterns.',
                outcome: 'Explain distributed systems trade-offs, draw basic architectures, and reason about scalability from first principles',
                order: 1,
                skills: [
                    { name: 'CAP Theorem & Distributed Systems', description: 'CAP theorem, PACELC, consistency models (strong, eventual, causal), split-brain', order: 1 },
                    { name: 'Scalability Fundamentals', description: 'Vertical vs horizontal scaling, stateless services, session affinity, back-of-envelope math', order: 2 },
                    { name: 'Availability & Fault Tolerance', description: 'Redundancy, failover, replication, MTTR/MTBF, the 9s of availability (99.9% vs 99.99%)', order: 3 },
                    { name: 'Networking for System Design', description: 'DNS, CDN, reverse proxies, SSL termination, anycast, latency vs bandwidth trade-offs', order: 4 },
                    { name: 'Estimation & Capacity Planning', description: 'QPS, storage, bandwidth estimation, rule of thumb numbers (memory/disk/network)', order: 5 },
                ],
                milestones: [
                    { title: 'Estimate the storage and QPS requirements for a system with 10M daily active users', order: 1 },
                    { title: 'Explain CAP theorem using three real-world database examples with trade-off analysis', order: 2 },
                    { title: 'Draw and present a high-availability architecture for a simple CRUD application', order: 3 },
                ],
            },
            {
                name: 'Phase 2 — Core Building Blocks',
                description: 'Master the components that appear in every system design interview and production architecture: load balancers, caches, databases, queues, and APIs.',
                outcome: 'Select the right data store, caching strategy, and communication pattern for any given system requirement',
                order: 2,
                skills: [
                    { name: 'Load Balancers & Proxies', description: 'L4 vs L7, Round Robin/Least Connections/IP Hash, health checks, sticky sessions, Nginx', order: 1 },
                    { name: 'Databases: SQL vs NoSQL', description: 'ACID vs BASE, PostgreSQL, MongoDB, Cassandra, DynamoDB — when to use which and why', order: 2 },
                    { name: 'Caching Systems', description: 'Cache-aside, write-through, write-back, TTL strategies, Redis, Memcached, CDN caching, cache invalidation', order: 3 },
                    { name: 'Message Queues & Streaming', description: 'Kafka, RabbitMQ, SQS — pub/sub vs point-to-point, at-least-once vs exactly-once delivery', order: 4 },
                    { name: 'API Paradigms', description: 'REST, GraphQL, gRPC, WebSockets — when to use which, versioning strategies, API gateways', order: 5 },
                ],
                milestones: [
                    { title: 'Design a caching strategy for a social media feed — justify TTL, eviction, and invalidation', order: 1 },
                    { title: 'Choose and justify a database for 5 different use cases (analytics, social graph, IoT, etc.)', order: 2 },
                    { title: 'Design an event-driven notification system using Kafka with at-least-once delivery guarantees', order: 3 },
                ],
            },
            {
                name: 'Phase 3 — Advanced & Production-Grade',
                description: 'Go deep on data-intensive systems: sharding, replication, consensus, microservices, and building for extreme scale.',
                outcome: 'Design systems that handle 10M+ DAU with sub-100ms p99 latency, strong consistency, and zero data loss',
                order: 3,
                skills: [
                    { name: 'Database Sharding & Replication', description: 'Horizontal partitioning (range, hash, directory), master-slave, multi-master, quorum reads/writes', order: 1 },
                    { name: 'Consistency & Consensus', description: 'Paxos, Raft, ZooKeeper, etcd, vector clocks, two-phase commit, saga pattern', order: 2 },
                    { name: 'Microservices Architecture', description: 'Service boundaries, inter-service communication, service mesh, API gateway, circuit breaker (Hystrix/Resilience4j)', order: 3 },
                    { name: 'Event-Driven Architecture', description: 'Event sourcing, CQRS, outbox pattern, idempotency, event schema design, Kafka Streams', order: 4 },
                    { name: 'Data-Intensive Patterns', description: 'Data lake vs warehouse, batch vs stream processing (Spark, Flink), time-series data, search indexing', order: 5 },
                ],
                milestones: [
                    { title: 'Design a database sharding strategy for a 100TB user data store with consistent hashing', order: 1 },
                    { title: 'Implement the saga pattern for a distributed transaction spanning 3 microservices', order: 2 },
                    { title: 'Design a CQRS + event sourcing system for a financial ledger with audit trail', order: 3 },
                ],
            },
            {
                name: 'Phase 4 — Real-World System Designs',
                description: 'Practice designing the 10 most common system design interview questions used by FAANG companies — with full trade-off analysis.',
                outcome: 'Design any major system (Twitter, Netflix, Uber, WhatsApp) end-to-end in 45 minutes with clear trade-off reasoning',
                order: 4,
                skills: [
                    { name: 'Content & Social Systems', description: 'Twitter timeline, Instagram feed, YouTube, TikTok recommendation — fan-out on write vs read', order: 1 },
                    { name: 'Communication Systems', description: 'WhatsApp (1:1 + group chat), Slack (real-time + search), Zoom (WebRTC signaling, TURN/STUN)', order: 2 },
                    { name: 'Marketplace & Matching Systems', description: 'Uber/Lyft dispatch, Airbnb search, Amazon product catalog, booking systems, geo-indexing', order: 3 },
                    { name: 'Infrastructure Systems', description: 'URL shortener, web crawler, key-value store, distributed cache, rate limiter, ID generator', order: 4 },
                    { name: 'Data & Search Systems', description: 'Google search indexing, Elasticsearch, Typeahead/autocomplete, analytics pipeline, logging system', order: 5 },
                ],
                milestones: [
                    { title: 'Design Twitter — cover tweet ingestion, feed generation, follow graph, and search', order: 1 },
                    { title: 'Design WhatsApp — cover message ordering, group chat, end-to-end encryption, and presence', order: 2 },
                    { title: 'Design Uber — cover driver matching, real-time location, surge pricing, and trip lifecycle', order: 3 },
                ],
            },
            {
                name: 'Phase 5 — Interview Preparation',
                description: 'Develop a repeatable framework for crushing system design interviews with structured communication, trade-off reasoning, and estimation speed.',
                outcome: 'Ace system design rounds at FAANG and top-tier companies with a structured, confident, time-boxed approach',
                order: 5,
                skills: [
                    { name: 'Interview Framework (RADIO)', description: 'Requirements → API → Data model → Infrastructure → Optimizations — structured framework', order: 1 },
                    { name: 'Trade-off Communication', description: 'How to articulate trade-offs, ask clarifying questions, scope creep management, back-of-envelope', order: 2 },
                    { name: 'Estimation Drills', description: 'QPS, storage, bandwidth — practice estimating 20+ real systems quickly and accurately', order: 3 },
                    { name: 'Common Interview Mistakes', description: 'Over-engineering, skipping requirements, ignoring bottlenecks, not clarifying scale assumptions', order: 4 },
                    { name: 'Mock Interview Practice', description: 'Timed 45-min sessions, Exponent, interviewing.io, peer mock interviews with feedback loops', order: 5 },
                ],
                milestones: [
                    { title: 'Complete 10 timed 45-minute system design mock interviews with recorded feedback', order: 1 },
                    { title: 'Produce written design documents for 5 systems with full trade-off analysis', order: 2 },
                    { title: 'Estimate QPS and storage for 10 different systems from scratch under 5 minutes each', order: 3 },
                ],
            },
            {
                name: 'Phase 6 — Industry Tools & Best Practices',
                description: 'Learn how top companies document, review, and evolve system architecture — including real case studies and the tools that power them.',
                outcome: 'Operate as a technical lead — owning architecture decisions, driving RFCs, and guiding teams through complex system evolution',
                order: 6,
                skills: [
                    { name: 'Architecture Decision Records (ADRs)', description: 'When to write ADRs, format, lightweight decision documentation, tooling (adr-tools, Backstage)', order: 1 },
                    { name: 'RFC & Design Review Culture', description: 'Writing effective design docs, running architecture reviews, async vs sync review processes', order: 2 },
                    { name: 'Chaos Engineering', description: 'Netflix Chaos Monkey, Gremlin, fault injection, game days, blast radius, steady-state hypothesis', order: 3 },
                    { name: 'Case Studies at Scale', description: 'Netflix (Chaos + Cassandra), Discord (MongoDB → ScyllaDB), Slack (K8s migration), GitHub outages', order: 4 },
                    { name: 'Emerging Architecture Patterns', description: 'Edge computing, data mesh, zero-copy systems, WASM, local-first software, CRDTs', order: 5 },
                ],
                milestones: [
                    { title: 'Write a production-quality ADR for a major technology decision in your current project', order: 1 },
                    { title: 'Conduct a chaos engineering exercise and document the blast radius and recovery plan', order: 2 },
                    { title: 'Present a case study analysis of a major production outage with root cause and improvements', order: 3 },
                ],
            },
        ],
    },

    // ============================================================
    // TRACK 4: Generative AI Engineer
    // ============================================================
    {
        name: 'Generative AI Engineer',
        slug: 'genai',
        description: 'Master LLMs, prompt engineering, RAG systems, agents, fine-tuning, and production AI deployment to build the next generation of AI products',
        icon: 'Sparkles',
        order: 4,
        phases: [
            {
                name: 'Phase 1 — Foundations',
                description: 'Build the mathematical and conceptual foundation for generative AI: transformers, attention, LLM training, and the Python AI ecosystem.',
                outcome: 'Explain how LLMs work from first principles, run inference locally, and manipulate model outputs programmatically',
                order: 1,
                skills: [
                    { name: 'Python for AI', description: 'NumPy, Pandas, Matplotlib — vectorized operations, data manipulation, visualization for ML', order: 1 },
                    { name: 'Neural Networks & Deep Learning', description: 'Perceptrons, backpropagation, activation functions, optimizers (Adam, SGD), overfitting', order: 2 },
                    { name: 'Transformers & Attention', description: 'Self-attention, multi-head attention, positional encoding, encoder-decoder, BERT vs GPT', order: 3 },
                    { name: 'LLM Concepts & Architecture', description: 'Tokens, context windows, temperature, top-p, top-k, LLaMA, Mistral, Gemma architectures', order: 4 },
                    { name: 'Running Models Locally', description: 'Ollama, LM Studio, Hugging Face Transformers, quantization (GGUF, AWQ, GPTQ), CPU vs GPU', order: 5 },
                ],
                milestones: [
                    { title: 'Run a local LLM with Ollama, manipulate outputs with different temperature and sampling settings', order: 1 },
                    { title: 'Implement a transformer attention mechanism from scratch in PyTorch', order: 2 },
                    { title: 'Build a text classifier using Hugging Face Transformers with fine-tuned BERT', order: 3 },
                ],
            },
            {
                name: 'Phase 2 — Core Stack',
                description: 'Master the production LLM stack: OpenAI APIs, embeddings, vector databases, LangChain, and advanced prompt engineering techniques.',
                outcome: 'Build and deploy a production-ready LLM-powered application with memory, context management, and semantic search',
                order: 2,
                skills: [
                    { name: 'LLM APIs (OpenAI, Anthropic, Gemini)', description: 'Chat completions, function calling, tool use, streaming, vision APIs, multi-modal inputs', order: 1 },
                    { name: 'Prompt Engineering', description: 'Zero-shot, few-shot, chain-of-thought (CoT), ReAct, self-consistency, structured outputs, system prompts', order: 2 },
                    { name: 'Embeddings & Semantic Search', description: 'text-embedding-3, sentence-transformers, cosine similarity, ANN search, HNSW indexing', order: 3 },
                    { name: 'Vector Databases', description: 'Pinecone, Weaviate, ChromaDB, pgvector, Qdrant — index design, metadata filtering, hybrid search', order: 4 },
                    { name: 'LangChain & LlamaIndex', description: 'Chains, agents, memory, document loaders, text splitters, retrieval chains, LlamaIndex query engines', order: 5 },
                ],
                milestones: [
                    { title: 'Build a document QA chatbot over 100+ PDFs using embeddings, pgvector, and GPT-4o', order: 1 },
                    { title: 'Implement 5 prompt engineering techniques and benchmark their accuracy on a classification task', order: 2 },
                    { title: 'Build a semantic search engine with hybrid (dense + sparse) retrieval using Weaviate', order: 3 },
                ],
            },
            {
                name: 'Phase 3 — Advanced & Production-Grade',
                description: 'Go deep on RAG optimization, LLM evaluation, AI agents, fine-tuning, and GuardRails — the techniques that separate toy demos from production systems.',
                outcome: 'Build evaluated, safe, and production-hardened RAG pipelines and autonomous agent systems',
                order: 3,
                skills: [
                    { name: 'Advanced RAG Systems', description: 'Chunking strategies (semantic, recursive), hypothetical document embeddings, contextual retrieval, reranking (Cohere)', order: 1 },
                    { name: 'Fine-tuning LLMs', description: 'LoRA, QLoRA, PEFT, SFT, DPO, instruction tuning, dataset preparation, Unsloth, Axolotl', order: 2 },
                    { name: 'LLM Evaluation', description: 'RAGAS framework, faithfulness, context recall, answer relevancy, TruLens, DeepEval, human eval loops', order: 3 },
                    { name: 'AI Agents & Tool Use', description: 'ReAct agents, multi-agent systems (LangGraph, CrewAI, AutoGen), tool design, memory architectures', order: 4 },
                    { name: 'Guardrails & Safety', description: 'Prompt injection defense, output validation (Guardrails AI, NeMo), toxic content filtering, hallucination detection', order: 5 },
                ],
                milestones: [
                    { title: 'Build a production RAG system with semantic chunking, reranking, and RAGAS evaluation', order: 1 },
                    { title: 'Fine-tune a 7B LLM with QLoRA on domain-specific data and evaluate against base model', order: 2 },
                    { title: 'Build a multi-agent research system that searches, synthesizes, and fact-checks information', order: 3 },
                ],
            },
            {
                name: 'Phase 4 — Real-World Projects',
                description: 'Build the portfolio projects that define a senior GenAI engineer: production apps, AI-native tooling, and domain-specific AI systems.',
                outcome: 'Ship 3 production-grade GenAI applications with evaluation pipelines, monitoring, and user-facing interfaces',
                order: 4,
                skills: [
                    { name: 'AI-Powered Developer Tools', description: 'Code review bots, PR summarizers, docstring generators, test writers — GitHub Actions + LLM', order: 1 },
                    { name: 'Multimodal AI Applications', description: 'Vision + language (GPT-4V, LLaVA), audio (Whisper, ElevenLabs), image gen (DALL-E, Stable Diffusion)', order: 2 },
                    { name: 'Domain-Specific AI', description: 'Legal/medical document analysis, financial report Q&A, customer support automation, internal knowledge base', order: 3 },
                    { name: 'AI-Native Product Design', description: 'UX for AI uncertainty, progressive disclosure, human-in-the-loop, feedback collection, streaming UX', order: 4 },
                    { name: 'Deployment & Serving', description: 'FastAPI + LLM, vLLM, Ollama API server, streaming responses, async inference, request batching', order: 5 },
                ],
                milestones: [
                    { title: 'Build and deploy an AI code review tool that comments on PRs with actionable feedback', order: 1 },
                    { title: 'Build a voice + vision AI assistant that processes audio queries and image inputs', order: 2 },
                    { title: 'Build a domain-specific RAG app (legal, medical, or finance) with citation and confidence scores', order: 3 },
                ],
            },
            {
                name: 'Phase 5 — Interview Preparation',
                description: 'Prepare for senior GenAI / ML Engineer roles with algorithm questions, system design for AI, LLM trade-offs, and technical deep dives.',
                outcome: 'Pass technical interviews at AI-first companies (OpenAI, Anthropic, Cohere, Mistral) and FAANG AI teams',
                order: 5,
                skills: [
                    { name: 'LLM Architecture Deep Dives', description: 'Attention complexity, KV cache, Flash Attention, speculative decoding, mixture-of-experts (MoE)', order: 1 },
                    { name: 'ML System Design', description: 'Design a recommendation engine, feature store, training pipeline, serving infrastructure, A/B testing system', order: 2 },
                    { name: 'RAG Trade-off Interviews', description: 'Chunking strategy justification, embedding model selection, retrieval vs generation accuracy, latency', order: 3 },
                    { name: 'Coding for ML Engineers', description: 'Implement attention from scratch, tokenizer, BPE, HNSW index, cosine similarity — Python coding round', order: 4 },
                    { name: 'Product Thinking for AI', description: 'Evaluation strategy, hallucination handling, user trust, cost per query, latency vs accuracy trade-offs', order: 5 },
                ],
                milestones: [
                    { title: 'Implement scaled dot-product attention and multi-head attention from scratch in PyTorch', order: 1 },
                    { title: 'Present a system design for a production RAG system serving 1M queries/day in 45 minutes', order: 2 },
                    { title: 'Pass 3 timed coding interviews on ML algorithms (attention, tokenization, embedding search)', order: 3 },
                ],
            },
            {
                name: 'Phase 6 — Industry Tools & Best Practices',
                description: 'Master the MLOps stack, cost optimization, safety practices, and emerging techniques used by leading AI teams in production.',
                outcome: 'Own the full AI product lifecycle — from experiment tracking to deployment, monitoring, and continuous improvement',
                order: 6,
                skills: [
                    { name: 'MLOps & Experiment Tracking', description: 'MLflow, Weights & Biases, DVC, model registry, dataset versioning, reproducible experiments', order: 1 },
                    { name: 'LLM Observability', description: 'LangSmith, Langfuse, Helicone — trace every LLM call, detect regressions, latency monitoring', order: 2 },
                    { name: 'Cost & Latency Optimization', description: 'Prompt caching (Anthropic), semantic caching (GPTCache), model routing, smaller models for tasks', order: 3 },
                    { name: 'Cloud AI Platforms', description: 'AWS Bedrock, GCP Vertex AI, Azure OpenAI — managed inference, fine-tuning, serverless endpoints', order: 4 },
                    { name: 'AI Safety & Ethics', description: 'Red-teaming, bias evaluation, constitutional AI, responsible disclosure, EU AI Act basics', order: 5 },
                ],
                milestones: [
                    { title: 'Set up a full MLOps pipeline with W&B experiment tracking, model registry, and auto-eval', order: 1 },
                    { title: 'Implement LangSmith tracing across an entire RAG pipeline with regression detection', order: 2 },
                    { title: 'Reduce LLM inference cost by 60% using semantic caching, prompt compression, and model routing', order: 3 },
                ],
            },
        ],
    },

];

async function main() {
    console.log('🌱 Starting roadmap seed...');

    console.log('🗑️  Clearing existing roadmap data...');
    await prisma.userMilestoneProgress.deleteMany({});
    await prisma.userRoadmap.deleteMany({});
    await prisma.milestone.deleteMany({});
    await prisma.skill.deleteMany({});
    await prisma.phase.deleteMany({});
    await prisma.track.deleteMany({});

    for (const trackData of seedData) {
        console.log(`\n📚 Creating track: ${trackData.name}`);

        const track = await prisma.track.create({
            data: {
                name: trackData.name,
                slug: trackData.slug,
                description: trackData.description,
                icon: trackData.icon,
                order: trackData.order,
            },
        });

        for (const phaseData of trackData.phases) {
            console.log(`  📖 ${phaseData.name}`);

            const phase = await prisma.phase.create({
                data: {
                    name: phaseData.name,
                    description: phaseData.description,
                    outcome: phaseData.outcome,
                    order: phaseData.order,
                    trackId: track.id,
                },
            });

            for (const skillData of phaseData.skills) {
                await prisma.skill.create({
                    data: {
                        name: skillData.name,
                        description: skillData.description,
                        order: skillData.order,
                        phaseId: phase.id,
                    },
                });
            }

            for (const milestoneData of phaseData.milestones) {
                await prisma.milestone.create({
                    data: {
                        title: milestoneData.title,
                        order: milestoneData.order,
                        phaseId: phase.id,
                    },
                });
            }
        }
    }

    console.log('\n✅ Seed completed!');
    console.log('\n📊 Summary:');
    console.log(`   Tracks: ${await prisma.track.count()}`);
    console.log(`   Phases: ${await prisma.phase.count()}`);
    console.log(`   Skills: ${await prisma.skill.count()}`);
    console.log(`   Milestones: ${await prisma.milestone.count()}`);
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
