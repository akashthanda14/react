# Sheet Table Update

## Summary
Updated the AccordionTable component in the sheet page to use the same table structure and UI components as the topics page, ensuring consistency across the application.

## Changes Made

### 1. **AccordionTable Component** (`/src/components/AccordionTable.tsx`)

#### Imports Added:
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from `./ui/Table`
- `DifficultyBadge` from `./ui/Badge`

#### Replaced Custom Grid Table with UI Table Components:
- **Before**: Used CSS Grid with inline styles for table layout
- **After**: Uses the same `<Table>` components as topics page

#### New Table Structure:
```tsx
<Table>
  <TableHeader>
    <TableRow hoverable={false}>
      <TableHead>#</TableHead>
      <TableHead>Status</TableHead>  (if authenticated)
      <TableHead>Problem</TableHead>
      <TableHead>Difficulty</TableHead>
      <TableHead>LeetCode</TableHead>
      <TableHead>Resources</TableHead>
      <TableHead>Star</TableHead>  (if authenticated)
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* Problem rows */}
  </TableBody>
</Table>
```

#### Features:
- ✅ **Numbered rows** - Sequential numbering for each problem
- ✅ **Status checkbox** - Mark problems as complete (green checkmark)
- ✅ **Problem title** - With strikethrough for completed problems
- ✅ **Difficulty badge** - Using `DifficultyBadge` component (same as topics page)
- ✅ **LeetCode link** - Orange "Solve" button with external link
- ✅ **Resources** - Article (blue) and YouTube (red) icon links
- ✅ **Star for revision** - Yellow star icon to mark important problems
- ✅ **Responsive design** - Columns hide on smaller screens
- ✅ **Hover effects** - Rows highlight on hover
- ✅ **Theme-aware** - Works with light/dark mode

#### Removed:
- Custom `getDifficultyStyles` function (no longer needed)
- Inline CSS Grid styles
- Custom difficulty badge styling

## Benefits

1. **Consistency**: Sheet page now uses the exact same table as topics page
2. **Maintainability**: Single source of truth for table styling
3. **Theme Support**: Automatic light/dark mode support
4. **Responsive**: Built-in responsive breakpoints
5. **Accessibility**: Proper semantic HTML table structure
6. **Professional Look**: Clean, modern design matching the rest of the app

## Visual Improvements

- Larger, more readable text (text-base)
- Better spacing and padding
- Consistent badge styling across pages
- Cleaner icon placement
- Professional hover states
- Better mobile responsiveness

## How It Works

The sheet page maintains its accordion structure:
1. **Level 1**: Topics (expandable)
2. **Level 2**: Subtopics (expandable)
3. **Level 3**: Problems Table (now using UI Table components)

When you expand a subtopic, the problems are displayed in the same professional table format used on individual topic pages.
