# Global Search Feature

## Overview
A comprehensive global search functionality has been added to the DSA Sheet application, allowing users to quickly find problems, topics, and subtopics across the entire dataset.

## Features

### 🔍 Search Capabilities
- **Real-time search** across all problems, topics, and subtopics
- **Keyboard shortcut support**: `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
- **Keyboard navigation**: Arrow keys to navigate, Enter to select, Escape to close
- **Auto-expand**: Clicking a search result automatically expands the relevant topic and subtopic
- **Scroll-to-view**: Smoothly scrolls to the selected item with a visual highlight
- **Smart filtering**: Shows up to 10 most relevant results

### 🎨 UI Components

#### Search Input
- Glassmorphic design matching the dark theme
- Search icon on the left
- Clear button (X) when text is entered
- Keyboard shortcut indicator (`⌘K`) on the right
- Neon green focus states matching brand colors

#### Search Results
- Categorized results showing:
  - **Type badge**: Problem, Topic, or Subtopic
  - **Difficulty badge**: For problems (Easy/Medium/Hard)
  - **Breadcrumb path**: Shows hierarchy (Topic → Subtopic)
  - **Highlight on hover**: Visual feedback
  - **Keyboard selection**: Highlighted result when using arrow keys

#### Empty State
- Friendly "No results found" message
- Search icon with suggestions

## Technical Implementation

### Component Structure

```
GlobalSearch.tsx
├── Search Input (with shortcuts)
├── Results Dropdown
│   ├── Result Items
│   │   ├── Type Badge
│   │   ├── Difficulty Badge (for problems)
│   │   ├── Title
│   │   └── Breadcrumb
│   └── Footer (keyboard hints)
└── Empty State
```

### State Management

The search state is managed at the `AccordionTableWrapper` level:
```typescript
const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
const [expandedSubtopics, setExpandedSubtopics] = useState<Set<string>>(new Set());
```

When a search result is clicked:
1. The relevant topic is expanded
2. The relevant subtopic is expanded (if applicable)
3. The page scrolls to the element
4. The element is highlighted with a neon ring for 2 seconds

### ID System

Elements are identified using consistent IDs:
- Topics: `topic-{id}`
- Subtopics: `subtopic-{id}`
- Problems: `problem-{id}`

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` / `Ctrl+K` | Focus search input |
| `↓` Arrow Down | Navigate to next result |
| `↑` Arrow Up | Navigate to previous result |
| `Enter` | Select highlighted result |
| `Escape` | Close search dropdown |

## Usage

### For Users

1. **Open search**:
   - Click the search bar at the top of the sheet page
   - Or press `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)

2. **Search**:
   - Type your query (e.g., "binary search", "arrays", "two pointers")
   - Results appear instantly as you type

3. **Navigate**:
   - Use mouse to click on a result
   - Or use arrow keys and press Enter

4. **View result**:
   - The page scrolls to the selected item
   - The item is highlighted with a green ring
   - Topic/subtopic are automatically expanded

### For Developers

#### Integration

The search is integrated into the sheet page:

```tsx
// src/app/sheet/page.tsx
<AccordionTableWrapper
  topics={topics}
  isAuthenticated={!!session?.user}
/>
```

The wrapper handles both search and accordion state:

```tsx
// src/components/AccordionTableWrapper.tsx
<GlobalSearch 
  topics={topics} 
  onResultClick={handleSearchResultClick}
/>

<AccordionTable
  topics={topics}
  expandedTopics={expandedTopics}
  expandedSubtopics={expandedSubtopics}
  // ...
/>
```

#### Search Algorithm

1. Converts query to lowercase
2. Searches across:
   - Topic titles
   - Subtopic titles
   - Problem titles
3. Collects all matches with metadata
4. Limits to top 10 results
5. Returns structured search results

## Styling

### Colors (Neon Green Theme)
- Focus border: `border-neon/50`
- Focus ring: `ring-neon/20`
- Selected item background: `bg-neon/10`
- Type badges: `text-neon`
- Highlight ring: `ring-neon`

### Animations
- Smooth scroll: `behavior: "smooth"`
- Transition effects on hover
- Ring highlight appears for 2 seconds

## Accessibility

- **Keyboard navigation**: Full support for keyboard-only users
- **ARIA labels**: Proper labels for screen readers
- **Focus management**: Clear focus indicators
- **Semantic HTML**: Proper button and list elements

## Performance

- **Debouncing**: Search updates as you type (no delay needed for small dataset)
- **Memoization**: Results are cached until query changes
- **Limit results**: Maximum 10 results to prevent UI slowdown
- **Outside click detection**: Efficient event listener cleanup

## Future Enhancements

Potential improvements:
- [ ] Fuzzy search algorithm
- [ ] Search history
- [ ] Recent searches
- [ ] Filter by difficulty in search
- [ ] Filter by completion status
- [ ] Advanced search syntax (e.g., `difficulty:hard topic:arrays`)
- [ ] Search analytics

## Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

## Related Files

- `/src/components/GlobalSearch.tsx` - Main search component
- `/src/components/AccordionTableWrapper.tsx` - State management wrapper
- `/src/components/AccordionTable.tsx` - Updated to accept external state
- `/src/components/ProblemTable.tsx` - Updated with problem IDs
- `/src/app/sheet/page.tsx` - Integration point

---

**Version**: 1.0.0  
**Last Updated**: December 8, 2025
