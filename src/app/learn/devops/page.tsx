import BranchingRoadmapPage from "@/components/BranchingRoadmapPage";

const phases = [
    {
        id: 1,
        title: "Linux & Networking",
        learn: "Linux fundamentals, shell scripting, networking, Git, SDLC principles",
        outcome: "Navigate production servers and manage infrastructure basics confidently.",
        milestones: [
            "Manage Linux servers via command line proficiently",
            "Write shell scripts for automation tasks",
            "Explain networking layers, DNS, and TCP/IP",
        ],
        concepts: ["Processes and files", "DNS and TCP/IP", "SSH and permissions", "Shell automation"],
        project: "Automate server setup with shell scripts",
    },
    {
        id: 2,
        title: "Containerization",
        learn: "Docker, Docker Compose, container best practices, image optimization",
        outcome: "Containerize applications and manage multi-container environments.",
        milestones: [
            "Dockerize a multi-service application",
            "Build optimized Docker images with multi-stage builds",
            "Manage environments with Docker Compose",
        ],
        concepts: ["Images and layers", "Volumes and networks", "Multi-stage builds", "Compose workflows"],
        project: "Package a backend app with Postgres and Redis",
    },
    {
        id: 3,
        title: "CI/CD & Automation",
        learn: "GitHub Actions, Jenkins, automated testing, deployment pipelines",
        outcome: "Build end-to-end CI/CD pipelines for production deployments.",
        milestones: [
            "Set up CI pipeline with automated tests and linting",
            "Implement CD pipeline with staging and production environments",
            "Configure automated rollback strategies",
        ],
        concepts: ["Pipeline stages", "Artifacts and approvals", "Rollback strategies", "Environment promotion"],
        project: "Build a release pipeline for a web app",
    },
    {
        id: 4,
        title: "Cloud & Orchestration",
        learn: "AWS/GCP fundamentals, Kubernetes, Helm, service mesh, infrastructure as code",
        outcome: "Deploy and manage applications on cloud platforms with orchestration.",
        milestones: [
            "Deploy application to Kubernetes cluster",
            "Implement infrastructure as code with Terraform",
            "Configure auto-scaling and load balancing on cloud",
        ],
        concepts: ["Pods and deployments", "Ingress and services", "Terraform and IaC", "Autoscaling"],
        project: "Deploy a microservice stack to Kubernetes",
    },
    {
        id: 5,
        title: "Monitoring & SRE",
        learn: "Prometheus, Grafana, logging, alerting, incident response, SLOs/SLAs",
        outcome: "Build observable systems and maintain production reliability.",
        milestones: [
            "Set up monitoring dashboards with Prometheus + Grafana",
            "Implement centralized logging and alerting",
            "Define SLOs and incident response processes",
        ],
        concepts: ["Metrics and tracing", "Alerting and on-call", "SLOs and SLAs", "Incident response"],
        project: "Operationalize a production deployment",
    },
];

const decisionBranches = [
    {
        title: "Docker vs VM",
        whenToUse: "Use Docker for portable app packaging and repeatable environments. Use VMs when you need stronger isolation or full OS control.",
        decision: "Start with containers; reach for VMs only when you need them.",
        task: "Compare a Dockerized app and a VM-based deployment for the same service.",
    },
    {
        title: "Kubernetes vs Managed Platform",
        whenToUse: "Use managed platforms for simplicity; use Kubernetes when orchestration control, scaling, and portability matter.",
        decision: "Adopt Kubernetes only when the complexity pays for itself.",
        task: "Migrate one workload into Kubernetes and document the operational overhead.",
    },
    {
        title: "Pull vs Push Monitoring",
        whenToUse: "Use pull for metrics collection and push for event-driven alerting or logs when appropriate.",
        decision: "Choose observability flows based on scale, reliability, and ingestion patterns.",
        task: "Set up Prometheus scraping and compare it with a push-based metric flow.",
    },
];

const advancedLayers = [
    {
        title: "Infrastructure",
        items: ["AWS or GCP primitives", "Networking and IAM", "Terraform and IaC", "Scaling policies"],
    },
    {
        title: "Deployment",
        items: ["Blue-green deploys", "Rolling updates", "Canary releases", "Rollback plans"],
    },
    {
        title: "Reliability",
        items: ["SLOs and SLAs", "Monitoring and tracing", "Incident response", "Postmortems"],
    },
];

const executionPlan = [
    {
        title: "Days 1–30",
        items: ["Use Linux and networking daily until the shell feels natural.", "Containerize one project and learn Docker Compose.", "Read logs and fix failures yourself instead of skipping them."],
    },
    {
        title: "Days 31–60",
        items: ["Automate builds and tests with CI/CD.", "Deploy one app into the cloud and learn the failure modes.", "Add Terraform or another IaC tool to one environment."],
    },
    {
        title: "Days 61–90",
        items: ["Introduce Kubernetes, monitoring, and alerting.", "Practice incident response and rollback drills.", "Run one service with proper SLOs and dashboards."],
    },
];

export default function DevOpsRoadmapPage() {
    return (
        <BranchingRoadmapPage
            title="DevOps & Cloud"
            emoji="☁️"
            color="#FF6B6B"
            phasesCount={5}
            hours={30}
            description="From Linux & Docker to Kubernetes, CI/CD, and SRE — build production infrastructure that scales and stays reliable."
            rootGoal="Operate production infrastructure"
            rootOutcome="Ship and maintain reliable deployment pipelines, cloud systems, and observable services."
            rootExecution="Learn the tooling, automate the workflow, and practice safe release habits."
            summaryStats={[
                { value: "5", label: "phases" },
                { value: "3", label: "decision branches" },
                { value: "1", label: "infra capstone" },
                { value: "30h", label: "study time" },
            ]}
            pills={["Linux", "Docker", "Kubernetes", "CI/CD", "SRE"]}
            phaseHeader="Linux → Containers → CI/CD → Cloud → SRE"
            phaseDescription="The roadmap branches from command-line fundamentals into delivery pipelines, cloud orchestration, and reliability practices."
            phases={phases}
            decisionBranches={decisionBranches}
            advancedLayers={advancedLayers}
            executionPlan={executionPlan}
            mistakes={[
                "Skipping shell and networking fundamentals and jumping straight to Kubernetes.",
                "Treating CI/CD as just deployment instead of an automation system.",
                "Ignoring observability until the first incident happens.",
            ]}
            topSignals={[
                "They can explain how an app moves from laptop to production.",
                "They automate repetitive infra tasks immediately.",
                "They monitor systems before users complain.",
            ]}
            footerNote="Great DevOps is less about tools and more about reducing deployment risk, human error, and production surprises."
        />
    );
}
