import BranchingRoadmapPage from "@/components/BranchingRoadmapPage";

const phases = [
    {
        id: 1,
        title: "AI/ML Fundamentals",
        learn: "Machine learning basics, neural networks, transformers, LLM concepts",
        outcome: "Understand how large language models work and their capabilities.",
        milestones: [
            "Explain how transformers and attention mechanisms work",
            "Understand LLM training and fine-tuning concepts",
            "Compare different LLM architectures and use cases",
        ],
        concepts: ["Transformers", "Attention", "Embeddings", "Model capabilities"],
        project: "Build a concept explainer for LLMs",
    },
    {
        id: 2,
        title: "Prompt Engineering",
        learn: "Prompt design, few-shot learning, chain-of-thought, prompt optimization",
        outcome: "Craft effective prompts for various LLM tasks and use cases.",
        milestones: [
            "Design prompts for classification and extraction tasks",
            "Implement chain-of-thought reasoning prompts",
            "Optimize prompts for accuracy and cost efficiency",
        ],
        concepts: ["Few-shot prompts", "Structured outputs", "Reasoning prompts", "Evaluation loops"],
        project: "Prompt toolkit for common business tasks",
    },
    {
        id: 3,
        title: "LLM Integration",
        learn: "OpenAI API, LangChain, vector databases, embeddings, semantic search",
        outcome: "Build applications that integrate LLMs and handle context.",
        milestones: [
            "Build an application using OpenAI API",
            "Implement semantic search with embeddings",
            "Create a chatbot with conversation memory",
        ],
        concepts: ["APIs and SDKs", "Vector stores", "Retrieval flows", "Conversation memory"],
        project: "Chat assistant with tools and memory",
    },
    {
        id: 4,
        title: "RAG Systems",
        learn: "Retrieval-augmented generation, chunking strategies, vector stores, reranking",
        outcome: "Build knowledge-grounded AI systems with custom data.",
        milestones: [
            "Build a RAG system with custom knowledge base",
            "Implement chunking and retrieval strategies",
            "Optimize retrieval accuracy with reranking",
        ],
        concepts: ["Chunking", "Retrieval", "Reranking", "Grounded answers"],
        project: "Internal knowledge-base assistant",
    },
    {
        id: 5,
        title: "Production AI",
        learn: "Fine-tuning, evaluation, monitoring, cost optimization, safety",
        outcome: "Deploy and maintain production-grade GenAI applications.",
        milestones: [
            "Fine-tune an LLM for specific domain tasks",
            "Implement LLM output monitoring and evaluation",
            "Design cost-effective LLM architecture with caching",
        ],
        concepts: ["Evaluation", "Guardrails", "Cost controls", "Safety monitoring"],
        project: "Production AI workflow with guardrails",
    },
];

const decisionBranches = [
    {
        title: "Prompting vs Fine-tuning",
        whenToUse: "Use prompting when the task is flexible or fast-changing. Fine-tune when you need consistent style, domain behavior, or cost reduction at scale.",
        decision: "Start with prompts; fine-tune only when prompts can’t meet the quality bar.",
        task: "Benchmark one task with prompts first, then decide if fine-tuning is justified.",
    },
    {
        title: "RAG vs Agents",
        whenToUse: "Use RAG when the model needs grounded knowledge. Use agents when the workflow needs tool use, planning, or multi-step actions.",
        decision: "Ground answers with retrieval; add agent behavior only when tasks need it.",
        task: "Design one product assistant that uses retrieval and one that uses tools.",
    },
    {
        title: "Open Search vs Vector Search",
        whenToUse: "Use vector search for semantic similarity. Add traditional search when exact matching, filters, or hybrid retrieval matter.",
        decision: "Hybrid search often wins in production.",
        task: "Compare keyword search, vector search, and hybrid retrieval on the same corpus.",
    },
];

const advancedLayers = [
    {
        title: "AI Product Design",
        items: ["Use-case scoping", "Cost and latency budgets", "Human review loops", "Prompt/version governance"],
    },
    {
        title: "Retrieval & Knowledge",
        items: ["Chunking strategies", "Reranking", "Metadata filters", "Grounding and citations"],
    },
    {
        title: "Safety & Monitoring",
        items: ["Output validation", "Hallucination checks", "Abuse handling", "Eval dashboards"],
    },
];

const executionPlan = [
    {
        title: "Days 1–30",
        items: ["Learn the basics of transformers, embeddings, and prompts.", "Build one prompt-based demo with structured outputs.", "Track cost and latency from day one."],
    },
    {
        title: "Days 31–60",
        items: ["Integrate an LLM into a real app.", "Add retrieval, memory, or tool use where needed.", "Measure quality using a tiny evaluation set."],
    },
    {
        title: "Days 61–90",
        items: ["Harden the app with safety checks and observability.", "Compare prompting, RAG, and fine-tuning on one use case.", "Ship a production-style AI capstone."],
    },
];

export default function GenAIRoadmapPage() {
    return (
        <BranchingRoadmapPage
            title="Generative AI"
            emoji="🤖"
            color="#C084FC"
            phasesCount={5}
            hours={25}
            description="From AI fundamentals to production RAG systems — master prompt engineering, LangChain, agents, and cost-effective AI architecture."
            rootGoal="Build useful AI applications"
            rootOutcome="Move from understanding LLMs to shipping grounded, evaluated, production-grade AI systems."
            rootExecution="Learn prompting, then add retrieval, tools, safety, and evaluation."
            summaryStats={[
                { value: "5", label: "phases" },
                { value: "3", label: "decision branches" },
                { value: "4", label: "project ideas" },
                { value: "25h", label: "study time" },
            ]}
            pills={["Prompting", "Embeddings", "RAG", "Agents", "Evaluation"]}
            phaseHeader="Fundamentals → Prompting → Integration → RAG → Production AI"
            phaseDescription="The roadmap branches from how models work into how to use them safely and effectively inside real products."
            phases={phases}
            decisionBranches={decisionBranches}
            advancedLayers={advancedLayers}
            executionPlan={executionPlan}
            mistakes={[
                "Treating prompts like magic instead of an engineering surface.",
                "Adding agents before the base retrieval or tool flow works.",
                "Ignoring evaluation, safety, and cost until after launch.",
            ]}
            topSignals={[
                "They measure quality with real eval sets.",
                "They understand when not to use AI.",
                "They design for latency and cost from the start.",
            ]}
            footerNote="Good AI products are grounded, measured, and constrained — not just powered by a model API."
        />
    );
}
