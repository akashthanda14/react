# PROJECT_SNAPSHOT.md

## 1. Tech Stack
*   **Framework**: Next.js 16.0.10 (App Router)
*   **Language**: TypeScript 5
*   **Styling**: Tailwind CSS 4, Lucid React
*   **Auth**: NextAuth.js v5 (beta)
*   **Database**: PostgreSQL 16 (Dockerized)
*   **ORM**: Prisma 6.19.0
*   **Deployment**: Vercel (Ready)

## 2. Folder Tree
```
src/
├── app/
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes
│   ├── auth/           # Login/Register pages
│   ├── learn/          # Public track pages
│   ├── onboarding/     # Roadmap generation flow
│   ├── roadmap/        # User dashboard
│   ├── privacy/        # Static page
│   ├── terms/          # Static page
│   ├── layout.tsx
│   └── page.tsx        # Landing page
├── components/         # UI components
├── lib/
│   ├── auth.ts         # User auth config
│   ├── prisma.ts       # DB client
│   ├── roadmap-mapper.ts  # Logic for assigning tracks
│   └── roadmap-service.ts # Core business logic
└── prisma/
    ├── schema.prisma   # Database models
    └── seed-roadmap.ts # Seed data script
```

## 3. Routes
*   `/` → Landing page
*   `/auth/login` → Sign In
*   `/auth/register` → Sign Up
*   `/onboarding` → Questionnaire for new users
*   `/roadmap` → User dashboard (My Learning Path)
*   `/learn/[track]` → Public track details
*   `/admin` → Admin dashboard (Protected)
*   `/admin/tracks` → Manage tracks
*   `/admin/phases` → Manage phases
*   `/admin/skills` → Manage skills
*   `/admin/milestones` → Manage milestones
*   `/api/roadmap` → Roadmap data fetching
*   `/api/roadmap/progress` → Progress calculation
*   `/api/roadmap/milestone` → Completion tracking

## 4. Core Features
*   **Personalized Roadmaps**: Deterministic generation based on experience/role.
*   **Skill Graph**: Hierarchical tracks (Track > Phase > Skill > Milestone).
*   **Progress Tracking**: On-read calculation of phase/track completion.
*   **Milestone Validation**: Simple quiz/check-based validation.
*   **Admin CMS**: content management system for curriculum.
*   **Legacy DSA**: Legacy support for DSA sheets (hidden).

## 5. Data Models
*   **User**: `hasMany` UserRoadmap, UserMilestoneProgress, UserProblemProgress.
*   **Track**: `hasMany` Phase, UserRoadmap.
*   **Phase**: `hasMany` Skill, Milestone.
*   **Skill**: Topics within a phase.
*   **Milestone**: `hasMany` MilestoneQuestion, UserMilestoneProgress.
*   **MilestoneQuestion**: `hasMany` MilestoneAnswerOption.
*   **UserRoadmap**: Links User to Track with progress state.
*   **UserMilestoneProgress**: Tracks individual milestone completion.
*   **Legacy (Sheet, Topic, Problem)**: Preserved from previous iteration.

## 6. Services / Business Logic Files
*   `src/lib/roadmap-mapper.ts` → Deterministic logic to map user answers to tracks/phases.
*   `src/lib/roadmap-service.ts` → CRUD for roadmaps, progress calculation, milestone validation.
*   `src/lib/auth.ts` → NextAuth configuration and callbacks.

## 7. External Integrations
*   **Auth**: Google OAuth (implied by env vars), Credentials.
*   **Analytics**: Google Analytics (Script in layout).

## 8. Environment Variables (Names Only)
*   `DATABASE_URL`
*   `DOCKER_DATABASE_URL`
*   `NEXTAUTH_SECRET`
*   `NEXTAUTH_URL`
*   `GOOGLE_CLIENT_ID`x
*   `GOOGLE_CLIENT_SECRET`

## 9. Background Jobs / Cron
*   None.

## 10. Admin Capabilities
*   Manage Tracks (Create/Edit/List)
*   Manage Phases (Create/Edit/List)
*   Manage Skills (Create/Edit/List)
*   Manage Milestones (Create/Edit/List)
*   Role-based access via `User.role` (ADMIN vs USER).

## 11. Feature Flags / Paywalled Features
*   **Admin Role**: Gated access to `/admin`.
*   **Locked Phases**: Logic exists to lock future phases based on progress.
