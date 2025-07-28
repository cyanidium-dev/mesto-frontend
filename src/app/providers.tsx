"use client";
import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <HeroUIProvider className="flex-1">{children}</HeroUIProvider>;
}
