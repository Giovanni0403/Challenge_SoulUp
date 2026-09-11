import type { ReactNode } from 'react';

type CardProps = { children: ReactNode; className?: string };
export default function Card({ children, className = '' }: CardProps) {
  return (
    <article
      className={`min-w-0 rounded-xl border border-teal-900/15 bg-white p-6 text-[#0d2225] shadow-sm ${className}`}
    >
      {children}
    </article>
  );
}
