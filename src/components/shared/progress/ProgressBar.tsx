"use client";
import { Progress } from "@heroui/react";

interface ProgressBarProps {
  stepsQty: number;
  currentStep: number;
  className?: string;
}

export default function ProgressBar({
  stepsQty,
  currentStep,
  className = "",
}: ProgressBarProps) {
  return (
    <Progress
      className={`max-w-full ${className}`}
      classNames={{ track: "h-2 bg-gray-light", indicator: "h-2 bg-primary" }}
      color="warning"
      maxValue={stepsQty}
      size="md"
      value={currentStep}
    />
  );
}
