"use client";

import { useMemo, useState } from "react";
import { useDsaSheet } from "../context/DsaSheetContext";
import { Building, TrendingUp, Grid, Search } from "lucide-react";
import clsx from "clsx";

export function Sidebar() {
  const { problems, selectedCompany, setSelectedCompany, focusMode } = useDsaSheet();
  const [companySearch, setCompanySearch] = useState("");

  // Hide sidebar in focus mode
  if (focusMode) return null;

  const companiesList = useMemo(() => {
    const compMap = new Map<string, number>();
    problems.forEach(p => {
      p.companies.forEach(c => {
        compMap.set(c, (compMap.get(c) || 0) + 1);
      });
    });
    // Sort by count descending
    return Array.from(compMap.entries()).sort((a, b) => b[1] - a[1]);
  }, [problems]);

  const filteredCompanies = companiesList.filter(([name]) => {
    if (!companySearch.trim()) return true;
    return name.toLowerCase().includes(companySearch.toLowerCase());
  });

  const topCompanies = filteredCompanies.slice(0, 5);
  const otherCompanies = filteredCompanies.slice(5);

  const CompanyItem = ({ name, count, icon: Icon }: { name: string; count: number; icon?: any }) => {
    const isActive = selectedCompany === name;
    
    // Calculate progress for this company
    const companyProblems = name === "All" ? problems : problems.filter(p => p.companies.includes(name));
    const solvedCount = companyProblems.filter(p => p.isSolved).length;
    const progress = companyProblems.length > 0 ? (solvedCount / companyProblems.length) * 100 : 0;

    return (
      <button
        onClick={() => setSelectedCompany(name)}
        className={clsx(
          "mb-1 flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left transition-colors duration-200",
          isActive 
            ? "border border-neon/25 bg-neon/10 text-neon font-medium shadow-neon-sm" 
            : "border border-transparent text-foreground/45 hover:border-border hover:bg-surface-raised hover:text-foreground"
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon ? <Icon className="w-4 h-4 shrink-0" /> : <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-foreground/8 text-[8px] transition-colors group-hover:bg-foreground/10">{name.charAt(0)}</div>}
          <span className="truncate text-sm">{name}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {isActive && (
            <div className="hidden h-1 w-8 overflow-hidden rounded-full bg-background/40 sm:block">
              <div className="h-full rounded-full bg-neon" style={{ width: `${progress}%` }} />
            </div>
          )}
          <span className={clsx(
            "rounded-full px-2 py-0.5 text-xs",
            isActive ? "bg-neon/15 text-neon" : "bg-background/35 text-foreground/35 group-hover:bg-foreground/8 group-hover:text-foreground/55"
          )}>
            {count}
          </span>
        </div>
      </button>
    );
  };

  return (
    <aside className="flex h-full w-full flex-col overflow-y-auto rounded-3xl border border-border bg-surface/90 shadow-neon-sm backdrop-blur-xl lg:w-[300px] shrink-0">
      <div className="sticky top-0 z-10 border-b border-border bg-surface/90 p-4 backdrop-blur-xl">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Grid className="w-5 h-5 text-neon" />
          Companies
        </h2>
        <p className="mt-1 text-xs text-foreground/35">Browse interview frequency by company</p>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/25" />
          <input
            type="text"
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            placeholder="Search companies..."
            className="h-11 w-full rounded-2xl border border-border bg-background/55 pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/20 focus:border-neon/35 focus:ring-2 focus:ring-neon/10"
          />
        </div>
      </div>

      <div className="p-3">
        <div className="mb-4">
          <CompanyItem name="All" count={problems.length} icon={Grid} />
        </div>

        <div className="mb-6">
          <h3 className="mb-2 flex items-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/30">
            <TrendingUp className="w-3 h-3" />
            Top Companies
          </h3>
          {topCompanies.length === 0 && (
            <div className="px-3 py-2 text-xs text-foreground/25">No companies match your search.</div>
          )}
          {topCompanies.map(([name, count]) => (
            <CompanyItem key={name} name={name} count={count} />
          ))}
        </div>

        <div>
          <h3 className="mb-2 flex items-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/30">
            <Building className="w-3 h-3" />
            All Companies
          </h3>
          {otherCompanies.length === 0 && filteredCompanies.length > 0 && (
            <div className="px-3 py-2 text-xs text-foreground/25">No additional companies.</div>
          )}
          {otherCompanies.map(([name, count]) => (
            <CompanyItem key={name} name={name} count={count} />
          ))}
        </div>
      </div>
    </aside>
  );
}
