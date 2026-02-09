"use client";

import { useEffect, useState } from "react";
import { Card } from "../../components/ui";

type LeaderboardEntry = {
  position: number;
  nickname: string;
  grade: number;
  score: number;
  games: number;
};

type SubjectFilter = "all" | "informatics" | "physics";

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<SubjectFilter>("all");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const subjectQuery = filter === "all" ? "" : `&subject=${filter}`;
      const response = await fetch(`/api/leaderboard?range=decade${subjectQuery}`);
      if (!response.ok) {
        setEntries([]);
        setLoading(false);
        return;
      }
      const data = (await response.json()) as LeaderboardEntry[];
      setEntries(data);
      setLoading(false);
    };

    fetchLeaderboard();
  }, [filter]);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase text-slate-500">ТОП ДЕКАДЫ</p>
        <h1 className="text-3xl font-bold text-slate-900">Лидеры последних 10 дней</h1>
      </header>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "All", value: "all" },
          { label: "Informatics", value: "informatics" },
          { label: "Physics", value: "physics" }
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value as SubjectFilter)}
            className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
              filter === item.value
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <Card>
        {loading ? (
          <p className="text-slate-500">Загрузка...</p>
        ) : entries.length === 0 ? (
          <p className="text-slate-500">Пока нет результатов за декаду.</p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Никнейм</th>
                  <th className="px-4 py-3">Класс</th>
                  <th className="px-4 py-3">Очки</th>
                  <th className="px-4 py-3">Игры</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.nickname} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {entry.position}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {entry.nickname}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{entry.grade}</td>
                    <td className="px-4 py-3 text-slate-900">{entry.score}</td>
                    <td className="px-4 py-3 text-slate-500">{entry.games}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </main>
  );
}
