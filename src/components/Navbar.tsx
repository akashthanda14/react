"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tracks", href: "/learn" },
  { name: "Blog", href: "/blog" },
  { name: "Pricing", href: "/pricing" },
];

const authNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Tracks", href: "/learn" },
  { name: "Blog", href: "/blog" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeNav = session ? authNavigation : navigation;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/` });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-6" aria-label="Main navigation">

        {/* Logo + Nav Links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-neon flex items-center justify-center">
              <span className="text-background font-display font-bold text-sm">A</span>
            </div>
            <span className="font-display text-[15px] font-bold text-foreground hidden sm:block">
              akashcodeofficial
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {activeNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-colors duration-150",
                    isActive
                      ? "text-neon"
                      : "text-foreground/50 hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side — Auth */}
        <div className="hidden sm:flex items-center gap-2">
          {status === "loading" ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-foreground/10" />
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 rounded-lg transition-colors",
                  "hover:bg-foreground/5",
                  showUserMenu && "bg-foreground/5"
                )}
                id="user-menu-button"
                aria-expanded={showUserMenu}
                aria-haspopup="true"
                aria-label="Open user menu"
              >
                {session.user?.image ? (
                  <img
                    className="h-7 w-7 rounded-full"
                    src={session.user.image}
                    alt={session.user.name || "User avatar"}
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-neon/15 flex items-center justify-center text-neon font-semibold text-xs">
                    {session.user?.name?.[0]?.toUpperCase() ||
                      session.user?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <svg className="w-3.5 h-3.5 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} aria-hidden="true" />
                  <div
                    className="absolute right-0 z-20 mt-2 w-52 origin-top-right rounded-xl bg-surface border border-border py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="px-3.5 py-2.5 border-b border-border">
                      <p className="text-sm font-medium text-foreground truncate">{session.user?.name}</p>
                      <p className="text-xs text-foreground/40 truncate mt-0.5">{session.user?.email}</p>
                    </div>
                    {[
                      { label: "Dashboard", href: "/dashboard" },
                      { label: "Tracks", href: "/learn" },
                      { label: "Profile", href: "/profile" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3.5 py-2 text-[13px] text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                        role="menuitem"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-3.5 py-2 text-[13px] text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-3.5 py-1.5 text-[13px] font-medium text-foreground/60 hover:text-foreground transition-colors rounded-md"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-1.5 text-[13px] font-medium text-background bg-foreground rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground/60 hover:text-foreground transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {!isMobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed left-0 right-0 top-16 z-50 border-b border-border bg-background sm:hidden animate-in slide-in-from-top fade-in duration-200"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
          >
            <div className="max-w-[1200px] mx-auto px-6 py-4 space-y-1">
              {activeNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block py-3 text-[15px] font-medium border-b border-border/50 transition-colors",
                      isActive ? "text-neon" : "text-foreground/60 hover:text-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 pb-2 flex gap-3">
                {session ? (
                  <button onClick={handleSignOut} className="text-[15px] font-medium text-foreground/60 hover:text-foreground transition-colors">
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 py-2.5 text-center text-[13px] font-medium border border-border rounded-lg text-foreground/70 hover:text-foreground transition-colors">
                      Log in
                    </Link>
                    <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 py-2.5 text-center text-[13px] font-medium bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
