# Using ProblemTable Component in Sheet Accordion

## Summary
Updated the sheet's accordion table to use the actual `ProblemTable` component (same as topics page) for displaying problems at the third hierarchy level, organized by patterns/subtopics.

## What Changed

### New Component: `SubtopicProblemTable`
**File**: `/src/components/SubtopicProblemTable.tsx`

A wrapper component that:
- Transforms accordion problem data to `ProblemTable` format
- Maps difficulty levels (Easy/Medium/Hard → EASY/MEDIUM/HARD)
- Maps completion status to Prisma progress format
- Passes data to the actual `ProblemTable` component

```tsx
<SubtopicProblemTable
  problems={subtopic.problems}
  isAuthenticated={isAuthenticated}
  subtopicName={subtopic.title}
/>
```

### Updated: `AccordionTable`
**File**: `/src/components/AccordionTable.tsx`

**Removed**:
- Custom Table component imports
- `DifficultyBadge` import
- `onToggleComplete` and `onToggleStar` props
- `handleToggleComplete` and `handleToggleStar` functions
- All custom table rendering code (~150 lines)
- `useRouter` import

**Added**:
- `SubtopicProblemTable` import
- Simple component usage at Level 3

**Result**: Cleaner, more maintainable code that delegates problem display to the specialized `ProblemTable` component.

### Updated: `AccordionTableWrapper`
**File**: `/src/components/AccordionTableWrapper.tsx`

**Removed**:
- All handler functions (`handleToggleComplete`, `handleToggleStar`)
- `useRouter` hook
- API call logic (~50 lines)

**Result**: Now just a simple pass-through wrapper, simplified from 70 lines to 16 lines.

## Benefits

### 1. **Code Reuse**
- Single `ProblemTable` component used across:
  - Individual topic pages (`/topics/[slug]`)
  - Sheet accordion (third level)
  - Any future problem lists

### 2. **Consistency**
- Identical appearance and behavior everywhere
- Same column layout, badges, and styling
- Same hover effects and interactions
- Same responsive breakpoints

### 3. **Maintainability**
- Update table once, changes apply everywhere
- No duplicate table logic
- Centralized progress update logic

### 4. **Features Inherited**
The accordion now automatically gets all `ProblemTable` features:
- ✅ Numbered rows (#1, #2, #3...)
- ✅ Status checkboxes (with API integration)
- ✅ Difficulty badges (Easy/Medium/Hard)
- ✅ LeetCode "Solve" buttons
- ✅ Company tags (if added to data)
- ✅ Responsive design
- ✅ Row hover effects
- ✅ Automatic progress sync via `/api/progress`
- ✅ Router refresh after updates
- ✅ Loading states
- ✅ Theme-aware styling

## How It Works

### Data Flow:
```
Sheet Page (Server)
  ↓ (Prisma data)
AccordionTableWrapper (Client)
  ↓ (Pass-through)
AccordionTable (Client)
  ↓ (When subtopic expanded)
SubtopicProblemTable (Client)
  ↓ (Transform data)
ProblemTable (Client)
  ↓ (API calls on checkbox change)
/api/progress (Server)
  ↓ (Database update)
Router.refresh() (Revalidate)
```

### Architecture:
```
┌─────────────────────────────────┐
│  Sheet Page (Server Component)  │
│  - Fetches topics/subtopics     │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│  AccordionTable (Client)        │
│  - Handles expand/collapse      │
│  - Shows topics & subtopics     │
└────────────┬────────────────────┘
             │ (When subtopic expanded)
             ↓
┌─────────────────────────────────┐
│  SubtopicProblemTable (Wrapper) │
│  - Transforms accordion data    │
│  - Maps to ProblemTable format  │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│  ProblemTable (Shared Component)│
│  - Renders table                │
│  - Handles interactions         │
│  - Updates progress via API     │
└─────────────────────────────────┘
```

## File Structure

```
src/components/
├── ProblemTable.tsx             # Main table component (shared)
├── SubtopicProblemTable.tsx     # NEW: Adapter for accordion
├── AccordionTable.tsx           # Updated: Uses SubtopicProblemTable
└── AccordionTableWrapper.tsx    # Simplified: Just pass-through
```

## Visual Result

The sheet now shows problems in the same professional table format as topic pages:

```
Topic: Arrays
  ↓ Expand
  Subtopic: Two Pointers
    ↓ Expand
    ┌────────────────────────────────────────────────────┐
    │ #  │ ✓ │ Problem       │ Difficulty │ LeetCode    │
    ├────┼───┼───────────────┼────────────┼─────────────┤
    │ 1  │ ☑ │ Two Sum       │ Easy       │ [Solve]     │
    │ 2  │ ☐ │ 3Sum          │ Medium     │ [Solve]     │
    │ 3  │ ☐ │ Container...  │ Medium     │ [Solve]     │
    └────────────────────────────────────────────────────┘
```

## Testing

To test the integration:
1. Navigate to `/sheet`
2. Expand a topic
3. Expand a subtopic
4. Verify the table appears with all features
5. Check a problem's checkbox
6. Verify it updates and syncs with database
7. Refresh the page - status should persist

## Next Steps

Potential enhancements:
- [ ] Add filtering/sorting within subtopics
- [ ] Add search within expanded subtopics
- [ ] Add company tags to accordion data
- [ ] Add notes functionality to ProblemTable
- [ ] Add revision/starred problems feature
