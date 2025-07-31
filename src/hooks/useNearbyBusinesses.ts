import { useLocationStore } from "@/store/locationStore";

export interface BusinessItem {
  id: string;
  title: string;
  description: string;
  position: [number, number];
  imageUrl: string;
}

export const useNearbyBusinesses = (): BusinessItem[] => {
  const userLocation = useLocationStore((state) => state.userLocation);

  if (!userLocation) return [];

  const [lat, lng] = userLocation;

  const businesses: Omit<BusinessItem, "position">[] = [
    {
      id: "place-1",
      title: "Мастер маникюра Елена",
      description: "Профессиональный маникюр и педикюр в уютной студии.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-2",
      title: "Ремонт авто – Александр",
      description: "Быстрый и качественный ремонт автомобилей любой сложности.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-3",
      title: "Парикмахерская Натальи",
      description: "Стрижки, окрашивание и укладки по доступным ценам.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-4",
      title: 'Кофейня "Уют"',
      description: "Ароматный кофе и свежая выпечка каждый день.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-5",
      title: "Фотограф Ирина",
      description: "Портретные и семейные фотосессии в студии и на природе.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-6",
      title: 'Йога-студия "Баланс"',
      description: "Групповые и индивидуальные занятия по йоге и пилатесу.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-7",
      title: "Курс английского языка",
      description: "Эффективное обучение английскому для взрослых и детей.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-8",
      title: 'Пекарня "Сдобушка"',
      description: "Свежий хлеб и сладости, приготовленные с любовью.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-9",
      title: "Сервис по ремонту телефонов",
      description: "Ремонт смартфонов любых брендов в течение 1 дня.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-10",
      title: "Флористика Анны",
      description: "Оригинальные букеты и оформление мероприятий цветами.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-11",
      title: "Тату-мастер Алексей",
      description: "Индивидуальные эскизы и качественная работа.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-12",
      title: "Репетитор по математике",
      description: "Подготовка к экзаменам и помощь с домашними заданиями.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-13",
      title: "Массажист Виктор",
      description: "Расслабляющий и лечебный массаж в центре города.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-14",
      title: "Художественная школа",
      description: "Занятия по рисованию для детей и взрослых.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-15",
      title: "Фитнес-тренер Марина",
      description: "Персональные тренировки и составление программ питания.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-16",
      title: "Ремонт обуви Иван",
      description: "Быстро и качественно починим вашу любимую пару.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-17",
      title: "Копирайтер Лена",
      description: "Тексты, которые продают – от описаний до статей.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-18",
      title: "Студия звукозаписи",
      description: "Запись вокала и инструментов в профессиональных условиях.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-19",
      title: "Мастер по укладке плитки",
      description: "Ремонт ванных комнат и кухонь под ключ.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
    {
      id: "place-20",
      title: "Груминг-салон для собак",
      description: "Стрижки, мытье и уход за питомцами.",
      imageUrl: "/images/mockedData/girl.jpg",
    },
  ];

  return businesses.map((b, i) => {
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;

    return {
      ...b,
      position: [lat + latOffset, lng + lngOffset] as [number, number],
    };
  });
};
