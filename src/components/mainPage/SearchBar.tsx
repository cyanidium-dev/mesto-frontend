"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Selection } from "@react-types/shared";
import { Input, Select, SelectItem } from "@heroui/react";
import TabMenu from "./TabMenu";
import Image from "next/image";
import {
    LANGUAGES_SHORT,
    CITIES,
    CATEGORIES,
    DISTANCES,
} from "@/constants/filters";

export interface FilterValues {
    search: string;
    languages: string[];
    cities: string[];
    categories: string[];
    distance: string | null;
}

interface SearchBarProps {
    viewMode: "map" | "list";
    setViewMode: Dispatch<SetStateAction<"map" | "list">>;
    onFiltersChange?: (filters: FilterValues) => void;
}

export default function SearchBar({
    viewMode,
    setViewMode,
    onFiltersChange,
}: SearchBarProps) {
    const [searchValue, setSearchValue] = useState("");
    const [langValue, setLangValue] = useState<Selection>(new Set([]));
    const [cityValue, setCityValue] = useState<Selection>(new Set([]));
    const [categoryValue, setCategoryValue] = useState<Selection>(new Set([]));
    const [distanceValue, setDistanceValue] = useState<Selection>(new Set([]));

    // Notify parent of filter changes
    useEffect(() => {
        if (onFiltersChange) {
            const filters: FilterValues = {
                search: searchValue,
                languages:
                    langValue === "all"
                        ? []
                        : (Array.from(langValue) as string[]),
                cities:
                    cityValue === "all"
                        ? []
                        : (Array.from(cityValue) as string[]),
                categories:
                    categoryValue === "all"
                        ? []
                        : (Array.from(categoryValue) as string[]),
                distance:
                    distanceValue === "all" ||
                    !(distanceValue instanceof Set) ||
                    distanceValue.size === 0
                        ? null
                        : (Array.from(distanceValue)[0] as string),
            };
            onFiltersChange(filters);
        }
    }, [
        searchValue,
        langValue,
        cityValue,
        categoryValue,
        distanceValue,
        onFiltersChange,
    ]);

    return (
        <div className="fixed z-50 top-2 left-0 w-full max-w-[440px]">
            <div className="w-full px-4">
                {" "}
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
                                viewMode === "map"
                                    ? "bg-white"
                                    : "bg-gray-ultra-light"
                            }`,
                            input: "text-[16px] placeholder:text-gray-placeholder",
                        }}
                    />
                    <TabMenu viewMode={viewMode} setViewMode={setViewMode} />
                </div>
                <div className="flex items-center justify-between gap-0.5">
                    <Select
                        radius="full"
                        size="sm"
                        placeholder="Язык"
                        aria-label="select input"
                        selectedKeys={langValue}
                        onSelectionChange={setLangValue}
                        classNames={{
                            base: "w-fit",
                            mainWrapper: "w-fit",
                            trigger: `px-2 h-8 min-h-8 w-fit pr-5 min-w-[63px] ${
                                viewMode === "map"
                                    ? "bg-white"
                                    : "bg-gray-ultra-light"
                            }`,
                            innerWrapper: "w-fit pr-2",
                            value: "text-[12px]",
                            popoverContent: "w-fit min-w-[63px]",
                            selectorIcon: "end-1.5",
                        }}
                    >
                        {LANGUAGES_SHORT.map(lang => (
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
                            base: "w-fit",
                            mainWrapper: "w-fit",
                            trigger: `px-2 h-8 min-h-8 w-fit pr-5 min-w-[100px] ${
                                viewMode === "map"
                                    ? "bg-white"
                                    : "bg-gray-ultra-light"
                            }`,
                            innerWrapper: "w-fit pr-2",
                            value: "text-[12px]",
                            popoverContent: "w-fit min-w-[100px]",
                            selectorIcon: "end-1.5",
                        }}
                    >
                        {CITIES.map(city => (
                            <SelectItem
                                key={city.key}
                                classNames={{
                                    base: "data-focus:bg-blue/20! data-selected:bg-blue/20! data-hover:bg-blue/20! data-pressed:bg-blue/20!",
                                }}
                            >
                                {city.label}
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
                            base: "w-fit",
                            mainWrapper: "w-fit",
                            trigger: `px-2 h-8 min-h-8 w-fit pr-5 min-w-[97px] ${
                                viewMode === "map"
                                    ? "bg-white"
                                    : "bg-gray-ultra-light"
                            }`,
                            innerWrapper: "w-fit pr-2",
                            value: "text-[12px]",
                            popoverContent: "w-fit min-w-[97px]",
                            selectorIcon: "end-1.5",
                        }}
                    >
                        {CATEGORIES.map(category => (
                            <SelectItem
                                key={category.key}
                                classNames={{
                                    base: "data-focus:bg-blue/20! data-selected:bg-blue/20! data-hover:bg-blue/20! data-pressed:bg-blue/20!",
                                }}
                            >
                                {category.label}
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
                            base: "w-fit",
                            mainWrapper: "w-fit",
                            trigger: `px-2 h-8 min-h-8 w-fit pr-5 min-w-[62px] ${
                                viewMode === "map"
                                    ? "bg-white"
                                    : "bg-gray-ultra-light"
                            }`,
                            innerWrapper: "w-fit pr-3",
                            value: "text-[12px]",
                            popoverContent: "w-fit min-w-[62px]",
                            selectorIcon: "end-1.5",
                        }}
                    >
                        {DISTANCES.map(distance => (
                            <SelectItem
                                key={distance.key}
                                classNames={{
                                    base: "data-focus:bg-blue/20! data-selected:bg-blue/20! data-hover:bg-blue/20! data-pressed:bg-blue/20!",
                                }}
                            >
                                {distance.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
}
