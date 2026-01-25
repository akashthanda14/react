import { auth } from "@/lib/auth";
import { SheetPageClient } from "@/components/SheetPageClient";
import { Topic } from "@/components/AccordionTable";

export default async function SheetPage() {
  const session = await auth();

  // Mock data for System Design topics
  const topics: Topic[] = [
    {
      id: "1",
      title: "Scalability Fundamentals",
      description: "Learn the basics of scaling systems",
      subtopics: [
        {
          id: "1-1",
          title: "Horizontal vs Vertical Scaling",
          problems: [
            {
              id: "p1",
              title: "Design a Scalable Web Application",
              difficulty: "Medium",
              leetcodeUrl: null,
              articleUrl: null,
              youtubeUrl: null,
              practiceUrl: null,
              completed: false,
              hasNote: false,
              isStarred: false,
              companies: [],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Database Design",
      description: "Master database architecture and design patterns",
      subtopics: [
        {
          id: "2-1",
          title: "SQL vs NoSQL",
          problems: [
            {
              id: "p2",
              title: "Choose the Right Database",
              difficulty: "Easy",
              leetcodeUrl: null,
              articleUrl: null,
              youtubeUrl: null,
              practiceUrl: null,
              completed: false,
              hasNote: false,
              isStarred: false,
              companies: [],
            },
          ],
        },
      ],
    },
  ];

  const blind75Topics: Topic[] = [
    {
      id: "3",
      title: "System Design Essentials",
      description: "Core concepts for system design interviews",
      subtopics: [
        {
          id: "3-1",
          title: "Load Balancing",
          problems: [
            {
              id: "p3",
              title: "Design a Load Balancer",
              difficulty: "Hard",
              leetcodeUrl: null,
              articleUrl: null,
              youtubeUrl: null,
              practiceUrl: null,
              completed: false,
              hasNote: false,
              isStarred: false,
              companies: [],
            },
          ],
        },
      ],
    },
  ];

  // Calculate stats
  const patternProblems = topics.flatMap(t =>
    t.subtopics.flatMap(s => s.problems)
  );

  const blind75Problems = blind75Topics.flatMap(t =>
    t.subtopics.flatMap(s => s.problems)
  );

  const calculateStats = (problems: any[]) => ({
    totalSolved: problems.filter(p => p.completed).length,
    totalProblems: problems.length,
    easySolved: problems.filter(p => p.completed && p.difficulty === 'Easy').length,
    easyTotal: problems.filter(p => p.difficulty === 'Easy').length,
    mediumSolved: problems.filter(p => p.completed && p.difficulty === 'Medium').length,
    mediumTotal: problems.filter(p => p.difficulty === 'Medium').length,
    hardSolved: problems.filter(p => p.completed && p.difficulty === 'Hard').length,
    hardTotal: problems.filter(p => p.difficulty === 'Hard').length,
    problems,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Title */}
        <div className="mb-8 max-w-6xl mx-auto pl-1">
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">
            System Design Mastery
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your journey to mastering system design interviews.
          </p>
        </div>

        {/* Content */}
        <SheetPageClient
          topics={topics}
          blind75Topics={blind75Topics}
          blindSheetDescription="Essential system design patterns"
          isAuthenticated={!!session?.user}
          userName={session?.user?.name || undefined}
          loginStreak={0}
          patternStats={calculateStats(patternProblems)}
          blind75Stats={calculateStats(blind75Problems)}
        />
      </div>
    </div>
  );
}
