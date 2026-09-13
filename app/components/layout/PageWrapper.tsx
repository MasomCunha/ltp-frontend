import type { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <main
      className={`mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:flex-row md:gap-10 ${className}`}
    >
      {children}
    </main>
  );
}