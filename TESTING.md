# 🧪 akashcodeofficial Testing & QA Checklist

This document outlines the testing strategy to ensure akashcodeofficial is production-ready.

## 1. Automated Checks (CI/CD)
Before deploying, ensure these commands passes without error:

- [ ] **Build Check**: `npm run build` (Ensures no type errors or build failures)
- [ ] **Linting**: `npm run lint` (Checks code quality)

## 2. Functional Testing (Manual Walkthrough)

### 🔐 Authentication
- [ ] Sign Up with a new email.
- [ ] Sign In with existing credentials.
- [ ] Sign Out functionality.
- [ ] Protected routes check: Try accessing `/sheet` while logged out (should work but features restricted) vs logged in.

### 📊 DSA Sheets
- [ ] **Pattern Wise Sheet**:
  - [ ] Verify topics are sorted correct (Array -> Strings...).
  - [ ] Verify problems are sorted by difficulty (Easy -> Medium -> Hard).
  - [ ] Accordion expands/collapses correctly.
- [ ] **Last Minute 100**:
  - [ ] Verify tab switching works instantly.
  - [ ] Verify correct list of topics/subtopics.
- [ ] **Progress Tracking**:
  - [ ] Mark a problem as "Solved" -> Verify progress bar updates.
  - [ ] Refresh page -> Verify "Solved" state persists.
  - [ ] Uncheck -> Verify progress decreases.
- [ ] **Filters**:
  - [ ] Filter by "Easy" -> Only Easy problems visible.
  - [ ] Filter by "Amazon" -> Only Amazon-tagged problems visible.
  - [ ] Search for a problem name (e.g., "Two Sum") -> results appear.

### 📝 Notes & Bookmarks
- [ ] Click Bookmark icon -> Icon turns yellow.
- [ ] Refresh -> Bookmark persists.
- [ ] Add a Note -> Save -> Re-open -> Note text exists.

### 🔗 External Links
- [ ] Click LeetCode icon -> Opens new tab to correct problem.
- [ ] Click GFG icon -> Opens new tab to correct problem.
- [ ] **Missing Links**: Verify icons are grayed out/unclickable if URL is missing.

## 3. UI/UX & Responsiveness
- [ ] **Mobile View (iPhone SE/XR size)**:
  - [ ] Menu hamburger works?
  - [ ] Tables scroll horizontally if needed or stack nicely.
  - [ ] touch targets are large enough.
- [ ] **Dark Mode**:
  - [ ] Toggle Dark/Light mode.
  - [ ] Check for invisible text (white text on white background).
- [ ] **Empty States**:
  - [ ] What if a topic has no problems?

## 4. Performance (Lighthouse)
Run Chrome DevTools > Lighthouse:
- [ ] **Performance Score**: Aim for > 90.
- [ ] **SEO**: Ensure meta tags (title, description) are present for all pages.
- [ ] **Accessibility**: Aim for > 90 (contrast ratios, aria-labels).

## 5. Security & Data
- [ ] **Database**: Ensure `DATABASE_URL` is set to the production DB.
- [ ] **Secrets**: Ensure `NEXTAUTH_SECRET` is set and strong.
- [ ] **Input Validation**: Try entering script tags in Notes (XSS sanity check).

## 6. Smoke Test Commands
Run these to verify basic integrity:
```bash
# Check for type errors
npx tsc --noEmit

# Check build (simulates prod build)
npm run build
```
