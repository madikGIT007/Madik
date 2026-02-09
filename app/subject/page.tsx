"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "../../components/ui";

export default function SubjectPage() {
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    setNickname(localStorage.getItem("nickname") ?? "");
    setGrade(localStorage.getItem("grade") ?? "");
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Выберите предмет</h1>
          <p className="text-slate-500">
            {nickname ? `${nickname}, ` : ""}класс {grade}
          </p>
        </div>
        <Link
          href="/leaderboard"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5"
        >
          ТОП ДЕКАДЫ
        </Link>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/quiz?subject=informatics" className="group">
          <Card className="relative overflow-hidden border-informatics-100 bg-gradient-to-br from-informatics-50 to-white transition group-hover:-translate-y-1 group-hover:shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-informatics-500">
                  Информатика
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Код и алгоритмы</h2>
                <p className="mt-2 text-slate-600">
                  </> Школьные задачки, логика и цифровая грамотность.
                </p>
              </div>
              <div className="rounded-3xl bg-informatics-100 px-4 py-3 text-3xl text-informatics-700 shadow-soft">
                </>
              </div>
            </div>
          </Card>
        </Link>
        <Link href="/quiz?subject=physics" className="group">
          <Card className="relative overflow-hidden border-physics-100 bg-gradient-to-br from-physics-50 to-white transition group-hover:-translate-y-1 group-hover:shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-physics-600">Физика</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Волны и атомы</h2>
                <p className="mt-2 text-slate-600">⚛️ Лёгкие вопросы про силы и энергию.</p>
              </div>
              <div className="rounded-3xl bg-physics-100 px-4 py-3 text-3xl text-physics-700 shadow-soft">
                ⚛️
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </main>
  );
}
