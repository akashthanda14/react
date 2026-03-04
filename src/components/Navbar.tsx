"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tracks", href: "/learn" },
  { name: "Pricing", href: "/pricing" },
];

const authNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isOnLoginPage = pathname?.startsWith("/auth/login") ?? false;
  const activeNav = session ? authNavigation : navigation;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/` });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      <nav
        className={cn(
          "mx-auto max-w-[1200px] rounded-[100px] border border-border bg-card/95 backdrop-blur-xl transition-all duration-300 ease-out",
          "shadow-[0_8px_32px_rgba(0,0,0,0.24),0_2px_8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)]",
          isScrolled ? "h-[60px]" : "h-[68px]"
        )}
        aria-label="Main navigation"
      >
        <div className="flex h-full items-center justify-between px-5 sm:px-6">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50 rounded-md transition-transform hover:scale-[1.02]"
            >
              <span className="font-display text-base font-bold">
                <span className="text-neon">akashcodeofficial</span>
              </span>
            </Link>

            <div className="hidden sm:flex sm:items-center sm:gap-1">
              {activeNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full",
                      "transition-all duration-200 ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50",
                      isActive
                        ? "bg-neon/10 text-neon font-semibold"
                        : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/90"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop: User menu / Auth buttons */}
          <div className="hidden sm:flex sm:items-center sm:gap-3">
            {status === "loading" ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-foreground/10" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={cn(
                    "flex items-center rounded-full transition-all duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/30",
                    showUserMenu && "ring-2 ring-neon/20"
                  )}
                  id="user-menu-button"
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                  aria-label="Open user menu"
                >
                  {session.user?.image ? (
                    <img
                      className="h-9 w-9 rounded-full border-2 border-border/30"
                      src={session.user.image}
                      alt={session.user.name || "User avatar"}
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full border-2 border-border/30 bg-foreground/10 flex items-center justify-center text-foreground font-semibold text-sm">
                      {session.user?.name?.[0]?.toUpperCase() ||
                        session.user?.email?.[0]?.toUpperCase() ||
                        "U"}
                    </div>
                  )}
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute right-0 z-20 mt-3 w-56 origin-top-right rounded-2xl bg-card/95 backdrop-blur-xl border border-border py-2 shadow-[0_8px_32px_rgba(0,0,0,0.24),0_0_0_1px_rgba(255,255,255,0.05)]"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <div className="px-4 py-3 border-b border-border/50">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-foreground/60 truncate mt-0.5">
                          {session.user?.email}
                        </p>
                      </div>
                      {[
                        { label: "Dashboard", href: "/dashboard" },
                        { label: "My Roadmap", href: "/roadmap" },
                        { label: "Profile", href: "/profile" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors rounded-lg mx-2 mt-1"
                          role="menuitem"
                          onClick={() => setShowUserMenu(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors rounded-lg mx-2 mt-1"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-neon transition-colors rounded-full hover:bg-neon/5"
                >
                  Sign In
                </Link>
                <Link
                  href="/onboarding"
                  className="px-5 py-2.5 text-sm font-semibold text-background rounded-lg bg-neon shadow-neon-sm transition-all duration-200 hover:bg-neon/90 hover:shadow-neon-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Hamburger */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-full p-2.5 text-foreground/60 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50 transition-all duration-150"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {!isMobileMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            className="fixed left-4 right-4 top-[88px] z-50 max-h-[80vh] overflow-y-auto rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-[0_16px_48px_rgba(0,0,0,0.32),0_0_0_1px_rgba(255,255,255,0.05)] sm:hidden animate-in slide-in-from-top fade-in duration-200"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Nav links — uses correct set based on auth state */}
            <div className="py-3">
              {activeNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block mx-3 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50",
                      isActive
                        ? "bg-neon/10 text-neon font-semibold"
                        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground active:scale-[0.98]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-border/50 py-4 px-3">
              {session ? (
                <div>
                  <div className="flex items-center px-4 py-3 mb-2 rounded-2xl bg-foreground/5">
                    {session.user?.image ? (
                      <img
                        className="h-11 w-11 rounded-full border-2 border-border/30 flex-shrink-0"
                        src={session.user.image}
                        alt={session.user.name || "User avatar"}
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-full border-2 border-border/30 bg-foreground/10 flex items-center justify-center text-foreground font-semibold text-base flex-shrink-0">
                        {session.user?.name?.[0]?.toUpperCase() ||
                          session.user?.email?.[0]?.toUpperCase() ||
                          "U"}
                      </div>
                    )}
                    <div className="ml-3 min-w-0 flex-1">
                      <div className="text-[15px] font-semibold text-foreground truncate">
                        {session.user?.name}
                      </div>
                      <div className="text-xs text-foreground/60 truncate">
                        {session.user?.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 text-[15px] font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-2xl transition-all duration-150 text-left active:scale-[0.98]"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href={isOnLoginPage ? "/auth/register" : "/auth/login"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-5 py-3.5 text-[15px] font-semibold text-foreground/70 border border-border rounded-2xl text-center hover:text-foreground hover:border-neon/30 transition-all active:scale-[0.98]"
                  >
                    {isOnLoginPage ? "Sign Up" : "Sign In"}
                  </Link>
                  <Link
                    href="/onboarding"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-5 py-3.5 text-[15px] font-semibold text-background bg-neon rounded-2xl text-center hover:bg-neon/90 shadow-neon-sm transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
