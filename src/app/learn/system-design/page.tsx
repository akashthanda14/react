import TrackRoadmapLayout from "@/components/TrackRoadmapLayout";

const phases = [
    {
        id: 1,
        name: "System Design Fundamentals",
        learn: "Scalability concepts, CAP theorem, consistency patterns, basic architecture",
        outcome: "Understand core distributed systems principles and tradeoffs",
        milestones: [
            "Explain CAP theorem with real-world examples",
            "Design a basic client-server architecture",
            "Compare strong vs eventual consistency tradeoffs",
        ],
    },
    {
        id: 2,
        name: "Building Blocks",
        learn: "Load balancers, caches, databases, message queues, CDNs",
        outcome: "Choose and apply appropriate components for system requirements",
        milestones: [
            "Design caching strategy for a high-traffic system",
            "Choose between SQL and NoSQL for different use cases",
            "Implement message queue for async processing",
        ],
    },
    {
        id: 3,
        name: "Data & Storage",
        learn: "SQL vs NoSQL, sharding, replication, data modeling, consistency",
        outcome: "Design data storage solutions for different scale requirements",
        milestones: [
            "Design database schema with proper normalization",
            "Implement database sharding strategy",
            "Explain replication and partitioning tradeoffs",
        ],
    },
    {
        id: 4,
        name: "Scale & Reliability",
        learn: "Horizontal scaling, fault tolerance, disaster recovery, rate limiting",
        outcome: "Design systems that handle millions of users reliably",
        milestones: [
            "Design a system to handle 10M daily active users",
            "Implement fault tolerance with redundancy",
            "Design rate limiting and backpressure mechanisms",
        ],
    },
    {
        id: 5,
        name: "Real-World Systems",
        learn: "Design Twitter, Netflix, Uber, WhatsApp, URL shortener",
        outcome: "Apply concepts to design complete production systems",
        milestones: [
            "Design a URL shortening service end-to-end",
            "Design a real-time messaging system",
            "Design a video streaming platform architecture",
        ],
    },
];

export default function SystemDesignRoadmapPage() {
    return (
        <TrackRoadmapLayout
            title="System Design"
            emoji="🏗️"
            color="#00D4FF"
            phases={5}
            hours={35}
            description="Master distributed systems, scalability, and architectural design — from fundamentals to designing Twitter, Netflix, and Uber."
            phaseData={phases}
        />
    );
}
