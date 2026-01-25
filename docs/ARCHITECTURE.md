# DSA Sheet - Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Client (Browser)                     │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │   Pages    │  │ Components │  │   Client Hooks     │   │
│  │ (React)    │  │   (UI)     │  │ (useLocalStorage)  │   │
│  └────────────┘  └────────────┘  └────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                          ▼                                   │
│                   Next.js Server                            │
│                                                              │
│  ┌───────────────────────────────────────────────────┐     │
│  │              App Router (RSC)                      │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │     │
│  │  │  Pages   │  │  Layouts │  │  Middleware  │    │     │
│  │  └──────────┘  └──────────┘  └──────────────┘    │     │
│  └───────────────────────────────────────────────────┘     │
│                                                              │
│  ┌───────────────────────────────────────────────────┐     │
│  │              API Routes                            │     │
│  │  ┌──────────────┐  ┌─────────────────────────┐   │     │
│  │  │ /api/auth/*  │  │ /api/progress           │   │     │
│  │  │ (NextAuth)   │  │ (Problem Tracking)      │   │     │
│  │  └──────────────┘  └─────────────────────────┘   │     │
│  └───────────────────────────────────────────────────┘     │
│                          │                                   │
│                          │                                   │
│  ┌───────────────────────┼──────────────────────────┐      │
│  │                       ▼                           │      │
│  │              Auth Layer (NextAuth v5)            │      │
│  │  ┌─────────────────┐  ┌──────────────────────┐  │      │
│  │  │  Credentials    │  │   GitHub OAuth       │  │      │
│  │  │  Provider       │  │   Provider           │  │      │
│  │  └─────────────────┘  └──────────────────────┘  │      │
│  │           │                      │                │      │
│  │           └──────────┬───────────┘                │      │
│  │                      ▼                            │      │
│  │              JWT Session Store                   │      │
│  └──────────────────────────────────────────────────┘      │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                           │ Prisma ORM
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                   PostgreSQL Database (Neon)                 │
│                                                              │
│  ┌─────────┐  ┌──────────┐  ┌────────┐  ┌──────────────┐  │
│  │  Users  │  │ Problems │  │ Topics │  │   Progress   │  │
│  └─────────┘  └──────────┘  └────────┘  └──────────────┘  │
│  ┌─────────┐  ┌──────────┐  ┌────────┐  ┌──────────────┐  │
│  │Companies│  │Subtopics │  │Sessions│  │   Accounts   │  │
│  └─────────┘  └──────────┘  └────────┘  └──────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## Request Flow

### 1. User Authentication Flow (Credentials)

```
User → Login Page → POST /api/auth/callback/credentials
                            ↓
                    NextAuth Handler
                            ↓
                    Credentials Provider
                            ↓
                    Database Query (Prisma)
                            ↓
                    Verify Password (bcrypt)
                            ↓
                    Generate JWT Token
                            ↓
                    Set httpOnly Cookie
                            ↓
                    Redirect to Dashboard
```

### 2. Problem Progress Update Flow

```
User clicks "Mark as Solved"
        ↓
Client Component (ProblemActions.tsx)
        ↓
POST /api/progress
        ↓
Middleware (auth check)
        ↓
API Route Handler
        ↓
Validate Session (NextAuth)
        ↓
Prisma Upsert (UserProblemProgress)
        ↓
Return Updated Progress
        ↓
Update UI State
```

### 3. Server-Side Rendering Flow (Sheet Page)

```
User navigates to /sheet
        ↓
Next.js Server Component
        ↓
Get Session (auth())
        ↓
Prisma Query (Problems + User Progress)
        ↓
Render JSX with Data
        ↓
Stream HTML to Client
        ↓
Hydrate Client Components
```

---

## Data Flow Diagram

```
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
       │ 1. Request /sheet
       ▼
┌──────────────────┐
│  Server (RSC)    │──── 2. auth() → Get Session
└──────┬───────────┘
       │
       │ 3. Query Database
       ▼
┌──────────────────┐
│  Prisma Client   │
└──────┬───────────┘
       │
       │ 4. SQL Query
       ▼
┌──────────────────┐
│   PostgreSQL     │
└──────┬───────────┘
       │
       │ 5. Return Data
       ▼
┌──────────────────┐
│  Server (RSC)    │──── 6. Render HTML with data
└──────┬───────────┘
       │
       │ 7. Stream HTML
       ▼
┌──────────────────┐
│   Browser        │──── 8. Display + Hydrate
└──────────────────┘
```

---

## Component Hierarchy

```
App (layout.tsx)
│
├── Providers
│   ├── SessionProvider (NextAuth)
│   └── ThemeProvider (next-themes)
│
├── Navbar
│   ├── Logo
│   ├── NavLinks
│   ├── ThemeToggle
│   └── UserMenu
│
└── Page Content
    │
    ├── /sheet (Sheet Page)
    │   ├── SheetStats
    │   └── ProblemTable
    │       └── ProblemRow (Client)
    │           ├── StatusBadge
    │           └── ProgressButtons
    │
    ├── /topics/[slug] (Topic Page)
    │   ├── TopicHeader
    │   ├── SubtopicNav
    │   └── SubtopicProblemTable
    │       └── AccordionTable
    │
    └── /auth/login (Auth Pages)
        ├── LoginForm (Client)
        ├── OAuthButtons
        └── Links
```

---

## Database Entity-Relationship Diagram

```
┌──────────────┐
│     User     │
│──────────────│
│ id (PK)      │
│ email        │◄────────┐
│ name         │         │
│ password     │         │
│ role         │         │
└──────────────┘         │
       │                 │
       │ 1:N             │ 1:N
       │                 │
       ▼                 │
┌──────────────────┐     │
│UserProblemProgress│    │
│──────────────────│     │
│ id (PK)          │     │
│ userId (FK) ─────┼─────┘
│ problemId (FK)   │
│ status           │
│ attempts         │
│ solvedAt         │
└────────┬─────────┘
         │ N:1
         │
         ▼
┌────────────────┐
│    Problem     │
│────────────────│
│ id (PK)        │
│ title          │
│ slug           │◄─────────┐
│ difficulty     │          │
│ topicId (FK)   │──┐       │
│ subtopicId(FK) │  │       │
└────────────────┘  │       │
         │          │       │
         │ N:M      │ N:1   │ N:1
         │          │       │
         ▼          ▼       │
┌─────────────┐  ┌────────┐│
│ProblemCompany│ │ Topic  ││
│─────────────│  │────────││
│ problemId   │  │ id(PK) ││
│ companyId   │  │ name   ││
└─────────────┘  │ slug   ││
         │       └────┬───┘│
         │ N:1        │    │
         │            │1:N │
         ▼            ▼    │
┌────────────┐  ┌─────────┴──┐
│ CompanyTag │  │  Subtopic  │
│────────────│  │────────────│
│ id (PK)    │  │ id (PK)    │
│ name       │  │ topicId(FK)│───┘
│ slug       │  │ name       │
└────────────┘  └────────────┘
```

---

## Authentication Architecture

### Session Management

```
┌─────────────────────────────────────────────────────┐
│                   JWT Session                        │
│─────────────────────────────────────────────────────│
│ Payload:                                            │
│  {                                                  │
│    user: {                                          │
│      id: "clx123...",                              │
│      email: "user@example.com",                    │
│      name: "John Doe",                             │
│      role: "USER"                                  │
│    },                                               │
│    expires: "2024-01-15T..."                       │
│  }                                                  │
│─────────────────────────────────────────────────────│
│ Storage: httpOnly Cookie                           │
│ Secret: NEXTAUTH_SECRET                            │
│ Duration: 30 days                                  │
└─────────────────────────────────────────────────────┘
```

### Middleware Protection

```
Request
   │
   ▼
middleware.ts
   │
   ├─ Is Auth Route? (/auth/*)
   │     │
   │     ├─ Has Session? → Redirect to /dashboard
   │     └─ No Session? → Allow access
   │
   ├─ Is Protected Route? (/sheet, /topics, /dashboard)
   │     │
   │     ├─ Has Session? → Allow access
   │     └─ No Session? → Redirect to /auth/login
   │
   └─ Is Admin Route? (/admin/*)
         │
         ├─ Has Session + role=ADMIN? → Allow access
         └─ Otherwise → Redirect to /
```

---

## API Design Patterns

### REST API Conventions

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/resource` | Create new resource |
| `GET` | `/api/resource` | Get all resources |
| `GET` | `/api/resource/:id` | Get single resource |
| `PUT/PATCH` | `/api/resource/:id` | Update resource |
| `DELETE` | `/api/resource/:id` | Delete resource |

### Response Format

**Success Response:**
```json
{
  "data": { /* resource data */ },
  "message": "Success message",
  "status": 200
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": "Additional context",
  "status": 400
}
```

---

## Security Measures

1. **Authentication**
   - JWT-based sessions
   - httpOnly cookies (prevents XSS)
   - Secure cookie flag in production
   - CSRF protection via NextAuth

2. **Password Security**
   - bcrypt hashing (12 rounds)
   - No plain-text storage
   - Minimum length requirements

3. **API Protection**
   - Session validation on protected routes
   - Role-based access control
   - Input validation
   - SQL injection prevention (Prisma parameterized queries)

4. **Database**
   - SSL connections required
   - Connection pooling
   - Prepared statements

---

## Performance Optimization

1. **Server-Side Rendering**
   - React Server Components for initial data
   - Reduced client-side JavaScript
   - Faster time-to-interactive

2. **Database Queries**
   - Prisma query optimization
   - Index on frequently queried fields (email, slug)
   - Include only necessary relations
   - Connection pooling

3. **Caching Strategy**
   - Static page generation where possible
   - Client-side state management
   - LocalStorage for non-sensitive data

4. **Code Splitting**
   - Automatic route-based splitting
   - Dynamic imports for heavy components
   - Tree-shaking unused code

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│              Vercel Edge Network                │
│  ┌──────────────────────────────────────────┐  │
│  │        Global CDN & Edge Functions        │  │
│  └────────────────┬─────────────────────────┘  │
│                   │                             │
└───────────────────┼─────────────────────────────┘
                    │
                    │ Route Request
                    │
┌───────────────────▼─────────────────────────────┐
│           Vercel Serverless Functions           │
│  ┌──────────────────────────────────────────┐  │
│  │         Next.js Server Runtime            │  │
│  │  ┌────────────┐  ┌──────────────────┐    │  │
│  │  │ SSR Pages  │  │  API Routes      │    │  │
│  │  └────────────┘  └──────────────────┘    │  │
│  └──────────────────────────────────────────┘  │
└───────────────────┬─────────────────────────────┘
                    │
                    │ Database Queries
                    │
┌───────────────────▼─────────────────────────────┐
│              Neon PostgreSQL                     │
│  ┌──────────────────────────────────────────┐  │
│  │    Serverless Postgres with Autoscaling  │  │
│  │    - Connection Pooling                  │  │
│  │    - Auto-suspend on idle                │  │
│  │    - Instant branching                   │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## Technology Decisions

### Why Next.js 15?
- **App Router:** Better performance with React Server Components
- **API Routes:** Integrated backend without separate server
- **File-based routing:** Intuitive project structure
- **Automatic code splitting:** Better performance
- **Built-in TypeScript support**
- **Deployment optimization for Vercel**

### Why Prisma?
- **Type-safe database access**
- **Automatic migrations**
- **Excellent TypeScript integration**
- **Database agnostic (can switch from PostgreSQL easily)**
- **Intuitive query syntax**
- **Built-in connection pooling**

### Why NextAuth v5?
- **First-class Next.js App Router support**
- **Multiple provider support (Credentials, OAuth)**
- **Session management built-in**
- **Secure by default (httpOnly cookies, CSRF protection)**
- **Easy to extend and customize**
- **Active development and community**

### Why PostgreSQL (Neon)?
- **Relational data fits problem-solving platform**
- **ACID compliance for data integrity**
- **Powerful query capabilities**
- **JSON support for flexible fields (examples, hints)**
- **Neon's serverless architecture:**
  - Auto-scaling
  - Pay-per-use
  - Instant database branching
  - No cold starts

---

## Future Enhancements

1. **Real-time Features**
   - WebSocket connections for live progress updates
   - Real-time leaderboards
   - Live coding collaboration

2. **Advanced Analytics**
   - Time complexity analysis
   - Pattern recognition in solutions
   - Personalized problem recommendations

3. **Social Features**
   - Discussion forums per problem
   - Solution sharing
   - Friend system and comparisons

4. **Code Execution**
   - In-browser code editor (Monaco)
   - Code execution API integration
   - Test case validation
   - Multiple language support

5. **Mobile App**
   - React Native application
   - Offline problem access
   - Push notifications for daily challenges

---

This architecture is designed to be:
- ✅ **Scalable** - Serverless functions scale automatically
- ✅ **Maintainable** - Clear separation of concerns
- ✅ **Secure** - Multiple layers of protection
- ✅ **Performant** - Optimized queries and caching
- ✅ **Developer-friendly** - Type-safe with excellent DX
