import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const phases = [
    {
        id: 1,
        name: "Infrastructure Basics",
        learn: "Linux fundamentals, networking, shell scripting, version control",
        outcome: "Set up and manage Linux servers and automate basic tasks",
        milestones: [
            "Configure and secure a Linux server",
            "Write shell scripts for automation tasks",
            "Explain TCP/IP and DNS fundamentals",
        ],
    },
    {
        id: 2,
        name: "CI/CD & Automation",
        learn: "Jenkins, GitHub Actions, GitLab CI, deployment pipelines, testing automation",
        outcome: "Build automated CI/CD pipelines for continuous deployment",
        milestones: [
            "Set up a CI/CD pipeline with automated testing",
            "Implement deployment automation with rollback",
            "Configure branch-based deployment strategies",
        ],
    },
    {
        id: 3,
        name: "Containers & Orchestration",
        learn: "Docker, Kubernetes, container networking, service mesh basics",
        outcome: "Deploy and manage containerized applications at scale",
        milestones: [
            "Containerize an application with Docker",
            "Deploy and scale apps on Kubernetes cluster",
            "Configure service discovery and load balancing",
        ],
    },
    {
        id: 4,
        name: "Cloud & IaC",
        learn: "AWS/GCP/Azure, Terraform, CloudFormation, infrastructure as code",
        outcome: "Provision and manage cloud infrastructure programmatically",
        milestones: [
            "Provision cloud resources using Terraform",
            "Implement infrastructure versioning and state management",
            "Design multi-environment cloud architecture",
        ],
    },
    {
        id: 5,
        name: "Monitoring & Reliability",
        learn: "Prometheus, Grafana, ELK stack, incident response, SRE practices",
        outcome: "Implement observability and maintain system reliability",
        milestones: [
            "Set up monitoring dashboards and alerts",
            "Implement centralized logging with ELK stack",
            "Define and track SLIs, SLOs, and error budgets",
        ],
    },
];

export default function DevOpsRoadmapPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Tracks
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        DevOps Engineer Roadmap
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Master infrastructure automation, CI/CD, containerization, and cloud platforms through hands-on phases.
                    </p>
                </div>

                {/* Phases */}
                <div className="space-y-6">
                    {phases.map((phase) => (
                        <div
                            key={phase.id}
                            className="p-6 bg-card border border-border rounded-xl hover:border-neon/30 transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <span className="text-xl font-bold text-neon">
                                            {phase.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-foreground mb-4">
                                        {phase.name}
                                    </h3>

                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-foreground/70 mb-1">
                                                What you learn:
                                            </p>
                                            <p className="text-muted-foreground">
                                                {phase.learn}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-foreground/70 mb-1">
                                                Outcome:
                                            </p>
                                            <p className="text-muted-foreground">
                                                {phase.outcome}
                                            </p>
                                        </div>

                                        {/* Milestones */}
                                        <div className="pt-3 mt-3 border-t border-border/50">
                                            <p className="text-sm font-medium text-foreground/70 mb-2">
                                                Milestones:
                                            </p>
                                            <ul className="space-y-2">
                                                {phase.milestones.map((milestone, idx) => (
                                                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                        <span className="text-neon mt-0.5">•</span>
                                                        <span>{milestone}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-muted-foreground/30" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info */}
                <div className="mt-12 p-6 bg-card/50 border border-border rounded-xl">
                    <p className="text-sm text-muted-foreground">
                        Each phase builds on the previous. Complete validation checkpoints before progressing to the next phase.
                    </p>
                </div>
            </div>
        </div>
    );
}
