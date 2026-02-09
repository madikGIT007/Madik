import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    subject?: "informatics" | "physics";
    topic?: string;
    difficulty?: "easy" | "medium" | "hard";
    text?: string;
    options?: string[];
    correctIndex?: number;
    explanation?: string;
    password?: string;
  };

  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!body.subject || !body.topic || !body.text || !body.options) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  if (body.options.length !== 4) {
    return NextResponse.json({ error: "Options must be 4" }, { status: 400 });
  }

  const correctIndex = body.correctIndex ?? 0;
  if (correctIndex < 0 || correctIndex > 3) {
    return NextResponse.json({ error: "Invalid correct index" }, { status: 400 });
  }

  const question = await prisma.question.create({
    data: {
      subject: body.subject,
      topic: body.topic,
      difficulty: body.difficulty ?? "easy",
      text: body.text,
      options: JSON.stringify(body.options),
      correctIndex,
      explanation: body.explanation
    }
  });

  return NextResponse.json({ id: question.id });
}
