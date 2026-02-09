import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Boost — School MVP",
  description: "Быстрые школьные викторины с рейтингом"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
