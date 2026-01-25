# Route Pruning & Consolidation Plan

## Analysis
The current route structure is highly efficient. There is very little fat to trim because we are rebuilding from scratch and have already isolated legacy routes.

## Final Minimal Route List

### 🌍 Public
*   `/` - Landing Page (Marketing)
*   `/learn/[track]` - Public Track Details (SEO, Curriculum Preview)
*   `/pricing` - Pricing & Plans
*   `/privacy` - Privacy Policy
*   `/terms` - Terms of Service

### 🔐 Auth
*   `/auth/login` - Sign In
*   `/auth/register` - Sign Up

### 👤 User (Protected)
*   `/onboarding` - Roadmap Generation Flow
*   `/roadmap` - User Dashboard (My Roadmaps)
*   `/learn/[track]/milestone/[id]` - Learning & Validation View

### 🛡️ Admin (Protected + Role)
*   `/admin` - Admin Dashboard
*   `/admin/tracks` - CMS: Tracks
*   `/admin/phases` - CMS: Phases
*   `/admin/skills` - CMS: Skills
*   `/admin/milestones` - CMS: Milestones

### ⚙️ API
*   `/api/roadmap/*` - Roadmap CRUD & Progress
*   `/api/auth/*` - NextAuth Endpoints

## Consolidations
*   **Merged**: Profile settings will live inside `/roadmap` for MVP (no separate `/settings` page yet).
*   **Hidden**: All `/sheet`, `/problem`, `/interview` routes moved to `/legacy` folder (not deployed/accessible).

## Status
✅ Site map is clean and hierarchical.
