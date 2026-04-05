---
name: react-conventions
description: React component and styling conventions for this codebase
---

# React Conventions

## Component Structure
Always follow this order inside a component file:
1. Imports
2. Constants / config
3. Component function
4. Helper functions
5. Export

## Styling
- Use (Tailwind / CSS Modules — update this)
- Neon green class or variable: always use the design token, never hardcode #00FF7F directly
- Mobile-first — write mobile styles first, then md: breakpoints

## State Management
- Local state: useState
- Shared state: Context API (no Redux)
- Server state: (React Query / SWR / plain useEffect — update this)

## API Calls
All fetch calls go through src/utils/api.js — never call fetch directly in a component.

## Error Handling
Every async function must have try/catch. Show user-friendly error messages, never expose raw error objects.