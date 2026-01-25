"use client";

import { useState } from "react";

/**
 * Debug page to test notes and bookmarks persistence
 * Visit: http://localhost:3001/debug-persistence
 */
export default function DebugPersistencePage() {
  const [testProblemId] = useState("test-problem-123");
  const [noteText, setNoteText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const testSaveNote = async () => {
    addLog(`📝 Testing save note: "${noteText}"`);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: testProblemId,
          notes: noteText,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        addLog(`✅ Note saved successfully: ${JSON.stringify(data)}`);
      } else {
        addLog(`❌ Failed to save note: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      addLog(`❌ Error: ${error}`);
    }
  };

  const testFetchNotes = async () => {
    addLog("📥 Fetching all notes...");
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (res.ok) {
        addLog(`✅ Notes fetched: ${JSON.stringify(data, null, 2)}`);
      } else {
        addLog(`❌ Failed to fetch: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      addLog(`❌ Error: ${error}`);
    }
  };

  const testToggleBookmark = async () => {
    const newValue = !isBookmarked;
    setIsBookmarked(newValue);
    addLog(`⭐ Testing bookmark toggle: ${newValue}`);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: testProblemId,
          isBookmarked: newValue,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        addLog(`✅ Bookmark saved: ${JSON.stringify(data)}`);
      } else {
        addLog(`❌ Failed to save bookmark: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      addLog(`❌ Error: ${error}`);
    }
  };

  const testFetchBookmarks = async () => {
    addLog("📥 Fetching all bookmarks...");
    try {
      const res = await fetch("/api/bookmarks");
      const data = await res.json();
      if (res.ok) {
        addLog(`✅ Bookmarks fetched: ${JSON.stringify(data, null, 2)}`);
      } else {
        addLog(`❌ Failed to fetch: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      addLog(`❌ Error: ${error}`);
    }
  };

  const clearLogs = () => setLogs([]);

  const checkLocalStorage = () => {
    addLog("💾 Checking localStorage...");
    const progress = localStorage.getItem("dsa-progress-cache");
    const bookmarks = localStorage.getItem("dsa-bookmarks-cache");
    const notes = localStorage.getItem("dsa-notes-cache");
    addLog(`Progress: ${progress ? "exists" : "empty"}`);
    addLog(`Bookmarks: ${bookmarks ? "exists" : "empty"}`);
    addLog(`Notes: ${notes ? "exists" : "empty"}`);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("dsa-progress-cache");
    localStorage.removeItem("dsa-bookmarks-cache");
    localStorage.removeItem("dsa-notes-cache");
    localStorage.removeItem("dsa-last-sync");
    addLog("🗑️ LocalStorage cleared!");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🔧 Persistence Debug Tool</h1>
        <p className="text-foreground/60 mb-8">Test notes and bookmarks API endpoints</p>

        {/* Notes Testing */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📝 Notes Testing</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Test Note Content</label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter test note..."
                className="w-full px-4 py-2 bg-[#1e1e1e] border border-white/10 rounded-md"
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={testSaveNote}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Save Note
              </button>
              <button
                onClick={testFetchNotes}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Fetch All Notes
              </button>
            </div>
          </div>
        </div>

        {/* Bookmarks Testing */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">⭐ Bookmarks Testing</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                onClick={testToggleBookmark}
                className={`px-4 py-2 rounded-md ${isBookmarked
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-gray-600 hover:bg-gray-700"
                  }`}
              >
                {isBookmarked ? "Unbookmark" : "Bookmark"}
              </button>
              <button
                onClick={testFetchBookmarks}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Fetch All Bookmarks
              </button>
            </div>
          </div>
        </div>

        {/* Cache Testing */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">💾 Cache Testing</h2>
          <div className="flex gap-3">
            <button
              onClick={checkLocalStorage}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md"
            >
              Check localStorage
            </button>
            <button
              onClick={clearLocalStorage}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
            >
              Clear localStorage
            </button>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">📋 Logs</h2>
            <button
              onClick={clearLogs}
              className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded-md"
            >
              Clear Logs
            </button>
          </div>
          <div className="bg-[#1e1e1e] border border-white/10 rounded-md p-4 h-96 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-foreground/40">No logs yet. Try the buttons above!</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
