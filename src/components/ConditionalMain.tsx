"use client";

import { usePathname } from "next/navigation";

export default function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Auth pages and home page manage their own layout; inner pages need nav offset
  const isFullScreenPage = pathname?.startsWith("/auth/") || pathname === "/";

  return (
    <main className={isFullScreenPage ? "min-h-screen" : "min-h-screen pt-16"}>
      {children}
    </main>
  );
}
