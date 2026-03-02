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

// ... imports

interface NavbarProps { }

export default function Navbar({ }: NavbarProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isOnLoginPage = pathname?.startsWith("/auth/login") ?? false;

  // Handle scroll for navbar shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/` });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-4">
      <nav
        className={cn(
          "mx-auto max-w-[1200px] rounded-[100px] border border-border bg-card/95 backdrop-blur-xl transition-all duration-300 ease-out",
          "shadow-[0_8px_32px_rgba(0,0,0,0.24),0_2px_8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)]",
          isScrolled ? "h-[60px]" : "h-[68px]"
        )}
        aria-label="Main navigation"
      >
        <div className="flex h-full items-center justify-between px-6">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center focus:outline-none focus:ring-2 focus:ring-neon rounded-md transition-transform hover:scale-[1.02]"
            >
              <span className="text-lg font-bold font-display">
                <span className="text-neon">akashcodeofficial</span>
              </span>
            </Link>

            <div className="hidden sm:flex sm:items-center sm:gap-6">
              {(session ? authNavigation : navigation).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-3 py-1.5 text-[14px] font-medium rounded-full",
                      "transition-all duration-200 ease-out",
                      "focus:outline-none focus:ring-2 focus:ring-neon/50",
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
            </div>          </div>
          {/* Desktop User Menu / Sign In Button */}
          <div className="hidden sm:flex sm:items-center sm:gap-3">
            {status === "loading" ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-foreground/10" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={cn(
                    "flex items-center rounded-full transition-all duration-150",
                    "focus:outline-none focus:ring-2 focus:ring-neon/30",
                    showUserMenu && "ring-2 ring-neon/20"
                  )}
                  id="user-menu-button"
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  {session.user?.image ? (
                    <img
                      className="h-9 w-9 rounded-full border-2 border-border/30"
                      src={session.user.image}
                      alt={session.user.name || "User"}
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full border-2 border-border/30 bg-foreground/10 flex items-center justify-center text-foreground font-medium text-sm">
                      {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div
                      className="absolute right-0 z-20 mt-3 w-56 origin-top-right rounded-2xl bg-card/95 backdrop-blur-xl border border-border py-2 shadow-[0_8px_32px_rgba(0,0,0,0.24),0_0_0_1px_rgba(255,255,255,0.05)] ring-1 ring-border/30 focus:outline-none"
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
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors rounded-lg mx-2 mt-1"
                        role="menuitem"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/roadmap"
                        className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors rounded-lg mx-2"
                        role="menuitem"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Roadmap
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors rounded-lg mx-2"
                        role="menuitem"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors rounded-lg mx-2"
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
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-neon transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/onboarding"
                  className={cn(
                    "px-5 py-2.5 text-sm font-semibold text-background rounded-lg",
                    "bg-neon",
                    "shadow-lg",
                    "transition-all duration-200",
                    "hover:bg-neon/90 hover:shadow-xl",
                    "focus:outline-none focus:ring-2 focus:ring-neon/50"
                  )}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 sm:hidden">

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-full p-2.5 text-foreground/60 hover:bg-foreground/5 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-neon/50 transition-all duration-150"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
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
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu - Floating panel */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className="fixed left-6 right-6 top-[84px] z-50 max-h-[80vh] overflow-y-auto rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-[0_16px_48px_rgba(0,0,0,0.32),0_0_0_1px_rgba(255,255,255,0.05)] sm:hidden animate-in slide-in-from-top-2 fade-in duration-200"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
          >
            {/* Mobile menu content */}
            <div className="py-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block mx-3 px-4 py-3 rounded-2xl text-[15px] font-medium transition-all duration-150",
                      "focus:outline-none focus:ring-2 focus:ring-neon/50",
                      isActive
                        ? "bg-neon/10 text-neon font-semibold shadow-[0_0_12px_rgba(34,197,94,0.12)]"
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

            <div className="border-t border-border/50 py-4">
              {session ? (
                <div className="px-3">
                  <div className="flex items-center px-4 py-3 mb-2 rounded-2xl bg-foreground/5">
                    {session.user?.image ? (
                      <img
                        className="h-11 w-11 rounded-full border-2 border-border/30"
                        src={session.user.image}
                        alt={session.user.name || "User"}
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-full border-2 border-border/30 bg-foreground/10 flex items-center justify-center text-foreground font-medium text-base">
                        {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || "U"}
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
                <div className="px-3">
                  <button
                    onClick={() => (window.location.href = isOnLoginPage ? "/auth/register" : "/auth/login")}
                    className={cn(
                      "w-full px-5 py-3 text-[15px] font-semibold text-black rounded-[24px]",
                      "bg-gradient-to-r from-neon/90 to-neon",
                      "shadow-[0_4px_16px_rgba(34,197,94,0.25)]",
                      "transition-all duration-200 ease-out",
                      "active:scale-[0.98]",
                      "focus:outline-none focus:ring-2 focus:ring-neon/50"
                    )}
                  >
                    {isOnLoginPage ? "Sign Up" : "Sign In"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
