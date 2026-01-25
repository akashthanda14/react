import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
    // ============================================
    // TRACK 1: Backend / Fullstack Engineer
    // ============================================
    {
        name: 'Backend / Fullstack Engineer',
        slug: 'backend',
        description: 'Master server-side development, API design, databases, and full-stack architecture',
        icon: 'Code',
        order: 1,
        phases: [
            {
                name: 'Fundamentals',
                description: 'Core concepts every backend engineer must know',
                outcome: 'Build and deploy a CRUD API with database integration',
                order: 1,
                skills: [
                    { name: 'HTTP & REST APIs', description: 'Understanding HTTP protocol and RESTful design', order: 1 },
                    { name: 'Databases (SQL)', description: 'Relational database design and queries', order: 2 },
                    { name: 'Databases (NoSQL)', description: 'Document and key-value stores', order: 3 },
                    { name: 'Authentication & Authorization', description: 'JWT, OAuth, session management', order: 4 },
                    { name: 'API Design Patterns', description: 'Best practices for API structure', order: 5 },
                ],
                milestones: [
                    { title: 'Build a REST API with CRUD operations', order: 1 },
                    { title: 'Implement JWT-based authentication', order: 2 },
                    { title: 'Design and query a relational database schema', order: 3 },
                ],
            },
            {
                name: 'Architecture Patterns',
                description: 'Design scalable backend systems with proper separation of concerns',
                outcome: 'Architect microservices and event-driven systems',
                order: 2,
                skills: [
                    { name: 'MVC Pattern', description: 'Model-View-Controller architecture', order: 1 },
                    { name: 'Microservices', description: 'Service decomposition and communication', order: 2 },
                    { name: 'Event-Driven Architecture', description: 'Async messaging and event sourcing', order: 3 },
                    { name: 'API Gateway Pattern', description: 'Centralized API management', order: 4 },
                    { name: 'CQRS', description: 'Command Query Responsibility Segregation', order: 5 },
                ],
                milestones: [
                    { title: 'Refactor a monolith into microservices', order: 1 },
                    { title: 'Implement event-driven communication between services', order: 2 },
                    { title: 'Design API contracts with versioning strategy', order: 3 },
                ],
            },
            {
                name: 'Data & Caching',
                description: 'Optimize data access and implement efficient caching layers',
                outcome: 'Build high-performance data pipelines',
                order: 3,
                skills: [
                    { name: 'Database Optimization', description: 'Indexing, query optimization, normalization', order: 1 },
                    { name: 'Redis Caching', description: 'In-memory caching strategies', order: 2 },
                    { name: 'Message Queues', description: 'RabbitMQ, Kafka for async processing', order: 3 },
                    { name: 'Database Replication', description: 'Master-slave and multi-master setups', order: 4 },
                    { name: 'Connection Pooling', description: 'Efficient database connection management', order: 5 },
                ],
                milestones: [
                    { title: 'Implement Redis caching for frequently accessed data', order: 1 },
                    { title: 'Optimize database queries with indexing', order: 2 },
                    { title: 'Set up a message queue for async processing', order: 3 },
                ],
            },
            {
                name: 'Scale & Performance',
                description: 'Handle high traffic and scale systems to millions of users',
                outcome: 'Design systems that handle 10M+ daily active users',
                order: 4,
                skills: [
                    { name: 'Load Balancing', description: 'Distribute traffic across servers', order: 1 },
                    { name: 'Horizontal Scaling', description: 'Add more servers to handle load', order: 2 },
                    { name: 'Database Sharding', description: 'Partition data across databases', order: 3 },
                    { name: 'CDN Integration', description: 'Content delivery networks', order: 4 },
                    { name: 'Rate Limiting', description: 'Prevent abuse and ensure fair usage', order: 5 },
                ],
                milestones: [
                    { title: 'Configure load balancer across multiple instances', order: 1 },
                    { title: 'Implement database sharding strategy', order: 2 },
                    { title: 'Explain horizontal vs vertical scaling tradeoffs', order: 3 },
                ],
            },
            {
                name: 'Production Systems',
                description: 'Deploy and maintain production-grade backend systems',
                outcome: 'Run reliable systems in production',
                order: 5,
                skills: [
                    { name: 'Monitoring & Alerting', description: 'Prometheus, Grafana, DataDog', order: 1 },
                    { name: 'Logging', description: 'Structured logging and log aggregation', order: 2 },
                    { name: 'Error Handling', description: 'Graceful degradation and circuit breakers', order: 3 },
                    { name: 'Deployment Strategies', description: 'Blue-green, canary, rolling deployments', order: 4 },
                    { name: 'Security Best Practices', description: 'OWASP, encryption, secure coding', order: 5 },
                ],
                milestones: [
                    { title: 'Set up monitoring and alerting for production system', order: 1 },
                    { title: 'Implement structured logging and error tracking', order: 2 },
                    { title: 'Deploy with zero-downtime strategy', order: 3 },
                ],
            },
        ],
    },

    // ============================================
    // TRACK 2: DevOps Engineer
    // ============================================
    {
        name: 'DevOps Engineer',
        slug: 'devops',
        description: 'Master infrastructure automation, CI/CD, containerization, and cloud platforms',
        icon: 'Cloud',
        order: 2,
        phases: [
            {
                name: 'Infrastructure Basics',
                description: 'Foundation of infrastructure management',
                outcome: 'Set up and manage Linux servers and automate basic tasks',
                order: 1,
                skills: [
                    { name: 'Linux Fundamentals', description: 'Command line, file systems, processes', order: 1 },
                    { name: 'Networking', description: 'TCP/IP, DNS, firewalls, load balancers', order: 2 },
                    { name: 'Shell Scripting', description: 'Bash scripting for automation', order: 3 },
                    { name: 'Version Control', description: 'Git workflows and branching strategies', order: 4 },
                    { name: 'SSH & Remote Access', description: 'Secure server access and management', order: 5 },
                ],
                milestones: [
                    { title: 'Configure and secure a Linux server', order: 1 },
                    { title: 'Write shell scripts for automation tasks', order: 2 },
                    { title: 'Explain TCP/IP and DNS fundamentals', order: 3 },
                ],
            },
            {
                name: 'CI/CD & Automation',
                description: 'Build automated CI/CD pipelines for continuous deployment',
                outcome: 'Automate testing and deployment workflows',
                order: 2,
                skills: [
                    { name: 'Jenkins', description: 'Build automation and CI/CD pipelines', order: 1 },
                    { name: 'GitHub Actions', description: 'Workflow automation on GitHub', order: 2 },
                    { name: 'GitLab CI', description: 'Integrated CI/CD in GitLab', order: 3 },
                    { name: 'Testing Automation', description: 'Unit, integration, and E2E tests', order: 4 },
                    { name: 'Artifact Management', description: 'Docker registries, package repos', order: 5 },
                ],
                milestones: [
                    { title: 'Set up a CI/CD pipeline with automated testing', order: 1 },
                    { title: 'Implement deployment automation with rollback', order: 2 },
                    { title: 'Configure branch-based deployment strategies', order: 3 },
                ],
            },
            {
                name: 'Containers & Orchestration',
                description: 'Deploy and manage containerized applications at scale',
                outcome: 'Run production workloads on Kubernetes',
                order: 3,
                skills: [
                    { name: 'Docker', description: 'Container creation and management', order: 1 },
                    { name: 'Kubernetes', description: 'Container orchestration at scale', order: 2 },
                    { name: 'Container Networking', description: 'Service mesh and network policies', order: 3 },
                    { name: 'Helm Charts', description: 'Kubernetes package management', order: 4 },
                    { name: 'Service Mesh', description: 'Istio, Linkerd for microservices', order: 5 },
                ],
                milestones: [
                    { title: 'Containerize an application with Docker', order: 1 },
                    { title: 'Deploy and scale apps on Kubernetes cluster', order: 2 },
                    { title: 'Configure service discovery and load balancing', order: 3 },
                ],
            },
            {
                name: 'Cloud & IaC',
                description: 'Provision and manage cloud infrastructure programmatically',
                outcome: 'Manage multi-cloud infrastructure as code',
                order: 4,
                skills: [
                    { name: 'AWS Services', description: 'EC2, S3, RDS, Lambda, ECS', order: 1 },
                    { name: 'Terraform', description: 'Infrastructure as code with HCL', order: 2 },
                    { name: 'CloudFormation', description: 'AWS native IaC', order: 3 },
                    { name: 'Azure/GCP', description: 'Multi-cloud platforms', order: 4 },
                    { name: 'State Management', description: 'Terraform state and backends', order: 5 },
                ],
                milestones: [
                    { title: 'Provision cloud resources using Terraform', order: 1 },
                    { title: 'Implement infrastructure versioning and state management', order: 2 },
                    { title: 'Design multi-environment cloud architecture', order: 3 },
                ],
            },
            {
                name: 'Monitoring & Reliability',
                description: 'Implement observability and maintain system reliability',
                outcome: 'Run reliable systems with SRE practices',
                order: 5,
                skills: [
                    { name: 'Prometheus', description: 'Metrics collection and alerting', order: 1 },
                    { name: 'Grafana', description: 'Visualization and dashboards', order: 2 },
                    { name: 'ELK Stack', description: 'Elasticsearch, Logstash, Kibana', order: 3 },
                    { name: 'Incident Response', description: 'On-call, postmortems, runbooks', order: 4 },
                    { name: 'SRE Practices', description: 'SLIs, SLOs, error budgets', order: 5 },
                ],
                milestones: [
                    { title: 'Set up monitoring dashboards and alerts', order: 1 },
                    { title: 'Implement centralized logging with ELK stack', order: 2 },
                    { title: 'Define and track SLIs, SLOs, and error budgets', order: 3 },
                ],
            },
        ],
    },

    // ============================================
    // TRACK 3: System Design Specialist
    // ============================================
    {
        name: 'System Design Specialist',
        slug: 'system-design',
        description: 'Master distributed systems, scalability, and architectural design',
        icon: 'Cpu',
        order: 3,
        phases: [
            {
                name: 'System Design Fundamentals',
                description: 'Core distributed systems principles and tradeoffs',
                outcome: 'Understand foundational concepts for system design',
                order: 1,
                skills: [
                    { name: 'Scalability Concepts', description: 'Vertical vs horizontal scaling', order: 1 },
                    { name: 'CAP Theorem', description: 'Consistency, Availability, Partition tolerance', order: 2 },
                    { name: 'Consistency Patterns', description: 'Strong, eventual, causal consistency', order: 3 },
                    { name: 'Availability Patterns', description: 'Failover, replication, redundancy', order: 4 },
                    { name: 'Basic Architecture', description: 'Client-server, N-tier, microservices', order: 5 },
                ],
                milestones: [
                    { title: 'Explain CAP theorem with real-world examples', order: 1 },
                    { title: 'Design a basic client-server architecture', order: 2 },
                    { title: 'Compare strong vs eventual consistency tradeoffs', order: 3 },
                ],
            },
            {
                name: 'Building Blocks',
                description: 'Choose and apply appropriate components for system requirements',
                outcome: 'Select the right tools for different scenarios',
                order: 2,
                skills: [
                    { name: 'Load Balancers', description: 'L4 vs L7, algorithms, health checks', order: 1 },
                    { name: 'Caches', description: 'Redis, Memcached, CDN caching', order: 2 },
                    { name: 'Databases', description: 'SQL, NoSQL, NewSQL comparison', order: 3 },
                    { name: 'Message Queues', description: 'Kafka, RabbitMQ, SQS', order: 4 },
                    { name: 'CDNs', description: 'Content delivery and edge caching', order: 5 },
                ],
                milestones: [
                    { title: 'Design caching strategy for a high-traffic system', order: 1 },
                    { title: 'Choose between SQL and NoSQL for different use cases', order: 2 },
                    { title: 'Implement message queue for async processing', order: 3 },
                ],
            },
            {
                name: 'Data & Storage',
                description: 'Design data storage solutions for different scale requirements',
                outcome: 'Handle petabytes of data efficiently',
                order: 3,
                skills: [
                    { name: 'Data Modeling', description: 'Schema design, normalization, denormalization', order: 1 },
                    { name: 'Sharding', description: 'Horizontal partitioning strategies', order: 2 },
                    { name: 'Replication', description: 'Master-slave, multi-master, quorum', order: 3 },
                    { name: 'Indexing', description: 'B-trees, LSM trees, inverted indexes', order: 4 },
                    { name: 'Data Consistency', description: 'ACID, BASE, distributed transactions', order: 5 },
                ],
                milestones: [
                    { title: 'Design database schema with proper normalization', order: 1 },
                    { title: 'Implement database sharding strategy', order: 2 },
                    { title: 'Explain replication and partitioning tradeoffs', order: 3 },
                ],
            },
            {
                name: 'Scale & Reliability',
                description: 'Design systems that handle millions of users reliably',
                outcome: 'Build fault-tolerant distributed systems',
                order: 4,
                skills: [
                    { name: 'Horizontal Scaling', description: 'Stateless services, session management', order: 1 },
                    { name: 'Fault Tolerance', description: 'Circuit breakers, bulkheads, timeouts', order: 2 },
                    { name: 'Disaster Recovery', description: 'Backup, restore, failover strategies', order: 3 },
                    { name: 'Rate Limiting', description: 'Token bucket, leaky bucket algorithms', order: 4 },
                    { name: 'Backpressure', description: 'Flow control in distributed systems', order: 5 },
                ],
                milestones: [
                    { title: 'Design a system to handle 10M daily active users', order: 1 },
                    { title: 'Implement fault tolerance with redundancy', order: 2 },
                    { title: 'Design rate limiting and backpressure mechanisms', order: 3 },
                ],
            },
            {
                name: 'Real-World Systems',
                description: 'Apply concepts to design complete production systems',
                outcome: 'Design systems like Twitter, Netflix, Uber',
                order: 5,
                skills: [
                    { name: 'URL Shortener', description: 'Design bit.ly, TinyURL', order: 1 },
                    { name: 'Social Network', description: 'Design Twitter, Instagram feed', order: 2 },
                    { name: 'Video Streaming', description: 'Design Netflix, YouTube', order: 3 },
                    { name: 'Ride Sharing', description: 'Design Uber, Lyft matching', order: 4 },
                    { name: 'Messaging System', description: 'Design WhatsApp, Slack', order: 5 },
                ],
                milestones: [
                    { title: 'Design a URL shortening service end-to-end', order: 1 },
                    { title: 'Design a real-time messaging system', order: 2 },
                    { title: 'Design a video streaming platform architecture', order: 3 },
                ],
            },
        ],
    },

    // ============================================
    // TRACK 4: GenAI Engineer
    // ============================================
    {
        name: 'GenAI Engineer',
        slug: 'genai',
        description: 'Master LLM integration, prompt engineering, RAG systems, and production AI',
        icon: 'Sparkles',
        order: 4,
        phases: [
            {
                name: 'AI/ML Fundamentals',
                description: 'Understand how large language models work and their capabilities',
                outcome: 'Grasp core ML and LLM concepts',
                order: 1,
                skills: [
                    { name: 'Machine Learning Basics', description: 'Supervised, unsupervised, reinforcement learning', order: 1 },
                    { name: 'Neural Networks', description: 'Layers, activation functions, backpropagation', order: 2 },
                    { name: 'Transformers', description: 'Attention mechanism, encoder-decoder', order: 3 },
                    { name: 'LLM Concepts', description: 'GPT, BERT, T5 architectures', order: 4 },
                    { name: 'Training & Fine-tuning', description: 'Pre-training, fine-tuning, RLHF', order: 5 },
                ],
                milestones: [
                    { title: 'Explain how transformers and attention mechanisms work', order: 1 },
                    { title: 'Understand LLM training and fine-tuning concepts', order: 2 },
                    { title: 'Compare different LLM architectures and use cases', order: 3 },
                ],
            },
            {
                name: 'Prompt Engineering',
                description: 'Craft effective prompts for various LLM tasks and use cases',
                outcome: 'Master prompt design techniques',
                order: 2,
                skills: [
                    { name: 'Prompt Design', description: 'Zero-shot, few-shot, instruction tuning', order: 1 },
                    { name: 'Few-Shot Learning', description: 'In-context learning with examples', order: 2 },
                    { name: 'Chain-of-Thought', description: 'Step-by-step reasoning prompts', order: 3 },
                    { name: 'Prompt Optimization', description: 'Testing, iteration, evaluation', order: 4 },
                    { name: 'Prompt Templates', description: 'Reusable prompt structures', order: 5 },
                ],
                milestones: [
                    { title: 'Design prompts for classification and extraction tasks', order: 1 },
                    { title: 'Implement chain-of-thought reasoning prompts', order: 2 },
                    { title: 'Optimize prompts for accuracy and cost efficiency', order: 3 },
                ],
            },
            {
                name: 'LLM Integration',
                description: 'Build applications that integrate LLMs and handle context',
                outcome: 'Create production LLM applications',
                order: 3,
                skills: [
                    { name: 'OpenAI API', description: 'GPT-4, embeddings, function calling', order: 1 },
                    { name: 'LangChain', description: 'LLM orchestration framework', order: 2 },
                    { name: 'Vector Databases', description: 'Pinecone, Weaviate, Chroma', order: 3 },
                    { name: 'Embeddings', description: 'Text embeddings and similarity search', order: 4 },
                    { name: 'Semantic Search', description: 'Vector search and ranking', order: 5 },
                ],
                milestones: [
                    { title: 'Build an application using OpenAI API', order: 1 },
                    { title: 'Implement semantic search with embeddings', order: 2 },
                    { title: 'Create a chatbot with conversation memory', order: 3 },
                ],
            },
            {
                name: 'RAG Systems',
                description: 'Build knowledge-grounded AI systems with custom data',
                outcome: 'Implement production RAG pipelines',
                order: 4,
                skills: [
                    { name: 'Retrieval-Augmented Generation', description: 'RAG architecture and patterns', order: 1 },
                    { name: 'Chunking Strategies', description: 'Document splitting and preprocessing', order: 2 },
                    { name: 'Vector Stores', description: 'Storing and querying embeddings', order: 3 },
                    { name: 'Reranking', description: 'Improving retrieval accuracy', order: 4 },
                    { name: 'Context Management', description: 'Token limits and context windows', order: 5 },
                ],
                milestones: [
                    { title: 'Build a RAG system with custom knowledge base', order: 1 },
                    { title: 'Implement chunking and retrieval strategies', order: 2 },
                    { title: 'Optimize retrieval accuracy with reranking', order: 3 },
                ],
            },
            {
                name: 'Production AI',
                description: 'Deploy and maintain production-grade GenAI applications',
                outcome: 'Run reliable AI systems at scale',
                order: 5,
                skills: [
                    { name: 'Fine-tuning', description: 'Custom model training and adaptation', order: 1 },
                    { name: 'Evaluation', description: 'Metrics, benchmarks, human eval', order: 2 },
                    { name: 'Monitoring', description: 'LLM output quality and performance', order: 3 },
                    { name: 'Cost Optimization', description: 'Caching, batching, model selection', order: 4 },
                    { name: 'Safety & Ethics', description: 'Content filtering, bias mitigation', order: 5 },
                ],
                milestones: [
                    { title: 'Fine-tune an LLM for specific domain tasks', order: 1 },
                    { title: 'Implement LLM output monitoring and evaluation', order: 2 },
                    { title: 'Design cost-effective LLM architecture with caching', order: 3 },
                ],
            },
        ],
    },
];

async function main() {
    console.log('🌱 Starting seed...');

    // Clear existing roadmap data
    console.log('🗑️  Clearing existing roadmap data...');
    await prisma.userMilestoneProgress.deleteMany({});
    await prisma.userRoadmap.deleteMany({});
    await prisma.milestone.deleteMany({});
    await prisma.skill.deleteMany({});
    await prisma.phase.deleteMany({});
    await prisma.track.deleteMany({});

    // Seed tracks, phases, skills, and milestones
    for (const trackData of seedData) {
        console.log(`\n📚 Creating track: ${trackData.name}`);

        const track = await prisma.track.create({
            data: {
                name: trackData.name,
                slug: trackData.slug,
                description: trackData.description,
                icon: trackData.icon,
                order: trackData.order,
            },
        });

        for (const phaseData of trackData.phases) {
            console.log(`  📖 Creating phase: ${phaseData.name}`);

            const phase = await prisma.phase.create({
                data: {
                    name: phaseData.name,
                    description: phaseData.description,
                    outcome: phaseData.outcome,
                    order: phaseData.order,
                    trackId: track.id,
                },
            });

            // Create skills
            for (const skillData of phaseData.skills) {
                await prisma.skill.create({
                    data: {
                        name: skillData.name,
                        description: skillData.description,
                        order: skillData.order,
                        phaseId: phase.id,
                    },
                });
            }

            // Create milestones
            for (const milestoneData of phaseData.milestones) {
                await prisma.milestone.create({
                    data: {
                        title: milestoneData.title,
                        order: milestoneData.order,
                        phaseId: phase.id,
                    },
                });
            }
        }
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Tracks: ${await prisma.track.count()}`);
    console.log(`   Phases: ${await prisma.phase.count()}`);
    console.log(`   Skills: ${await prisma.skill.count()}`);
    console.log(`   Milestones: ${await prisma.milestone.count()}`);
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
