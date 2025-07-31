"use client";

import { useMemo } from "react";
import { useLocationStore } from "@/store/locationStore";
import { Business } from "@/types/business";

const generateFakeBusinesses = (lat: number, lng: number): Business[] => {
  const names = [
    {
      name: "Мастер маникюра Елена",
      desc: "Делаю маникюр и педикюр с выездом на дом",
    },
    {
      name: "Ремонт авто Александр",
      desc: "Автослесарь с 10-летним стажем, ремонт у вас во дворе",
    },
    {
      name: "Парикмахер Наталья",
      desc: "Стрижки, окрашивания, прически — выезд и дома",
    },
    { name: "Веломастер Игорь", desc: "Ремонт и настройка велосипедов" },
    {
      name: "Фотоуслуги Анна",
      desc: "Портреты, love-story, мероприятия — фото с душой",
    },
    { name: "Повар на заказ Виктория", desc: "Готовлю дома и на мероприятиях" },
    { name: "Репетитор английского Марина", desc: "Онлайн и офлайн занятия" },
    {
      name: "Тату-мастер Артём",
      desc: "Минимализм, лайнворк, реализм — на дому",
    },
    { name: "Грумер Антон", desc: "Стрижка и уход за собаками и кошками" },
    { name: "Сантехник Сергей", desc: "Чиню быстро и качественно" },
  ];

  return Array.from({ length: 20 }, (_, i) => {
    const latOffset = (Math.random() - 0.5) * 0.01;
    const lngOffset = (Math.random() - 0.5) * 0.01;
    const base = names[i % names.length];

    return {
      id: `business-${i + 1}`,
      title: base.name,
      description: base.desc,
      position: [lat + latOffset, lng + lngOffset] as [number, number],
      imageUrl: `/images/mockedData/girl.jpg`, // кастомізований пошук
    };
  });
};

export const useNearbyBusinesses = (): Business[] => {
  const userLocation = useLocationStore((s) => s.userLocation);

  const businesses = useMemo(() => {
    if (!userLocation) return [];
    const [lat, lng] = userLocation;
    return generateFakeBusinesses(lat, lng);
  }, [userLocation?.[0], userLocation?.[1]]); // ключове — лише коли координати справді змінились

  return businesses;
};
