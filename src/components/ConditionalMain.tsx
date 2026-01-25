"use client";

import { usePathname } from "next/navigation";

export default function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Auth pages should not have top padding (full screen)
  const isAuthPage = pathname?.startsWith("/auth/");
  
  return (
    <main className={isAuthPage ? "min-h-screen" : "min-h-screen pt-16"}>
      {children}
    </main>
  );
}
