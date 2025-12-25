"use client";

import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Selection } from "@react-types/shared";
import { Input, Select, SelectItem, Switch } from "@heroui/react";
import TabMenu from "./TabMenu";
import DandruffIcon from "../shared/icons/DandruffIcon";
import { LANGUAGES_SHORT, CITIES, CATEGORIES } from "@/constants/filters";

export interface FilterValues {
    search: string;
    languages: string[];
    cities: string[];
    categories: string[];
    openNow: boolean;
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
    const [openNowValue, setOpenNowValue] = useState(false);

    // Drag scroll state
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    const handleCategoryChange = (keys: Selection) => {
        const keysSet =
            keys instanceof Set ? keys : new Set(keys === "all" ? [] : [keys]);
        const currentSet =
            categoryValue instanceof Set
                ? categoryValue
                : new Set(categoryValue === "all" ? [] : [categoryValue]);

        if (currentSet.size > 0 && keysSet.size > 0) {
            const currentKey = Array.from(currentSet)[0];
            const newKey = Array.from(keysSet)[0];
            if (currentKey === newKey) {
                setTimeout(() => {
                    setCategoryValue(new Set([]));
                }, 150);
                return;
            }
        }
        setCategoryValue(keys);
    };

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
                openNow: openNowValue,
            };
            onFiltersChange(filters);
        }
    }, [
        searchValue,
        langValue,
        cityValue,
        categoryValue,
        openNowValue,
        onFiltersChange,
    ]);

    // Mouse drag handlers for filters bar
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // Don't start drag if clicking on interactive elements
        const target = e.target as HTMLElement;
        if (
            target.closest("button") ||
            target.closest("[role='button']") ||
            target.closest("select") ||
            target.closest("[data-slot='trigger']") ||
            target.closest("[data-slot='base']")
        ) {
            return;
        }

        if (!scrollContainerRef.current) return;
        isDraggingRef.current = true;
        startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
        scrollContainerRef.current.style.cursor = "grabbing";
        scrollContainerRef.current.style.userSelect = "none";
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startXRef.current) * 2; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseUp = () => {
        if (!scrollContainerRef.current) return;
        isDraggingRef.current = false;
        scrollContainerRef.current.style.cursor = "grab";
        scrollContainerRef.current.style.userSelect = "";
    };

    const handleMouseLeave = () => {
        if (!scrollContainerRef.current) return;
        isDraggingRef.current = false;
        scrollContainerRef.current.style.cursor = "grab";
        scrollContainerRef.current.style.userSelect = "";
    };

    return (
        <div className="fixed z-50 top-2 left-0 w-full max-w-[440px]">
            <div className="w-full px-4">
                {" "}
                <div className="flex gap-3 justify-between items-center mb-2">
                    <Input
                        aria-label="search input"
                        radius="full"
                        placeholder="Найти"
                        startContent={<DandruffIcon className="mr-1" />}
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
                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto scrollbar-hide -mx-4 px-4 cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex items-center gap-2 min-w-max pb-1">
                        <Select
                            radius="full"
                            size="sm"
                            placeholder="Язык"
                            aria-label="select input"
                            selectedKeys={langValue}
                            onSelectionChange={setLangValue}
                            classNames={{
                                base: "w-fit flex-shrink-0",
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
                                base: "w-fit flex-shrink-0",
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
                            onSelectionChange={handleCategoryChange}
                            disallowEmptySelection={false}
                            selectionMode="single"
                            classNames={{
                                base: "w-fit flex-shrink-0",
                                mainWrapper: "w-fit",
                                trigger: `px-2 h-8 min-h-8 w-fit pr-5 min-w-[97px] ${
                                    viewMode === "map"
                                        ? "bg-white"
                                        : "bg-gray-ultra-light"
                                }`,
                                innerWrapper: "w-fit pr-2",
                                value: "text-[12px]",
                                popoverContent:
                                    "min-w-[180px] max-w-[calc(100vw-2rem)]",
                                selectorIcon: "end-1.5",
                            }}
                            popoverProps={{
                                placement: "bottom-start",
                                classNames: {
                                    content:
                                        "min-w-[180px] max-w-[calc(100vw-2rem)]",
                                },
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
                        <div
                            className={`flex items-center gap-2 px-2 h-8 min-h-8 rounded-full flex-shrink-0 ${
                                viewMode === "map"
                                    ? "bg-white"
                                    : "bg-gray-ultra-light"
                            }`}
                        >
                            <Switch
                                size="sm"
                                isSelected={openNowValue}
                                onValueChange={setOpenNowValue}
                                classNames={{
                                    base: "max-w-fit",
                                    wrapper: "p-0 h-4 w-8",
                                    thumb: "w-3 h-3",
                                }}
                            />
                            <span className="text-[12px] text-gray-700 whitespace-nowrap">
                                Открыто сейчас
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
