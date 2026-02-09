import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

const TOTAL = 10;

type Subject = "informatics" | "physics";

const shuffle = <T,>(items: T[]): T[] => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = (searchParams.get("subject") ?? "informatics") as Subject;

  const questions = await prisma.question.findMany({
    where: { subject },
    take: 40
  });

  const randomized = shuffle(questions).slice(0, TOTAL).map((question) => {
    const options = JSON.parse(question.options) as string[];
    const indexed = options.map((option, index) => ({ option, index }));
    const shuffled = shuffle(indexed);
    const correctIndex = shuffled.findIndex((item) => item.index === question.correctIndex);

    return {
      id: question.id,
      subject: question.subject,
      topic: question.topic,
      text: question.text,
      options: shuffled.map((item) => item.option),
      correctIndex,
      explanation: question.explanation
    };
  });

  return NextResponse.json(randomized);
}
