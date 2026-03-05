import TrackRoadmapLayout from "@/components/TrackRoadmapLayout";

const phases = [
    {
        id: 1,
        name: "Fundamentals",
        learn: "HTTP, REST APIs, databases (SQL/NoSQL), authentication basics",
        outcome: "Build and deploy a CRUD API with database integration",
        milestones: [
            "Build a REST API with CRUD operations",
            "Implement JWT-based authentication",
            "Design and query a relational database schema",
        ],
    },
    {
        id: 2,
        name: "Architecture Patterns",
        learn: "MVC, microservices, event-driven architecture, API design patterns",
        outcome: "Design scalable backend systems with proper separation of concerns",
        milestones: [
            "Refactor a monolith into microservices",
            "Implement event-driven communication between services",
            "Design API contracts with versioning strategy",
        ],
    },
    {
        id: 3,
        name: "Data & Caching",
        learn: "Database optimization, caching strategies (Redis), message queues",
        outcome: "Optimize data access and implement efficient caching layers",
        milestones: [
            "Implement Redis caching for frequently accessed data",
            "Optimize database queries with indexing",
            "Set up a message queue for async processing",
        ],
    },
    {
        id: 4,
        name: "Scale & Performance",
        learn: "Load balancing, horizontal scaling, CDNs, database sharding",
        outcome: "Handle high traffic and scale systems to millions of users",
        milestones: [
            "Configure load balancer across multiple instances",
            "Implement database sharding strategy",
            "Explain horizontal vs vertical scaling tradeoffs",
        ],
    },
    {
        id: 5,
        name: "Production Systems",
        learn: "Monitoring, logging, error handling, deployment strategies, security",
        outcome: "Deploy and maintain production-grade backend systems",
        milestones: [
            "Set up monitoring and alerting for production system",
            "Implement structured logging and error tracking",
            "Deploy with zero-downtime strategy",
        ],
    },
];

export default function BackendRoadmapPage() {
    return (
        <TrackRoadmapLayout
            title="Backend Engineering"
            emoji="⚙️"
            color="#00FF7F"
            phases={5}
            hours={40}
            description="Master server-side development — APIs, databases, caching, message queues, and production deployment from real-world experience."
            phaseData={phases}
        />
    );
}
