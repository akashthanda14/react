# Testing Guide - Notes & Bookmarks Persistence

## 🎯 What We're Testing
- Notes save to database and persist after refresh
- Bookmarks save to database and persist after refresh
- Data loads from cache (fast) or database (after cache clear)

---

## 📋 **Quick Test (5 Minutes)**

### 1. Open the app
- Go to: **http://localhost:3001/sheet**
- Open DevTools (F12) → **Console** tab
- Make sure you're logged in

### 2. Test Bookmark
- Click the **bookmark icon** (star) on any problem
- **Watch console** - Should see: `✅ Bookmark saved to backend`
- **Watch terminal** - Should see: `✅ [BOOKMARKS POST] Saved successfully`

### 3. Test Note
- Click the **notes icon** (notepad) on any problem
- Type "Test note" → Click "Save Note"
- **Watch console** - Should see: `✅ Note saved to backend`
- **Watch terminal** - Should see: `✅ [NOTES POST] Saved successfully`

### 4. Test Persistence (THE CRITICAL TEST!)
```javascript
// In browser console, run:
localStorage.clear()
// Then refresh the page (Cmd+R)
```

**What should happen:**
- Console shows: `🔄 Cache miss - fetching from backend...`
- Console shows: `✅ Fetched bookmarks from backend: X items`
- Terminal shows: `📥 [BOOKMARKS GET] Found X bookmarks`
- **YOUR BOOKMARKS AND NOTES ARE STILL THERE!** ✅

### ✅ If you see this, **BOTH FEATURES ARE WORKING!** 🎉

---

## 🐛 If It's NOT Working

### Check These:

1. **Are you logged in?**
   - If not → Go to `/auth/login`

2. **Do you see console logs?**
   - If not → Refresh the page with DevTools open

3. **Do you see terminal logs?**
   - Look for `📥 [BOOKMARKS POST]` when you click bookmark
   - Look for `📥 [NOTES POST]` when you save note

4. **Data disappears after `localStorage.clear()`?**
   - This means it's NOT saving to database
   - Run: `npx prisma studio`
   - Check `UserProblemProgress` table
   - Look for `isBookmarked` and `notes` columns
   - If columns don't exist → Run: `npx prisma db push`

---

## 📊 **What You Should See**

### In Browser Console:
```
⭐ Toggling bookmark for problem: xxx
✅ Bookmark saved to backend: {...}

💾 Saving note for problem: xxx Note: Test note  
✅ Note saved to backend: {...}

[After localStorage.clear() + refresh]
🔄 Cache miss - fetching bookmarks from backend...
✅ Fetched bookmarks from backend: 2 items
```

### In Terminal (Dev Server):
```
POST /api/bookmarks 200
📥 [BOOKMARKS POST] Request received
✅ [BOOKMARKS POST] Saved successfully

POST /api/notes 200
📥 [NOTES POST] Request received
✅ [NOTES POST] Saved successfully

GET /api/bookmarks 200
📥 [BOOKMARKS GET] Found 2 bookmarks
```

---

## ✅ **Success = Data Persists After Cache Clear**

**The ONLY test that matters:**
1. Add bookmark/note
2. Run `localStorage.clear()` in console
3. Refresh page
4. **Data is still there** ← If yes, it's working!

If data persists after clearing cache, you're successfully saving to the database! 🎉
