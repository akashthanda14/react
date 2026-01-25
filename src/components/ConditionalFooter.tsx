"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't show footer on auth pages
  const hideFooter = pathname?.startsWith("/auth/");
  
  if (hideFooter) {
    return null;
  }
  
  return <Footer />;
}
