import Link from "next/link";

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-soft transition hover:-translate-y-0.5 hover:border-slate-300"
    >
      {children}
    </Link>
  );
}

export function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
