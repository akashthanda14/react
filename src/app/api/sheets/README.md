# Sheets API

This document describes the Sheets API used to support multiple DSA sheets (e.g., Blind 75, Curated 300) with instant tab switching on a single page.

## Endpoints

1. `GET /api/sheets`
   - Returns a lightweight list of available sheets for rendering tabs.
   - Response:
     ```json
     {
       "success": true,
       "sheets": [
         { "id": "blind75", "name": "Blind 75", "description": "...", "problemCount": 75 },
         { "id": "curated300", "name": "Curated 300", "description": "...", "problemCount": 300 }
       ]
     }
     ```

2. `GET /api/sheets/:sheetId`
   - Returns the full hierarchical sheet tree (topics → subtopics → problems). Excludes user-specific data (progress/bookmarks/notes).
   - Response:
     ```json
     {
       "success": true,
       "sheet": {
         "id": "blind75",
         "name": "Blind 75",
         "description": "...",
         "topics": [
           {
             "id": "arrays",
             "name": "Arrays",
             "order": 1,
             "subtopics": [
               {
                 "id": "two-pointers",
                 "name": "Two Pointers",
                 "order": 1,
                 "problems": [
                   { "id": "1", "title": "Two Sum", "slug": "two-sum", "difficulty": "Easy", "tags": ["Array"] }
                 ]
               }
             ]
           }
         ]
       }
     }
     ```

## Integration with existing user APIs

- Do not include user-specific data in the sheet endpoints. Instead, after fetching a sheet, the frontend should batch-request user data for the problem IDs found in the sheet:
  - `GET /api/progress?problemIds=1,2,3`
  - `GET /api/bookmarks?problemIds=1,2,3`
  - `GET /api/notes?problemIds=1,2,3`
- Merge user data client-side into the sheet tree for rendering. This avoids duplication and keeps sheet data cacheable across users.

## Frontend caching strategy (React Query)

- `['sheets']` - fetch once, cache long-term (staleTime: Infinity)
- `['sheet', sheetId]` - fetch on tab switch, cache 5-10 minutes, prefetch on hover
- `['userData', sheetId]` - batch fetch user progress/bookmarks/notes for the sheet's problem IDs, cache short-term and invalidate on mutations

## Notes

- Schema assumptions: `Sheet` table and a join table `SheetProblem` that stores problem membership with `topic`, `subtopic`, and `order` fields.
- Problem metadata is canonical and stored once in `Problem`.
- Progress/bookmarks/notes are stored per `userId` + `problemId` and are shared across sheets.
