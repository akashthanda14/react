# Modern Navbar Component

## Overview
The new `NavbarModern` component replaces the previous header with a sleek, modern design featuring a fixed position, frosted glass effect, and centered progress status.

## Features

### 🎨 Design
- **Fixed Position**: `fixed top-0 left-0 right-0 z-50` - Always visible while scrolling
- **Height**: `h-16` (64px) - Compact and non-intrusive
- **Background**: `bg-[#0a0a0a]/80` - Translucent black with 80% opacity
- **Frosted Glass**: `backdrop-blur-md` - Modern blur effect
- **Border**: `border-b border-white/5` - Subtle separator from content

### 📍 Layout Sections

#### Left: Logo
- **Text**: "akashcodeofficial"
- **Style**: `font-bold text-xl tracking-tight text-white`
- **Interactive**: Hover effect with color transition
- **Link**: Routes to `/sheet`

#### Center: Mini Status Pill
- **Container**: `bg-white/5 rounded-full px-4 py-1.5`
- **Border**: `border border-white/5`
- **Font**: `text-xs font-mono` - Monospace for numbers
- **Content**: 
  - Green pulsing dot (`w-2 h-2 bg-emerald-500 animate-pulse`)
  - Status text: `37/178 Solved`
  - Color coding:
    - Solved count: `text-emerald-400 font-semibold`
    - Separator: `text-white/40`
    - Total: `text-white/60`
    - Label: `text-white/40`
- **Visibility**: Hidden on mobile (`hidden sm:flex`), shown in mobile bar below

#### Right: Actions
1. **Theme Toggle**
   - Sun/Moon icons from Lucide
   - `text-gray-400 hover:text-white`
   - Smooth transitions
   - Connected to `next-themes`

2. **User Profile**
   - **Avatar**: `w-8 h-8 rounded-full`
   - **Gradient**: `bg-gradient-to-tr from-purple-500 to-blue-500`
   - **Initials**: Shows first letters of user's name
   - **Hover**: Scale up effect (`hover:scale-105`)
   - **Dropdown Menu**:
     - User info (name & email)
     - Profile link
     - Sign Out button (red accent)
     - Dark theme with subtle borders
     - Smooth animation on open

3. **Sign In Button** (when not authenticated)
   - Minimal design: `bg-white/5 hover:bg-white/10`
   - Border: `border-white/10`
   - Routes to `/auth/login`

### 📱 Mobile Responsiveness
- Status pill hidden on mobile, replaced with mobile bar below navbar
- Mobile status bar: Full width, centered content
- Touch-friendly button sizes
- Responsive padding and spacing

## Props

```typescript
interface NavbarModernProps {
  totalProblems?: number;  // Total number of problems (default: 178)
  solvedProblems?: number; // Number solved by user (default: 37)
}
```

## Usage

### Via NavbarWrapper (Server Component)
```tsx
import NavbarModern from "./NavbarModern";

// In NavbarWrapper.tsx (automatically fetches real data)
<NavbarModern 
  totalProblems={totalProblems} 
  solvedProblems={solvedProblems} 
/>
```

### Direct Usage
```tsx
import { NavbarModern } from "@/components";

<NavbarModern totalProblems={200} solvedProblems={45} />
```

## Integration

### Layout Setup
The navbar is integrated into the app through:

1. **NavbarWrapper** (`/src/components/NavbarWrapper.tsx`)
   - Server component that fetches user progress from database
   - Passes real-time stats to NavbarModern

2. **Root Layout** (`/src/app/layout.tsx`)
   - Includes NavbarWrapper at the top level
   - Wrapped in SessionProvider for auth context

3. **ConditionalMain** (`/src/components/ConditionalMain.tsx`)
   - Adds `pt-16` padding to main content
   - Prevents content from hiding behind fixed navbar
   - Excludes auth pages from padding

## Benefits

### User Experience
- **Always Visible**: Fixed position keeps progress visible while scrolling
- **Motivational**: Centered status pill provides constant feedback
- **Professional**: Modern design elevates the app's polish
- **Frictionless**: Quick access to theme toggle and profile

### Technical
- **Performance**: Lightweight with minimal re-renders
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive**: Adapts gracefully to all screen sizes
- **Maintainable**: Clean component structure with TypeScript

## Dependencies

- `next-auth/react` - Session management
- `next-themes` - Theme switching
- `lucide-react` - Icons (Sun, Moon, LogOut, User)
- `next/link` - Client-side navigation

## Styling

All styles use Tailwind CSS utility classes:
- Custom colors from design system
- Responsive breakpoints (sm, md, lg)
- Smooth transitions and animations
- Dark mode optimized

## File Location
`/src/components/NavbarModern.tsx`

## See Also
- Original Navbar: `/src/components/Navbar.tsx`
- NavbarWrapper: `/src/components/NavbarWrapper.tsx`
- ConditionalMain: `/src/components/ConditionalMain.tsx`
