import TrackRoadmapLayout from "@/components/TrackRoadmapLayout";

const phases = [
    {
        id: 1,
        name: "AI/ML Fundamentals",
        learn: "Machine learning basics, neural networks, transformers, LLM concepts",
        outcome: "Understand how large language models work and their capabilities",
        milestones: [
            "Explain how transformers and attention mechanisms work",
            "Understand LLM training and fine-tuning concepts",
            "Compare different LLM architectures and use cases",
        ],
    },
    {
        id: 2,
        name: "Prompt Engineering",
        learn: "Prompt design, few-shot learning, chain-of-thought, prompt optimization",
        outcome: "Craft effective prompts for various LLM tasks and use cases",
        milestones: [
            "Design prompts for classification and extraction tasks",
            "Implement chain-of-thought reasoning prompts",
            "Optimize prompts for accuracy and cost efficiency",
        ],
    },
    {
        id: 3,
        name: "LLM Integration",
        learn: "OpenAI API, LangChain, vector databases, embeddings, semantic search",
        outcome: "Build applications that integrate LLMs and handle context",
        milestones: [
            "Build an application using OpenAI API",
            "Implement semantic search with embeddings",
            "Create a chatbot with conversation memory",
        ],
    },
    {
        id: 4,
        name: "RAG Systems",
        learn: "Retrieval-augmented generation, chunking strategies, vector stores, reranking",
        outcome: "Build knowledge-grounded AI systems with custom data",
        milestones: [
            "Build a RAG system with custom knowledge base",
            "Implement chunking and retrieval strategies",
            "Optimize retrieval accuracy with reranking",
        ],
    },
    {
        id: 5,
        name: "Production AI",
        learn: "Fine-tuning, evaluation, monitoring, cost optimization, safety",
        outcome: "Deploy and maintain production-grade GenAI applications",
        milestones: [
            "Fine-tune an LLM for specific domain tasks",
            "Implement LLM output monitoring and evaluation",
            "Design cost-effective LLM architecture with caching",
        ],
    },
];

export default function GenAIRoadmapPage() {
    return (
        <TrackRoadmapLayout
            title="Generative AI"
            emoji="🤖"
            color="#C084FC"
            phases={5}
            hours={25}
            description="From AI fundamentals to production RAG systems — master prompt engineering, LangChain, agents, and cost-effective AI architecture."
            phaseData={phases}
        />
    );
}
