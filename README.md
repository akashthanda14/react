# AkashCode — Engineering Roadmap Platform

> Structured, phase-based learning paths for junior engineers serious about leveling up.

A full-stack web application that gives engineers a personalized, milestone-driven roadmap to go from junior to senior across 4 specialization tracks: **Full Stack**, **DevOps**, **System Design**, and **Generative AI**.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Routes & Pages](#routes--pages)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Pricing Model](#pricing-model)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Scripts Reference](#scripts-reference)
- [Architecture Overview](#architecture-overview)
- [Documentation](#documentation)

---

## Overview

Most junior engineers get stuck in a loop — YouTube tutorials, random courses, no clear direction. AkashCode solves this with a structured, opinionated learning system:

- Pick one of 4 engineering tracks
- Work through 6 phases, from fundamentals to production-grade
- Complete milestone-based checkpoints that validate your understanding
- Track progress and get to interview-ready

**Trusted by 45K+ enrolled engineers across 40+ countries.**

---

## Features

### Core (MVP)

| Feature | Description |
|---|---|
| **Personalized Roadmaps** | Engineers pick a track and get a structured, phase-based learning path |
| **4 Engineering Tracks** | Full Stack, DevOps, System Design, Generative AI |
| **6 Phases per Track** | From fundamentals to production-grade to interview prep |
| **30+ Skills per Track** | Granular skill tags within each phase |
| **Milestone Validation** | Quiz-based checkpoints (multiple choice, true/false, short answer) |
| **Progress Tracking** | Real-time completion percentage per phase and track |
| **User Authentication** | Google OAuth and email/password sign-in |
| **Admin CMS** | Internal dashboard to manage tracks, phases, skills, and milestones |
| **Role-Based Access** | `USER` vs `ADMIN` roles with protected routes |

### The 4 Tracks

| Track | Stack | Duration | Enrolled |
|---|---|---|---|
| **Full Stack Engineer** | React, Next.js, Node.js, PostgreSQL, Docker | 4–6 months | 12K+ |
| **DevOps Engineer** | Linux, Docker, K8s, Terraform, GitOps, AWS | 5–7 months | 8K+ |
| **System Design Specialist** | CAP, sharding, Kafka, CQRS, FAANG interview prep | 3–4 months | 15K+ |
| **Generative AI Engineer** | LLMs, RAG, fine-tuning, agents, LangChain | 4–5 months | 10K+ |

### Free vs Pro

| Feature | Free | Pro ($9/mo) |
|---|---|---|
| All 4 tracks visible | ✅ | ✅ |
| Phase structure & names | ✅ | ✅ |
| Phase 1 fully unlocked | ✅ | ✅ |
| Progress tracking (Phase 1) | ✅ | ✅ |
| Phases 2–6 unlocked | ❌ | ✅ |
| Full milestone details | ❌ | ✅ |
| AI next-step nudges | ❌ | ✅ |
| Completion certificates | ❌ | ✅ |
| Community Discord | ❌ | ✅ |
| New tracks as released | ❌ | ✅ |

### Post-MVP (Planned)

- **Streaks & Gamification** — Daily activity tracking (schema exists, UI pending)
- **Social Profiles** — Publicly shareable roadmap pages
- **Payment Gating** — Stripe integration for Pro unlock
- **AI Tutor** — Chatbot for inline learning questions

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.0.10 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **Icons** | Lucide React | 0.556.0 |
| **Auth** | NextAuth.js v5 (beta) | 5.0.0-beta.30 |
| **ORM** | Prisma | 6.19.0 |
| **Database** | PostgreSQL | 16 |
| **Data Fetching** | TanStack React Query | 5.x |
| **Animations** | canvas-confetti | 1.9.4 |
| **Testing** | Vitest | 3.x |
| **Deployment** | Vercel | — |
| **DB (local)** | Docker (postgres:16-alpine) | — |
| **DB (prod)** | Neon (serverless PostgreSQL) | — |

---

## Project Structure

```
dsaheet/
├── prisma/
│   ├── schema.prisma          # Database models
│   ├── seed-roadmap.ts        # Seed script for tracks/phases/skills
│   └── migrations/            # Migration history
│
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout (providers, navbar, footer)
│   │   ├── loading.tsx        # Global loading state
│   │   ├── not-found.tsx      # 404 page
│   │   │
│   │   ├── auth/
│   │   │   ├── login/         # Sign-in page (credentials + Google)
│   │   │   └── register/      # Sign-up page
│   │   │
│   │   ├── onboarding/        # Track selection flow for new users
│   │   ├── roadmap/           # User's active roadmap dashboard
│   │   ├── learn/[trackSlug]/ # Public track detail pages
│   │   ├── pricing/           # Pricing page (Free vs Pro)
│   │   ├── dashboard/         # User dashboard
│   │   ├── profile/           # User profile
│   │   │
│   │   ├── admin/             # Admin CMS (role=ADMIN required)
│   │   │
│   │   └── api/
│   │       ├── auth/[...nextauth]/ # NextAuth handler
│   │       └── roadmap/
│   │           ├── create/        # POST: Create user roadmap
│   │           ├── route.ts       # GET: Fetch user roadmap data
│   │           ├── progress/      # GET: Progress calculation
│   │           └── milestone/
│   │               ├── route.ts         # POST: Complete milestone
│   │               └── [milestoneId]/   # GET/DELETE: Single milestone ops
│   │
│   ├── components/
│   │   ├── Navbar.tsx             # Top navigation bar
│   │   ├── Footer.tsx             # Site footer
│   │   ├── NavbarWrapper.tsx      # Conditional navbar logic
│   │   ├── ConditionalNavbar.tsx  # Route-aware navbar visibility
│   │   ├── ConditionalFooter.tsx  # Route-aware footer visibility
│   │   ├── ConditionalMain.tsx    # Route-aware main wrapper
│   │   ├── SessionProvider.tsx    # NextAuth session context
│   │   ├── ReactQueryProvider.tsx # TanStack Query provider
│   │   └── LeetCodeIcon.tsx       # Custom icon component
│   │
│   ├── lib/
│   │   ├── auth.ts                # NextAuth config (providers, callbacks)
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── roadmap-mapper.ts      # Deterministic track assignment logic
│   │   ├── roadmap-service.ts     # Business logic: roadmap CRUD, progress
│   │   ├── streak.ts              # Streak calculation utilities
│   │   ├── design-system.ts       # Design tokens and CSS utilities
│   │   ├── debounce.ts            # Debounce utility
│   │   └── utils.ts               # General utility functions
│   │
│   ├── hooks/
│   │   └── useLocalStorage.ts     # Persistent client-side state hook
│   │
│   ├── types/
│   │   └── index.ts               # Shared TypeScript types
│   │
│   └── middleware.ts              # Route protection middleware
│
├── scripts/                   # Maintenance and data migration scripts
├── docs/                      # Detailed technical documentation
├── docker-compose.yml         # Local PostgreSQL via Docker
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript config
└── vitest.config.ts           # Test configuration
```

---

## Database Schema

The data model is hierarchical: **Track → Phase → Skill / Milestone**

```
Track
└── Phase[]
    ├── Skill[]              (topics within the phase)
    └── Milestone[]          (checkpoint tasks)
        └── MilestoneQuestion[]
            └── MilestoneAnswerOption[]

User
└── UserRoadmap[]            (one per track)
    └── UserMilestoneProgress[]
```

### Models

| Model | Description |
|---|---|
| `User` | Account with streak tracking, role (`USER`/`ADMIN`) |
| `Account` | OAuth account links (NextAuth) |
| `Session` | Active user sessions (NextAuth) |
| `VerificationToken` | Email verification tokens |
| `Track` | An engineering specialization (e.g. "Full Stack Engineer") |
| `Phase` | A learning stage within a track (e.g. "Fundamentals") |
| `Skill` | A topic/technology within a phase (e.g. "REST APIs") |
| `Milestone` | A checkpoint task within a phase (e.g. "Build a CRUD API") |
| `MilestoneQuestion` | A validation question (MCQ, True/False, Short Answer) |
| `MilestoneAnswerOption` | An answer choice for a milestone question |
| `UserRoadmap` | Links a user to a track — unique per `(userId, trackId)` |
| `UserMilestoneProgress` | Records when a user completes a milestone, with notes |

### Entity Relationships

```
User ──< UserRoadmap >── Track
               │
               └──< UserMilestoneProgress >── Milestone
                                                   │
Track ──< Phase ──< Skill                          │
               └──< Milestone ──< MilestoneQuestion ──< MilestoneAnswerOption
```

---

## Routes & Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page with tracks, pricing, and testimonials |
| `/onboarding` | Public | Track selection for new users |
| `/roadmap` | Auth required | User's active roadmap and phase progress |
| `/learn/[trackSlug]` | Public | Public track detail and phase overview |
| `/pricing` | Public | Free vs Pro feature comparison |
| `/auth/login` | Public | Sign in (email + Google) |
| `/auth/register` | Public | Create account |
| `/profile` | Auth required | User profile page |
| `/dashboard` | Auth required | User dashboard |
| `/admin` | Admin only | Admin CMS entry point |
| `/admin/tracks` | Admin only | Manage engineering tracks |
| `/admin/phases` | Admin only | Manage phases within tracks |
| `/admin/skills` | Admin only | Manage skills within phases |
| `/admin/milestones` | Admin only | Manage milestone checkpoints |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/roadmap/create` | Required | Create a new user roadmap for a selected track |
| `GET` | `/api/roadmap` | Required | Fetch user's roadmap with full progress data |
| `GET` | `/api/roadmap/progress` | Required | Calculate phase/track completion percentage |
| `POST` | `/api/roadmap/milestone` | Required | Mark a milestone as complete |
| `GET` | `/api/roadmap/milestone/[id]` | Required | Get a single milestone's details |

### Response Format

```json
// Success
{ "data": { ... }, "message": "Success", "status": 200 }

// Error
{ "error": "Error message", "details": "Context", "status": 400 }
```

---

## Authentication

- **Provider 1:** Email + Password (bcrypt, 12 rounds)
- **Provider 2:** Google OAuth
- **Session:** JWT, stored in an `httpOnly` cookie (30-day expiry)
- **CSRF protection:** Built into NextAuth
- **Role gating:** `ADMIN` role required to access `/admin/*` routes

### Auth Flow

```
Login → POST /api/auth/callback/credentials
      → NextAuth Handler
      → Verify Password (bcrypt)
      → Generate JWT
      → Set httpOnly Cookie
      → Redirect to Dashboard
```

### Middleware

`middleware.ts` handles:
- Unauthenticated users accessing protected routes → redirect to `/auth/login`
- Already-authenticated users accessing `/auth/*` → redirect to `/sheet`
- Admin-only route protection via role check

---

## Pricing Model

| Plan | Price | What's Included |
|---|---|---|
| **Free** | $0/month | All 4 tracks visible, Phase 1 fully unlocked, progress tracking |
| **Pro** | $9/month | All 6 phases, full milestones, AI nudges, certificates, Discord, new tracks |

> Phase 1 of every track is free forever. No credit card required to start. Cancel Pro anytime.

---

## Local Development

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (for local PostgreSQL)
- npm

### Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd dsaheet

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 4. Start PostgreSQL via Docker
docker-compose up -d

# 5. Run database migrations
npm run db:migrate

# 6. Seed roadmap content (tracks, phases, skills, milestones)
npm run db:seed:roadmap

# 7. Start the dev server (port 3001)
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

---

## Environment Variables

```env
# Database — Local Docker
DOCKER_DATABASE_URL=postgresql://akashcode:akashcode@localhost:5433/akashcode_db

# Database — Production (Neon or other PostgreSQL)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require

# NextAuth
NEXTAUTH_SECRET=your-secret-here        # Generate: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3001      # Use your production URL in prod

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## Database Setup

### Local (Docker)

The `docker-compose.yml` starts a `postgres:16-alpine` instance:

```yaml
Container:  akashcode-db
Port:       5433 (mapped from 5432)
Database:   akashcode_db
Username:   akashcode
Password:   akashcode
```

```bash
docker-compose up -d          # Start database
npm run db:migrate            # Apply migrations
npm run db:seed:roadmap       # Seed content
npm run db:studio             # Open Prisma Studio UI
npm run db:reset              # Reset (destructive)
```

### Production (Neon)

```bash
npm run prod:migrate          # Run migrations on production DB
npm run prod:seed             # Seed production DB
npm run prod:studio           # Prisma Studio against production
```

---

## Deployment

The app is optimized for **Vercel**. The `vercel-build` script handles Prisma generation and migrations automatically:

```json
"vercel-build": "prisma generate && prisma migrate deploy || prisma db push --accept-data-loss && next build"
```

### Vercel Setup Steps

1. Push code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add these environment variables in Vercel project settings:

   | Variable | Description |
   |---|---|
   | `DATABASE_URL` | Production PostgreSQL connection string |
   | `NEXTAUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
   | `NEXTAUTH_URL` | Your production URL (e.g. `https://yourapp.vercel.app`) |
   | `GOOGLE_CLIENT_ID` | Google OAuth client ID (if using Google login) |
   | `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

4. Deploy

### Recommended Database Providers

| Provider | Notes |
|---|---|
| [Neon](https://neon.tech) | Recommended — serverless, free tier, auto-scaling, instant branching |
| [Vercel Postgres](https://vercel.com/storage/postgres) | Native Vercel integration, easiest setup |
| [Supabase](https://supabase.com) | Free tier, additional built-in features |

---

## Scripts Reference

### Development

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3001 |
| `npm run build` | Build for production |
| `npm run start` | Start production server on port 3001 |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format all files with Prettier |
| `npm run type-check` | TypeScript type checking (no emit) |

### Testing

| Command | Description |
|---|---|
| `npm test` | Run all tests once |
| `npm run test:watch` | Watch mode for development |
| `npm run test:ui` | Open Vitest browser UI |
| `npm run test:links` | Run link validation tests only |
| `npm run check-links` | Check for broken external links |

### Database

| Command | Description |
|---|---|
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run migrations (development) |
| `npm run db:migrate:deploy` | Run migrations (production) |
| `npm run db:seed` | Seed default data |
| `npm run db:seed:roadmap` | Seed roadmap tracks/phases/skills/milestones |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:push` | Push schema without creating a migration |
| `npm run db:reset` | Reset database (destructive) |
| `npm run db:setup` | Full setup: generate + migrate deploy + seed |

### Production

| Command | Description |
|---|---|
| `npm run prod:migrate` | Run migrations on production DB |
| `npm run prod:seed` | Seed production database |
| `npm run prod:studio` | Open Prisma Studio against production |
| `npm run prod:sync` | Sync local data to production |

---

## Architecture Overview

```
Browser
   │ HTTP / HTTPS
   ▼
Next.js App Router (SSR + React Server Components)
   ├── Server Components (DB queries, data fetching)
   ├── Client Components (interactivity, state)
   ├── API Routes (/api/*)
   └── Middleware (auth guards, route protection)
   │ Prisma ORM
   ▼
PostgreSQL
   ├── Docker locally (port 5433)
   └── Neon serverless in production
```

### Security

- Passwords hashed with **bcrypt (12 rounds)**
- Sessions stored in **httpOnly cookies** (XSS-resistant)
- **CSRF protection** via NextAuth
- **SQL injection prevention** via Prisma parameterized queries
- **Role-based access control** at middleware and API layer
- SSL connections enforced in production

### Performance

- React Server Components for initial data fetching (no client-side waterfalls)
- Route-based code splitting (automatic via Next.js)
- Prisma indexed queries on `email`, `slug`, and foreign keys
- Static generation for public pages where possible

---

## Documentation

Detailed docs live in the `/docs` folder:

| File | Topic |
|---|---|
| `ARCHITECTURE.md` | Full system architecture diagrams and patterns |
| `AUTH_IMPLEMENTATION.md` | Auth flow implementation details |
| `AUTH_SETUP.md` | Google OAuth setup guide |
| `GOOGLE_OAUTH_SETUP.md` | Step-by-step Google OAuth configuration |
| `VERCEL_DEPLOYMENT.md` | Step-by-step Vercel deployment guide |
| `BACKEND_PERSISTENCE.md` | Data persistence and storage patterns |
| `DASHBOARD_INTEGRATION.md` | Dashboard implementation notes |
| `TESTING_GUIDE.md` | Testing setup and best practices |
| `COST_OPTIMIZATION.md` | Performance and cost optimization notes |
| `DB_COMMANDS.md` | Useful database commands reference |

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## Contact

- Instagram: [@akashcodeofficial](https://instagram.com/akashcodeofficial)
- Student discount: DM on Instagram with your student ID

---

## License

This project is private and proprietary.
