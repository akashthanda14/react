---
name: project-context
description: Context about akashcodeofficial.com — use this for all tasks on this project
---

# akashcodeofficial.com — Project Context

## What This Project Is
Personal brand website for Akashdeep Thanda — tech educator, backend engineer.
Next.js 16 App Router SPA. Features: structured engineering roadmaps, blog, auth, 1:1 mentorship pricing.

## Tech Stack
- **Framework:** Next.js 16.0.10 (App Router) + React 19.2.0 + TypeScript 5
- **Styling:** Tailwind CSS v4 + custom CSS utility classes in `globals.css`
- **Auth:** NextAuth.js v5 beta (`next-auth@^5.0.0-beta.30`) + `@auth/prisma-adapter`
- **Database:** Prisma 6 ORM + PostgreSQL (Neon in prod, Docker local on port 5433)
- **Server state:** TanStack React Query v5
- **HTTP:** axios (dev dependency)
- **Icons:** lucide-react
- **Utilities:** clsx + tailwind-merge (`cn()` in `src/lib/utils.ts`)
- **Testing:** Vitest

## Design System

### Colors (CSS custom properties in `globals.css`)
| Token | CSS Variable | Value |
|-------|-------------|-------|
| background | `--color-background` | `#000000` |
| surface | `--color-surface` | `#0C0C0C` |
| surface-raised | `--color-surface-raised` | `#121212` |
| foreground | `--color-foreground` | `#FFFFFF` |
| muted | `--color-muted` | `#A0A0A0` |
| **neon (primary accent)** | `--color-neon` | `#00E599` |
| ai | `--color-ai` | `#8B5CF6` |
| danger | `--color-danger` | `#EF4444` |
| warning | `--color-warning` | `#F59E0B` |

Use Tailwind utility classes: `bg-neon`, `text-neon`, `border-neon`, `bg-surface`, `text-foreground`, etc.
**Never hardcode hex values — always use design tokens.**

### Fonts (loaded via `next/font/google` in `src/app/layout.tsx`)
| Role | Font | CSS Variable | Tailwind class |
|------|------|-------------|----------------|
| Display / headings | Syne (600, 700, 800) | `--font-syne` | `font-display` |
| Body text | DM Sans (400, 500, 600) | `--font-dm-sans` | `font-body` |
| Code / mono | JetBrains Mono (400, 500) | `--font-jetbrains-mono` | `font-mono` |

### No light mode — dark only.

### Shadows / Animations
Shadow utilities: `shadow-neon-sm`, `shadow-neon-md`, `shadow-neon-lg`
Animations: `animate-dot-pulse`, `animate-neon-pulse`, `animate-fade-in`, `animate-slide-up`, etc.

## Folder Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/auth/           # NextAuth + register route
│   ├── auth/               # login, register, forgot-password pages
│   ├── learn/              # Track pages: backend, devops, foundations, genai, system-design
│   ├── blog/, dashboard/, pricing/, profile/, privacy/, terms/
│   ├── layout.tsx          # Root layout (fonts, providers)
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Badge, Button, Card, Input, Table
│   ├── layout/             # MainLayout
│   ├── HeroSection.tsx     # Landing hero (extracted component)
│   ├── Navbar.tsx, Footer.tsx
│   ├── ConditionalNavbar.tsx, ConditionalFooter.tsx, ConditionalMain.tsx
│   ├── TrackRoadmapLayout.tsx
│   ├── SessionProvider.tsx, ReactQueryProvider.tsx
│   └── index.ts            # Barrel exports
├── hooks/
│   └── useLocalStorage.ts
├── lib/
│   ├── auth.ts             # NextAuth config (Google + Credentials providers, JWT strategy)
│   ├── prisma.ts           # Singleton PrismaClient
│   ├── utils.ts            # cn(), formatDate(), capitalize(), slugify()
│   ├── streak.ts           # Streak tracking logic
│   ├── debounce.ts
│   └── design-system.ts    # Design token constants (TS)
├── db/
│   └── config.ts
├── types/
│   ├── index.ts            # User, Difficulty types
│   └── next-auth.d.ts      # Session type extensions
└── middleware.ts           # Route protection
```

## Live Pages
- `/` — Landing page (hero, tracks, how it works, testimonials, pricing, blog)
- `/learn/[track]` — Track roadmap pages (backend, devops, foundations, genai, system-design)
- `/dashboard` — User dashboard
- `/blog` — Blog listing
- `/pricing` — Pricing page
- `/profile` — User profile
- `/auth/login`, `/auth/register`, `/auth/forgot-password`

## Auth Architecture
- **Providers:** GoogleProvider (OAuth) + CredentialsProvider (email/password)
- **Session:** JWT strategy
- **Password hashing:** bcryptjs at 12 rounds
- **Sign-in page:** `/auth/login`
- **Registration API:** `POST /api/auth/register` → `{ name, email, password }`

## Coding Conventions
- Functional components only, no class components
- File order per component: imports → constants/config → component fn → helpers → export
- **No dedicated `utils/api.js`** — API calls use Next.js route handlers; data fetching uses TanStack React Query
- Component files: PascalCase (`HeroSection.tsx`)
- Hook files: camelCase starting with `use` (`useLocalStorage.ts`)
- Always use async/await, never `.then()`
- Mobile-first Tailwind (base styles → `md:` / `sm:` breakpoints)
- `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
