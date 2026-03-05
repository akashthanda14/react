import TrackRoadmapLayout from "@/components/TrackRoadmapLayout";

const phases = [
    {
        id: 1,
        name: "Linux & Networking",
        learn: "Linux fundamentals, shell scripting, networking, Git, SDLC principles",
        outcome: "Navigate production servers and manage infrastructure basics confidently",
        milestones: [
            "Manage Linux servers via command line proficiently",
            "Write shell scripts for automation tasks",
            "Explain networking layers, DNS, and TCP/IP",
        ],
    },
    {
        id: 2,
        name: "Containerization",
        learn: "Docker, Docker Compose, container best practices, image optimization",
        outcome: "Containerize applications and manage multi-container environments",
        milestones: [
            "Dockerize a multi-service application",
            "Build optimized Docker images with multi-stage builds",
            "Manage environments with Docker Compose",
        ],
    },
    {
        id: 3,
        name: "CI/CD & Automation",
        learn: "GitHub Actions, Jenkins, automated testing, deployment pipelines",
        outcome: "Build end-to-end CI/CD pipelines for production deployments",
        milestones: [
            "Set up CI pipeline with automated tests and linting",
            "Implement CD pipeline with staging and production environments",
            "Configure automated rollback strategies",
        ],
    },
    {
        id: 4,
        name: "Cloud & Orchestration",
        learn: "AWS/GCP fundamentals, Kubernetes, Helm, service mesh, infrastructure as code",
        outcome: "Deploy and manage applications on cloud platforms with orchestration",
        milestones: [
            "Deploy application to Kubernetes cluster",
            "Implement infrastructure as code with Terraform",
            "Configure auto-scaling and load balancing on cloud",
        ],
    },
    {
        id: 5,
        name: "Monitoring & SRE",
        learn: "Prometheus, Grafana, logging, alerting, incident response, SLOs/SLAs",
        outcome: "Build observable systems and maintain production reliability",
        milestones: [
            "Set up monitoring dashboards with Prometheus + Grafana",
            "Implement centralized logging and alerting",
            "Define SLOs and incident response processes",
        ],
    },
];

export default function DevOpsRoadmapPage() {
    return (
        <TrackRoadmapLayout
            title="DevOps & Cloud"
            emoji="☁️"
            color="#FF6B6B"
            phases={5}
            hours={30}
            description="From Linux & Docker to Kubernetes, CI/CD, and SRE — build production infrastructure that scales and stays reliable."
            phaseData={phases}
        />
    );
}
