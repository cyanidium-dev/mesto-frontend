"use client";

import { useRouter } from "next/navigation";
import ArrowIcon from "../icons/ArrowIcon";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer flex items-center text-[16px] font-normal leading-[100%] text-primary active:brightness-125 
    focus-visible:brightness-125 transition duration-300 ease-in-out"
    >
      <ArrowIcon />
      Назад
    </button>
  );
}
