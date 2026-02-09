"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, PrimaryButton } from "../components/ui";

export default function HomePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!nickname.trim()) {
      setError("Введите никнейм.");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname: nickname.trim() })
    });

    if (response.ok) {
      const data = (await response.json()) as {
        userId: string;
        nickname: string;
        grade: number;
      };
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("nickname", data.nickname);
      localStorage.setItem("grade", String(data.grade));
      router.push("/subject");
      return;
    }

    if (response.status === 404) {
      localStorage.setItem("pendingNickname", nickname.trim());
      router.push("/onboarding");
      return;
    }

    setError("Не удалось авторизоваться.");
    setLoading(false);
  };

  return (
    <main className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-xl animate-fadeSlide">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Добро пожаловать
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Quiz Boost
            </h1>
            <p className="mt-2 text-slate-500">
              Быстрые школьные викторины для тренировки знаний.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Ваш никнейм
              <input
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="Например, Masha_7B"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm focus:border-slate-400 focus:outline-none"
              />
            </label>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Проверяем..." : "Продолжить"}
            </PrimaryButton>
          </form>
          {error && <p className="text-sm text-rose-500">{error}</p>}
        </div>
      </Card>
    </main>
  );
}
