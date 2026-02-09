"use client";

import { useState } from "react";
import { Card, PrimaryButton } from "../../components/ui";

type Subject = "informatics" | "physics";

type Difficulty = "easy" | "medium" | "hard";

export default function AdminPage() {
  const [subject, setSubject] = useState<Subject>("informatics");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/admin/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        topic,
        difficulty,
        text,
        options,
        correctIndex,
        explanation: explanation || undefined,
        password
      })
    });
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setMessage(data.error ?? "Ошибка добавления");
      return;
    }
    setMessage("Вопрос добавлен!");
    setTopic("");
    setText("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
    setExplanation("");
  };

  return (
    <main className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-2xl space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">Admin</p>
          <h1 className="text-3xl font-bold text-slate-900">Добавление вопроса</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-600">
              Предмет
              <select
                value={subject}
                onChange={(event) => setSubject(event.target.value as Subject)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2"
              >
                <option value="informatics">Informatics</option>
                <option value="physics">Physics</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-600">
              Сложность
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as Difficulty)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2"
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </label>
          </div>
          <label className="text-sm font-semibold text-slate-600">
            Тема
            <input
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Текст вопроса
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2"
            />
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            {options.map((option, index) => (
              <label key={`option-${index}`} className="text-sm font-semibold text-slate-600">
                Вариант {index + 1}
                <input
                  value={option}
                  onChange={(event) => handleOptionChange(index, event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2"
                />
              </label>
            ))}
          </div>
          <label className="text-sm font-semibold text-slate-600">
            Индекс правильного ответа (0-3)
            <input
              type="number"
              min={0}
              max={3}
              value={correctIndex}
              onChange={(event) => setCorrectIndex(Number(event.target.value))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Пояснение (необязательно)
            <textarea
              value={explanation}
              onChange={(event) => setExplanation(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Пароль администратора
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2"
            />
          </label>
          <PrimaryButton type="submit">Добавить вопрос</PrimaryButton>
        </form>
        {message && <p className="text-sm text-slate-600">{message}</p>}
      </Card>
    </main>
  );
}
