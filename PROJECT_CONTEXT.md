# Akash Code Official — Full Project Context

> **Domain:** akashcodeofficial.com  
> **Purpose:** Phase-based engineering roadmaps SaaS for developers targeting product companies  
> **Stack:** Next.js 16 · TypeScript · NextAuth v5 · Prisma · PostgreSQL · Tailwind CSS v4

---

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Tech Stack & Dependencies](#tech-stack--dependencies)
3. [Environment & Config](#environment--config)
4. [Design System](#design-system)
5. [Database Schema](#database-schema)
6. [Authentication](#authentication)
7. [Pages](#pages)
8. [Components](#components)
9. [API Routes](#api-routes)
10. [Core Libraries](#core-libraries)
11. [Data Flow](#data-flow)
12. [Deployment](#deployment)
13. [Issues & Incomplete Features](#issues--incomplete-features)
14. [Orphaned / Miscellaneous Files](#orphaned--miscellaneous-files)

---

## Folder Structure

```
myStartup/
├── prisma/
│   ├── schema.prisma              # DB models (User, Account, Session, VerificationToken)
│   ├── migrations/                # 19 applied migration SQL files
│   └── seed.ts                    # DB seeder (empty/minimal)
│
├── src/
│   ├── app/                       # Next.js App Router — all pages & API routes
│   │   ├── layout.tsx             # Root layout (fonts, analytics, session, nav)
│   │   ├── page.tsx               # Home / Landing page
│   │   ├── loading.tsx            # Global loading spinner
│   │   ├── not-found.tsx          # 404 page
│   │   ├── globals.css            # Design tokens + base styles
│   │   │
│   │   ├── auth/
│   │   │   ├── layout.tsx         # Dark wrapper for auth pages
│   │   │   ├── login/page.tsx     # Login (credentials + Google OAuth)
│   │   │   ├── register/page.tsx  # Register with auto sign-in
│   │   │   └── forgot-password/   # Placeholder — NOT implemented
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Protected dashboard (5 track cards, greeting)
│   │   │
│   │   ├── learn/
│   │   │   ├── page.tsx           # All tracks listing
│   │   │   ├── backend/page.tsx
│   │   │   ├── system-design/page.tsx
│   │   │   ├── devops/page.tsx
│   │   │   ├── genai/page.tsx
│   │   │   └── foundations/page.tsx
│   │   │
│   │   ├── blog/
│   │   │   └── page.tsx           # Blog listing with category filter (detail pages MISSING)
│   │   │
│   │   ├── pricing/
│   │   │   └── page.tsx           # Free vs Pro pricing table + FAQ
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx           # Protected — user info, badges (placeholder)
│   │   │
│   │   ├── privacy/page.tsx       # Static privacy policy
│   │   ├── terms/page.tsx         # Static terms of service
│   │   │
│   │   └── api/
│   │       └── auth/
│   │           ├── register/route.ts        # POST — create user account
│   │           └── [...nextauth]/route.ts   # NextAuth catch-all handler
│   │
│   ├── components/
│   │   ├── index.ts               # Exports Navbar, Footer
│   │   ├── Navbar.tsx             # Top nav (auth-aware, mobile menu)
│   │   ├── Footer.tsx             # 5-column footer
│   │   ├── ConditionalNavbar.tsx  # Hides Navbar on auth + home pages
│   │   ├── ConditionalFooter.tsx  # Hides Footer on auth + home pages
│   │   ├── ConditionalMain.tsx    # Adds top padding except auth + home
│   │   ├── SessionProvider.tsx    # NextAuth SessionProvider wrapper
│   │   ├── ReactQueryProvider.tsx # TanStack React Query (installed, NOT used)
│   │   ├── TrackRoadmapLayout.tsx # Reusable phase layout for /learn/* pages
│   │   └── ui/
│   │       ├── Button.tsx         # Variants: primary, secondary, outline, ghost, etc.
│   │       ├── Card.tsx           # Base card component
│   │       ├── Input.tsx          # Form input with label + error
│   │       ├── Table.tsx          # Data table component
│   │       └── Badge.tsx          # Difficulty + status badges
│   │
│   ├── lib/
│   │   ├── auth.ts                # NextAuth config (providers, callbacks, JWT)
│   │   ├── prisma.ts              # Prisma singleton client
│   │   ├── utils.ts               # cn(), formatDate(), capitalize(), slugify()
│   │   ├── design-system.ts       # Design tokens as JS objects
│   │   ├── streak.ts              # Streak logic (defined, NOT triggered anywhere)
│   │   └── debounce.ts            # Debounce + BatchProcessor (defined, NOT used)
│   │
│   ├── types/
│   │   └── index.ts               # User interface, Difficulty type
│   │
│   └── middleware.ts              # Active: adds x-pathname header to all requests
│
├── middleware.ts                  # ROOT LEVEL — conflicts with src/middleware.ts (see Issues)
├── docker-compose.yml             # PostgreSQL 16 on port 5433
├── .env                           # Env vars (DB, auth, Redis)
├── next.config.ts                 # React compiler enabled
├── tailwind.config.ts             # Class-based dark mode
├── tsconfig.json
├── package.json
├── CLAUDE.md                      # Claude Code project instructions
└── PROJECT_CONTEXT.md             # This file
```

---

## Tech Stack & Dependencies

| Category | Package | Version | Notes |
|---|---|---|---|
| Framework | next | 16.0.10 | App Router |
| Language | typescript | 5.x | Strict mode |
| Runtime | react | 19.2.0 | React 19 compiler on |
| Auth | next-auth | 5.0.0-beta.30 | JWT strategy |
| Auth Adapter | @auth/prisma-adapter | latest | |
| ORM | @prisma/client | 6.19.0 | |
| DB | PostgreSQL | 16 | Docker local / Neon prod |
| Styling | tailwindcss | 4.x | |
| State | @tanstack/react-query | 5.90.12 | Installed, not yet used |
| Icons | lucide-react | latest | |
| Animations | canvas-confetti | latest | Likely for milestone completions (not wired) |
| Password | bcryptjs | latest | Cost factor 12 |
| Class utils | clsx + tailwind-merge | latest | via cn() |
| Theming | next-themes | latest | Installed, not implemented |
| Analytics | Google Analytics | G-6K6MC9HWN3 | In root layout |
| Caching | Upstash Redis | — | Env vars set, not actively used in code |

---

## Environment & Config

### `.env` Variables

```env
# Database — local Docker (active)
DATABASE_URL="postgresql://akashcode:akashcode@localhost:5433/akashcode_db"
DIRECT_URL="postgresql://akashcode:akashcode@localhost:5433/akashcode_db"

# Database — Neon production (commented out)
# DATABASE_URL="postgresql://neondb_owner:...@neon.tech/neondb?sslmode=require"
# DIRECT_URL="postgresql://neondb_owner:...@neon.tech/neondb?sslmode=require"

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CLIENT_CALLBACK_URL=http://localhost:3001/auth/google/callback

# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=...

# Upstash Redis (configured, not actively used)
UPSTASH_REDIS_REST_URL=https://dear-chimp-5961.upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

### `next.config.ts`

```ts
reactCompiler: true   // React 19 optimizations enabled
```

### `package.json` Scripts

```json
"dev": "next dev -p 3001",
"build": "next build",
"start": "next start",
"db:migrate": "prisma migrate dev",
"db:seed": "prisma db seed",
"db:generate": "prisma generate"
```

**Vercel Build Command:**
```bash
prisma generate && prisma migrate deploy || prisma db push --accept-data-loss && next build
```
Note: Falls back to `db push` (force schema sync) if migrations fail — risky in production.

---

## Design System

Defined in `src/app/globals.css` and mirrored as JS tokens in `src/lib/design-system.ts`.

### Colors

| Token | Value | Usage |
|---|---|---|
| Background | `rgb(0, 0, 0)` | Page background |
| Surface | `rgb(12, 12, 12)` | Cards, panels |
| Surface Raised | `rgb(18, 18, 18)` | Elevated elements |
| Foreground | `rgb(255, 255, 255)` | Primary text |
| Neon | `rgb(0, 229, 153)` — `#00E599` | Primary accent |
| AI Purple | `rgb(139, 92, 246)` | Secondary accent |
| Muted | `rgb(115, 115, 115)` | Secondary text |
| Border | `rgb(30, 30, 30)` | Card borders |

**Opacity utilities:** `.bg-neon/5` through `.bg-neon/90`, `.border-neon/30`, `.text-neon`

### Typography

| Font | Family | Use |
|---|---|---|
| Display | Syne (600–800) | Headings, hero |
| Body | DM Sans (400–600) | Paragraphs, UI |
| Mono | JetBrains Mono (400–500) | Code, badges |

### Animations (keyframes)

| Class | Effect |
|---|---|
| `.animate-fade-in` | Opacity 0 → 1 |
| `.animate-slide-up` | TranslateY 16px → 0 |
| `.animate-slide-down` | TranslateY -16px → 0 |
| `.animate-neon-pulse` | Glow intensity oscillation |
| `.animate-dot-pulse` | Loading dots |
| `.animate-check-bounce` | Checkbox bounce |

### Component Base Classes

```css
.card          /* Surface bg + border + rounded-xl */
.btn-neon      /* Neon bg, dark text, hover scale */
.btn-ghost     /* Transparent, border on hover */
.bg-grid       /* Dot grid background pattern */
.bg-grid-lines /* Line grid background pattern */
.shadow-neon-sm/md/lg  /* Neon glow shadow */
.no-scrollbar  /* Hide scrollbar */
```

---

## Database Schema

**File:** `prisma/schema.prisma`  
**Provider:** PostgreSQL  
**Total migrations:** 19 applied

### Models

#### `User`
```prisma
id               String    @id @default(cuid())
email            String    @unique
name             String
image            String?
password         String?          // null for OAuth users
currentStreak    Int       @default(0)
longestStreak    Int       @default(0)
lastActivityDate DateTime?        // for streak calculation
role             Role      @default(USER)
createdAt        DateTime  @default(now())
updatedAt        DateTime  @updatedAt

accounts         Account[]
sessions         Session[]
```

#### `Account` (NextAuth OAuth)
Stores OAuth provider credentials (Google). Cascading delete from User.

#### `Session` (NextAuth)
Stores active sessions with `sessionToken` (unique) + `expires`. Cascading delete from User.

#### `VerificationToken`
For email verification flows. Unique constraint on `[identifier, token]`.  
**Note:** Not used — no email verification flow implemented.

#### `Role` (enum)
```prisma
enum Role { USER, ADMIN }
```

### What's MISSING from Schema

The following would be needed for full feature set:
- `Track` — track metadata
- `Phase` — phases per track
- `Milestone` — milestones per phase
- `UserProgress` — which milestones user completed
- `UserBadge` — earned badges
- `BlogPost` — blog content
- `Subscription` — Pro/Free plan status

---

## Authentication

### Flow: Email/Password Registration

```
/auth/register (page)
  → validates fields (name, email, password min 8 chars, confirm match)
  → POST /api/auth/register
      → checks email uniqueness
      → bcryptjs hash (cost 12)
      → prisma.user.create()
      → returns { id, name, email }
  → signIn("credentials", { email, password })
  → redirect to /dashboard (or callbackUrl)
```

### Flow: Google OAuth

```
/auth/login (page)
  → signIn("google")
  → NextAuth Google provider
  → signIn callback: find or create user in DB
  → JWT callback: stores user.id in token
  → session callback: exposes user.id in session
  → redirect to callbackUrl or /dashboard
```

### Flow: Email/Password Login

```
/auth/login (page)
  → signIn("credentials", { email, password })
  → NextAuth credentials authorize():
      → finds user by email
      → bcryptjs compare
      → returns user or null
  → on success: JWT issued, redirect
  → on fail: error="CredentialsSignin"
```

### `src/lib/auth.ts` — Key Config

```ts
session: { strategy: "jwt" }
pages: {
  signIn: "/auth/login",
  signOut: "/auth/login",
  error: "/auth/error"   // page doesn't exist yet
}
```

### Middleware (`src/middleware.ts`)

Active middleware adds `x-pathname` header to every request (used by ConditionalNavbar/Footer to detect route).  
**Protected routes array is empty** — no route protection enforced currently.

---

## Pages

### `/` — Landing Page
**File:** `src/app/page.tsx` · **Type:** Client Component

Sections (in order):
1. **LandingNav** — Logo, nav links (Tracks, How It Works, Pricing, Blog), login/signup CTA
2. **Hero** — Headline + sub + CTA buttons + floating cards
3. **TrustAndStats** — Company logos + 4 stat cards (128K+ Users, 20 Tracks planned, 20 Phases, 5 Tracks live)
4. **Problem** — 3 pain point cards (tutorial hell, no roadmap, interview anxiety)
5. **Tracks** — 5 track cards linking to `/learn/{slug}`
6. **HowItWorks** — 3-step process (Choose → Follow → Ship)
7. **Testimonials** — 3 engineer quotes (Flipkart, Razorpay, Zerodha)
8. **Pricing** — 3 mentorship tier cards (Starter $0, Pro $9/mo, Enterprise custom)
9. **BlogSection** — 4 latest blog previews
10. **LandingFooter** — Links + social

**Data:** 100% hardcoded in component  
**No API calls**

---

### `/dashboard` — Dashboard
**File:** `src/app/dashboard/page.tsx` · **Type:** Server Component  
**Auth:** Redirects to `/auth/login?callbackUrl=/dashboard` if no session

Content:
- Time-based greeting (Good morning/afternoon/evening + first name from session)
- 4 stat cards (5 Tracks, 128K+ Community, 26 Phases, Free Access)
- 5 track cards with emoji, description, phase count, links to `/learn/{slug}`

**Data:** Hardcoded tracks array in page file  
**No DB queries beyond session check**

---

### `/learn` — Track Listing
**File:** `src/app/learn/page.tsx` · **Type:** Server Component

- All 5 tracks with descriptions and phase counts
- 3-step "How It Works"
- CTA to pricing

**Data:** Hardcoded

---

### `/learn/{track}` — Track Roadmap (5 pages)

**Files:** `src/app/learn/{backend,system-design,devops,genai,foundations}/page.tsx`  
**Component Used:** `TrackRoadmapLayout`

Each page passes:
```ts
{
  title: "Backend Engineering",
  emoji: "⚙️",
  color: "#00E599",
  phases: 5,
  hours: 120,
  description: "...",
  phaseData: Phase[]   // 5 phases with milestones per track
}
```

**Phase structure:**
```ts
{
  name: string,
  learn: string,      // comma-separated topics
  outcome: string,    // 1-sentence goal
  milestones: string[] // 3 items
}
```

**Data:** Hardcoded per file

---

### `/blog` — Blog Listing
**File:** `src/app/blog/page.tsx` · **Type:** Client Component

- Featured post (large card)
- Category tabs: All, Backend, System Design, DevOps, GenAI, Career, Frontend
- 6-post grid with image, category, read time, author, excerpt
- Email subscribe form (UI only — no handler)

**Posts (hardcoded):**
1. "Stop Building CRUD Apps — Start Designing Systems" (featured, System Design)
2. "The Backend Scaling Checklist I Wish I Had 5 Years Ago"
3. "Microservices Communication: REST vs gRPC vs Message Queues"
4. "Kubernetes: From 'What Is a Pod?' to Production in 30 Days"
5. "Building a Production RAG System: Lessons from Real Failures"
6. "7 API Design Principles That Will Make Your Backend Unforgettable"

**`/blog/{slug}` — DOES NOT EXIST** — clicking a post leads to 404

---

### `/pricing` — Pricing
**File:** `src/app/pricing/page.tsx` · **Type:** Server Component

Plans:
| Plan | Price | Notes |
|---|---|---|
| Free | $0/mo | Phase 1 only, all tracks visible |
| Pro | $9/mo | All 6 phases, AI recommendations, certificates, Discord |
| Enterprise | Custom | Not detailed in this page (only on homepage) |

FAQ (4 items): cancellation, Phase 1 scope, student discount, multiple tracks  
**CTAs link to `/auth/register` — no payment integration**

---

### `/profile` — User Profile
**File:** `src/app/profile/page.tsx` · **Type:** Server Component  
**Auth:** Redirects to `/auth/login?callbackUrl=/profile`

Content:
- Avatar (first initial in neon box)
- Name + email from session
- 3 stat cards (5 Tracks, 26 Phases, Free Plan — all hardcoded)
- 5 track links
- 5 badge placeholders (all "Coming Soon")

**No DB reads for progress or badges**

---

### `/auth/login` — Login Page
**File:** `src/app/auth/login/page.tsx` · **Type:** Client Component

- Email + password form
- Google OAuth button
- "Forgot password?" link → `/auth/forgot-password` (not implemented)
- Error display for CredentialsSignin
- Loading spinner during signIn call

---

### `/auth/register` — Register Page
**File:** `src/app/auth/register/page.tsx` · **Type:** Client Component

- Full name, email, password, confirm password
- Client-side validation (8+ chars, must match)
- Google OAuth button
- POST to `/api/auth/register` then auto-signIn
- Terms of Service + Privacy Policy links

---

### `/auth/forgot-password` — Forgot Password
**File:** `src/app/auth/forgot-password/page.tsx`  
**Status:** Page file exists — UI placeholder only, no reset email logic

---

### Static Pages

| Page | File | Content |
|---|---|---|
| `/privacy` | `src/app/privacy/page.tsx` | Static privacy policy |
| `/terms` | `src/app/terms/page.tsx` | Static terms of service |

---

## Components

### Layout

#### `Navbar.tsx`
**Type:** Client · **Used in:** `ConditionalNavbar`

- Fixed position, blur + border appear on scroll
- Logo links to `/`
- Public nav links: Tracks, How It Works, Pricing, Blog
- Auth nav links (when logged in): Dashboard, Tracks, Profile, Sign Out (dropdown)
- Mobile hamburger menu
- `useSession()` for auth state

#### `Footer.tsx`
**Type:** Server

5 columns: Brand · Platform · Tracks · Company · Community  
Status badge: "All systems operational"

#### `ConditionalNavbar.tsx`
**Type:** Client  
Reads `x-pathname` header from request headers (set by middleware).  
Hides Navbar on: `/auth/*`, `/` (home page)

#### `ConditionalFooter.tsx`
**Type:** Client  
Same pattern — hides Footer on auth + home pages.

#### `ConditionalMain.tsx`
**Type:** Client  
Adds `pt-[88px]` to `<main>` to offset fixed Navbar, except on auth + home pages.

---

### Feature Components

#### `TrackRoadmapLayout.tsx`
**Type:** Server · **Used by:** all `/learn/{track}` pages

Props:
```ts
{
  title: string
  emoji: string
  color: string
  phases: number
  hours: number
  description: string
  phaseData: { name, learn, outcome, milestones[] }[]
}
```

Renders:
- Back link to `/learn`
- Track hero (emoji, title, badge with phases/hours)
- Phase cards with "What you learn" + "Outcome" + milestone bullets
- Bottom CTA → `/pricing`

#### `SessionProvider.tsx`
**Type:** Client  
Wraps `NextAuthSessionProvider`. Required for `useSession()` in client components. Placed in `RootLayout`.

#### `ReactQueryProvider.tsx`
**Type:** Client  
Wraps `QueryClientProvider`. **Installed but NOT used** — no `useQuery` / `useMutation` hooks anywhere in the codebase.

---

### UI Components (`src/components/ui/`)

#### `Button.tsx`
```ts
variants: "primary" | "secondary" | "success" | "danger" | "outline" | "ghost"
sizes: "sm" | "md" | "lg" | "xl"
props: isLoading, leftIcon, rightIcon, disabled, onClick, href
```
Has loading spinner slot. Accessible with focus ring.

#### `Card.tsx`
Base card wrapper with surface background, border, rounded corners. Accepts `className` prop.

#### `Input.tsx`
Form input with optional label and error message display.

#### `Table.tsx`
Data table component with header/body structure.

#### `Badge.tsx`
Difficulty variants: Easy (green), Medium (yellow), Hard (red).  
Status variants: default, primary, success, warning, danger.

---

## API Routes

### `POST /api/auth/register`
**File:** `src/app/api/auth/register/route.ts`

```
Request:  { name: string, email: string, password: string }

Steps:
1. Validate all fields present
2. prisma.user.findUnique({ where: { email } }) — check for duplicate
3. bcryptjs.hash(password, 12)
4. prisma.user.create({ name, email, hashedPassword })
5. Return { user: { id, name, email } }

Responses:
  201 — { user: { id, name, email } }
  400 — { error: "All fields required" }
  400 — { error: "User already exists" }
  500 — { error: "Internal server error" }
```

**Missing:** Server-side email format validation

---

### `GET|POST /api/auth/[...nextauth]`
**File:** `src/app/api/auth/[...nextauth]/route.ts`

Delegates to NextAuth. Handles:
- `GET /api/auth/session`
- `GET /api/auth/providers`
- `POST /api/auth/signin/{provider}`
- `POST /api/auth/signout`
- `GET /api/auth/callback/{provider}` (OAuth)
- `GET /api/auth/csrf`

---

### Missing API Routes (need to be built)

| Endpoint | Purpose |
|---|---|
| `POST /api/milestones/{id}/complete` | Mark milestone done, trigger streak |
| `GET /api/user/progress` | Fetch user's completion state per track |
| `GET /api/user/streak` | Current + longest streak |
| `PATCH /api/user/profile` | Update name/avatar |
| `GET /api/blog` | Serve blog posts from DB |
| `GET /api/blog/{slug}` | Single post |
| `POST /api/subscribe` | Email subscription |

---

## Core Libraries

### `src/lib/auth.ts` — NextAuth Config

- **Providers:** Google OAuth + Credentials (bcrypt)
- **Strategy:** JWT
- **signIn callback:** Creates user on first Google OAuth, validates password for credentials
- **jwt callback:** Stores `user.id` in token
- **session callback:** Exposes `user.id` on session object

### `src/lib/prisma.ts` — Prisma Singleton

Prevents multiple PrismaClient instances in dev hot-reload:
```ts
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

### `src/lib/utils.ts` — Utilities

```ts
cn(...classes)           // clsx + tailwind-merge
formatDate(date)         // → "April 2, 2026"
capitalize(str)          // → "Hello"
slugify(str)             // → "my-blog-post"
```

### `src/lib/streak.ts` — Streak Logic ⚠️ (defined, NOT triggered)

```ts
updateUserStreak(userId: string): Promise<number>
  // Increments if yesterday's activity, resets if gap > 1 day
  // Returns new streak count

getUserStreak(userId: string): Promise<{ currentStreak, longestStreak }>
  // Validates streak hasn't expired, resets if needed
```

**These functions exist but are never called** — there are no milestone completion endpoints.

### `src/lib/debounce.ts` — Batch Utilities ⚠️ (defined, NOT used)

```ts
debounce<T>(func, delay)     // Standard debounce
BatchProcessor<T>            // Accumulates updates, auto-flushes
  .add(key, value)
  .flush() / .forceFlush()
```

Intended for batching milestone progress saves. Not wired to any endpoints.

### `src/lib/design-system.ts` — Design Tokens (JS)

Exports colors, typography, spacing, borderRadius, shadows, breakpoints, zIndex, transitions, componentVariants as JS objects. Used for programmatic styling logic.

---

## Data Flow

### Current State: Everything is Hardcoded

```
User visits /dashboard
  → Server Component checks session (NextAuth)
  → No DB query for user data
  → Returns hardcoded tracks array
  → Renders static content
```

```
User visits /learn/backend
  → No auth check
  → No DB query
  → Returns hardcoded phaseData array
  → Renders phases
```

### Where Data Lives (Current)

| Data | Location | Should be |
|---|---|---|
| Track list (5) | Multiple page files | `Track` table |
| Phase data (25 phases) | Per-track page files | `Phase` table |
| Blog posts (6) | `blog/page.tsx` | `BlogPost` table |
| Testimonials (3) | `page.tsx` | CMS or `Testimonial` table |
| Stats (4 numbers) | `page.tsx` | Derived from DB or config |
| User streak | User model | `streak.ts` exists, not called |
| User progress | — | `UserProgress` model (missing) |
| Badges | Profile page (placeholder) | `UserBadge` model (missing) |

### Intended Future Flow

```
User completes milestone
  → POST /api/milestones/{id}/complete
  → updateUserStreak(userId)  ← streak.ts ready
  → Save to UserProgress
  → Invalidate React Query cache
  → UI updates with confetti (canvas-confetti installed)
```

---

## Deployment

### Local Development
```bash
# Start Docker DB
docker compose up -d

# Run migrations
npx prisma migrate deploy

# Start dev server
npm run dev   # → http://localhost:3001
```

### Docker Compose

```yaml
# docker-compose.yml
postgres:
  image: postgres:16
  platform: linux/arm64   # Apple Silicon
  container_name: akashcode_db
  ports: "5433:5432"
  env:
    POSTGRES_USER: akashcode
    POSTGRES_PASSWORD: akashcode
    POSTGRES_DB: akashcode_db
  volumes: postgres_data:/var/lib/postgresql/data
```

### Production (Vercel + Neon)

- **Host:** Vercel
- **DB:** Neon PostgreSQL (SSL required)
- **Analytics:** Google Analytics G-6K6MC9HWN3
- **Build command:** `prisma generate && prisma migrate deploy || prisma db push --accept-data-loss && next build`
- **Switch DB:** Uncomment Neon vars, comment Docker vars in `.env`

---

## Issues & Incomplete Features

### Critical Issues

| # | Issue | File | Impact |
|---|---|---|---|
| 1 | **Duplicate middleware** | `middleware.ts` (root) vs `src/middleware.ts` | Root middleware redirects to `/roadmap` (doesn't exist); only `src/` is active |
| 2 | **Broken redirect** | `middleware.ts` root | `redirects to /roadmap` — page does not exist |
| 3 | **No route protection** | `src/middleware.ts` | Protected routes array is `[]` — any URL accessible without auth |
| 4 | **Blog detail pages missing** | `src/app/blog/` | Clicking any blog post → 404 |
| 5 | **Auth error page missing** | — | NextAuth configured `error: "/auth/error"` but page doesn't exist |

### Incomplete Features

| Feature | Status | Notes |
|---|---|---|
| Streak tracking | Defined, not triggered | `streak.ts` ready, no endpoint calls it |
| Milestone completion | Not started | No API, no UI, no DB model |
| User progress | Not started | No `UserProgress` model |
| Badges | Placeholder UI only | 5 "Coming Soon" cards in profile |
| Blog detail pages | Missing | 6 posts, 0 detail routes |
| Forgot password | UI placeholder | No email/reset logic |
| Email verification | VerificationToken model exists | No flow implemented |
| Payment / Pro tier | CTA buttons only | No Stripe or payment integration |
| Dark mode toggle | next-themes installed | Not wired to any UI toggle |
| Email subscription | Form UI on blog | No handler |
| React Query | Installed | No queries or mutations written |
| Upstash Redis | Credentials configured | Not used in code |
| canvas-confetti | Installed | Not used — probably for milestone celebrations |

### Hardcoded Values to Fix

| Value | Location | Fix |
|---|---|---|
| Streak = 7 | `dashboard/page.tsx:44` | Pull from `getUserStreak(userId)` |
| Pro locking = false | Future roadmap client | Enforce via subscription check |
| XP formula `topicsDone * 30` | Memory note | Make configurable |
| Stats (128K, 20, 26) | Multiple pages | Move to config or DB aggregate |
| Track/phase data | Per-page files | Migrate to DB + API |

---

## Orphaned / Miscellaneous Files

| File | Purpose | Status |
|---|---|---|
| `UI/akashcodeofficial (1).jsx` | Old JSX landing page prototype | Orphaned — superseded by current Next.js pages |
| `UI/UX.md` | Early design/UX notes | Orphaned — not referenced anywhere |
| `start.sh` | Shell script | Unknown purpose; possibly to start dev environment |
| `skills-lock.json` | Claude Code skills config | Tooling artifact, not part of the app |
| `claude.md` | Claude Code project notes | Tooling artifact |
| `CLAUDE.md` | Claude Code project instructions | Tooling config (checked in) |
| `ReactQueryProvider.tsx` | TanStack Query wrapper | Exists but never used — no queries in codebase |
| `src/types/index.ts` | Type definitions | Minimal (User, Difficulty) — most types are inline |
| `prisma/seed.ts` | DB seeder | Exists but likely empty/minimal — no content models to seed yet |

---

## Connection Map

```
Root Layout (layout.tsx)
  ├── SessionProvider          ← wraps entire app for useSession()
  ├── ConditionalNavbar
  │     └── Navbar             ← useSession(), usePathname()
  ├── ConditionalMain          ← adds padding offset
  ├── {children}               ← page content
  └── ConditionalFooter
        └── Footer

/auth/* pages
  ├── lib/auth.ts              ← NextAuth providers/callbacks
  ├── /api/auth/register       ← POST for credentials signup
  ├── /api/auth/[...nextauth]  ← all OAuth + session endpoints
  └── lib/prisma.ts            ← DB access

/dashboard, /profile
  └── getServerSession(authOptions) ← server-side auth guard

/learn/{track}
  └── TrackRoadmapLayout       ← renders hardcoded phaseData

Streak (future wiring needed)
  lib/streak.ts
    ├── updateUserStreak()     ← call from milestone completion endpoint
    └── getUserStreak()        ← call from dashboard/profile

Batch updates (future)
  lib/debounce.ts
    └── BatchProcessor         ← call from progress save endpoints
```

---

*Generated: 2026-04-02 | Context current as of this date*
