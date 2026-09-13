import type { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  maxWidth?: "5xl" | "7xl";
  className?: string;
};

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <main className={`mx-auto flex gap-10 px-6 py-8 max-w-7xl ${className}`}>
      {children}
    </main>
  );
}