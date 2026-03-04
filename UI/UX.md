import { useState } from "react";

const BRAND = {
  green: "#00FF7F",
  greenDim: "rgba(0,255,127,0.1)",
  greenGlow: "rgba(0,255,127,0.3)",
  dark: "#0A0A0F",
  card: "#111118",
  cardHover: "#16161F",
  border: "#1E1E2A",
  text: "#E0E0E8",
  textDim: "#8888A0",
  white: "#FFFFFF",
};

const roadmaps = [
  {
    id: 1,
    title: "Backend Engineering",
    desc: "APIs, databases, caching, message queues, and production patterns",
    topics: 24,
    hours: 40,
    level: "Beginner → Advanced",
    icon: "⚙️",
    color: "#00FF7F",
    popular: true,
  },
  {
    id: 2,
    title: "System Design",
    desc: "Scalability, distributed systems, load balancing, and architecture",
    topics: 20,
    hours: 35,
    level: "Intermediate",
    icon: "🏗️",
    color: "#00D4FF",
    popular: true,
  },
  {
    id: 3,
    title: "DevOps & Cloud",
    desc: "Docker, Kubernetes, AWS, CI/CD, monitoring, and infrastructure",
    topics: 18,
    hours: 30,
    level: "Beginner → Advanced",
    icon: "☁️",
    color: "#FF6B6B",
    popular: false,
  },
  {
    id: 4,
    title: "DSA for Interviews",
    desc: "Patterns, problem-solving strategies, and company-specific prep",
    topics: 30,
    hours: 50,
    level: "All Levels",
    icon: "🧩",
    color: "#FFB347",
    popular: false,
  },
  {
    id: 5,
    title: "Generative AI & LLMs",
    desc: "Prompt engineering, RAG, agents, LangChain, and AI architecture",
    topics: 15,
    hours: 25,
    level: "Intermediate",
    icon: "🤖",
    color: "#C084FC",
    popular: true,
  },
  {
    id: 6,
    title: "Microservices",
    desc: "Service mesh, event-driven design, gRPC, and distributed tracing",
    topics: 16,
    hours: 28,
    level: "Advanced",
    icon: "🔗",
    color: "#F472B6",
    popular: false,
  },
];

const blogs = [
  {
    id: 1,
    title: "Why Redis Beats Memcached in Production",
    category: "Backend",
    date: "Feb 28, 2026",
    readTime: "6 min",
    excerpt:
      "A deep dive into persistence, data structures, and real-world tradeoffs that matter when your cache layer handles 100K+ requests/sec.",
  },
  {
    id: 2,
    title: "Kafka Architecture: The Mental Model You Need",
    category: "System Design",
    date: "Feb 20, 2026",
    readTime: "8 min",
    excerpt:
      "Partitions, consumer groups, and offset management explained through a food delivery analogy that actually sticks.",
  },
  {
    id: 3,
    title: "Docker in 2026: What Changed and What Didn't",
    category: "DevOps",
    date: "Feb 12, 2026",
    readTime: "5 min",
    excerpt:
      "Container runtimes evolved. Docker's role shifted. Here's what you actually need to know for production workloads.",
  },
  {
    id: 4,
    title: "From Generative AI to Agentic AI: The Shift",
    category: "AI/ML",
    date: "Feb 5, 2026",
    readTime: "7 min",
    excerpt:
      "LangGraph, CrewAI, and the move from single-shot generation to autonomous multi-step reasoning systems.",
  },
];

const trainingPlans = [
  {
    name: "Starter",
    price: "₹2,999",
    duration: "/session",
    features: [
      "1-hour video call",
      "Resume & profile review",
      "Personalized roadmap",
      "Career direction clarity",
    ],
    cta: "Book Session",
    highlighted: false,
  },
  {
    name: "Pro Mentorship",
    price: "₹14,999",
    duration: "/month",
    features: [
      "4x 1-hour sessions/month",
      "Weekly code reviews",
      "System design mock interviews",
      "Private Slack access",
      "Project guidance",
    ],
    cta: "Start Mentorship",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    duration: "",
    features: [
      "Team training (5-20 engineers)",
      "Custom curriculum",
      "Architecture consulting",
      "Hands-on workshops",
      "Ongoing support",
    ],
    cta: "Contact Me",
    highlighted: false,
  },
];

const stats = [
  { value: "128K+", label: "Instagram Followers" },
  { value: "20+", label: "Engineers Trained" },
  { value: "20", label: "Years Experience" },
  { value: "500+", label: "Reels Published" },
];

const navItems = ["Roadmaps", "Training", "Consultation", "Blog"];

// --- Components ---

function Nav({ active, setActive }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${BRAND.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${BRAND.green}, #00CC66)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 16,
              color: BRAND.dark,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            A
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', 'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 18,
              color: BRAND.white,
              letterSpacing: "-0.02em",
            }}
          >
            akashcode
            <span style={{ color: BRAND.green }}>.official</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                setActive(item);
                document
                  .getElementById(item.toLowerCase())
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                color:
                  active === item ? BRAND.green : BRAND.textDim,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.2s",
                cursor: "pointer",
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#training"
            style={{
              background: BRAND.green,
              color: BRAND.dark,
              padding: "8px 20px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.2s",
            }}
          >
            Book 1:1
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: BRAND.white,
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            background: BRAND.card,
            borderTop: `1px solid ${BRAND.border}`,
            padding: "16px 24px",
          }}
          className="mobile-menu"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => {
                setMobileOpen(false);
                setActive(item);
              }}
              style={{
                display: "block",
                padding: "12px 0",
                color: BRAND.text,
                textDecoration: "none",
                fontSize: 16,
                fontFamily: "'DM Sans', sans-serif",
                borderBottom: `1px solid ${BRAND.border}`,
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${BRAND.border} 1px, transparent 1px),
            linear-gradient(90deg, ${BRAND.border} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.3,
        }}
      />
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.greenGlow} 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: BRAND.greenDim,
            border: `1px solid ${BRAND.greenGlow}`,
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: BRAND.green,
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: BRAND.green,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
            }}
          >
            128K+ engineers learning daily
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(40px, 7vw, 76px)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: BRAND.white,
            marginBottom: 24,
            letterSpacing: "-0.03em",
          }}
        >
          Learn to build
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${BRAND.green}, #00CC66, #00FFD5)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontStyle: "italic",
            }}
          >
            systems that scale
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: BRAND.textDim,
            maxWidth: 560,
            margin: "0 auto 40px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Structured roadmaps, 1:1 mentorship, and hands-on training in
          backend engineering, system design, and DevOps — from someone who's
          been in production for 20 years.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#roadmaps"
            style={{
              background: BRAND.green,
              color: BRAND.dark,
              padding: "14px 32px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: `0 0 30px ${BRAND.greenGlow}`,
            }}
          >
            Explore Roadmaps →
          </a>
          <a
            href="#training"
            style={{
              background: "transparent",
              color: BRAND.white,
              padding: "14px 32px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              border: `1px solid ${BRAND.border}`,
              transition: "border-color 0.2s",
            }}
          >
            Book 1:1 Training
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px 80px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 1,
          background: BRAND.border,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: BRAND.card,
              padding: "32px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 32,
                fontWeight: 700,
                color: BRAND.green,
                marginBottom: 4,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: BRAND.textDim,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Roadmaps() {
  return (
    <section id="roadmaps" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ marginBottom: 48 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: BRAND.green,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          Structured Learning
        </span>
        <h2
          style={{
            fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 400,
            color: BRAND.white,
            marginTop: 8,
            letterSpacing: "-0.02em",
          }}
        >
          Engineering Roadmaps
        </h2>
        <p
          style={{
            color: BRAND.textDim,
            fontSize: 16,
            marginTop: 12,
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: 500,
          }}
        >
          Follow battle-tested learning paths designed from real production
          experience. No fluff, no filler — just the concepts that matter.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 16,
        }}
      >
        {roadmaps.map((r) => (
          <div
            key={r.id}
            style={{
              background: BRAND.card,
              border: `1px solid ${BRAND.border}`,
              borderRadius: 16,
              padding: 28,
              cursor: "pointer",
              transition: "all 0.3s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = r.color + "55";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = BRAND.border;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {r.popular && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: r.color + "20",
                  color: r.color,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 100,
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Popular
              </div>
            )}

            <div style={{ fontSize: 32, marginBottom: 16 }}>{r.icon}</div>

            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: BRAND.white,
                marginBottom: 8,
              }}
            >
              {r.title}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: BRAND.textDim,
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              {r.desc}
            </p>

            <div
              style={{
                display: "flex",
                gap: 16,
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                color: BRAND.textDim,
              }}
            >
              <span>{r.topics} topics</span>
              <span>·</span>
              <span>{r.hours}h</span>
              <span>·</span>
              <span style={{ color: r.color }}>{r.level}</span>
            </div>

            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: `1px solid ${BRAND.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: r.color,
                }}
              >
                Start Learning →
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: BRAND.textDim,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                FREE
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Training() {
  return (
    <section
      id="training"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 24px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: BRAND.green,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          1:1 Mentorship
        </span>
        <h2
          style={{
            fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 400,
            color: BRAND.white,
            marginTop: 8,
            letterSpacing: "-0.02em",
          }}
        >
          Train with a Senior Engineer
        </h2>
        <p
          style={{
            color: BRAND.textDim,
            fontSize: 16,
            marginTop: 12,
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: 500,
            margin: "12px auto 0",
          }}
        >
          Get personalized guidance from someone who's trained 20+ engineers
          across Japan and the US.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {trainingPlans.map((plan, i) => (
          <div
            key={i}
            style={{
              background: plan.highlighted
                ? `linear-gradient(135deg, ${BRAND.card}, #0D1A12)`
                : BRAND.card,
              border: `1px solid ${
                plan.highlighted ? BRAND.green + "44" : BRAND.border
              }`,
              borderRadius: 20,
              padding: 36,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              ...(plan.highlighted
                ? {
                    boxShadow: `0 0 60px ${BRAND.greenGlow}, inset 0 1px 0 ${BRAND.green}33`,
                  }
                : {}),
            }}
          >
            {plan.highlighted && (
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: BRAND.green,
                  color: BRAND.dark,
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "5px 16px",
                  borderRadius: 100,
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Most Popular
              </div>
            )}

            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: BRAND.white,
                marginBottom: 4,
              }}
            >
              {plan.name}
            </h3>

            <div style={{ marginBottom: 24 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 36,
                  fontWeight: 800,
                  color: plan.highlighted ? BRAND.green : BRAND.white,
                }}
              >
                {plan.price}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: BRAND.textDim,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {plan.duration}
              </span>
            </div>

            <div style={{ flex: 1 }}>
              {plan.features.map((f, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 0",
                    borderBottom:
                      j < plan.features.length - 1
                        ? `1px solid ${BRAND.border}`
                        : "none",
                  }}
                >
                  <span style={{ color: BRAND.green, fontSize: 14 }}>✓</span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      color: BRAND.text,
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <button
              style={{
                marginTop: 28,
                width: "100%",
                padding: "14px 0",
                borderRadius: 12,
                border: plan.highlighted
                  ? "none"
                  : `1px solid ${BRAND.border}`,
                background: plan.highlighted ? BRAND.green : "transparent",
                color: plan.highlighted ? BRAND.dark : BRAND.white,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Consultation() {
  return (
    <section
      id="consultation"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${BRAND.card} 0%, #0D1117 100%)`,
          border: `1px solid ${BRAND.border}`,
          borderRadius: 24,
          padding: "64px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background element */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BRAND.green}08 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: BRAND.green,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            Architecture Consulting
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 400,
              color: BRAND.white,
              marginTop: 12,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Need help designing
            <br />
            your system?
          </h2>
          <p
            style={{
              color: BRAND.textDim,
              fontSize: 16,
              marginTop: 16,
              lineHeight: 1.7,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            I've built and reviewed architectures handling millions of users.
            Whether you're choosing between monolith and microservices, designing
            your data layer, or optimizing for scale — I can help you make the
            right call.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[
            {
              title: "Architecture Review",
              desc: "Get your existing system reviewed with actionable recommendations",
            },
            {
              title: "Tech Stack Decision",
              desc: "Choose the right technologies for your scale and team",
            },
            {
              title: "Scaling Strategy",
              desc: "Plan your system's growth path — caching, queues, sharding",
            },
            {
              title: "Interview Prep for Startups",
              desc: "Prepare for system design rounds at top companies",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${BRAND.border}`,
                borderRadius: 12,
                padding: "16px 20px",
              }}
            >
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: BRAND.white,
                  marginBottom: 4,
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: BRAND.textDim,
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}

          <a
            href="mailto:akashcodeofficial@gmail.com"
            style={{
              marginTop: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: BRAND.green,
              color: BRAND.dark,
              padding: "14px 28px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              textAlign: "center",
              justifyContent: "center",
              boxShadow: `0 0 30px ${BRAND.greenGlow}`,
            }}
          >
            Schedule a Consultation →
          </a>
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 48,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: BRAND.green,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            Latest Articles
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 400,
              color: BRAND.white,
              marginTop: 8,
              letterSpacing: "-0.02em",
            }}
          >
            Engineering Blog
          </h2>
        </div>
        <a
          href="#"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: BRAND.green,
            textDecoration: "none",
          }}
        >
          View All Posts →
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {blogs.map((b) => (
          <article
            key={b.id}
            style={{
              background: BRAND.card,
              border: `1px solid ${BRAND.border}`,
              borderRadius: 16,
              padding: 28,
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = BRAND.green + "33";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = BRAND.border;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: BRAND.green,
                  background: BRAND.greenDim,
                  padding: "4px 10px",
                  borderRadius: 100,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {b.category}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: BRAND.textDim,
                }}
              >
                {b.readTime}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: BRAND.white,
                lineHeight: 1.3,
                marginBottom: 12,
              }}
            >
              {b.title}
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: BRAND.textDim,
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              {b.excerpt}
            </p>

            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: `1px solid ${BRAND.border}`,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: BRAND.textDim,
              }}
            >
              {b.date}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "64px 24px 32px",
        borderTop: `1px solid ${BRAND.border}`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 48,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: BRAND.green,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 14,
                color: BRAND.dark,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              A
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: BRAND.white,
              }}
            >
              akashcode<span style={{ color: BRAND.green }}>.official</span>
            </span>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: BRAND.textDim,
              lineHeight: 1.7,
              maxWidth: 300,
            }}
          >
            Teaching backend engineering, system design, and DevOps to the next
            generation of senior engineers.
          </p>
        </div>

        {[
          {
            title: "Learn",
            links: ["Roadmaps", "Blog", "Case Studies", "Resources"],
          },
          {
            title: "Connect",
            links: ["Instagram", "YouTube", "LinkedIn", "Twitter"],
          },
          {
            title: "Work With Me",
            links: ["1:1 Training", "Consultation", "Enterprise", "Contact"],
          },
        ].map((col, i) => (
          <div key={i}>
            <h4
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: BRAND.white,
                marginBottom: 16,
              }}
            >
              {col.title}
            </h4>
            {col.links.map((link, j) => (
              <a
                key={j}
                href="#"
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: BRAND.textDim,
                  textDecoration: "none",
                  padding: "6px 0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = BRAND.green)}
                onMouseLeave={(e) => (e.target.style.color = BRAND.textDim)}
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: `1px solid ${BRAND.border}`,
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: BRAND.textDim,
          }}
        >
          © 2026 akashcodeofficial. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: BRAND.textDim,
          }}
        >
          Built with intention, not hype.
        </span>
      </div>
    </footer>
  );
}

// --- Main App ---

export default function AkashCodeOfficial() {
  const [activeNav, setActiveNav] = useState("");

  return (
    <div
      style={{
        background: BRAND.dark,
        minHeight: "100vh",
        color: BRAND.text,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${BRAND.dark}; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          footer > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${BRAND.dark}; }
        ::-webkit-scrollbar-thumb { background: ${BRAND.border}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${BRAND.textDim}; }
      `}</style>

      <Nav active={activeNav} setActive={setActiveNav} />
      <Hero />
      <Stats />
      <Roadmaps />
      <Training />
      <Consultation />
      <Blog />
      <Footer />
    </div>
  );
}