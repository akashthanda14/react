"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MainLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  hasSidebar?: boolean;
  sidebarPosition?: "left" | "right";
  maxWidth?: "full" | "7xl" | "6xl" | "5xl";
}

/**
 * MainLayout Component
 * Flexible layout with optional sidebar for authenticated areas
 */
export function MainLayout({
  children,
  sidebar,
  hasSidebar = false,
  sidebarPosition = "left",
  maxWidth = "7xl",
}: MainLayoutProps) {
  const maxWidthClasses = {
    full: "",
    "7xl": "max-w-7xl",
    "6xl": "max-w-6xl",
    "5xl": "max-w-5xl",
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div
        className={cn(
          "mx-auto px-4 py-6 sm:px-6 lg:px-8",
          maxWidthClasses[maxWidth]
        )}
      >
        {hasSidebar && sidebar ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {sidebarPosition === "left" && (
              <aside className="w-full lg:w-64 flex-shrink-0">
                {sidebar}
              </aside>
            )}
            <main className="flex-1 min-w-0">{children}</main>
            {sidebarPosition === "right" && (
              <aside className="w-full lg:w-64 flex-shrink-0">
                {sidebar}
              </aside>
            )}
          </div>
        ) : (
          <main>{children}</main>
        )}
      </div>
    </div>
  );
}

// Page Header component for consistent page titles
export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({
  title,
  description,
  action,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-foreground/60">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="mx-2 h-4 w-4 text-foreground/40"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-base text-foreground/70">{description}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}

// Empty State component
export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="mx-auto h-12 w-12 text-foreground/40 mb-4">{icon}</div>
      )}
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      {description && <p className="text-sm text-foreground/60 mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}

// Section component for content organization
export interface SectionProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      {(title || description || action) && (
        <div className="flex items-start justify-between">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-foreground/60">{description}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
