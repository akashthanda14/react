# DSA Sheet - Data Structures & Algorithms Practice Platform

A full-stack web application for practicing Data Structures & Algorithms problems, built with **Next.js 15**, **TypeScript**, **Prisma ORM**, and **NextAuth v5**.

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Authentication Flow](#-authentication-flow)
- [Components](#-components)
- [Pages](#-pages)
- [Deployment](#-deployment)
- [Scripts Reference](#-scripts-reference)
- [Development Workflow](#-development-workflow)
- [Troubleshooting](#-troubleshooting)

---

## ⚡ Quick Start

```bash
# 1. Clone and install
git clone <repository-url>
cd dsaheet
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# 3. Set up database
npx prisma db push
npx prisma generate
npm run db:seed

# 4. Start development server
npm run dev
# Open http://localhost:3001

# 5. Login with demo account
# Email: admin@dsasheet.com
# Password: password123
```

---

## 🎯 Overview

This is a LeetCode-style DSA practice platform that helps developers prepare for technical interviews. Users can browse problems organized by topics and subtopics, track their solving progress, filter by difficulty and company tags, and view detailed statistics.

### Key Highlights

- **450+ DSA Problems** organized by topics and subtopics
- **User Authentication** with Email/Password and GitHub OAuth
- **Progress Tracking** with solve status, attempts, and time spent
- **Smart Filtering** by difficulty, topic, company tags, and status
- **Responsive UI** with dark mode support
- **Role-Based Access** for admin management
- **Real-time Statistics** and progress visualization

---

---

## ✨ Features

### For Users
- ✅ **Browse Problems** - Access 450+ carefully curated DSA problems
- � **Advanced Filtering** - Filter by difficulty, topic, subtopic, company tags, and solve status
- 📊 **Progress Tracking** - Mark problems as Not Started, In Progress, or Solved
- 📈 **Statistics Dashboard** - View solve counts, difficulty breakdown, and topic-wise progress
- 📝 **Personal Notes** - Add notes and track time spent on each problem
- 🔗 **External Links** - Direct links to LeetCode, GFG, and other platforms
- 🌙 **Dark Mode** - Eye-friendly theme with system preference detection

### For Admins
- 🛠️ **Problem Management** - Add, edit, and delete problems
- 🏷️ **Topic Management** - Organize problems into topics and subtopics
- 🏢 **Company Tags** - Manage company associations
- 📊 **User Analytics** - View user engagement and problem popularity

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with class-based dark mode)
- **Icons:** Lucide React
- **Theme:** next-themes (v0.4.6)

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes
- **Authentication:** NextAuth v5 (Beta)
- **ORM:** Prisma
- **Database:** PostgreSQL (Neon)

### Development Tools
- **Linting:** ESLint 9
- **Formatting:** Prettier
- **Type Checking:** TypeScript strict mode
- **Database GUI:** Prisma Studio

---

## 🏗 Project Architecture

```
dsaheet/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Seed data script
│   └── migrations/            # Database migrations
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   │
│   │   ├── api/               # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts  # NextAuth endpoints
│   │   │   │   └── register/route.ts       # User registration
│   │   │   └── progress/route.ts           # Progress tracking
│   │   │
│   │   ├── auth/              # Auth pages
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   │
│   │   ├── sheet/             # All problems view
│   │   │   └── page.tsx
│   │   │
│   │   └── topics/[slug]/     # Topic-specific problems
│   │       └── page.tsx
│   │
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   └── sheet/             # Feature-specific components
│   │
│   ├── lib/                   # Utilities
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── utils.ts           # Helper functions
│   │   └── stats.ts           # Statistics calculations
│   │
│   ├── types/                 # TypeScript definitions
│   │   ├── index.ts
│   │   └── next-auth.d.ts
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useLocalStorage.ts
│   │
│   └── db/                    # Database utilities
│       └── config.ts
│
├── middleware.ts              # Route protection & redirects
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS v4 + dark mode config
├── tsconfig.json              # TypeScript configuration
└── .env                       # Environment variables
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** database (or Neon account)
- **GitHub OAuth App** (optional, for GitHub login)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dsaheet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration (see [Environment Variables](#-environment-variables))

4. **Set up the database**
   ```bash
   # Push schema to database
   npx prisma db push
   
   # Generate Prisma Client
   npx prisma generate
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3001](http://localhost:3001) in your browser.

### Default Credentials

After seeding, you can login with:

- **Admin Account:**
  - Email: `admin@dsasheet.com`
  - Password: `password123`

- **Demo Account:**
  - Email: `john@example.com`
  - Password: `password123`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-random-secret-key-min-32-chars"

# GitHub OAuth (Optional)
GITHUB_ID="your-github-oauth-app-client-id"
GITHUB_SECRET="your-github-oauth-app-client-secret"

# Google OAuth (Optional)
GOOGLE_ID="your-google-oauth-app-client-id"
GOOGLE_SECRET="your-google-oauth-app-client-secret"
```

### How to Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

### Setting up GitHub OAuth

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name:** DSA Sheet
   - **Homepage URL:** `http://localhost:3001`
   - **Authorization callback URL:** `http://localhost:3001/api/auth/callback/github`
4. Copy the **Client ID** and **Client Secret** to your `.env`

### Setting up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Configure OAuth consent screen:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in:
     - App name: "DSA Sheet"
     - User support email: your email
     - Developer contact: your email
   - Add scopes: `email`, `profile`, `openid`
   - Save and continue
5. Create OAuth credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - Development: `http://localhost:3001/api/auth/callback/google`
     - Production: `https://your-domain.vercel.app/api/auth/callback/google`
   - Click "Create"
   - Copy the **Client ID** and **Client Secret** to your `.env` as `GOOGLE_ID` and `GOOGLE_SECRET`

---

## � Database Schema

### Core Models

#### User
Stores user account information and authentication data.

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  password      String?   // Hashed, null for OAuth users
  emailVerified DateTime?
  image         String?
  avatar        String?
  role          UserRole  @default(USER) // USER or ADMIN
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  progress      UserProblemProgress[]
  accounts      Account[]
  sessions      Session[]
}
```

#### Problem
Core entity representing a DSA problem.

```prisma
model Problem {
  id              String         @id @default(cuid())
  title           String
  slug            String         @unique
  difficulty      Difficulty     // EASY, MEDIUM, HARD
  description     String         @db.Text
  examples        Json?          // Array of input/output examples
  constraints     Json?          // Array of constraint strings
  hints           Json?          // Array of hint strings
  platformUrl     String?        // Link to LeetCode/GFG
  sourcePlatform  SourcePlatform // LEETCODE, HACKERRANK, etc.
  acceptance      Float?         // Acceptance rate
  submissions     Int            @default(0)
  isActive        Boolean        @default(true)
  
  topicId         String
  topic           Topic          @relation(...)
  
  subtopicId      String?
  subtopic        Subtopic?      @relation(...)
  
  companies       ProblemCompanyTag[]
  resourceLinks   ResourceLink[]
  progress        UserProblemProgress[]
}
```

#### Topic
Main categorization (Array, String, Tree, Graph, etc.)

```prisma
model Topic {
  id          String     @id @default(cuid())
  name        String     @unique
  slug        String     @unique
  description String?
  icon        String?
  order       Int        @default(0)
  
  subtopics   Subtopic[]
  problems    Problem[]
}
```

#### Subtopic
Fine-grained categorization (Two Pointers, Sliding Window, etc.)

```prisma
model Subtopic {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  order       Int      @default(0)
  
  topicId     String
  topic       Topic    @relation(...)
  
  problems    Problem[]
}
```

#### UserProblemProgress
Tracks user's solving progress for each problem.

```prisma
model UserProblemProgress {
  id             String        @id @default(cuid())
  userId         String
  problemId      String
  status         ProblemStatus // NOT_STARTED, IN_PROGRESS, SOLVED
  notes          String?       @db.Text
  attempts       Int           @default(0)
  timeSpentMins  Int           @default(0)
  lastAttemptAt  DateTime?
  solvedAt       DateTime?
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
  
  user           User          @relation(...)
  problem        Problem       @relation(...)
  
  @@unique([userId, problemId])
}
```

#### CompanyTag
Companies that ask specific problems in interviews.

```prisma
model CompanyTag {
  id       String              @id @default(cuid())
  name     String              @unique
  slug     String              @unique
  logo     String?
  
  problems ProblemCompanyTag[]
}
```

### Relationships

- **User → Progress:** One-to-Many (a user has many progress records)
- **Problem → Progress:** One-to-Many (a problem has many users' progress)
- **Topic → Problems:** One-to-Many (a topic has many problems)
- **Topic → Subtopics:** One-to-Many (a topic has many subtopics)
- **Subtopic → Problems:** One-to-Many (a subtopic has many problems)
- **Problem ↔ CompanyTag:** Many-to-Many (via ProblemCompanyTag join table)

---

---

## 🔌 API Documentation

### API Endpoints Overview

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/callback/credentials` | Public | Login with email/password |
| `GET` | `/api/auth/signout` | Required | Sign out current user |
| `GET` | `/api/auth/signin/github` | Public | Initiate GitHub OAuth |
| `GET` | `/api/auth/callback/github` | Public | GitHub OAuth callback |
| `GET` | `/api/auth/signin/google` | Public | Initiate Google OAuth |
| `GET` | `/api/auth/callback/google` | Public | Google OAuth callback |
| `POST` | `/api/progress` | Required | Update problem progress |
| `GET` | `/api/progress?userId={id}` | Required | Get user progress (planned) |

---

### Authentication APIs

#### POST `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "clx1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Missing required fields or user already exists
- `500` - Internal server error

---

#### POST `/api/auth/callback/credentials`

Login with email and password (handled by NextAuth).

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
- Sets session cookie
- Redirects to dashboard or callback URL

**Error Responses:**
- `401` - Invalid credentials

---

#### GET `/api/auth/signout`

Sign out the current user (handled by NextAuth).

**Response:**
- Clears session cookie
- Redirects to login page

---

### Progress Tracking APIs

#### POST `/api/progress`

Update user's progress for a specific problem.

**Authentication:** Required (JWT session)

**Request Body:**
```json
{
  "problemId": "clx1234567890",
  "status": "SOLVED",
  "notes": "Used two-pointer approach",
  "timeSpentMins": 45
}
```

**Parameters:**
- `problemId` (required): The ID of the problem
- `status` (required): One of `NOT_STARTED`, `IN_PROGRESS`, `SOLVED`
- `notes` (optional): User's notes for the problem
- `timeSpentMins` (optional): Time spent solving (in minutes)

**Response (200):**
```json
{
  "id": "clx0987654321",
  "userId": "clx1111111111",
  "problemId": "clx1234567890",
  "status": "SOLVED",
  "notes": "Used two-pointer approach",
  "attempts": 3,
  "timeSpentMins": 120,
  "lastAttemptAt": "2024-12-08T10:30:00.000Z",
  "solvedAt": "2024-12-08T10:30:00.000Z",
  "problem": {
    "title": "Two Sum",
    "slug": "two-sum",
    "difficulty": "EASY"
  }
}
```

**Error Responses:**
- `401` - Unauthorized (not logged in)
- `400` - Missing required fields or invalid status
- `500` - Internal server error

**Notes:**
- First time marking as `SOLVED` sets `solvedAt` timestamp
- Each call increments `attempts` counter
- `timeSpentMins` is accumulated across multiple updates

---

#### GET `/api/progress?userId={userId}`

Get all progress records for a user (Future API - not implemented yet).

**Authentication:** Required

**Query Parameters:**
- `userId` (optional): User ID (defaults to current user)

**Response (200):**
```json
{
  "progress": [
    {
      "problemId": "clx1234567890",
      "status": "SOLVED",
      "attempts": 2,
      "timeSpentMins": 60,
      "solvedAt": "2024-12-08T10:30:00.000Z"
    }
  ],
  "stats": {
    "totalSolved": 45,
    "totalAttempted": 12,
    "totalNotStarted": 400
  }
}
```

---

### OAuth Endpoints (NextAuth)

#### GET `/api/auth/signin/github`

Initiate GitHub OAuth flow.

**Response:**
- Redirects to GitHub authorization page

---

#### GET `/api/auth/callback/github`

GitHub OAuth callback handler.

**Query Parameters:**
- `code`: Authorization code from GitHub
- `state`: CSRF protection state

**Response:**
- Creates/updates user account
- Sets session cookie
- Redirects to dashboard

---

#### GET `/api/auth/signin/google`

Initiate Google OAuth flow.

**Response:**
- Redirects to Google authorization page

---

#### GET `/api/auth/callback/google`

Google OAuth callback handler.

**Query Parameters:**
- `code`: Authorization code from Google
- `state`: CSRF protection state

**Response:**
- Creates/updates user account
- Sets session cookie
- Redirects to dashboard

---

## 🔒 Authentication Flow

### Credentials (Email/Password)

```mermaid
sequenceDiagram
    participant User
    participant LoginPage
    participant NextAuth
    participant Database
    
    User->>LoginPage: Enter email & password
    LoginPage->>NextAuth: POST /api/auth/callback/credentials
    NextAuth->>Database: Find user by email
    Database-->>NextAuth: User data
    NextAuth->>NextAuth: Verify password (bcrypt)
    NextAuth-->>LoginPage: Set session cookie (JWT)
    LoginPage-->>User: Redirect to dashboard
```

**Implementation Details:**
1. User submits login form
2. NextAuth's Credentials Provider validates credentials
3. Password is compared using bcrypt
4. JWT session token is created and stored in httpOnly cookie
5. User is redirected to dashboard or callback URL

### GitHub OAuth

```mermaid
sequenceDiagram
    participant User
    participant App
    participant GitHub
    participant NextAuth
    participant Database
    
    User->>App: Click "Sign in with GitHub"
    App->>GitHub: Redirect to GitHub OAuth
    GitHub->>User: Request authorization
    User->>GitHub: Grant permission
    GitHub->>App: Redirect with auth code
    App->>NextAuth: Handle callback
    NextAuth->>GitHub: Exchange code for token
    GitHub-->>NextAuth: Access token + user data
    NextAuth->>Database: Create/update user
    NextAuth-->>App: Set session cookie
    App-->>User: Redirect to dashboard
```

**Implementation Details:**
1. User clicks GitHub sign-in button
2. Redirected to GitHub authorization page
3. User authorizes the app
4. GitHub redirects back with authorization code
5. NextAuth exchanges code for access token
6. User profile is fetched from GitHub API
7. User is created/updated in database
8. Session cookie is set
9. User is redirected to dashboard

### Google OAuth

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Google
    participant NextAuth
    participant Database
    
    User->>App: Click "Sign in with Google"
    App->>Google: Redirect to Google OAuth
    Google->>User: Request authorization
    User->>Google: Grant permission
    Google->>App: Redirect with auth code
    App->>NextAuth: Handle callback
    NextAuth->>Google: Exchange code for token
    Google-->>NextAuth: Access token + user data
    NextAuth->>Database: Create/update user
    NextAuth-->>App: Set session cookie
    App-->>User: Redirect to dashboard
```

**Implementation Details:**
1. User clicks Google sign-in button
2. Redirected to Google authorization page
3. User selects Google account and authorizes
4. Google redirects back with authorization code
5. NextAuth exchanges code for access token
6. User profile is fetched from Google API
7. User is created/updated in database
8. Session cookie is set
9. User is redirected to dashboard

### Session Management

- **Strategy:** JWT (JSON Web Tokens)
- **Storage:** httpOnly cookies (secure, not accessible via JavaScript)
- **Duration:** 30 days (configurable)
- **Secret:** `NEXTAUTH_SECRET` environment variable

### Role-Based Access Control

**Middleware Protection:**

```typescript
// middleware.ts
const protectedRoutes = ["/sheet", "/topics", "/problems", "/dashboard"];
const adminRoutes = ["/admin"];

// Checks:
// 1. Protected routes require authentication
// 2. Admin routes require role === "ADMIN"
// 3. Auth pages redirect to dashboard if logged in
```

**User Roles:**
- `USER` - Default role, can view and solve problems
- `ADMIN` - Can manage problems, topics, and companies

---

## 🧩 Components

### UI Components (`src/components/ui/`)

#### Button
Reusable button component with variants.

```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Props:**
- `variant`: `"primary"` | `"secondary"` | `"outline"` | `"ghost"` | `"danger"`
- `size`: `"sm"` | `"md"` | `"lg"`
- `disabled`: boolean
- `type`: `"button"` | `"submit"` | `"reset"`

---

#### Card
Container component for content sections.

```tsx
import { Card } from "@/components/ui/Card";

<Card>
  <Card.Header>
    <Card.Title>Problem Title</Card.Title>
    <Card.Description>Problem description</Card.Description>
  </Card.Header>
  <Card.Content>
    {/* Content */}
  </Card.Content>
  <Card.Footer>
    {/* Actions */}
  </Card.Footer>
</Card>
```

---

#### Badge
Tag component for displaying difficulty, status, etc.

```tsx
import { Badge } from "@/components/ui/Badge";

<Badge variant="success">Easy</Badge>
<Badge variant="warning">Medium</Badge>
<Badge variant="danger">Hard</Badge>
```

**Props:**
- `variant`: `"default"` | `"success"` | `"warning"` | `"danger"` | `"info"`

---

#### Input
Form input component with validation states.

```tsx
import { Input } from "@/components/ui/Input";

<Input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Invalid email format"
/>
```

**Props:**
- `type`: Standard HTML input types
- `error`: Error message string
- `label`: Label text
- `required`: boolean

---

#### Table
Data table component for displaying problems.

```tsx
import { Table } from "@/components/ui/Table";

<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Title</Table.Head>
      <Table.Head>Difficulty</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Two Sum</Table.Cell>
      <Table.Cell><Badge variant="success">Easy</Badge></Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

---

### Feature Components

#### ProblemTable (`src/components/ProblemTable.tsx`)
Displays a filterable, sortable table of problems.

```tsx
import { ProblemTable } from "@/components/ProblemTable";

<ProblemTable problems={problems} userProgress={progress} />
```

**Features:**
- Sorting by title, difficulty
- Status indicators (solved/attempted)
- Company tags display
- Responsive design

---

#### AccordionTable (`src/components/AccordionTable.tsx`)
Accordion-style table grouped by topics.

```tsx
import { AccordionTable } from "@/components/AccordionTable";

<AccordionTable topics={topicsWithProblems} />
```

**Features:**
- Collapsible topic sections
- Problem count per topic
- Progress indicators

---

#### SubtopicProblemTable (`src/components/SubtopicProblemTable.tsx`)
Displays problems grouped by subtopics within a topic.

```tsx
import { SubtopicProblemTable } from "@/components/SubtopicProblemTable";

<SubtopicProblemTable subtopics={subtopicsWithProblems} />
```

---

#### Navbar (`src/components/Navbar.tsx`)
Main navigation bar with auth state.

**Features:**
- Logo and home link
- Navigation links (Sheet, Topics, Dashboard)
- User menu (profile, settings, sign out)
- Theme toggle
- Responsive mobile menu

---

#### ThemeToggle (`src/components/ThemeToggle.tsx`)
Light/dark mode switcher.

```tsx
import { ThemeToggle } from "@/components/ThemeToggle";

<ThemeToggle />
```

---

## 📄 Pages

### Public Pages

#### Home (`/`)
Landing page with project introduction and call-to-action.

**Features:**
- Hero section
- Feature highlights
- Sign up prompt

---

#### Login (`/auth/login`)
User login page.

**Features:**
- Email/password form
- GitHub OAuth button
- Link to registration
- Remember me option

---

#### Register (`/auth/register`)
User registration page.

**Features:**
- Name, email, password fields
- Password strength indicator
- Link to login

---

### Protected Pages

#### Sheet (`/sheet`)
All problems in a table format.

**Server Component:** Fetches all problems with user progress.

**Features:**
- Search by title
- Filter by difficulty, topic, status
- Sort by multiple columns
- Pagination (if many problems)

**Data Fetching:**
```typescript
const problems = await prisma.problem.findMany({
  include: {
    topic: true,
    subtopic: true,
    companies: { include: { company: true } },
    progress: {
      where: { userId: session.user.id },
    },
  },
  orderBy: { createdAt: 'desc' },
});
```

---

#### Topic Page (`/topics/[slug]`)
Problems filtered by specific topic.

**Dynamic Route:** `slug` parameter identifies the topic.

**Features:**
- Topic description
- Statistics (total problems, solved count)
- Subtopic grouping
- Same filtering as sheet page

**Data Fetching:**
```typescript
const topic = await prisma.topic.findUnique({
  where: { slug: params.slug },
  include: {
    subtopics: {
      include: {
        problems: {
          include: {
            companies: { include: { company: true } },
            progress: { where: { userId: session.user.id } },
          },
        },
      },
    },
  },
});
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure Environment Variables**
   Add these in Vercel dashboard:
   ```
   DATABASE_URL=your-neon-database-url
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   GITHUB_ID=your-github-oauth-id
   GITHUB_SECRET=your-github-oauth-secret
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Migrations run via postinstall script

5. **Update GitHub OAuth**
   - Edit your GitHub OAuth app
   - Update callback URL to: `https://your-app.vercel.app/api/auth/callback/github`

6. **Seed Production Database**
   ```bash
   # Run locally pointing to production DB
   DATABASE_URL="your-production-url" npx prisma db seed
   ```

---

### Deploy to Railway / Render

Similar process:
1. Connect GitHub repository
2. Set environment variables
3. Deploy with build command: `npm run build`
4. Start command: `npm start`

---

## � Scripts Reference

```bash
# Development
npm run dev              # Start dev server on port 3001
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting errors
npm run type-check       # TypeScript type checking

# Formatting
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting without changes

# Database
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Create and apply migration
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio GUI
npm run db:push          # Push schema without migration
npm run db:reset         # Reset database (WARNING: deletes all data)
```

---

## 🛠 Development Workflow

### Daily Development

```bash
# 1. Start dev server
npm run dev

# 2. Open browser
# http://localhost:3001

# 3. Make code changes
# Files auto-reload on save

# 4. Check database (optional)
npm run db:studio
```

### Schema Changes

```bash
# 1. Edit prisma/schema.prisma

# 2. Create migration
npm run db:migrate

# 3. Migration name prompt
# Example: "add_user_avatar_field"

# 4. Verify in Prisma Studio
npm run db:studio
```

### Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "feat: add problem filtering"

# Push
git push origin main
```

---

## 🐛 Troubleshooting

### Database Connection Issues

**Error:** "Can't reach database server"

**Solutions:**
1. Check Neon console - database might be sleeping
2. Try direct URL instead of pooled URL
3. Verify `DATABASE_URL` in `.env`
4. Test: `npx prisma db push`

---

### Build Errors

**Error:** "Module not found"

**Solution:**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

### Authentication Issues

**Error:** "NextAuth session not working"

**Solutions:**
1. Verify `NEXTAUTH_URL` matches your dev server URL
2. Check `NEXTAUTH_SECRET` is set (min 32 characters)
3. Restart dev server after `.env` changes
4. Clear browser cookies and cache

---

### Migration Failures

**Error:** "Migration failed to apply"

**Solution:**
```bash
# Option 1: Reset database (deletes all data)
npm run db:reset

# Option 2: Push without migration
npm run db:push
```

---

### Theme/Dark Mode Issues

**Error:** Dark mode not working or components stay dark in light mode

**Solutions:**
1. Verify `tailwind.config.ts` has `darkMode: "class"` set
2. Check that `ThemeProvider` has `attribute="class"` in `layout.tsx`
3. Ensure components use `dark:` prefix for dark mode styles (e.g., `bg-white dark:bg-[#121212]`)
4. Clear `.next` cache and restart dev server:
   ```bash
   rm -rf .next
   npm run dev
   ```
5. Inspect HTML element in browser DevTools - should have `class="dark"` when in dark mode

---

## ⚙️ Configuration Details

### Tailwind CSS Configuration

The project uses Tailwind CSS v4 with class-based dark mode strategy. The configuration is defined in `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

**Key Features:**
- **Dark Mode Strategy:** `class` - Activates when `dark` class is present on HTML element
- **Integration:** Works seamlessly with `next-themes` provider
- **Theme Switching:** Automatic theme detection and manual toggle support
- **Custom Properties:** CSS variables defined in `globals.css` for consistent theming

### Theme Provider Setup

The app uses `next-themes` for theme management, configured in `src/app/layout.tsx`:

```typescript
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  <SessionProvider>
    {/* App content */}
  </SessionProvider>
</ThemeProvider>
```

**Configuration:**
- **attribute:** `"class"` - Adds/removes `dark` class on `<html>` element
- **defaultTheme:** `"dark"` - Default theme on first visit
- **enableSystem:** `true` - Respects system preference

### CSS Custom Properties

Defined in `src/app/globals.css` for consistent theming:

```css
:root {
  /* Light Mode */
  --color-background: 255 255 255;    /* White */
  --color-foreground: 23 23 23;       /* Dark gray */
  --color-neon: 34 197 94;            /* Emerald-500 */
  /* ... more variables */
}

.dark {
  /* Dark Mode */
  --color-background: 5 5 5;          /* Near black */
  --color-foreground: 237 237 237;    /* Light gray */
  --color-neon: 34 197 94;            /* Emerald-500 */
  /* ... more variables */
}
```

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Tools
- [Prisma Studio](https://www.prisma.io/studio) - Visual database editor
- [Neon Console](https://console.neon.tech) - PostgreSQL management
- [Vercel Dashboard](https://vercel.com/dashboard) - Deployment platform

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



---

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the maintainer.

---

**Happy Coding! 🚀** Built with ❤️ using Next.js
