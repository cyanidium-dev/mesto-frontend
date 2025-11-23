import { Event } from "@/types/event";

// Helper function to generate evenly distributed coordinates across a rectangular area
const generateCoordinates = (
    centerLat: number,
    centerLng: number,
    index: number,
    total: number,
    areaSize: number = 0.03 // Size of the area in degrees (approximately 3km)
): [number, number] => {
    // Calculate grid dimensions for even distribution
    const cols = Math.ceil(Math.sqrt(total));
    const rows = Math.ceil(total / cols);
    
    // Calculate position in grid
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    // Calculate spacing
    const latSpacing = areaSize / (rows + 1);
    const lngSpacing = areaSize / (cols + 1);
    
    // Add some variation to avoid perfect grid (deterministic based on index)
    const variation = (index * 0.1) % 1; // Deterministic variation
    const randomLat = (variation - 0.5) * latSpacing * 0.3;
    const randomLng = ((variation * 1.7) % 1 - 0.5) * lngSpacing * 0.3;
    
    // Calculate offsets from center
    const latOffset = (row + 1) * latSpacing - areaSize / 2 + randomLat;
    const lngOffset = (col + 1) * lngSpacing - areaSize / 2 + randomLng;
    
    return [centerLat + latOffset, centerLng + lngOffset];
};

const centerLat = 50.0755;
const centerLng = 14.4378;

export const mockEvents: Event[] = [
    {
        id: "event-1",
        category: "sport",
        languages: ["ru", "en"],
        tags: ["футбол", "спорт"],
        title: "Футбольный матч в парке",
        description:
            "Присоединяйтесь к нам на дружеский футбольный матч в центральном парке. Приветствуются игроки всех уровней!",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        socialMediaUrls: ["https://facebook.com/event1"],
        location: generateCoordinates(centerLat, centerLng, 0, 13) as [
            number,
            number
        ],
        startDate: new Date(2024, 11, 25),
        startTime: "18:00",
        endDate: new Date(2024, 11, 25),
        endTime: "20:00",
        creatorId: "user-1",
        attendees: [],
        maxAttendees: 20,
        siteLink: "https://example.com/event1",
    },
    {
        id: "event-2",
        category: "music",
        languages: ["ru", "uk"],
        tags: ["концерт", "рок"],
        title: "Рок концерт под открытым небом",
        description:
            "Живая музыка, отличная атмосфера и незабываемые эмоции. Приходите со своими друзьями!",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        socialMediaUrls: ["https://instagram.com/event2"],
        location: generateCoordinates(centerLat, centerLng, 1, 13) as [
            number,
            number
        ],
        startDate: new Date(2024, 11, 28),
        startTime: "19:30",
        creatorId: "user-2",
        attendees: [],
        siteLink: "https://example.com/event2",
    },
    {
        id: "event-3",
        category: "art",
        languages: ["en", "de"],
        tags: ["выставка", "живопись"],
        title: "Выставка современного искусства",
        description:
            "Экспозиция работ местных художников. Открытие состоится в пятницу вечером.",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 2, 13) as [
            number,
            number
        ],
        startDate: new Date(2024, 11, 30),
        startTime: "17:00",
        endDate: new Date(2025, 0, 15),
        creatorId: "user-3",
        attendees: [],
        isRepetitive: true,
        repeatedTimes: 3,
    },
    {
        id: "event-4",
        category: "food",
        languages: ["ru", "en"],
        tags: ["кулинария", "мастер-класс"],
        title: "Мастер-класс по итальянской кухне",
        description:
            "Учимся готовить настоящую пасту и пиццу. Все ингредиенты включены. Приходите с друзьями!",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 3, 13) as [
            number,
            number
        ],
        startDate: new Date(2024, 11, 26),
        startTime: "18:00",
        endDate: new Date(2024, 11, 26),
        endTime: "21:00",
        creatorId: "user-4",
        attendees: [],
        maxAttendees: 15,
        siteLink: "https://example.com/cooking",
    },
    {
        id: "event-5",
        category: "sport",
        languages: ["ru", "en"],
        tags: ["бег", "марафон"],
        title: "Городской марафон",
        description:
            "Ежегодный городской марафон. Дистанции: 5км, 10км, 21км, 42км. Регистрация обязательна.",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 4, 13) as [
            number,
            number
        ],
        startDate: new Date(2025, 0, 10),
        startTime: "08:00",
        creatorId: "user-5",
        attendees: [],
        maxAttendees: 500,
        siteLink: "https://example.com/marathon",
    },
    {
        id: "event-6",
        category: "music",
        languages: ["ru", "en", "uk"],
        tags: ["джаз", "концерт"],
        title: "Джазовый вечер",
        description:
            "Живая джазовая музыка в уютной атмосфере. Выступление местных музыкантов.",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 5, 13) as [
            number,
            number
        ],
        startDate: new Date(2024, 11, 27),
        startTime: "20:00",
        endDate: new Date(2024, 11, 27),
        endTime: "23:00",
        creatorId: "user-6",
        attendees: [],
        maxAttendees: 50,
        siteLink: "https://example.com/jazz",
    },
    {
        id: "event-7",
        category: "education",
        languages: ["ru", "en"],
        tags: ["лекция", "наука"],
        title: "Лекция о космосе",
        description:
            "Увлекательная лекция о последних открытиях в астрономии. Для всех возрастов.",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 6, 13) as [
            number,
            number
        ],
        startDate: new Date(2024, 11, 29),
        startTime: "19:00",
        endDate: new Date(2024, 11, 29),
        endTime: "21:00",
        creatorId: "user-7",
        attendees: [],
        maxAttendees: 100,
        siteLink: "https://example.com/space",
    },
    {
        id: "event-8",
        category: "art",
        languages: ["ru", "en", "de"],
        tags: ["театр", "спектакль"],
        title: "Театральная постановка 'Гамлет'",
        description:
            "Классическая постановка Шекспира на современный лад. Английский язык с субтитрами.",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 7, 13) as [
            number,
            number
        ],
        startDate: new Date(2025, 0, 5),
        startTime: "19:30",
        endDate: new Date(2025, 0, 5),
        endTime: "22:00",
        creatorId: "user-8",
        attendees: [],
        maxAttendees: 200,
        siteLink: "https://example.com/hamlet",
    },
    {
        id: "event-9",
        category: "sport",
        languages: ["ru", "en"],
        tags: ["йога", "медитация"],
        title: "Йога на рассвете",
        description:
            "Утренняя практика йоги в парке. Встречаем рассвет вместе. Принесите коврик!",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 9, 13) as [
            number,
            number
        ],
        startDate: new Date(2025, 0, 1),
        startTime: "07:00",
        endDate: new Date(2025, 0, 1),
        endTime: "08:30",
        creatorId: "user-9",
        attendees: [],
        maxAttendees: 30,
        siteLink: "https://example.com/yoga",
    },
    {
        id: "event-10",
        category: "food",
        languages: ["ru", "en"],
        tags: ["дегустация", "вино"],
        title: "Дегустация вин",
        description:
            "Знакомство с винами из разных регионов. Профессиональный сомелье расскажет о каждом сорте.",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 10, 13) as [
            number,
            number
        ],
        startDate: new Date(2025, 0, 8),
        startTime: "18:00",
        endDate: new Date(2025, 0, 8),
        endTime: "21:00",
        creatorId: "user-10",
        attendees: [],
        maxAttendees: 25,
        siteLink: "https://example.com/wine",
    },
    {
        id: "event-11",
        category: "art",
        languages: ["ru", "en"],
        tags: ["танцы", "вечеринка"],
        title: "Сальса вечеринка",
        description:
            "Танцевальная вечеринка в стиле сальса. Урок для начинающих в 20:00, затем свободные танцы.",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 11, 13) as [
            number,
            number
        ],
        startDate: new Date(2025, 0, 12),
        startTime: "20:00",
        endDate: new Date(2025, 0, 12),
        endTime: "01:00",
        creatorId: "user-11",
        attendees: [],
        maxAttendees: 80,
        siteLink: "https://example.com/salsa",
    },
    {
        id: "event-12",
        category: "education",
        languages: ["ru", "en"],
        tags: ["воркшоп", "технологии"],
        title: "Воркшоп по программированию",
        description:
            "Практический воркшоп для начинающих программистов. Изучаем основы JavaScript.",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 12, 13) as [
            number,
            number
        ],
        startDate: new Date(2025, 0, 15),
        startTime: "10:00",
        endDate: new Date(2025, 0, 15),
        endTime: "17:00",
        creatorId: "user-12",
        attendees: [],
        maxAttendees: 20,
        siteLink: "https://example.com/coding",
    },
    {
        id: "event-13",
        category: "music",
        languages: ["ru", "en", "de"],
        tags: ["классика", "концерт"],
        title: "Классический концерт",
        description:
            "Произведения Моцарта и Бетховена в исполнении камерного оркестра.",
        imageUrls: [
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
            "/images/mockedData/girl.jpg",
        ],
        location: generateCoordinates(centerLat, centerLng, 12, 13) as [
            number,
            number
        ],
        startDate: new Date(2025, 0, 20),
        startTime: "19:00",
        endDate: new Date(2025, 0, 20),
        endTime: "21:30",
        creatorId: "user-13",
        attendees: [],
        maxAttendees: 150,
        siteLink: "https://example.com/classical",
    },
];
