"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Navbar from "./Navbar";

function NavbarContent() {
    const pathname = usePathname();

    // Hide navbar on auth pages or home page (home has its own nav)
    const isAuthPage = pathname?.startsWith("/auth/") || pathname === "/";

    if (isAuthPage) {
        return null;
    }

    // For non-auth pages, show a simple navbar without server-side data
    return <Navbar />;
}

export default function ConditionalNavbar() {
    return (
        <Suspense fallback={null}>
            <NavbarContent />
        </Suspense>
    );
}
