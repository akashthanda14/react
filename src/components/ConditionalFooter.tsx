"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Don't show footer on auth pages or home page (home has its own footer)
  const hideFooter = pathname?.startsWith("/auth/") || pathname === "/";

  if (hideFooter) {
    return null;
  }

  return <Footer />;
}
