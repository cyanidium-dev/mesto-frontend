import { Business } from "@/types/business";

// Default Calendly URL for testing
const DEFAULT_CALENDLY_URL = "https://calendly.com/shade09876";

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
    const randomLng = (((variation * 1.7) % 1) - 0.5) * lngSpacing * 0.3;

    // Calculate offsets from center
    const latOffset = (row + 1) * latSpacing - areaSize / 2 + randomLat;
    const lngOffset = (col + 1) * lngSpacing - areaSize / 2 + randomLng;

    return [centerLat + latOffset, centerLng + lngOffset];
};

const centerLat = 50.0755;
const centerLng = 14.4378;

// Available mock images
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

// Helper function to generate 8 gallery images
const generateGalleryImages = (index: number): string[] => {
    return Array.from({ length: 8 }, (_, i) => {
        const imageIndex = (index * 8 + i) % mockImages.length;
        return mockImages[imageIndex];
    });
};

export const mockBusinesses: Business[] = [
    {
        id: "business-1",
        userType: "business",
        title: "Кафе 'Уютное место'",
        description:
            "Уютное кафе с отличным кофе и домашней выпечкой. Работаем ежедневно с 8:00 до 22:00.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 0, 15) as [
            number,
            number
        ],
        category: "food",
        languages: ["ru", "en"],
        tags: ["кафе", "кофе", "выпечка"],
        workingHours: [
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "09:00", end: "23:00" },
            { start: "09:00", end: "23:00" },
        ],
        socialMediaUrls: [
            "https://facebook.com/cafe1",
            "https://instagram.com/cafe1",
        ],
        creatorId: "user-1",
        services: ["кофе", "выпечка", "завтраки", "ланчи"],
        siteLink: "https://cafe.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-2",
        userType: "individual",
        description:
            "Частный репетитор по математике. Индивидуальные занятия для школьников и студентов.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 1, 15) as [
            number,
            number
        ],
        category: "services",
        languages: ["ru", "uk"],
        tags: ["образование", "репетитор", "математика"],
        workingHours: [
            { start: "14:00", end: "20:00" },
            { start: "14:00", end: "20:00" },
            { start: "14:00", end: "20:00" },
            { start: "14:00", end: "20:00" },
            { start: "14:00", end: "20:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://telegram.org/tutor"],
        creatorId: "user-2",
        services: ["математика", "физика", "подготовка к экзаменам"],
    },
    {
        id: "business-3",
        userType: "business",
        title: "Спортивный клуб 'Фитнес'",
        description:
            "Современный фитнес-клуб с профессиональным оборудованием и опытными тренерами.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 2, 15) as [
            number,
            number
        ],
        category: "sport",
        languages: ["ru", "en", "de"],
        tags: ["фитнес", "спорт", "тренировки"],
        workingHours: [
            { start: "06:00", end: "23:00" },
            { start: "06:00", end: "23:00" },
            { start: "06:00", end: "23:00" },
            { start: "06:00", end: "23:00" },
            { start: "06:00", end: "23:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
        ],
        socialMediaUrls: [
            "https://facebook.com/fitness",
            "https://instagram.com/fitness",
        ],
        creatorId: "user-3",
        services: [
            "тренажерный зал",
            "йога",
            "пилатес",
            "персональные тренировки",
        ],
        siteLink: "https://fitness.example.com",
    },
    {
        id: "business-4",
        userType: "business",
        title: "Ресторан 'Итальянская кухня'",
        description:
            "Аутентичная итальянская кухня в центре города. Свежие пасты, пицца из дровяной печи и отличное вино.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 3, 15) as [
            number,
            number
        ],
        category: "food",
        languages: ["ru", "en", "it"],
        tags: ["ресторан", "итальянская кухня", "паста", "пицца"],
        workingHours: [
            { start: "12:00", end: "23:00" },
            { start: "12:00", end: "23:00" },
            { start: "12:00", end: "23:00" },
            { start: "12:00", end: "23:00" },
            { start: "12:00", end: "00:00" },
            { start: "12:00", end: "00:00" },
            { start: "12:00", end: "23:00" },
        ],
        socialMediaUrls: [
            "https://facebook.com/italian",
            "https://instagram.com/italian",
        ],
        creatorId: "user-4",
        services: ["обед", "ужин", "банкеты", "доставка"],
        siteLink: "https://italian.example.com",
    },
    {
        id: "business-5",
        userType: "business",
        title: "Салон красоты 'Элегант'",
        description:
            "Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, макияж.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 4, 15) as [
            number,
            number
        ],
        category: "beauty",
        languages: ["ru", "en", "uk"],
        tags: ["салон", "красота", "стрижка", "маникюр"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/elegant"],
        creatorId: "user-5",
        services: ["стрижка", "окрашивание", "маникюр", "педикюр", "макияж"],
        siteLink: "https://elegant.example.com",
    },
    {
        id: "business-6",
        userType: "business",
        title: "Книжный магазин 'Читай-город'",
        description:
            "Большой выбор книг на разных языках. Художественная литература, научные издания, детские книги.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 5, 15) as [
            number,
            number
        ],
        category: "education",
        languages: ["ru", "en", "de", "uk"],
        tags: ["книги", "литература", "образование"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://facebook.com/books"],
        creatorId: "user-6",
        services: ["книги", "заказ книг", "подарочные сертификаты"],
        siteLink: "https://books.example.com",
    },
    {
        id: "business-7",
        userType: "business",
        title: "Ветеринарная клиника 'Друг'",
        description:
            "Профессиональная ветеринарная помощь. Консультации, вакцинация, хирургия, стоматология для животных.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 6, 15) as [
            number,
            number
        ],
        category: "services",
        languages: ["ru", "en"],
        tags: ["ветеринар", "животные", "здоровье"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: [
            "https://facebook.com/vet",
            "https://instagram.com/vet",
        ],
        creatorId: "user-7",
        services: [
            "консультации",
            "вакцинация",
            "хирургия",
            "стоматология",
            "стационар",
        ],
        siteLink: "https://vet.example.com",
    },
    {
        id: "business-8",
        userType: "business",
        title: "Магазин электроники 'Техно'",
        description:
            "Широкий ассортимент электроники: смартфоны, ноутбуки, планшеты, аксессуары. Гарантия и сервис.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 7, 15) as [
            number,
            number
        ],
        category: "technology",
        languages: ["ru", "en", "de"],
        tags: ["электроника", "техника", "смартфоны"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "11:00", end: "19:00" },
        ],
        socialMediaUrls: [
            "https://facebook.com/tech",
            "https://instagram.com/tech",
        ],
        creatorId: "user-8",
        services: ["продажа", "ремонт", "гарантия", "консультации"],
        siteLink: "https://tech.example.com",
    },
    {
        id: "business-9",
        userType: "business",
        title: "Йога-студия 'Гармония'",
        description:
            "Занятия йогой для всех уровней. Хатха, виньяса, аштанга. Утренние и вечерние группы.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 8, 15) as [
            number,
            number
        ],
        category: "sport",
        languages: ["ru", "en"],
        tags: ["йога", "медитация", "здоровье"],
        workingHours: [
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://instagram.com/yoga"],
        creatorId: "user-9",
        services: [
            "групповые занятия",
            "индивидуальные занятия",
            "медитация",
            "ретриты",
        ],
        siteLink: "https://yoga.example.com",
    },
    {
        id: "business-10",
        userType: "business",
        title: "Пиццерия 'Мама Миа'",
        description:
            "Настоящая итальянская пицца, приготовленная в дровяной печи. Свежие ингредиенты и быстрая доставка.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 9, 15) as [
            number,
            number
        ],
        category: "food",
        languages: ["ru", "en", "it"],
        tags: ["пицца", "итальянская кухня", "доставка"],
        workingHours: [
            { start: "11:00", end: "23:00" },
            { start: "11:00", end: "23:00" },
            { start: "11:00", end: "23:00" },
            { start: "11:00", end: "23:00" },
            { start: "11:00", end: "00:00" },
            { start: "11:00", end: "00:00" },
            { start: "12:00", end: "23:00" },
        ],
        socialMediaUrls: [
            "https://facebook.com/pizza",
            "https://instagram.com/pizza",
        ],
        creatorId: "user-10",
        services: ["пицца", "паста", "салаты", "доставка", "самовывоз"],
        siteLink: "https://pizza.example.com",
    },
    {
        id: "business-11",
        userType: "business",
        title: "Студия танцев 'Ритм'",
        description:
            "Обучение различным стилям танцев: латина, сальса, бачата, хип-хоп, современные танцы.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 10, 15) as [
            number,
            number
        ],
        category: "art",
        languages: ["ru", "en"],
        tags: ["танцы", "латина", "сальса"],
        workingHours: [
            { start: "16:00", end: "22:00" },
            { start: "16:00", end: "22:00" },
            { start: "16:00", end: "22:00" },
            { start: "16:00", end: "22:00" },
            { start: "16:00", end: "22:00" },
            { start: "14:00", end: "20:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/dance"],
        creatorId: "user-11",
        services: [
            "групповые занятия",
            "индивидуальные уроки",
            "мастер-классы",
            "вечеринки",
        ],
        siteLink: "https://dance.example.com",
    },
    {
        id: "business-12",
        userType: "business",
        title: "Кофейня 'Аромат'",
        description:
            "Специализированная кофейня с обжаркой собственного производства. Эспрессо, капучино, альтернативные методы заваривания.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 11, 15) as [
            number,
            number
        ],
        category: "food",
        languages: ["ru", "en", "de"],
        tags: ["кофе", "кофейня", "обжарка"],
        workingHours: [
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "21:00" },
            { start: "08:00", end: "21:00" },
            { start: "09:00", end: "19:00" },
        ],
        socialMediaUrls: [
            "https://facebook.com/coffee",
            "https://instagram.com/coffee",
        ],
        creatorId: "user-12",
        services: ["кофе навынос", "обжарка", "мастер-классы", "десерты"],
        siteLink: "https://coffee.example.com",
    },
    {
        id: "business-13",
        userType: "business",
        title: "Фотостудия 'Момент'",
        description:
            "Профессиональная фотосъемка: портреты, свадьбы, корпоративы, семейные фотосессии. Студия и выездная съемка.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 12, 15) as [
            number,
            number
        ],
        category: "art",
        languages: ["ru", "en"],
        tags: ["фото", "фотосъемка", "портреты"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "18:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/photo"],
        creatorId: "user-13",
        services: [
            "портреты",
            "свадьбы",
            "корпоративы",
            "семейные фотосессии",
            "обработка",
        ],
        siteLink: "https://photo.example.com",
    },
    // Individual businesses for user-1
    {
        id: "business-individual-1",
        userType: "individual",
        description:
            "Профессиональный фотограф. Специализируюсь на портретной и свадебной фотографии. Более 5 лет опыта.",
        imageUrls: generateGalleryImages(13),
        location: generateCoordinates(centerLat, centerLng, 13, 15) as [
            number,
            number
        ],
        category: "art",
        languages: ["ru", "en"],
        tags: ["фотограф", "портреты", "свадьбы"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
            null,
        ],
        socialMediaUrls: [
            "https://instagram.com/photographer1",
            "https://facebook.com/photographer1",
        ],
        creatorId: "user-1",
        services: ["портреты", "свадьбы", "семейные фотосессии"],
    },
    {
        id: "business-individual-2",
        userType: "individual",
        description:
            "Частный преподаватель английского языка. Индивидуальные и групповые занятия. Подготовка к экзаменам IELTS, TOEFL.",
        imageUrls: generateGalleryImages(14),
        location: generateCoordinates(centerLat, centerLng, 14, 15) as [
            number,
            number
        ],
        category: "education",
        languages: ["ru", "en"],
        tags: ["английский", "репетитор", "образование"],
        workingHours: [
            { start: "14:00", end: "21:00" },
            { start: "14:00", end: "21:00" },
            { start: "14:00", end: "21:00" },
            { start: "14:00", end: "21:00" },
            { start: "14:00", end: "21:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: [
            "https://telegram.org/englishteacher",
            "https://instagram.com/englishteacher",
        ],
        creatorId: "user-1",
        services: [
            "английский язык",
            "подготовка к экзаменам",
            "разговорная практика",
        ],
    },
].map(business => ({
    ...business,
    calendlyUrl: business.calendlyUrl || DEFAULT_CALENDLY_URL,
})) as Business[];
