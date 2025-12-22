import { Event } from "@/types/event";

const generateCoordinates = (
    centerLat: number,
    centerLng: number,
    index: number,
    total: number,
    areaSize: number = 0.03
): [number, number] => {
    const cols = Math.ceil(Math.sqrt(total));
    const rows = Math.ceil(total / cols);

    const col = index % cols;
    const row = Math.floor(index / cols);

    const latSpacing = areaSize / (rows + 1);
    const lngSpacing = areaSize / (cols + 1);

    const variation = (index * 0.1) % 1;
    const randomLat = (variation - 0.5) * latSpacing * 0.3;
    const randomLng = (((variation * 1.7) % 1) - 0.5) * lngSpacing * 0.3;

    const latOffset = (row + 1) * latSpacing - areaSize / 2 + randomLat;
    const lngOffset = (col + 1) * lngSpacing - areaSize / 2 + randomLng;

    return [centerLat + latOffset, centerLng + lngOffset];
};

const generateDate = (daysFromNow: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date;
};


const mockImages = [
    "/images/mockedData/businessPfp.png",
    "/images/mockedData/businessGalleryItem.png",
    "/images/mockedData/eventImageMain.png",
    "/images/mockedData/eventImageSecondary.jpg",
    "/images/mockedData/girl.jpg",
    "/images/mockedData/individualPfp.png",
    "/images/mockedData/businessPfp.png",
    "/images/mockedData/businessGalleryItem.png",
];

const generateGalleryImages = (index: number): string[] => {
    return Array.from({ length: 8 }, (_, i) => {
        const imageIndex = (index * 8 + i) % mockImages.length;
        return mockImages[imageIndex];
    });
};

const categoryOrganizers: Record<string, string> = {
    sports: "user-1",
    art: "user-2",
    food: "user-4",
    work: "user-7",
};

export const mockEvents: Event[] = [
    {
        id: "event-1",
        category: "sports",
        subcategory: "sports-sections",
        languages: ["uk"],
        tags: ["футбол", "спорт"],
        title: "Футбольный матч в парке",
        description:
            "Присоединяйтесь к нам на дружеский футбольный матч в центральном парке. Приветствуются игроки всех уровней! Присоединяйтесь к нам на дружеский футбольный матч в центральном парке. Приветствуются игроки всех уровней! Присоединяйтесь к нам на дружеский футбольный матч в центральном парке. Приветствуются игроки всех уровней!",
        imageUrls: generateGalleryImages(0),
        socialMediaUrls: ["https://facebook.com/event1"],
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 0, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(0),
        startTime: "18:00",
        endDate: generateDate(0),
        endTime: "20:00",
        creatorId: categoryOrganizers.sports,
        attendees: ["user-2", "user-3", "user-5", "user-6"],
        maxAttendees: 20,
        siteLink: "https://example.com/event1",
    },
    {
        id: "event-2",
        category: "art",
        languages: ["ru", "uk"],
        tags: ["концерт", "рок"],
        title: "Рок концерт под открытым небом",
        description:
            "Живая музыка, отличная атмосфера и незабываемые эмоции. Приходите со своими друзьями! Живая музыка, отличная атмосфера и незабываемые эмоции. Приходите со своими друзьями! Живая музыка, отличная атмосфера и незабываемые эмоции. Приходите со своими друзьями!",
        imageUrls: generateGalleryImages(0),
        socialMediaUrls: ["https://instagram.com/event2"],
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 1, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(1),
        startTime: "19:30",
        creatorId: categoryOrganizers.art,
        attendees: ["user-1", "user-3", "user-4", "user-5", "user-6", "user-7"],
        maxAttendees: 100,
        siteLink: "https://example.com/event2",
    },
    {
        id: "event-3",
        category: "art",
        subcategory: "art-galleries",
        languages: ["uk"],
        tags: ["выставка", "живопись"],
        title: "Выставка современного искусства",
        description:
            "Экспозиция работ местных художников. Открытие состоится в пятницу вечером. Экспозиция работ местных художников. Открытие состоится в пятницу вечером. Экспозиция работ местных художников. Открытие состоится в пятницу вечером.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 2, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(2),
        startTime: "17:00",
        endDate: generateDate(17),
        creatorId: categoryOrganizers.art,
        attendees: ["user-1", "user-2", "user-4"],
        maxAttendees: 50,
        isRepetitive: true,
        repeatedTimes: 3,
    },
    {
        id: "event-4",
        category: "food",
        languages: ["uk"],
        tags: ["кулинария", "мастер-класс"],
        title: "Мастер-класс по итальянской кухне",
        description:
            "Учимся готовить настоящую пасту и пиццу. Все ингредиенты включены. Приходите с друзьями! Учимся готовить настоящую пасту и пиццу. Все ингредиенты включены. Приходите с друзьями! Учимся готовить настоящую пасту и пиццу. Все ингредиенты включены. Приходите с друзьями!",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 3, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(3),
        startTime: "18:00",
        endDate: generateDate(3),
        endTime: "21:00",
        creatorId: categoryOrganizers.food,
        attendees: ["user-2", "user-3", "user-5"],
        maxAttendees: 15,
        siteLink: "https://example.com/cooking",
    },
    {
        id: "event-5",
        category: "sports",
        subcategory: "sports-sections",
        languages: ["uk"],
        tags: ["бег", "марафон"],
        title: "Городской марафон",
        description:
            "Ежегодный городской марафон. Дистанции: 5км, 10км, 21км, 42км. Регистрация обязательна. Ежегодный городской марафон. Дистанции: 5км, 10км, 21км, 42км. Регистрация обязательна. Ежегодный городской марафон. Дистанции: 5км, 10км, 21км, 42км. Регистрация обязательна.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 4, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(7),
        startTime: "08:00",
        creatorId: categoryOrganizers.sports,
        attendees: [],
        maxAttendees: 500,
        siteLink: "https://example.com/marathon",
    },
    {
        id: "event-6",
        category: "art",
        languages: ["ru", "uk"],
        tags: ["джаз", "концерт"],
        title: "Джазовый вечер",
        description:
            "Живая джазовая музыка в уютной атмосфере. Выступление местных музыкантов. Живая джазовая музыка в уютной атмосфере. Выступление местных музыкантов. Живая джазовая музыка в уютной атмосфере. Выступление местных музыкантов.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 5, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(4),
        startTime: "20:00",
        endDate: generateDate(4),
        endTime: "23:00",
        creatorId: categoryOrganizers.art,
        attendees: [],
        maxAttendees: 50,
        siteLink: "https://example.com/jazz",
    },
    {
        id: "event-7",
        category: "work",
        subcategory: "courses-trainings",
        languages: ["uk"],
        tags: ["лекция", "наука"],
        title: "Лекция о космосе",
        description:
            "Увлекательная лекция о последних открытиях в астрономии. Для всех возрастов. Увлекательная лекция о последних открытиях в астрономии. Для всех возрастов. Увлекательная лекция о последних открытиях в астрономии. Для всех возрастов.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 6, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(5),
        startTime: "19:00",
        endDate: generateDate(5),
        endTime: "21:00",
        creatorId: categoryOrganizers.work,
        attendees: ["user-1", "user-2", "user-3", "user-4", "user-5"],
        maxAttendees: 100,
        siteLink: "https://example.com/space",
    },
    {
        id: "event-8",
        category: "art",
        subcategory: "theater-studios",
        languages: ["ru"],
        tags: ["театр", "спектакль"],
        title: "Театральная постановка 'Гамлет'",
        description:
            "Классическая постановка Шекспира на современный лад. Английский язык с субтитрами. Классическая постановка Шекспира на современный лад. Английский язык с субтитрами. Классическая постановка Шекспира на современный лад. Английский язык с субтитрами.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 7, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(10),
        startTime: "19:30",
        endDate: generateDate(10),
        endTime: "22:00",
        creatorId: categoryOrganizers.art,
        attendees: [],
        maxAttendees: 200,
        siteLink: "https://example.com/hamlet",
    },
    {
        id: "event-9",
        category: "sports",
        subcategory: "yoga-meditation",
        languages: ["ru"],
        tags: ["йога", "медитация"],
        title: "Йога на рассвете",
        description:
            "Утренняя практика йоги в парке. Встречаем рассвет вместе. Принесите коврик! Утренняя практика йоги в парке. Встречаем рассвет вместе. Принесите коврик! Утренняя практика йоги в парке. Встречаем рассвет вместе. Принесите коврик!",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 9, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(14),
        startTime: "07:00",
        endDate: generateDate(14),
        endTime: "08:30",
        creatorId: categoryOrganizers.sports,
        attendees: [],
        maxAttendees: 30,
        siteLink: "https://example.com/yoga",
    },
    {
        id: "event-10",
        category: "food",
        languages: ["ru"],
        tags: ["дегустация", "вино"],
        title: "Дегустация вин",
        description:
            "Знакомство с винами из разных регионов. Профессиональный сомелье расскажет о каждом сорте. Знакомство с винами из разных регионов. Профессиональный сомелье расскажет о каждом сорте. Знакомство с винами из разных регионов. Профессиональный сомелье расскажет о каждом сорте.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 10, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(6),
        startTime: "18:00",
        endDate: generateDate(6),
        endTime: "21:00",
        creatorId: categoryOrganizers.food,
        attendees: [],
        maxAttendees: 25,
        siteLink: "https://example.com/wine",
    },
    {
        id: "event-11",
        category: "art",
        languages: ["ru"],
        tags: ["танцы", "вечеринка"],
        title: "Сальса вечеринка",
        description:
            "Танцевальная вечеринка в стиле сальса. Урок для начинающих в 20:00, затем свободные танцы. Танцевальная вечеринка в стиле сальса. Урок для начинающих в 20:00, затем свободные танцы. Танцевальная вечеринка в стиле сальса. Урок для начинающих в 20:00, затем свободные танцы.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 11, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(8),
        startTime: "20:00",
        endDate: generateDate(8),
        endTime: "01:00",
        creatorId: categoryOrganizers.art,
        attendees: [],
        maxAttendees: 80,
        siteLink: "https://example.com/salsa",
    },
    {
        id: "event-12",
        category: "work",
        subcategory: "master-classes",
        languages: ["ru"],
        tags: ["воркшоп", "технологии"],
        title: "Воркшоп по программированию",
        description:
            "Практический воркшоп для начинающих программистов. Изучаем основы JavaScript. Практический воркшоп для начинающих программистов. Изучаем основы JavaScript. Практический воркшоп для начинающих программистов. Изучаем основы JavaScript.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 12, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(11),
        startTime: "10:00",
        endDate: generateDate(17),
        endTime: "17:00",
        creatorId: categoryOrganizers.work,
        attendees: [],
        maxAttendees: 20,
        siteLink: "https://example.com/coding",
    },
    {
        id: "event-13",
        category: "art",
        languages: ["ru"],
        tags: ["классика", "концерт"],
        title: "Классический концерт",
        description:
            "Произведения Моцарта и Бетховена в исполнении камерного оркестра. Произведения Моцарта и Бетховена в исполнении камерного оркестра. Произведения Моцарта и Бетховена в исполнении камерного оркестра.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 12, 13) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(16),
        startTime: "19:00",
        endDate: generateDate(16),
        endTime: "21:30",
        creatorId: categoryOrganizers.art,
        attendees: [],
        maxAttendees: 150,
        siteLink: "https://example.com/classical",
    },
    {
        id: "event-14",
        category: "art",
        subcategory: "art-galleries",
        languages: ["ru"],
        tags: ["выставка", "живопись", "современное искусство"],
        title: "Выставка современной живописи",
        description:
            "Экспозиция работ современных художников. Разнообразные стили и техники. Экспозиция работ современных художников. Разнообразные стили и техники. Экспозиция работ современных художников. Разнообразные стили и техники.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 13, 20) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(21),
        startTime: "10:00",
        endDate: generateDate(24),
        creatorId: categoryOrganizers.art,
        attendees: [],
        maxAttendees: 100,
        siteLink: "https://example.com/gallery",
    },
    {
        id: "event-15",
        category: "work",
        subcategory: "courses-trainings",
        languages: ["ru"],
        tags: ["курс", "обучение", "навыки"],
        title: "Курс по цифровому маркетингу",
        description:
            "Практический курс для начинающих маркетологов. Изучаем основы SMM, контент-маркетинга и аналитики. Практический курс для начинающих маркетологов. Изучаем основы SMM, контент-маркетинга и аналитики. Практический курс для начинающих маркетологов. Изучаем основы SMM, контент-маркетинга и аналитики.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 14, 20) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(28),
        startTime: "18:00",
        endDate: generateDate(29),
        endTime: "20:00",
        creatorId: categoryOrganizers.work,
        attendees: [],
        maxAttendees: 30,
        siteLink: "https://example.com/marketing",
    },
    {
        id: "event-16",
        category: "art",
        subcategory: "theater-studios",
        languages: ["ru"],
        tags: ["театр", "спектакль", "драма"],
        title: "Театральная постановка 'Ромео и Джульетта'",
        description:
            "Классическая пьеса Шекспира в современной интерпретации. Многоязычные субтитры. Классическая пьеса Шекспира в современной интерпретации. Многоязычные субтитры. Классическая пьеса Шекспира в современной интерпретации. Многоязычные субтитры.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 15, 20) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(32),
        startTime: "19:00",
        endDate: generateDate(32),
        endTime: "21:30",
        creatorId: categoryOrganizers.art,
        attendees: [],
        maxAttendees: 150,
        siteLink: "https://example.com/romeo",
    },
    {
        id: "event-17",
        category: "work",
        subcategory: "master-classes",
        languages: ["ru"],
        tags: ["мастер-класс", "кулинария", "выпечка"],
        title: "Мастер-класс по выпечке хлеба",
        description:
            "Учимся печь настоящий хлеб на закваске. Все ингредиенты и рецепты включены. Учимся печь настоящий хлеб на закваске. Все ингредиенты и рецепты включены. Учимся печь настоящий хлеб на закваске. Все ингредиенты и рецепты включены.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 16, 20) as [number, number]; })() as [
            number,
            number
        ],
        startDate: generateDate(35),
        startTime: "14:00",
        endDate: generateDate(35),
        endTime: "17:00",
        creatorId: categoryOrganizers.work,
        attendees: [],
        maxAttendees: 12,
        siteLink: "https://example.com/bread",
    },
];
