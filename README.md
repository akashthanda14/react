# AkashCode - Personalized Learning Platform

A comprehensive learning platform designed to generate personalized full-stack developer roadmaps, track skill progression, and provide legacy support for DSA practice. Built with **Next.js 16**, **TypeScript**, **Prisma**, and **NextAuth**.

## 🚀 Overview

AkashCode helps developers navigate their learning journey by offering:

-   **Personalized Roadmaps**: Deterministic path generation based on user role (e.g., Frontend, Backend) and experience level.
-   **Skill Graph**: Hierarchical learning tracks broken down into Tracks > Phases > Skills > Milestones.
-   **Progress Tracking**: granular tracking of milestone completion and phase unlocking.
-   **Admin CMS**: A full-featured dashboard for content managers to curate tracks, skills, and validation quizzes.
-   **Legacy DSA**: Continued support for Data Structures & Algorithms practice sheets.

---

## 🛠 Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Language**: TypeScript 5
-   **Styling**: Tailwind CSS 4, Lucide React
-   **Authentication**: NextAuth.js v5
-   **Database**: PostgreSQL 16
-   **ORM**: Prisma 6.19.0
-   **Testing**: Vitest
-   **Containerization**: Docker Support

---

## ✨ Key Features

### For Learners
-   **Onboarding Flow**: Interactive questionnaire to determine the best learning path.
-   **Dynamic Dashboard**: Visual progress tracking across different phases of the roadmap.
-   **Milestone Validation**: Quiz-based or check-based validation to ensure concept mastery.
-   **Resource Integration**: Curated learning resources attached to each skill.
-   **DSA Practice**: Access to 450+ curated DSA problems with tracking (Legacy).

### For Admins
-   **Track Management**: Create and modify learning tracks (e.g., "Full Stack Web").
-   **Content Curating**: Manage Phases, Skills, and Milestones via a secure dashboard.
-   **User Analytics**: (Planned) View user engagement and progress stats.

---

## 🏗 Project Architecture

```
src/
├── app/
│   ├── admin/          # Protected Admin Dashboard
│   ├── api/            # API Routes (Roadmap, Auth, etc.)
│   ├── auth/           # Login & Register Pages
│   ├── learn/          # Public Learning Track Pages
│   ├── onboarding/     # Roadmap Generation Flow
│   ├── roadmap/        # User Learning Dashboard
│   └── page.tsx        # Landing Page
├── components/         # Reusable UI Components
├── lib/
│   ├── auth.ts         # Authentication Configuration
│   ├── roadmap-mapper.ts  # Logic for Roadmap Assignment
│   └── roadmap-service.ts # Core Business Logic
└── prisma/
    ├── schema.prisma   # Database Models
    └── seed-roadmap.ts # Database Seeder
```

---

## 🚀 Getting Started

### Prerequisites
-   Node.js 18+
-   PostgreSQL (Local or managed like Neon/Supabase)
-   Docker (Optional, for easy DB setup)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/akashthanda14/akashcodeofficial.git
    cd akashcodeofficial
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env
    ```
    Ensure you define:
    -   `DATABASE_URL`
    -   `NEXTAUTH_SECRET`
    -   `NEXTAUTH_URL`

4.  **Database Setup**
    ```bash
    # Apply migrations
    npx prisma db push

    # Seed initial data (Tracks, Skills, etc.)
    npm run db:seed
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔒 Routes & Access

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing Page |
| `/auth/login` | Public | Sign In |
| `/onboarding` | Authenticated | User Roadmap Generation |
| `/roadmap` | Authenticated | User Dashboard |
| `/admin/*` | Admin Only | CMS for Tracks & Content |

---

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'feat: Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
