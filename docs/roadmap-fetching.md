# Roadmap Data Fetching - Complete Reference

## Function Signature

```typescript
getUserRoadmap(userId: string, trackSlug: string): Promise<UserRoadmapData>
```

## Prisma Query Structure

```typescript
const userRoadmap = await prisma.userRoadmap.findUnique({
  where: {
    userId_trackId: {
      userId,
      trackId: track.id,
    },
  },
  include: {
    track: {
      include: {
        phases: {
          orderBy: { order: 'asc' },
          include: {
            skills: {
              orderBy: { order: 'asc' },
            },
            milestones: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    },
    milestoneProgress: {
      include: {
        milestone: true,
      },
    },
  },
});
```

## Return Type

```typescript
interface UserRoadmapData {
  // Roadmap metadata
  id: string;
  userId: string;
  trackId: string;
  trackName: string;
  trackSlug: string;
  
  // User preferences
  experienceLevel: string;
  timeCommitment: string;
  
  // Progress tracking
  currentPhaseOrder: number;
  estimatedWeeks: number;
  paceDescription: string;
  startedAt: Date;
  
  // Nested data
  phases: PhaseData[];
}

interface PhaseData {
  id: string;
  name: string;
  description: string | null;
  outcome: string | null;
  order: number;
  
  // Nested data
  skills: SkillData[];
  milestones: MilestoneData[];
}

interface SkillData {
  id: string;
  name: string;
  description: string | null;
  order: number;
}

interface MilestoneData {
  id: string;
  title: string;
  description: string | null;
  order: number;
  completed: boolean;  // ← User-specific progress
}
```

## Example Response

```json
{
  "id": "roadmap_abc123",
  "userId": "user_xyz789",
  "trackId": "track_backend",
  "trackName": "Backend / Fullstack Engineer",
  "trackSlug": "backend",
  "experienceLevel": "1-2 years of experience",
  "timeCommitment": "4-6 hours per week",
  "currentPhaseOrder": 2,
  "estimatedWeeks": 12,
  "paceDescription": "Steady pace - Consistent progress",
  "startedAt": "2026-01-26T02:00:00.000Z",
  "phases": [
    {
      "id": "phase_1",
      "name": "Fundamentals",
      "description": "Core concepts every backend engineer must know",
      "outcome": "Build and deploy a CRUD API with database integration",
      "order": 1,
      "skills": [
        {
          "id": "skill_1",
          "name": "HTTP & REST APIs",
          "description": "Understanding HTTP protocol and RESTful design",
          "order": 1
        },
        {
          "id": "skill_2",
          "name": "Databases (SQL)",
          "description": "Relational database design and queries",
          "order": 2
        }
        // ... 3 more skills
      ],
      "milestones": [
        {
          "id": "milestone_1",
          "title": "Build a REST API with CRUD operations",
          "description": null,
          "order": 1,
          "completed": false
        },
        {
          "id": "milestone_2",
          "title": "Implement JWT-based authentication",
          "description": null,
          "order": 2,
          "completed": true
        },
        {
          "id": "milestone_3",
          "title": "Design and query a relational database schema",
          "description": null,
          "order": 3,
          "completed": false
        }
      ]
    }
    // ... 4 more phases
  ]
}
```

## Key Features

### 1. Single Query
- ✅ One Prisma query fetches everything
- ✅ No N+1 query problem
- ✅ Efficient database access

### 2. Proper Ordering
- ✅ Phases ordered by `order` ASC
- ✅ Skills ordered by `order` ASC
- ✅ Milestones ordered by `order` ASC

### 3. User-Specific Progress
- ✅ Milestone completion status merged from `UserMilestoneProgress`
- ✅ Current phase position tracked
- ✅ Start date recorded

### 4. Complete Nested Data
```
UserRoadmap
  └─ Track
      └─ Phase (5)
          ├─ Skill (5 per phase = 25 total)
          └─ Milestone (3 per phase = 15 total)
```

## Usage Examples

### 1. Fetch User's Roadmap
```typescript
import { getUserRoadmap } from '@/lib/roadmap-service';

const roadmap = await getUserRoadmap(userId, 'backend');
```

### 2. Display Current Phase
```typescript
const currentPhase = roadmap.phases.find(
  p => p.order === roadmap.currentPhaseOrder
);
```

### 3. Calculate Progress
```typescript
const totalMilestones = roadmap.phases.reduce(
  (sum, phase) => sum + phase.milestones.length,
  0
);

const completedMilestones = roadmap.phases.reduce(
  (sum, phase) => sum + phase.milestones.filter(m => m.completed).length,
  0
);

const progressPercentage = (completedMilestones / totalMilestones) * 100;
```

### 4. Get Next Incomplete Milestone
```typescript
const nextMilestone = roadmap.phases
  .flatMap(p => p.milestones)
  .find(m => !m.completed);
```

## API Endpoints

### GET /api/roadmap
Fetch user's roadmap(s).

**Query Params:**
- `trackSlug` (optional): Specific track to fetch

**Examples:**
```bash
# Fetch all roadmaps
GET /api/roadmap

# Fetch specific track
GET /api/roadmap?trackSlug=backend
```

**Response:**
```json
// Single roadmap (with trackSlug)
{ ...UserRoadmapData }

// All roadmaps (without trackSlug)
[{ ...UserRoadmapData }, { ...UserRoadmapData }]
```

## Powers These Pages

This function is the backbone of:

- ✅ `/roadmap` - Personalized roadmap view
- ✅ `/dashboard` - Progress dashboard
- ✅ `/profile` - User profile with roadmaps
- ✅ `/learn/[track]` - Track-specific pages with progress

## Performance Considerations

**Query Complexity:**
- 1 UserRoadmap
- 1 Track
- 5 Phases
- 25 Skills (5 per phase)
- 15 Milestones (3 per phase)
- 15 UserMilestoneProgress records

**Total Records:** ~62 records in one query

**Optimization:**
- Uses Prisma's `include` for efficient joins
- Proper indexing on foreign keys
- Ordered at database level (not in-memory)

## Error Handling

```typescript
try {
  const roadmap = await getUserRoadmap(userId, trackSlug);
} catch (error) {
  if (error.message.includes('Track not found')) {
    // Invalid track slug
  } else if (error.message.includes('User roadmap not found')) {
    // User hasn't created roadmap for this track
  } else {
    // Database error
  }
}
```
