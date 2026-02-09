import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as { nickname?: string; grade?: number };
  const nickname = body.nickname?.trim();

  if (!nickname) {
    return NextResponse.json({ error: "Nickname required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { nickname } });
  if (existing) {
    return NextResponse.json({
      userId: existing.id,
      nickname: existing.nickname,
      grade: existing.grade
    });
  }

  if (!body.grade || body.grade < 5 || body.grade > 11) {
    return NextResponse.json({ error: "Grade required" }, { status: 404 });
  }

  const created = await prisma.user.create({
    data: {
      nickname,
      grade: body.grade
    }
  });

  return NextResponse.json({
    userId: created.id,
    nickname: created.nickname,
    grade: created.grade
  });
}
