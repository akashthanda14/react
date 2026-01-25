# API Documentation

This document provides comprehensive documentation for the akashcodeofficial DSA Sheet API endpoints.

## Authentication

### NextAuth Routes
**Endpoint:** `POST/GET /api/auth/[...nextauth]`

NextAuth.js handles authentication with multiple providers (Google, GitHub, etc.).

**Supported Methods:**
- `POST /api/auth/signin/google`
- `POST /api/auth/signin/github`
- `GET /api/auth/session`
- `POST /api/auth/signout`

**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "image": "string"
  },
  "expires": "string"
}
```

### User Registration
**Endpoint:** `POST /api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

**Response (Error):**
```json
{
  "error": "User already exists" | "Passwords do not match" | "Password too short"
}
```

**Validation:**
- Password must be at least 8 characters
- Passwords must match
- Email must be unique

## Progress Tracking

### Get User Progress
**Endpoint:** `GET /api/progress`

Retrieve user's problem-solving progress.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "progress": [
    {
      "problemId": "string",
      "status": "NOT_STARTED" | "IN_PROGRESS" | "SOLVED",
      "notes": "string | null",
      "isBookmarked": boolean,
      "solvedAt": "string | null"
    }
  ]
}
```

### Update Progress
**Endpoint:** `POST /api/progress`

Update progress for a single problem.

**Authentication:** Required

**Request Body:**
```json
{
  "problemId": "string",
  "status": "NOT_STARTED" | "IN_PROGRESS" | "SOLVED",
  "notes": "string | null",
  "isBookmarked": boolean
}
```

**Response:**
```json
{
  "success": true,
  "message": "Progress updated successfully"
}
```

### Batch Update Progress
**Endpoint:** `POST /api/progress/batch`

Update progress for multiple problems in a single request.

**Authentication:** Required

**Request Body:**
```json
[
  {
    "problemId": "string",
    "status": "NOT_STARTED" | "IN_PROGRESS" | "SOLVED"
  }
]
```

**Response:**
```json
{
  "success": true,
  "message": "Batch progress updated successfully"
}
```

**Notes:**
- Uses debounced batching to reduce API calls
- Automatically signs out invalid users

## Bookmarks

### Get Bookmarks
**Endpoint:** `GET /api/bookmarks`

Retrieve user's bookmarked problems.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "bookmarks": {
    "problemId1": true,
    "problemId2": true
  }
}
```

### Toggle Bookmark
**Endpoint:** `POST /api/bookmarks`

Add or remove a problem bookmark.

**Authentication:** Required

**Request Body:**
```json
{
  "problemId": "string",
  "isBookmarked": boolean
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bookmark updated successfully"
}
```

## Notes

### Get Notes
**Endpoint:** `GET /api/notes`

Retrieve user's problem notes.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "notes": {
    "problemId1": "Note content",
    "problemId2": "Another note"
  }
}
```

### Save Note
**Endpoint:** `POST /api/notes`

Save or update a note for a problem.

**Authentication:** Required

**Request Body:**
```json
{
  "problemId": "string",
  "notes": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note saved successfully"
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error responses include:
```json
{
  "error": "Error message",
  "signOut": true // Optional, for invalid sessions
}
```

## Rate Limiting

- Progress updates are debounced (2-second batch window)
- Authentication required for all user-specific endpoints
- Invalid sessions automatically trigger sign-out

## Data Models

### User
```typescript
{
  id: string;
  email: string;
  name: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Problem
```typescript
{
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  leetcodeUrl?: string;
  gfgUrl?: string;
  topicId?: string;
  subtopicId?: string;
}
```

### Progress
```typescript
{
  id: string;
  userId: string;
  problemId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "SOLVED";
  notes?: string;
  isBookmarked: boolean;
  solvedAt?: Date;
}
```

## Authentication Flow

1. User registers via `/api/auth/register`
2. User signs in via NextAuth providers
3. Session maintained via HTTP-only cookies
4. All API calls include session validation
5. Invalid sessions trigger automatic sign-out

## Caching Strategy

- Progress cached in localStorage with sync timestamps
- Bookmarks and notes cached locally
- Cache invalidation on server updates
- Optimistic UI updates with background sync