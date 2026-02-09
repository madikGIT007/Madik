"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, GhostButton, PrimaryButton } from "../../components/ui";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const scoreParam = Number(searchParams.get("score") ?? "0");
  const correctParam = Number(searchParams.get("correct") ?? "0");
  const totalParam = Number(searchParams.get("total") ?? "10");
  const subject = searchParams.get("subject") ?? "informatics";

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = window.setInterval(() => {
      start += 1;
      if (start >= scoreParam) {
        setDisplayScore(scoreParam);
        window.clearInterval(interval);
      } else {
        setDisplayScore(start);
      }
    }, 80);
    return () => window.clearInterval(interval);
  }, [scoreParam]);

  return (
    <main className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-xl animate-fadeSlide space-y-6 text-center">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">Итоги</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {correctParam}/{totalParam}
          </h1>
          <p className="mt-2 text-slate-500">Правильных ответов</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 px-6 py-6 text-white shadow-soft">
          <p className="text-sm uppercase tracking-wide text-slate-200">Очки</p>
          <p className="mt-2 text-5xl font-bold">{displayScore}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <PrimaryButton onClick={() => (window.location.href = `/quiz?subject=${subject}`)}>
            Ещё раз
          </PrimaryButton>
          <GhostButton href="/leaderboard">В ТОП ДЕКАДЫ</GhostButton>
        </div>
        <Link href="/subject" className="text-sm font-semibold text-slate-500 hover:text-slate-700">
          Вернуться к предметам
        </Link>
      </Card>
    </main>
  );
}
