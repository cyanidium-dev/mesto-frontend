"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { Input } from "@heroui/react";
import TabMenu from "./TabMenu";
import Image from "next/image";

interface SearchBarProps {
  viewMode: "map" | "list";
  setViewMode: Dispatch<SetStateAction<"map" | "list">>;
}

export default function SearchBar({ viewMode, setViewMode }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <div className="flex gap-3 justify-between items-center">
        <Input
          radius="full"
          placeholder="Найти"
          startContent={
            <Image
              src="/images/icons/dandruff.svg"
              alt="dandruff icon"
              width={20}
              height={20}
              className="mr-1"
            />
          }
          value={searchValue}
          onValueChange={setSearchValue}
          classNames={{
            inputWrapper: `h-9 min-h-9 ${
              viewMode === "map" ? "bg-white" : "bg-gray-ultra-light"
            }`,
            input: "text-[16px] placeholder:text-gray-placeholder",
          }}
        />
        <TabMenu viewMode={viewMode} setViewMode={setViewMode} />
      </div>
    </div>
  );
}
