"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        router.push("/subject");
      } else {
        router.push("/");
      }
    }, 1500 + Math.random() * 300);

    return () => window.clearTimeout(timeout);
  }, [router]);

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="text-center animate-fadeSlide">
        <div className="flex items-center justify-center gap-4 text-5xl">
          <span className="rounded-2xl bg-informatics-100 px-4 py-2 text-informatics-700 shadow-soft">
            </>
          </span>
          <span className="rounded-2xl bg-physics-100 px-4 py-2 text-physics-700 shadow-soft">
            ⚛️
          </span>
        </div>
        <h1 className="mt-6 text-4xl font-bold text-slate-900">Quiz Boost</h1>
        <p className="mt-3 text-lg text-slate-500">
          Быстрые школьные викторины
        </p>
      </div>
    </main>
  );
}
