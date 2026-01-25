import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import NavbarModern from "./NavbarModern";

export default async function NavbarWrapper() {
  const session = await auth();

  let totalProblems = 0;
  let solvedProblems = 0;

  if (session?.user?.id) {
    // Get total count of problems
    totalProblems = await prisma.problem.count();

    // Get count of solved problems for this user
    solvedProblems = await prisma.userProblemProgress.count({
      where: {
        userId: session.user.id,
        status: "SOLVED",
      },
    });
  }

  return (
    <NavbarModern 
      totalProblems={totalProblems} 
      solvedProblems={solvedProblems} 
    />
  );
}
