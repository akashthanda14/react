import Link from "next/link";

type RoadmapPhase = {
  id: number;
  title: string;
  learn: string;
  outcome: string;
  milestones: string[];
  concepts: string[];
  project: string;
};

type DecisionBranch = {
  title: string;
  whenToUse: string;
  decision: string;
  task: string;
};

type Layer = {
  title: string;
  items: string[];
};

type ChecklistSection = {
  title: string;
  items: string[];
};

type SummaryStat = {
  value: string;
  label: string;
};

interface BranchingRoadmapPageProps {
  title: string;
  emoji: string;
  color: string;
  phasesCount: number;
  hours: number;
  description: string;
  rootGoal: string;
  rootOutcome: string;
  rootExecution: string;
  summaryStats: SummaryStat[];
  pills?: string[];
  phaseHeader: string;
  phaseDescription: string;
  phases: RoadmapPhase[];
  decisionBranches?: DecisionBranch[];
  advancedLayers?: Layer[];
  executionPlan?: ChecklistSection[];
  mistakes?: string[];
  topSignals?: string[];
  footerNote?: string;
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neon">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-foreground/45">
        {description}
      </p>
    </div>
  );
}

function TreeDot({ label }: { label: string }) {
  return (
    <div className="absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-neon/30 bg-background text-[10px] font-mono font-bold text-neon shadow-neon-sm">
      {label}
    </div>
  );
}

function StatCard({ value, label }: SummaryStat) {
  return (
    <div className="rounded-2xl border border-border bg-background/55 px-4 py-3 backdrop-blur-sm">
      <div className="font-mono text-2xl font-bold text-neon">{value}</div>
      <div className="mt-1 text-[12px] text-foreground/35">{label}</div>
    </div>
  );
}

function BranchCard({ branch }: { branch: DecisionBranch }) {
  return (
    <div className="rounded-2xl border border-border bg-background/55 p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-foreground">{branch.title}</h3>
        <span className="rounded-full border border-neon/20 bg-neon/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neon">
          Branch
        </span>
      </div>
      <p className="text-[13px] leading-relaxed text-foreground/45">{branch.whenToUse}</p>
      <div className="mt-4 rounded-2xl border border-neon/15 bg-neon/5 p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neon/70">
          Decision rule
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-foreground/70">{branch.decision}</p>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-foreground/45">Task: {branch.task}</p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/45">
          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function BranchingRoadmapPage({
  title,
  emoji,
  color,
  phasesCount,
  hours,
  description,
  rootGoal,
  rootOutcome,
  rootExecution,
  summaryStats,
  pills = [],
  phaseHeader,
  phaseDescription,
  phases,
  decisionBranches = [],
  advancedLayers = [],
  executionPlan = [],
  mistakes = [],
  topSignals = [],
  footerNote,
}: BranchingRoadmapPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 h-[560px] w-[560px] pointer-events-none opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,153,0.12) 0%, rgba(0,229,153,0.04) 42%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link href="/learn" className="inline-flex items-center gap-2 text-[13px] text-foreground/35 transition-colors hover:text-foreground">
          ← All Tracks
        </Link>

        <header className="mt-6 rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">{emoji}</span>
                <span className="rounded-full border border-neon/20 bg-neon/8 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-neon">
                  {phasesCount} phases · {hours}h
                </span>
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                {title}
                <span className="block text-neon">{rootGoal}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/45">{description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[420px]">
              {summaryStats.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>

          {pills.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span key={pill} className="rounded-full border border-border bg-background/45 px-3 py-1 text-[12px] text-foreground/45">
                  {pill}
                </span>
              ))}
            </div>
          )}
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
              <SectionTitle
                eyebrow="Root Goal"
                title={title}
                description={rootOutcome}
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Goal", rootGoal],
                  ["Outcome", rootOutcome],
                  ["Execution", rootExecution],
                  ["Checkpoints", "Phase milestone + project idea"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-border bg-background/55 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/30">{label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/65">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
              <SectionTitle
                eyebrow="Core Branch"
                title={phaseHeader}
                description={phaseDescription}
              />

              <div className="relative mt-8 pl-8">
                <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-neon/50 via-border to-transparent" />
                <div className="space-y-5">
                  {phases.map((phase) => (
                    <div key={phase.id} className="relative">
                      <TreeDot label={String(phase.id)} />
                      <div className="ml-10 rounded-2xl border border-border bg-background/55 p-5 transition-colors hover:border-neon/20 hover:bg-surface-raised">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neon">Phase {phase.id}</span>
                              <span className="h-1 w-1 rounded-full bg-foreground/25" />
                              <h3 className="font-display text-xl font-bold text-foreground">{phase.title}</h3>
                            </div>
                            <p className="max-w-2xl text-[14px] leading-relaxed text-foreground/45">{phase.learn}</p>
                          </div>
                          <span className="w-fit rounded-full border border-neon/20 bg-neon/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neon">
                            {phase.project}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/25">Outcome</p>
                            <p className="mt-2 text-[14px] leading-relaxed text-foreground/60">{phase.outcome}</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {phase.concepts.map((concept) => (
                                <span key={concept} className="rounded-full border border-border bg-background/50 px-3 py-1 text-[12px] text-foreground/55">
                                  {concept}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-2xl border border-border bg-background/45 p-4">
                            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/25">Milestones</p>
                            <ul className="mt-3 space-y-2">
                              {phase.milestones.map((milestone) => (
                                <li key={milestone} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/45">
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon" />
                                  <span>{milestone}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {decisionBranches.length > 0 && (
              <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                <SectionTitle
                  eyebrow="Decision Branches"
                  title="Pick the right path when the problem changes"
                  description="These are the common trade-offs that separate textbook knowledge from production judgment."
                />

                <div className="mt-6 grid gap-4 xl:grid-cols-3">
                  {decisionBranches.map((branch) => (
                    <BranchCard key={branch.title} branch={branch} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {advancedLayers.length > 0 && (
              <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                <SectionTitle
                  eyebrow="Advanced Layer"
                  title="Scaling, system design, production"
                  description="The upper branches of the roadmap where you apply fundamentals to real constraints."
                />
                <div className="mt-6 space-y-4">
                  {advancedLayers.map((layer) => (
                    <div key={layer.title} className="rounded-2xl border border-border bg-background/55 p-4">
                      <h3 className="font-display text-lg font-bold text-foreground">{layer.title}</h3>
                      <BulletList items={layer.items} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {executionPlan.length > 0 && (
              <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                <SectionTitle
                  eyebrow="Execution Plan"
                  title="How to actually follow this roadmap"
                  description="Use the roadmap as a progression plan instead of a content list."
                />
                <div className="mt-6 space-y-4">
                  {executionPlan.map((slot) => (
                    <div key={slot.title} className="rounded-2xl border border-border bg-background/55 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neon">{slot.title}</p>
                      <BulletList items={slot.items} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mistakes.length > 0 && (
              <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                <SectionTitle
                  eyebrow="Common Mistakes"
                  title="What to avoid"
                  description="These are the habits that slow learners down the most."
                />
                <ul className="mt-6 space-y-3">
                  {mistakes.map((mistake) => (
                    <li key={mistake} className="rounded-2xl border border-border bg-background/55 p-4 text-[13px] leading-relaxed text-foreground/45">
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {topSignals.length > 0 && (
              <div className="rounded-3xl border border-border bg-surface/90 p-6 shadow-neon-sm backdrop-blur-xl">
                <SectionTitle
                  eyebrow="Top 1%"
                  title="What separates elite learners"
                  description="They don't just consume — they build, measure, and explain trade-offs well."
                />
                <ul className="mt-6 space-y-3">
                  {topSignals.map((signal) => (
                    <li key={signal} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/45">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </section>

        <div className="mt-6 rounded-3xl border border-border bg-surface/90 p-6 text-center shadow-neon-sm backdrop-blur-xl">
          <p className="text-[14px] leading-relaxed text-foreground/35">{footerNote || "Each phase builds on the previous. Work through them in order, build the project, and make one real-world deployment per phase."}</p>
        </div>
      </div>
    </div>
  );
}
