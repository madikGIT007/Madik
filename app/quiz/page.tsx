"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Card, PrimaryButton } from "../../components/ui";

type Question = {
  id: string;
  subject: "informatics" | "physics";
  topic: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string | null;
};

const TOTAL_QUESTIONS = 10;
const TIME_LIMIT = 20;

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subject = (searchParams.get("subject") ?? "informatics") as
    | "informatics"
    | "physics";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [remaining, setRemaining] = useState(TIME_LIMIT);
  const [timerKey, setTimerKey] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const startedAt = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const response = await fetch(`/api/questions?subject=${subject}`);
      if (!response.ok) {
        setError("Не удалось загрузить вопросы.");
        setLoading(false);
        return;
      }
      const data = (await response.json()) as Question[];
      setQuestions(data);
      setLoading(false);
      startedAt.current = Date.now();
    };
    fetchQuestions();
  }, [subject]);

  useEffect(() => {
    if (!questions.length) {
      return;
    }
    if (selectedIndex !== null) {
      return;
    }
    setRemaining(TIME_LIMIT);
    setTimerKey((prev) => prev + 1);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, questions, selectedIndex]);

  const handleTimeout = () => {
    if (selectedIndex !== null) {
      return;
    }
    setSelectedIndex(-1);
    setIsCorrect(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedIndex !== null) {
      return;
    }
    const question = questions[currentIndex];
    const correct = index === question.correctIndex;
    setSelectedIndex(index);
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setSelectedIndex(null);
      setIsCorrect(null);
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    const userId = localStorage.getItem("userId");
    const durationSec = Math.round((Date.now() - startedAt.current) / 1000);
    if (userId) {
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          subject,
          score,
          correctCount,
          totalCount: TOTAL_QUESTIONS,
          durationSec
        })
      });
    }
    router.push(
      `/result?score=${score}&correct=${correctCount}&total=${TOTAL_QUESTIONS}&subject=${subject}`
    );
  };

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-slate-500">Загружаем вопросы...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-rose-500">{error}</p>
      </main>
    );
  }

  const question = questions[currentIndex];

  return (
    <main className="flex flex-1 flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">Вопрос</p>
          <h1 className="text-2xl font-bold text-slate-900">
            {currentIndex + 1}/{TOTAL_QUESTIONS}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold uppercase text-slate-500">Время</p>
          <p className="text-2xl font-bold text-slate-900">{remaining}s</p>
        </div>
      </header>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div key={timerKey} className="timer-bar h-2 rounded-full bg-slate-900" />
      </div>
      <Card className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">
            {question.topic}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{question.text}</h2>
        </div>
        <div className="grid gap-3">
          {question.options.map((option, index) => {
            const isChosen = selectedIndex === index;
            const isRight = selectedIndex !== null && index === question.correctIndex;
            const isWrong = isChosen && !isRight;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleAnswer(index)}
                className={`rounded-2xl border px-4 py-3 text-left text-base font-semibold transition focus:outline-none ${
                  selectedIndex === null
                    ? "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300"
                    : isRight
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : isWrong
                    ? "border-rose-200 bg-rose-50 text-rose-600 animate-shake"
                    : "border-slate-100 bg-slate-50 text-slate-400"
                } ${isChosen && isCorrect ? "scale-[1.01]" : ""}`}
                disabled={selectedIndex !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
        {selectedIndex !== null && (
          <div className="space-y-4">
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                isCorrect
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-rose-200 bg-rose-50 text-rose-600"
              }`}
            >
              {isCorrect ? "Отлично! +1 очко" : "Неверно или время вышло"}
            </div>
            {question.explanation && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {question.explanation}
              </div>
            )}
            <PrimaryButton onClick={handleNext}>
              {currentIndex + 1 === TOTAL_QUESTIONS ? "Показать результат" : "Следующий"}
            </PrimaryButton>
          </div>
        )}
      </Card>
    </main>
  );
}
