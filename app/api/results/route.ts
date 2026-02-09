import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    userId?: string;
    subject?: "informatics" | "physics";
    score?: number;
    correctCount?: number;
    totalCount?: number;
    durationSec?: number;
  };

  if (!body.userId || !body.subject) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const result = await prisma.gameResult.create({
    data: {
      userId: body.userId,
      subject: body.subject,
      score: body.score ?? 0,
      correctCount: body.correctCount ?? 0,
      totalCount: body.totalCount ?? 0,
      durationSec: body.durationSec ?? 0
    }
  });

  return NextResponse.json({ id: result.id });
}
