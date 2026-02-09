import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range");
  const subject = searchParams.get("subject") as "informatics" | "physics" | null;

  if (range !== "decade") {
    return NextResponse.json({ error: "Invalid range" }, { status: 400 });
  }

  const since = new Date();
  since.setDate(since.getDate() - 10);

  const where = {
    createdAt: { gte: since },
    ...(subject ? { subject } : {})
  };

  const grouped = await prisma.gameResult.groupBy({
    by: ["userId"],
    where,
    _sum: { score: true },
    _count: { _all: true }
  });

  const userIds = grouped.map((entry) => entry.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } }
  });

  const merged = grouped
    .map((entry) => {
      const user = users.find((item) => item.id === entry.userId);
      return {
        nickname: user?.nickname ?? "Unknown",
        grade: user?.grade ?? 0,
        score: entry._sum.score ?? 0,
        games: entry._count._all
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 50)
    .map((entry, index) => ({
      position: index + 1,
      ...entry
    }));

  return NextResponse.json(merged);
}
