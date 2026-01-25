import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sheetId: string }> }
) {
  const { sheetId } = await params;

  try {
    // 1️⃣ Fetch sheet with all problems linked via ProblemSheet
    const sheet = await prisma.sheet.findUnique({
      where: { id: sheetId },
      select: {
        id: true,
        name: true,
        description: true,
        problems: {
          orderBy: { order: "asc" },
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
                leetcodeUrl: true,
                gfgUrl: true,
                topic: {
                  select: {
                    id: true,
                    name: true,
                    order: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!sheet) {
      return NextResponse.json(
        { success: false, error: "Sheet not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Build Topic → Subtopic → Problems tree
    const topicsMap: Record<string, any> = {};

    for (const ps of sheet.problems) {
      const problem = ps.problem;

      const topic = problem.topic ?? {
        id: "uncategorized",
        name: "Uncategorized",
        order: 999,
      };

      // Use a default subtopic since we don't have direct access anymore
      const subtopic = {
        id: "general",
        name: "General",
        order: 0,
      };

      // Topic init
      if (!topicsMap[topic.id]) {
        topicsMap[topic.id] = {
          id: topic.id,
          name: topic.name,
          order: topic.order,
          subtopics: {},
        };
      }

      // Subtopic init
      if (!topicsMap[topic.id].subtopics[subtopic.id]) {
        topicsMap[topic.id].subtopics[subtopic.id] = {
          id: subtopic.id,
          name: subtopic.name,
          order: subtopic.order,
          problems: [],
        };
      }

      // Push problem
      topicsMap[topic.id].subtopics[subtopic.id].problems.push({
        id: problem.id,
        title: problem.title,
        difficulty: problem.difficulty,
        leetcodeUrl: problem.leetcodeUrl,
        gfgUrl: problem.gfgUrl,
        order: ps.order,
      });
    }

    // 3️⃣ Normalize maps → arrays with stable ordering
    const topics = Object.values(topicsMap)
      .sort((a: any, b: any) => a.order - b.order)
      .map((topic: any) => ({
        id: topic.id,
        name: topic.name,
        order: topic.order,
        subtopics: Object.values(topic.subtopics)
          .sort((a: any, b: any) => a.order - b.order)
          .map((sub: any) => ({
            id: sub.id,
            name: sub.name,
            order: sub.order,
            problems: sub.problems.sort(
              (a: any, b: any) => a.order - b.order
            ),
          })),
      }));

    // 4️⃣ Final response
    return NextResponse.json(
      {
        success: true,
        sheet: {
          id: sheet.id,
          name: sheet.name,
          description: sheet.description,
          topics,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ [GET SHEET TREE ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch sheet",
      },
      { status: 500 }
    );
  }
}
