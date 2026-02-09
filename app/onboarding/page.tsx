"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, PrimaryButton } from "../../components/ui";

const gradeOptions = [5, 6, 7, 8, 9, 10, 11];

export default function OnboardingPage() {
  const router = useRouter();
  const [grade, setGrade] = useState<number | null>(null);
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pending = localStorage.getItem("pendingNickname");
    if (!pending) {
      router.push("/");
      return;
    }
    setNickname(pending);
  }, [router]);

  const handleCreate = async () => {
    if (!grade) {
      setError("Выберите класс.");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, grade })
    });
    if (!response.ok) {
      setError("Не удалось создать пользователя.");
      setLoading(false);
      return;
    }
    const data = (await response.json()) as {
      userId: string;
      nickname: string;
      grade: number;
    };
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("nickname", data.nickname);
    localStorage.setItem("grade", String(data.grade));
    localStorage.removeItem("pendingNickname");
    router.push("/subject");
  };

  return (
    <main className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-xl animate-fadeSlide">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Профиль ученика
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Выберите класс
            </h1>
            <p className="mt-2 text-slate-500">
              Никнейм: <span className="font-semibold text-slate-800">{nickname}</span>
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {gradeOptions.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setGrade(value)}
                className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  grade === value
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          <PrimaryButton onClick={handleCreate} disabled={loading}>
            {loading ? "Создаём..." : "Продолжить"}
          </PrimaryButton>
          {error && <p className="text-sm text-rose-500">{error}</p>}
        </div>
      </Card>
    </main>
  );
}
