export interface FilterOption {
    key: string;
    label: string;
}

export const LANGUAGES: FilterOption[] = [
    { key: "ru", label: "Русский" },
    { key: "en", label: "English" },
    { key: "uk", label: "Українська" },
    { key: "es", label: "Español" },
    { key: "de", label: "Deutsch" },
    { key: "fr", label: "Français" },
];

export const LANGUAGES_SHORT: FilterOption[] = [
    { key: "ru", label: "Рус" },
    { key: "en", label: "Англ" },
    { key: "uk", label: "Укр" },
    { key: "es", label: "Исп" },
    { key: "de", label: "Нем" },
    { key: "fr", label: "Фран" },
];

import { CATEGORIES as CATEGORIES_WITH_SUB } from "./categories";

export const CATEGORIES: FilterOption[] = CATEGORIES_WITH_SUB.map(cat => ({
    key: cat.key,
    label: cat.label,
}));

export const CITIES: FilterOption[] = [
    { key: "Barcelona", label: "Барселона" },
    { key: "Madrid", label: "Мадрид" },
    { key: "Prague", label: "Прага" },
    { key: "Berlin", label: "Берлин" },
    { key: "Paris", label: "Париж" },
    { key: "London", label: "Лондон" },
    { key: "Amsterdam", label: "Амстердам" },
    { key: "Vienna", label: "Вена" },
    { key: "Rome", label: "Рим" },
    { key: "Lisbon", label: "Лиссабон" },
    { key: "Warsaw", label: "Варшава" },
    { key: "Budapest", label: "Будапешт" },
];

export const DISTANCES: FilterOption[] = [
    { key: "1", label: "1 км" },
    { key: "2", label: "2 км" },
    { key: "5", label: "5 км" },
    { key: "10", label: "10 км" },
    { key: "25", label: "25 км" },
    { key: "50", label: "50 км" },
];
