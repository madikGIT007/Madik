import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as { userId?: string; grade?: number };
  if (!body.userId || !body.grade) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }
  if (body.grade < 5 || body.grade > 11) {
    return NextResponse.json({ error: "Invalid grade" }, { status: 400 });
  }
  const user = await prisma.user.update({
    where: { id: body.userId },
    data: { grade: body.grade }
  });
  return NextResponse.json({
    userId: user.id,
    nickname: user.nickname,
    grade: user.grade
  });
}
