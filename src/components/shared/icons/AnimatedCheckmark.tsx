"use client";

import { useEffect, useState } from "react";

export default function AnimatedCheckmark() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="36" cy="36" r="30" fill="#00C950" />

      <path
        d="M26 38 L32 44 L47 29"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: 30,
          strokeDashoffset: animate ? 0 : 30,
          transition: "stroke-dashoffset 0.5s ease",
        }}
      />
    </svg>
  );
}
