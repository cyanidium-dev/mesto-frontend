"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { Selection } from "@react-types/shared";
import { Input, Select, SelectItem } from "@heroui/react";
import TabMenu from "./TabMenu";
import Image from "next/image";

interface SearchBarProps {
  viewMode: "map" | "list";
  setViewMode: Dispatch<SetStateAction<"map" | "list">>;
}

const languages = [
  { key: "en", label: "Англ" },
  { key: "ru", label: "Рус" },
];
const cities = [{ key: "Barcelona", label: "Барселона" }];
const categories = [{ key: "sport", label: "Спорт" }];
const distances = [{ key: "2", label: "2 км" }];

export default function SearchBar({ viewMode, setViewMode }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [langValue, setLangValue] = useState<Selection>(new Set([]));
  const [cityValue, setCityValue] = useState<Selection>(new Set([]));
  const [categoryValue, setCategoryValue] = useState<Selection>(new Set([]));
  const [distanceValue, setDistanceValue] = useState<Selection>(new Set([]));

  return (
    <div>
      <div className="flex gap-3 justify-between items-center mb-2">
        <Input
          aria-label="search input"
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
            innerWrapper: "w-fit!",
            inputWrapper: `h-9 min-h-9 ${
              viewMode === "map" ? "bg-white" : "bg-gray-ultra-light"
            }`,
            input: "text-[16px] placeholder:text-gray-placeholder",
          }}
        />
        <TabMenu viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className="flex items-center justify-between gap-1">
        <Select
          radius="full"
          size="sm"
          placeholder="Язык"
          aria-label="select input"
          selectedKeys={langValue}
          onSelectionChange={setLangValue}
          classNames={{
            trigger: `px-2 h-8 min-h-8 ${
              viewMode === "map" ? "bg-white" : "bg-gray-ultra-light"
            }`,
            value: "text-[12px]",
            popoverContent: "w-[40vw]",
          }}
        >
          {languages.map((lang) => (
            <SelectItem
              key={lang.key}
              classNames={{
                base: "data-focus:bg-blue/20! data-selected:bg-blue/20! data-hover:bg-blue/20! data-pressed:bg-blue/20!",
              }}
            >
              {lang.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          radius="full"
          placeholder="Город"
          aria-label="select input"
          selectedKeys={cityValue}
          onSelectionChange={setCityValue}
          classNames={{
            trigger: `px-2 h-8 min-h-8 ${
              viewMode === "map" ? "bg-white" : "bg-gray-ultra-light"
            }`,
            value: "text-[12px]",
            popoverContent: "w-[40vw]",
          }}
        >
          {cities.map((lang) => (
            <SelectItem
              key={lang.key}
              classNames={{
                base: "data-focus:bg-blue/20! data-selected:bg-blue/20! data-hover:bg-blue/20! data-pressed:bg-blue/20!",
              }}
            >
              {lang.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          radius="full"
          placeholder="Категория"
          aria-label="select input"
          selectedKeys={categoryValue}
          onSelectionChange={setCategoryValue}
          classNames={{
            trigger: `px-2 h-8 min-h-8 ${
              viewMode === "map" ? "bg-white" : "bg-gray-ultra-light"
            }`,
            value: "text-[12px]",
            popoverContent: "w-[40vw]",
          }}
        >
          {categories.map((lang) => (
            <SelectItem
              key={lang.key}
              classNames={{
                base: "data-focus:bg-blue/20! data-selected:bg-blue/20! data-hover:bg-blue/20! data-pressed:bg-blue/20!",
              }}
            >
              {lang.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          radius="full"
          placeholder="Км"
          aria-label="select input"
          selectedKeys={distanceValue}
          onSelectionChange={setDistanceValue}
          classNames={{
            trigger: `px-2 h-8 min-h-8 ${
              viewMode === "map" ? "bg-white" : "bg-gray-ultra-light"
            }`,
            value: "text-[12px]",
            popoverContent: "w-[25vw]",
          }}
        >
          {distances.map((lang) => (
            <SelectItem
              key={lang.key}
              classNames={{
                base: "data-focus:bg-blue/20! data-selected:bg-blue/20! data-hover:bg-blue/20! data-pressed:bg-blue/20!",
              }}
            >
              {lang.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
