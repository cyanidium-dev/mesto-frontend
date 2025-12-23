import { Business } from "@/types/business";

const DEFAULT_CALENDLY_URL = "https://calendly.com/shade09876";

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

const centerLat = 50.0755;
const centerLng = 14.4378;

const CITY_CENTERS: Array<[number, number]> = [
    [50.0755, 14.4378], // Prague
    [52.52, 13.405], // Berlin
    [48.8566, 2.3522], // Paris
    [51.5074, -0.1278], // London
    [52.3676, 4.9041], // Amsterdam
    [48.2082, 16.3738], // Vienna
    [41.3851, 2.1734], // Barcelona
    [40.4168, -3.7038], // Madrid
];

const getCityCenter = (index: number): [number, number] => {
    return CITY_CENTERS[index % CITY_CENTERS.length];
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

export const mockBusinesses: Business[] = [
    {
        id: "business-1",
        userType: "business",
        title: "Кафе 'Уютное место'",
        description:
            "Уютное кафе с отличным кофе и домашней выпечкой. Работаем ежедневно с 8:00 до 22:00. Уютное кафе с отличным кофе и домашней выпечкой. Работаем ежедневно с 8:00 до 22:00. Уютное кафе с отличным кофе и домашней выпечкой. Работаем ежедневно с 8:00 до 22:00.",
        imageUrls: generateGalleryImages(0),
        location: (() => {
            const [lat, lng] = getCityCenter(0);
            return generateCoordinates(lat, lng, 0, 15) as [number, number];
        })(),
        category: "food",
        subcategory: "cafes",
        languages: ["uk"],
        tags: ["кафе", "кофе", "выпечка"],
        workingHours: [
            { start: "07:00", end: "20:00" }, // Sunday - early morning
            { start: "07:00", end: "20:00" }, // Monday
            { start: "07:00", end: "20:00" }, // Tuesday
            { start: "07:00", end: "20:00" }, // Wednesday
            { start: "07:00", end: "21:00" }, // Thursday
            { start: "08:00", end: "22:00" }, // Friday - later start
            { start: "08:00", end: "22:00" }, // Saturday
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
        title: "Репетитор по математике",
        description:
            "Частный репетитор по математике. Индивидуальные занятия для школьников и студентов. Частный репетитор по математике. Индивидуальные занятия для школьников и студентов. Частный репетитор по математике. Индивидуальные занятия для школьников и студентов.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 1, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "tutors",
        languages: ["ru", "uk"],
        tags: ["образование", "репетитор", "математика"],
        workingHours: [
            null, // Sunday - closed
            { start: "15:00", end: "21:00" }, // Monday - afternoon start
            { start: "15:00", end: "21:00" }, // Tuesday
            { start: "15:00", end: "21:00" }, // Wednesday
            { start: "15:00", end: "21:00" }, // Thursday
            { start: "14:00", end: "20:00" }, // Friday - earlier
            null, // Saturday - closed
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
            "Современный фитнес-клуб с профессиональным оборудованием и опытными тренерами. Современный фитнес-клуб с профессиональным оборудованием и опытными тренерами. Современный фитнес-клуб с профессиональным оборудованием и опытными тренерами.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 2, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "gyms",
        languages: ["uk"],
        tags: ["фитнес", "спорт", "тренировки"],
        workingHours: [
            { start: "05:00", end: "23:00" }, // Sunday - very early
            { start: "05:00", end: "23:00" }, // Monday
            { start: "05:00", end: "23:00" }, // Tuesday
            { start: "05:00", end: "23:00" }, // Wednesday
            { start: "05:00", end: "23:00" }, // Thursday
            { start: "06:00", end: "22:00" }, // Friday
            { start: "07:00", end: "21:00" }, // Saturday - later start
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
            "Аутентичная итальянская кухня в центре города. Свежие пасты, пицца из дровяной печи и отличное вино. Аутентичная итальянская кухня в центре города. Свежие пасты, пицца из дровяной печи и отличное вино. Аутентичная итальянская кухня в центре города. Свежие пасты, пицца из дровяной печи и отличное вино.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 3, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "restaurants",
        languages: ["uk"],
        tags: ["ресторан", "итальянская кухня", "паста", "пицца"],
        workingHours: [
            { start: "11:30", end: "23:30" }, // Sunday - lunch to late
            { start: "11:30", end: "23:30" }, // Monday
            { start: "11:30", end: "23:30" }, // Tuesday
            { start: "11:30", end: "23:30" }, // Wednesday
            { start: "11:30", end: "00:30" }, // Thursday - late night
            { start: "11:30", end: "01:00" }, // Friday - very late
            { start: "12:00", end: "00:00" }, // Saturday
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
            "Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, макияж. Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, макияж. Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, макияж.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 4, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "beauty-salon",
        languages: ["ru", "uk"],
        tags: ["салон", "красота", "стрижка", "маникюр"],
        workingHours: [
            null, // Sunday - closed
            { start: "09:00", end: "19:00" }, // Monday - standard
            { start: "09:00", end: "19:00" }, // Tuesday
            { start: "09:00", end: "19:00" }, // Wednesday
            { start: "09:00", end: "20:00" }, // Thursday
            { start: "09:00", end: "20:00" }, // Friday
            { start: "10:00", end: "18:00" }, // Saturday - shorter
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
            "Большой выбор книг на разных языках. Художественная литература, научные издания, детские книги. Большой выбор книг на разных языках. Художественная литература, научные издания, детские книги. Большой выбор книг на разных языках. Художественная литература, научные издания, детские книги.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 5, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "hobby-creative",
        languages: ["ru", "uk"],
        tags: ["книги", "литература", "образование"],
        workingHours: [
            { start: "10:00", end: "18:00" }, // Sunday - shorter
            { start: "10:00", end: "20:00" }, // Monday
            { start: "10:00", end: "20:00" }, // Tuesday
            { start: "10:00", end: "20:00" }, // Wednesday
            { start: "10:00", end: "20:00" }, // Thursday
            { start: "10:00", end: "20:00" }, // Friday
            { start: "11:00", end: "19:00" }, // Saturday
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
            "Профессиональная ветеринарная помощь. Консультации, вакцинация, хирургия, стоматология для животных. Профессиональная ветеринарная помощь. Консультации, вакцинация, хирургия, стоматология для животных. Профессиональная ветеринарная помощь. Консультации, вакцинация, хирургия, стоматология для животных.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 6, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "veterinary",
        languages: ["uk"],
        tags: ["ветеринар", "животные", "здоровье"],
        workingHours: [
            { start: "09:00", end: "17:00" }, // Sunday - shorter
            { start: "08:00", end: "20:00" }, // Monday
            { start: "08:00", end: "20:00" }, // Tuesday
            { start: "08:00", end: "20:00" }, // Wednesday
            { start: "08:00", end: "20:00" }, // Thursday
            { start: "08:00", end: "19:00" }, // Friday
            { start: "10:00", end: "16:00" }, // Saturday - very short
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
            "Широкий ассортимент электроники: смартфоны, ноутбуки, планшеты, аксессуары. Гарантия и сервис. Широкий ассортимент электроники: смартфоны, ноутбуки, планшеты, аксессуары. Гарантия и сервис. Широкий ассортимент электроники: смартфоны, ноутбуки, планшеты, аксессуары. Гарантия и сервис.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 7, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "electronics",
        languages: ["uk"],
        tags: ["электроника", "техника", "смартфоны"],
        workingHours: [
            { start: "11:00", end: "19:00" }, // Sunday - later start
            { start: "10:00", end: "20:00" }, // Monday
            { start: "10:00", end: "20:00" }, // Tuesday
            { start: "10:00", end: "20:00" }, // Wednesday
            { start: "10:00", end: "21:00" }, // Thursday - later close
            { start: "10:00", end: "21:00" }, // Friday
            { start: "11:00", end: "19:00" }, // Saturday
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
            "Занятия йогой для всех уровней. Хатха, виньяса, аштанга. Утренние и вечерние группы. Занятия йогой для всех уровней. Хатха, виньяса, аштанга. Утренние и вечерние группы. Занятия йогой для всех уровней. Хатха, виньяса, аштанга. Утренние и вечерние группы.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 8, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "yoga-meditation",
        languages: ["uk"],
        tags: ["йога", "медитация", "здоровье"],
        workingHours: [
            { start: "08:00", end: "20:00" }, // Sunday - morning classes
            { start: "06:30", end: "21:00" }, // Monday - early morning
            { start: "06:30", end: "21:00" }, // Tuesday
            { start: "06:30", end: "21:00" }, // Wednesday
            { start: "06:30", end: "21:00" }, // Thursday
            { start: "08:00", end: "19:00" }, // Friday
            { start: "09:00", end: "18:00" }, // Saturday
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
            "Настоящая итальянская пицца, приготовленная в дровяной печи. Свежие ингредиенты и быстрая доставка. Настоящая итальянская пицца, приготовленная в дровяной печи. Свежие ингредиенты и быстрая доставка. Настоящая итальянская пицца, приготовленная в дровяной печи. Свежие ингредиенты и быстрая доставка.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 9, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "fast-food",
        languages: ["uk"],
        tags: ["пицца", "итальянская кухня", "доставка"],
        workingHours: [
            { start: "12:00", end: "23:00" }, // Sunday
            { start: "11:00", end: "23:00" }, // Monday
            { start: "11:00", end: "23:00" }, // Tuesday
            { start: "11:00", end: "23:00" }, // Wednesday
            { start: "11:00", end: "00:30" }, // Thursday - late
            { start: "11:00", end: "01:00" }, // Friday - very late
            { start: "12:00", end: "00:00" }, // Saturday
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
            "Обучение различным стилям танцев: латина, сальса, бачата, хип-хоп, современные танцы. Обучение различным стилям танцев: латина, сальса, бачата, хип-хоп, современные танцы. Обучение различным стилям танцев: латина, сальса, бачата, хип-хоп, современные танцы.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 10, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "art",
        languages: ["uk"],
        tags: ["танцы", "латина", "сальса"],
        workingHours: [
            null, // Sunday - closed
            { start: "17:00", end: "22:00" }, // Monday - evening
            { start: "17:00", end: "22:00" }, // Tuesday
            { start: "17:00", end: "22:00" }, // Wednesday
            { start: "17:00", end: "22:00" }, // Thursday
            { start: "16:00", end: "23:00" }, // Friday - longer
            { start: "14:00", end: "21:00" }, // Saturday - earlier start
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
            "Специализированная кофейня с обжаркой собственного производства. Эспрессо, капучино, альтернативные методы заваривания. Специализированная кофейня с обжаркой собственного производства. Эспрессо, капучино, альтернативные методы заваривания. Специализированная кофейня с обжаркой собственного производства. Эспрессо, капучино, альтернативные методы заваривания.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 11, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "cafes",
        languages: ["uk"],
        tags: ["кофе", "кофейня", "обжарка"],
        workingHours: [
            { start: "08:00", end: "19:00" }, // Sunday
            { start: "06:30", end: "20:00" }, // Monday - early morning
            { start: "06:30", end: "20:00" }, // Tuesday
            { start: "06:30", end: "20:00" }, // Wednesday
            { start: "06:30", end: "21:00" }, // Thursday
            { start: "07:00", end: "22:00" }, // Friday
            { start: "08:00", end: "20:00" }, // Saturday
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
            "Профессиональная фотосъемка: портреты, свадьбы, корпоративы, семейные фотосессии. Студия и выездная съемка. Профессиональная фотосъемка: портреты, свадьбы, корпоративы, семейные фотосессии. Студия и выездная съемка. Профессиональная фотосъемка: портреты, свадьбы, корпоративы, семейные фотосессии. Студия и выездная съемка.",
        imageUrls: generateGalleryImages(0),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 12, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "art",
        subcategory: "photography-video",
        languages: ["uk"],
        tags: ["фото", "фотосъемка", "портреты"],
        workingHours: [
            { start: "11:00", end: "18:00" }, // Sunday - shorter
            { start: "09:00", end: "20:00" }, // Monday
            { start: "09:00", end: "20:00" }, // Tuesday
            { start: "09:00", end: "20:00" }, // Wednesday
            { start: "09:00", end: "20:00" }, // Thursday
            { start: "09:00", end: "19:00" }, // Friday
            null, // Saturday - closed
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
    {
        id: "business-individual-1",
        userType: "individual",
        title: "Профессиональный фотограф",
        description:
            "Профессиональный фотограф. Специализируюсь на портретной и свадебной фотографии. Более 5 лет опыта. Профессиональный фотограф. Специализируюсь на портретной и свадебной фотографии. Более 5 лет опыта. Профессиональный фотограф. Специализируюсь на портретной и свадебной фотографии. Более 5 лет опыта.",
        imageUrls: generateGalleryImages(13),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 13, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "art",
        subcategory: "photography-video",
        languages: ["uk"],
        tags: ["фотограф", "портреты", "свадьбы"],
        workingHours: [
            { start: "12:00", end: "18:00" }, // Sunday - afternoon only
            { start: "10:00", end: "19:00" }, // Monday
            { start: "10:00", end: "19:00" }, // Tuesday
            { start: "10:00", end: "19:00" }, // Wednesday
            { start: "10:00", end: "19:00" }, // Thursday
            { start: "10:00", end: "18:00" }, // Friday
            null, // Saturday - closed
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
        title: "Преподаватель английского языка",
        description:
            "Частный преподаватель английского языка. Индивидуальные и групповые занятия. Подготовка к экзаменам IELTS, TOEFL. Частный преподаватель английского языка. Индивидуальные и групповые занятия. Подготовка к экзаменам IELTS, TOEFL. Частный преподаватель английского языка. Индивидуальные и групповые занятия. Подготовка к экзаменам IELTS, TOEFL.",
        imageUrls: generateGalleryImages(14),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 14, 15) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "tutors",
        languages: ["uk"],
        tags: ["английский", "репетитор", "образование"],
        workingHours: [
            { start: "13:00", end: "20:00" }, // Sunday - afternoon/evening
            { start: "15:00", end: "21:00" }, // Monday - later start
            { start: "15:00", end: "21:00" }, // Tuesday
            { start: "15:00", end: "21:00" }, // Wednesday
            { start: "15:00", end: "21:00" }, // Thursday
            { start: "10:00", end: "17:00" }, // Friday - earlier
            null, // Saturday - closed
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
    {
        id: "business-15",
        userType: "business",
        title: "Барбершоп 'Классик'",
        description:
            "Мужская парикмахерская и барбершоп. Классические и современные стрижки, бритье, укладка бороды. Мужская парикмахерская и барбершоп. Классические и современные стрижки, бритье, укладка бороды. Мужская парикмахерская и барбершоп. Классические и современные стрижки, бритье, укладка бороды.",
        imageUrls: generateGalleryImages(15),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 15, 20) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "barbershop",
        languages: ["ru", "uk"],
        tags: ["барбершоп", "стрижка", "бритье"],
        workingHours: [
            null, // Sunday - closed
            { start: "08:30", end: "19:30" }, // Monday - slightly earlier
            { start: "08:30", end: "19:30" }, // Tuesday
            { start: "08:30", end: "19:30" }, // Wednesday
            { start: "08:30", end: "20:30" }, // Thursday
            { start: "09:00", end: "21:00" }, // Friday
            { start: "09:00", end: "20:00" }, // Saturday
        ],
        socialMediaUrls: [
            "https://instagram.com/barbershop",
            "https://facebook.com/barbershop",
        ],
        creatorId: "user-14",
        services: ["стрижка", "бритье", "укладка бороды", "массаж головы"],
        siteLink: "https://barbershop.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-16",
        userType: "business",
        title: "Груминг-салон 'Пушистик'",
        description:
            "Профессиональный груминг для собак и кошек. Стрижка, мытье, уход за когтями и ушами. Профессиональный груминг для собак и кошек. Стрижка, мытье, уход за когтями и ушами. Профессиональный груминг для собак и кошек. Стрижка, мытье, уход за когтями и ушами.",
        imageUrls: generateGalleryImages(16),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 16, 20) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "grooming",
        languages: ["ru"],
        tags: ["груминг", "собаки", "кошки"],
        workingHours: [
            { start: "10:00", end: "17:00" }, // Sunday - shorter
            { start: "08:00", end: "18:00" }, // Monday - earlier start
            { start: "08:00", end: "18:00" }, // Tuesday
            { start: "08:00", end: "18:00" }, // Wednesday
            { start: "08:00", end: "18:00" }, // Thursday
            { start: "09:00", end: "17:00" }, // Friday
            null, // Saturday - closed
        ],
        socialMediaUrls: ["https://instagram.com/grooming"],
        creatorId: "user-15",
        services: [
            "стрижка собак",
            "стрижка кошек",
            "мытье",
            "уход за когтями",
            "уход за ушами",
        ],
        siteLink: "https://grooming.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-17",
        userType: "business",
        title: "Фитнес-центр 'Сила'",
        description:
            "Современный тренажерный зал с профессиональным оборудованием. Персональные тренировки, групповые занятия, кардио-зона. Современный тренажерный зал с профессиональным оборудованием. Персональные тренировки, групповые занятия, кардио-зона. Современный тренажерный зал с профессиональным оборудованием. Персональные тренировки, групповые занятия, кардио-зона.",
        imageUrls: generateGalleryImages(17),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 17, 25) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "gyms",
        languages: ["ru"],
        tags: ["фитнес", "тренажерный зал", "тренировки"],
        workingHours: [
            { start: "07:00", end: "22:00" }, // Sunday
            { start: "05:30", end: "23:00" }, // Monday - very early
            { start: "05:30", end: "23:00" }, // Tuesday
            { start: "05:30", end: "23:00" }, // Wednesday
            { start: "05:30", end: "23:00" }, // Thursday
            { start: "06:00", end: "22:00" }, // Friday
            { start: "08:00", end: "21:00" }, // Saturday
        ],
        socialMediaUrls: [
            "https://facebook.com/gym",
            "https://instagram.com/gym",
        ],
        creatorId: "user-16",
        services: [
            "тренажерный зал",
            "кардио-зона",
            "персональные тренировки",
            "групповые занятия",
        ],
        siteLink: "https://gym.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-18",
        userType: "business",
        title: "Ресторан 'Французская кухня'",
        description:
            "Элегантный ресторан с французской кухней. Романтическая атмосфера, изысканные блюда, отличное вино. Элегантный ресторан с французской кухней. Романтическая атмосфера, изысканные блюда, отличное вино. Элегантный ресторан с французской кухней. Романтическая атмосфера, изысканные блюда, отличное вино.",
        imageUrls: generateGalleryImages(18),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 18, 25) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "restaurants",
        languages: ["ru"],
        tags: ["ресторан", "французская кухня", "романтика"],
        workingHours: [
            { start: "17:30", end: "23:30" }, // Sunday - dinner only
            { start: "18:00", end: "23:00" }, // Monday
            { start: "18:00", end: "23:00" }, // Tuesday
            { start: "18:00", end: "23:00" }, // Wednesday
            { start: "18:00", end: "00:30" }, // Thursday - late
            { start: "18:00", end: "01:00" }, // Friday - very late
            { start: "18:00", end: "00:00" }, // Saturday
        ],
        socialMediaUrls: [
            "https://facebook.com/french",
            "https://instagram.com/french",
        ],
        creatorId: "user-17",
        services: ["ужин", "романтический ужин", "винная карта", "десерты"],
        siteLink: "https://french.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-19",
        userType: "business",
        title: "Салон красоты 'Грация'",
        description:
            "Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, наращивание ресниц. Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, наращивание ресниц. Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, наращивание ресниц.",
        imageUrls: generateGalleryImages(19),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 19, 25) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "beauty-salon",
        languages: ["ru", "uk"],
        tags: ["салон", "красота", "маникюр", "педикюр"],
        workingHours: [
            null, // Sunday - closed
            { start: "09:30", end: "19:30" }, // Monday
            { start: "09:30", end: "19:30" }, // Tuesday
            { start: "09:30", end: "19:30" }, // Wednesday
            { start: "09:30", end: "20:30" }, // Thursday
            { start: "09:00", end: "21:00" }, // Friday
            { start: "10:00", end: "18:00" }, // Saturday - shorter
        ],
        socialMediaUrls: ["https://instagram.com/beauty"],
        creatorId: "user-18",
        services: [
            "стрижка",
            "окрашивание",
            "маникюр",
            "педикюр",
            "наращивание ресниц",
        ],
        siteLink: "https://beauty.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-20",
        userType: "business",
        title: "Магазин для творчества 'Кисточка'",
        description:
            "Все для творчества: краски, кисти, холсты, материалы для рукоделия, товары для скрапбукинга. Все для творчества: краски, кисти, холсты, материалы для рукоделия, товары для скрапбукинга. Все для творчества: краски, кисти, холсты, материалы для рукоделия, товары для скрапбукинга.",
        imageUrls: generateGalleryImages(20),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 20, 25) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "hobby-creative",
        languages: ["ru"],
        tags: ["творчество", "краски", "рукоделие"],
        workingHours: [
            { start: "11:00", end: "18:00" }, // Sunday - shorter
            { start: "10:00", end: "20:00" }, // Monday
            { start: "10:00", end: "20:00" }, // Tuesday
            { start: "10:00", end: "20:00" }, // Wednesday
            { start: "10:00", end: "20:00" }, // Thursday
            { start: "10:00", end: "20:00" }, // Friday
            { start: "11:00", end: "19:00" }, // Saturday
        ],
        socialMediaUrls: ["https://instagram.com/artshop"],
        creatorId: "user-19",
        services: [
            "краски и кисти",
            "материалы для рукоделия",
            "товары для скрапбукинга",
            "мастер-классы",
        ],
        siteLink: "https://artshop.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-21",
        userType: "business",
        title: "Ветеринарная клиника 'Здоровье'",
        description:
            "Ветеринарная помощь для ваших питомцев. Консультации, вакцинация, лечение, хирургия. Ветеринарная помощь для ваших питомцев. Консультации, вакцинация, лечение, хирургия. Ветеринарная помощь для ваших питомцев. Консультации, вакцинация, лечение, хирургия.",
        imageUrls: generateGalleryImages(21),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 21, 25) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "veterinary",
        languages: ["ru"],
        tags: ["ветеринар", "животные", "лечение"],
        workingHours: [
            { start: "10:00", end: "17:00" }, // Sunday - emergency hours
            { start: "07:30", end: "20:00" }, // Monday - early start
            { start: "07:30", end: "20:00" }, // Tuesday
            { start: "07:30", end: "20:00" }, // Wednesday
            { start: "07:30", end: "20:00" }, // Thursday
            { start: "08:00", end: "19:00" }, // Friday
            { start: "09:00", end: "16:00" }, // Saturday - shorter
        ],
        socialMediaUrls: [
            "https://facebook.com/vet2",
            "https://instagram.com/vet2",
        ],
        creatorId: "user-20",
        services: [
            "консультации",
            "вакцинация",
            "лечение",
            "хирургия",
            "стационар",
        ],
        siteLink: "https://vet2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-22",
        userType: "business",
        title: "Магазин техники 'Гаджеты'",
        description:
            "Смартфоны, планшеты, ноутбуки, наушники, аксессуары. Гарантия, рассрочка, обмен старой техники. Смартфоны, планшеты, ноутбуки, наушники, аксессуары. Гарантия, рассрочка, обмен старой техники. Смартфоны, планшеты, ноутбуки, наушники, аксессуары. Гарантия, рассрочка, обмен старой техники.",
        imageUrls: generateGalleryImages(22),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 22, 25) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "electronics",
        languages: ["ru"],
        tags: ["электроника", "смартфоны", "гаджеты"],
        workingHours: [
            { start: "11:30", end: "19:30" }, // Sunday - later start
            { start: "09:30", end: "20:00" }, // Monday
            { start: "09:30", end: "20:00" }, // Tuesday
            { start: "09:30", end: "20:00" }, // Wednesday
            { start: "09:30", end: "21:00" }, // Thursday
            { start: "10:00", end: "21:00" }, // Friday
            { start: "11:00", end: "19:00" }, // Saturday
        ],
        socialMediaUrls: [
            "https://facebook.com/gadgets",
            "https://instagram.com/gadgets",
        ],
        creatorId: "user-21",
        services: ["продажа", "гарантия", "рассрочка", "обмен техники"],
        siteLink: "https://gadgets.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-23",
        userType: "business",
        title: "Бургерная 'Вкусно'",
        description:
            "Сочные бургеры, картошка фри, наггетсы. Быстрое обслуживание, доставка, самовывоз. Сочные бургеры, картошка фри, наггетсы. Быстрое обслуживание, доставка, самовывоз. Сочные бургеры, картошка фри, наггетсы. Быстрое обслуживание, доставка, самовывоз.",
        imageUrls: generateGalleryImages(23),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 23, 25) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "fast-food",
        languages: ["ru"],
        tags: ["бургеры", "фастфуд", "доставка"],
        workingHours: [
            { start: "12:00", end: "23:00" }, // Sunday
            { start: "10:30", end: "23:30" }, // Monday - earlier start
            { start: "10:30", end: "23:30" }, // Tuesday
            { start: "10:30", end: "23:30" }, // Wednesday
            { start: "10:30", end: "00:30" }, // Thursday - late
            { start: "10:30", end: "01:00" }, // Friday - very late
            { start: "11:00", end: "00:00" }, // Saturday
        ],
        socialMediaUrls: [
            "https://facebook.com/burger",
            "https://instagram.com/burger",
        ],
        creatorId: "user-22",
        services: ["бургеры", "картошка фри", "наггетсы", "доставка"],
        siteLink: "https://burger.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-24",
        userType: "business",
        title: "Барбершоп 'Стиль'",
        description:
            "Современный барбершоп для мужчин. Стрижки, бритье, укладка, уход за бородой. Современный барбершоп для мужчин. Стрижки, бритье, укладка, уход за бородой. Современный барбершоп для мужчин. Стрижки, бритье, укладка, уход за бородой.",
        imageUrls: generateGalleryImages(24),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 24, 25) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "barbershop",
        languages: ["ru", "uk"],
        tags: ["барбершоп", "стрижка", "мужская стрижка"],
        workingHours: [
            null, // Sunday - closed
            { start: "09:30", end: "19:30" }, // Monday
            { start: "09:30", end: "19:30" }, // Tuesday
            { start: "09:30", end: "19:30" }, // Wednesday
            { start: "09:30", end: "20:30" }, // Thursday
            { start: "09:00", end: "21:00" }, // Friday
            { start: "10:00", end: "19:00" }, // Saturday
        ],
        socialMediaUrls: [
            "https://instagram.com/barbershop2",
            "https://facebook.com/barbershop2",
        ],
        creatorId: "user-23",
        services: [
            "мужская стрижка",
            "бритье",
            "укладка",
            "уход за бородой",
        ],
        siteLink: "https://barbershop2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-25",
        userType: "business",
        title: "Груминг 'Лапки'",
        description:
            "Профессиональный груминг для собак всех пород. Стрижка, мытье, уход за когтями, чистка ушей. Профессиональный груминг для собак всех пород. Стрижка, мытье, уход за когтями, чистка ушей. Профессиональный груминг для собак всех пород. Стрижка, мытье, уход за когтями, чистка ушей.",
        imageUrls: generateGalleryImages(25),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 25, 30) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "grooming",
        languages: ["ru"],
        tags: ["груминг", "собаки", "стрижка"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/grooming2"],
        creatorId: "user-24",
        services: [
            "стрижка собак",
            "мытье",
            "уход за когтями",
            "чистка ушей",
            "укладка",
        ],
        siteLink: "https://grooming2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-26",
        userType: "business",
        title: "Йога-центр 'Поток'",
        description:
            "Современный центр йоги и медитации. Различные стили йоги, медитативные практики, дыхательные упражнения. Современный центр йоги и медитации. Различные стили йоги, медитативные практики, дыхательные упражнения. Современный центр йоги и медитации. Различные стили йоги, медитативные практики, дыхательные упражнения.",
        imageUrls: generateGalleryImages(26),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 26, 30) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "yoga-meditation",
        languages: ["ru", "uk"],
        tags: ["йога", "медитация", "здоровье", "релаксация"],
        workingHours: [
            { start: "09:00", end: "20:00" }, // Sunday
            { start: "07:00", end: "21:00" }, // Monday - early morning classes
            { start: "07:00", end: "21:00" }, // Tuesday
            { start: "07:00", end: "21:00" }, // Wednesday
            { start: "07:00", end: "21:00" }, // Thursday
            { start: "08:00", end: "20:00" }, // Friday
            { start: "09:00", end: "19:00" }, // Saturday
        ],
        socialMediaUrls: [
            "https://instagram.com/yoga2",
            "https://facebook.com/yoga2",
        ],
        creatorId: "user-25",
        services: [
            "хатха йога",
            "виньяса йога",
            "медитация",
            "дыхательные практики",
            "йога-нидра",
        ],
        siteLink: "https://yoga2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-27",
        userType: "business",
        title: "Студия маникюра 'Ноготки'",
        description:
            "Профессиональный маникюр и педикюр. Дизайн ногтей, наращивание, покрытие гель-лаком. Профессиональный маникюр и педикюр. Дизайн ногтей, наращивание, покрытие гель-лаком. Профессиональный маникюр и педикюр. Дизайн ногтей, наращивание, покрытие гель-лаком.",
        imageUrls: generateGalleryImages(27),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 27, 30) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "manicure-pedicure",
        languages: ["ru", "uk"],
        tags: ["маникюр", "педикюр", "дизайн ногтей"],
        workingHours: [
            null, // Sunday - closed
            { start: "09:30", end: "19:30" }, // Monday
            { start: "09:30", end: "19:30" }, // Tuesday
            { start: "09:30", end: "19:30" }, // Wednesday
            { start: "09:30", end: "20:30" }, // Thursday
            { start: "09:00", end: "21:00" }, // Friday
            { start: "10:00", end: "19:00" }, // Saturday
        ],
        socialMediaUrls: ["https://instagram.com/nails"],
        creatorId: "user-26",
        services: ["маникюр", "педикюр", "дизайн ногтей", "наращивание", "покрытие гель-лаком"],
        siteLink: "https://nails.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-28",
        userType: "business",
        title: "Салон маникюра 'Элегантность'",
        description:
            "Маникюр и педикюр премиум-класса. Европейские технологии, качественные материалы. Маникюр и педикюр премиум-класса. Европейские технологии, качественные материалы. Маникюр и педикюр премиум-класса. Европейские технологии, качественные материалы.",
        imageUrls: generateGalleryImages(28),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 28, 30) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "manicure-pedicure",
        languages: ["ru"],
        tags: ["маникюр", "педикюр", "премиум"],
        workingHours: [
            { start: "11:00", end: "18:00" }, // Sunday - shorter
            { start: "10:30", end: "20:00" }, // Monday
            { start: "10:30", end: "20:00" }, // Tuesday
            { start: "10:30", end: "20:00" }, // Wednesday
            { start: "10:30", end: "21:00" }, // Thursday
            { start: "10:00", end: "21:00" }, // Friday
            null, // Saturday - closed
        ],
        socialMediaUrls: ["https://instagram.com/nails2"],
        creatorId: "user-27",
        services: ["маникюр", "педикюр", "дизайн", "уход за ногтями"],
        siteLink: "https://nails2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-29",
        userType: "business",
        title: "Массажный салон 'Релакс'",
        description:
            "Профессиональный массаж: классический, лечебный, антицеллюлитный, расслабляющий. Профессиональный массаж: классический, лечебный, антицеллюлитный, расслабляющий. Профессиональный массаж: классический, лечебный, антицеллюлитный, расслабляющий.",
        imageUrls: generateGalleryImages(29),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 29, 30) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "massage",
        languages: ["ru", "uk"],
        tags: ["массаж", "релаксация", "здоровье"],
        workingHours: [
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "22:00" },
            { start: "10:00", end: "22:00" },
            { start: "11:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://instagram.com/massage"],
        creatorId: "user-28",
        services: ["классический массаж", "лечебный массаж", "антицеллюлитный", "расслабляющий"],
        siteLink: "https://massage.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-30",
        userType: "business",
        title: "Студия массажа 'Вита'",
        description:
            "Различные виды массажа для здоровья и красоты. Опытные мастера, уютная атмосфера. Различные виды массажа для здоровья и красоты. Опытные мастера, уютная атмосфера. Различные виды массажа для здоровья и красоты. Опытные мастера, уютная атмосфера.",
        imageUrls: generateGalleryImages(30),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 30, 35) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "massage",
        languages: ["ru"],
        tags: ["массаж", "здоровье", "красота"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "21:00" },
            { start: "10:00", end: "19:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/massage2"],
        creatorId: "user-29",
        services: ["массаж спины", "массаж лица", "тайский массаж", "ароматерапия"],
        siteLink: "https://massage2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-31",
        userType: "business",
        title: "Парикмахерская 'Стиль'",
        description:
            "Женские и мужские стрижки, окрашивание, укладка. Современные техники и качественные материалы. Женские и мужские стрижки, окрашивание, укладка. Современные техники и качественные материалы. Женские и мужские стрижки, окрашивание, укладка. Современные техники и качественные материалы.",
        imageUrls: generateGalleryImages(31),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 31, 35) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "hairdresser",
        languages: ["ru", "uk"],
        tags: ["парикмахерская", "стрижка", "окрашивание"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/hair"],
        creatorId: "user-30",
        services: ["женские стрижки", "мужские стрижки", "окрашивание", "укладка", "мелирование"],
        siteLink: "https://hair.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-32",
        userType: "business",
        title: "Салон красоты 'Волосы'",
        description:
            "Профессиональные услуги парикмахера: стрижки, окрашивание, лечение волос. Профессиональные услуги парикмахера: стрижки, окрашивание, лечение волос. Профессиональные услуги парикмахера: стрижки, окрашивание, лечение волос.",
        imageUrls: generateGalleryImages(32),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 32, 35) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "hairdresser",
        languages: ["ru"],
        tags: ["парикмахерская", "стрижка", "лечение волос"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "11:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://instagram.com/hair2"],
        creatorId: "user-31",
        services: ["стрижки", "окрашивание", "лечение волос", "кератиновое выпрямление"],
        siteLink: "https://hair2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-33",
        userType: "business",
        title: "Студия тату 'Арт'",
        description:
            "Профессиональная татуировка и пирсинг. Опытные мастера, стерильные условия, индивидуальный дизайн. Профессиональная татуировка и пирсинг. Опытные мастера, стерильные условия, индивидуальный дизайн. Профессиональная татуировка и пирсинг. Опытные мастера, стерильные условия, индивидуальный дизайн.",
        imageUrls: generateGalleryImages(33),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 33, 35) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "tattoo-piercing",
        languages: ["ru", "uk"],
        tags: ["тату", "пирсинг", "татуировка"],
        workingHours: [
            { start: "12:00", end: "21:00" },
            { start: "12:00", end: "21:00" },
            { start: "12:00", end: "21:00" },
            { start: "12:00", end: "21:00" },
            { start: "12:00", end: "22:00" },
            { start: "12:00", end: "22:00" },
            { start: "13:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://instagram.com/tattoo"],
        creatorId: "user-32",
        services: ["татуировка", "пирсинг", "коррекция тату", "удаление тату"],
        siteLink: "https://tattoo.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-34",
        userType: "business",
        title: "Тату-салон 'Игла'",
        description:
            "Татуировки и пирсинг от профессиональных мастеров. Различные стили, консультации, эскизы. Татуировки и пирсинг от профессиональных мастеров. Различные стили, консультации, эскизы. Татуировки и пирсинг от профессиональных мастеров. Различные стили, консультации, эскизы.",
        imageUrls: generateGalleryImages(34),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 34, 35) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "tattoo-piercing",
        languages: ["ru"],
        tags: ["тату", "пирсинг", "дизайн"],
        workingHours: [
            { start: "11:00", end: "20:00" },
            { start: "11:00", end: "20:00" },
            { start: "11:00", end: "20:00" },
            { start: "11:00", end: "20:00" },
            { start: "11:00", end: "21:00" },
            { start: "11:00", end: "21:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/tattoo2"],
        creatorId: "user-33",
        services: ["татуировка", "пирсинг", "разработка эскизов", "ретушь"],
        siteLink: "https://tattoo2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-35",
        userType: "business",
        title: "Косметологический кабинет 'Красота'",
        description:
            "Профессиональная косметология: чистка лица, пилинги, инъекции красоты, уходовые процедуры. Профессиональная косметология: чистка лица, пилинги, инъекции красоты, уходовые процедуры. Профессиональная косметология: чистка лица, пилинги, инъекции красоты, уходовые процедуры.",
        imageUrls: generateGalleryImages(35),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 35, 40) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "cosmetology",
        languages: ["ru", "uk"],
        tags: ["косметология", "чистка лица", "пилинги"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "19:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/cosmetology"],
        creatorId: "user-34",
        services: ["чистка лица", "пилинги", "инъекции красоты", "уходовые процедуры", "массаж лица"],
        siteLink: "https://cosmetology.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-36",
        userType: "business",
        title: "Центр косметологии 'Эстетика'",
        description:
            "Современная косметология: аппаратные процедуры, инъекционная косметология, уход за кожей. Современная косметология: аппаратные процедуры, инъекционная косметология, уход за кожей. Современная косметология: аппаратные процедуры, инъекционная косметология, уход за кожей.",
        imageUrls: generateGalleryImages(36),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 36, 40) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "cosmetology",
        languages: ["ru"],
        tags: ["косметология", "аппаратная косметология", "инъекции"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/cosmetology2"],
        creatorId: "user-35",
        services: ["аппаратная косметология", "инъекции", "чистка", "омоложение"],
        siteLink: "https://cosmetology2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-37",
        userType: "business",
        title: "СПА-центр 'Оазис'",
        description:
            "Полный спектр СПА-услуг: массажи, обертывания, уход за телом, релаксация. Полный спектр СПА-услуг: массажи, обертывания, уход за телом, релаксация. Полный спектр СПА-услуг: массажи, обертывания, уход за телом, релаксация.",
        imageUrls: generateGalleryImages(37),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 37, 40) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "spa-body-care",
        languages: ["ru", "uk"],
        tags: ["спа", "релаксация", "уход за телом"],
        workingHours: [
            { start: "10:00", end: "22:00" },
            { start: "10:00", end: "22:00" },
            { start: "10:00", end: "22:00" },
            { start: "10:00", end: "22:00" },
            { start: "10:00", end: "23:00" },
            { start: "10:00", end: "23:00" },
            { start: "11:00", end: "21:00" },
        ],
        socialMediaUrls: ["https://instagram.com/spa"],
        creatorId: "user-36",
        services: ["массажи", "обертывания", "уход за телом", "релаксация", "хаммам"],
        siteLink: "https://spa.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-38",
        userType: "business",
        title: "СПА-салон 'Гармония'",
        description:
            "Премиум СПА-услуги: уход за телом, массажи, ароматерапия, программы релаксации. Премиум СПА-услуги: уход за телом, массажи, ароматерапия, программы релаксации. Премиум СПА-услуги: уход за телом, массажи, ароматерапия, программы релаксации.",
        imageUrls: generateGalleryImages(38),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 38, 40) as [number, number]; })() as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "spa-body-care",
        languages: ["ru"],
        tags: ["спа", "уход", "релаксация"],
        workingHours: [
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "22:00" },
            { start: "09:00", end: "22:00" },
            { start: "10:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://instagram.com/spa2"],
        creatorId: "user-37",
        services: ["спа-программы", "массажи", "обертывания", "ароматерапия"],
        siteLink: "https://spa2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-39",
        userType: "business",
        title: "Автосервис 'Мастер'",
        description:
            "Полный спектр автосервисных услуг: ремонт, диагностика, ТО, замена масла и фильтров. Полный спектр автосервисных услуг: ремонт, диагностика, ТО, замена масла и фильтров. Полный спектр автосервисных услуг: ремонт, диагностика, ТО, замена масла и фильтров.",
        imageUrls: generateGalleryImages(39),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 39, 45) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "auto-service",
        languages: ["ru", "uk"],
        tags: ["автосервис", "ремонт", "диагностика"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/autoservice"],
        creatorId: "user-38",
        services: ["ремонт", "диагностика", "ТО", "замена масла", "замена фильтров"],
        siteLink: "https://autoservice.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-40",
        userType: "business",
        title: "Автосервис 'Профи'",
        description:
            "Профессиональный ремонт автомобилей всех марок. Гарантия на работы, качественные запчасти. Профессиональный ремонт автомобилей всех марок. Гарантия на работы, качественные запчасти. Профессиональный ремонт автомобилей всех марок. Гарантия на работы, качественные запчасти.",
        imageUrls: generateGalleryImages(40),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 40, 45) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "auto-service",
        languages: ["ru"],
        tags: ["автосервис", "ремонт", "гарантия"],
        workingHours: [
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "08:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/autoservice2"],
        creatorId: "user-39",
        services: ["ремонт двигателя", "ремонт подвески", "диагностика", "ТО"],
        siteLink: "https://autoservice2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-41",
        userType: "business",
        title: "Шиномонтаж 'Колесо'",
        description:
            "Шиномонтаж, балансировка, ремонт проколов, замена шин. Быстро и качественно. Шиномонтаж, балансировка, ремонт проколов, замена шин. Быстро и качественно. Шиномонтаж, балансировка, ремонт проколов, замена шин. Быстро и качественно.",
        imageUrls: generateGalleryImages(41),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 41, 45) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "tire-service",
        languages: ["ru", "uk"],
        tags: ["шиномонтаж", "балансировка", "шины"],
        workingHours: [
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/tires"],
        creatorId: "user-40",
        services: ["шиномонтаж", "балансировка", "ремонт проколов", "замена шин", "хранение шин"],
        siteLink: "https://tires.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-42",
        userType: "business",
        title: "Шиномонтажная мастерская",
        description:
            "Профессиональный шиномонтаж и балансировка. Ремонт проколов, замена и хранение шин. Профессиональный шиномонтаж и балансировка. Ремонт проколов, замена и хранение шин. Профессиональный шиномонтаж и балансировка. Ремонт проколов, замена и хранение шин.",
        imageUrls: generateGalleryImages(42),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 42, 45) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "tire-service",
        languages: ["ru"],
        tags: ["шиномонтаж", "балансировка", "ремонт"],
        workingHours: [
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/tires2"],
        creatorId: "user-41",
        services: ["шиномонтаж", "балансировка", "ремонт", "замена", "хранение"],
        siteLink: "https://tires2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-43",
        userType: "business",
        title: "Автомойка 'Блеск'",
        description:
            "Профессиональная мойка автомобилей: ручная мойка, полировка, воск, чистка салона. Профессиональная мойка автомобилей: ручная мойка, полировка, воск, чистка салона. Профессиональная мойка автомобилей: ручная мойка, полировка, воск, чистка салона.",
        imageUrls: generateGalleryImages(43),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 43, 45) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "car-wash",
        languages: ["ru", "uk"],
        tags: ["мойка", "полировка", "чистка"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "21:00" },
            { start: "08:00", end: "21:00" },
            { start: "09:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://instagram.com/carwash"],
        creatorId: "user-42",
        services: ["ручная мойка", "полировка", "воск", "чистка салона", "детейлинг"],
        siteLink: "https://carwash.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-44",
        userType: "business",
        title: "Автомойка 'Чистота'",
        description:
            "Быстрая и качественная мойка автомобилей. Автоматическая и ручная мойка, чистка салона. Быстрая и качественная мойка автомобилей. Автоматическая и ручная мойка, чистка салона. Быстрая и качественная мойка автомобилей. Автоматическая и ручная мойка, чистка салона.",
        imageUrls: generateGalleryImages(44),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 44, 45) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "car-wash",
        languages: ["ru"],
        tags: ["мойка", "автомойка", "чистка"],
        workingHours: [
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "09:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://instagram.com/carwash2"],
        creatorId: "user-43",
        services: ["автоматическая мойка", "ручная мойка", "чистка салона", "полировка"],
        siteLink: "https://carwash2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-45",
        userType: "business",
        title: "Прокат автомобилей 'Автопрокат'",
        description:
            "Аренда автомобилей на любой срок. Широкий выбор моделей, страховка включена. Аренда автомобилей на любой срок. Широкий выбор моделей, страховка включена. Аренда автомобилей на любой срок. Широкий выбор моделей, страховка включена.",
        imageUrls: generateGalleryImages(45),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 45, 50) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "car-rental",
        languages: ["ru", "uk"],
        tags: ["аренда", "автомобили", "прокат"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/rental"],
        creatorId: "user-44",
        services: ["аренда автомобилей", "страховка", "доставка авто", "долгосрочная аренда"],
        siteLink: "https://rental.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-46",
        userType: "business",
        title: "Автопрокат 'Комфорт'",
        description:
            "Удобная аренда автомобилей. Эконом, комфорт, премиум классы. Доставка и самовывоз. Удобная аренда автомобилей. Эконом, комфорт, премиум классы. Доставка и самовывоз. Удобная аренда автомобилей. Эконом, комфорт, премиум классы. Доставка и самовывоз.",
        imageUrls: generateGalleryImages(46),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 46, 50) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "car-rental",
        languages: ["ru"],
        tags: ["аренда", "автомобили", "комфорт"],
        workingHours: [
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/rental2"],
        creatorId: "user-45",
        services: ["аренда", "доставка", "страховка", "разные классы авто"],
        siteLink: "https://rental2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-47",
        userType: "business",
        title: "Магазин автозапчастей 'Деталь'",
        description:
            "Автозапчасти для всех марок автомобилей. Оригинальные и аналоговые запчасти, масла, фильтры. Автозапчасти для всех марок автомобилей. Оригинальные и аналоговые запчасти, масла, фильтры. Автозапчасти для всех марок автомобилей. Оригинальные и аналоговые запчасти, масла, фильтры.",
        imageUrls: generateGalleryImages(47),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 47, 50) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "auto-parts",
        languages: ["ru", "uk"],
        tags: ["запчасти", "автозапчасти", "масла"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/parts"],
        creatorId: "user-46",
        services: ["запчасти", "масла", "фильтры", "аксессуары", "доставка"],
        siteLink: "https://parts.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-48",
        userType: "business",
        title: "Автозапчасти 'АвтоМир'",
        description:
            "Широкий ассортимент автозапчастей и расходных материалов. Оригинал и аналоги. Широкий ассортимент автозапчастей и расходных материалов. Оригинал и аналоги. Широкий ассортимент автозапчастей и расходных материалов. Оригинал и аналоги.",
        imageUrls: generateGalleryImages(48),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 48, 50) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "auto-parts",
        languages: ["ru"],
        tags: ["запчасти", "автозапчасти", "расходники"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/parts2"],
        creatorId: "user-47",
        services: ["запчасти", "расходники", "масла", "фильтры", "поиск запчастей"],
        siteLink: "https://parts2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-49",
        userType: "business",
        title: "Русский продуктовый магазин 'Славянка'",
        description:
            "Русские продукты и товары: колбасы, сыры, консервы, сладости, напитки. Русские продукты и товары: колбасы, сыры, консервы, сладости, напитки. Русские продукты и товары: колбасы, сыры, консервы, сладости, напитки.",
        imageUrls: generateGalleryImages(49),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 49, 50) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "russian-grocery",
        languages: ["ru", "uk"],
        tags: ["русские продукты", "продукты", "магазин"],
        workingHours: [
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "22:00" },
            { start: "09:00", end: "22:00" },
            { start: "10:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://facebook.com/russiangrocery"],
        creatorId: "user-48",
        services: ["русские продукты", "колбасы", "сыры", "консервы", "сладости"],
        siteLink: "https://russiangrocery.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-50",
        userType: "business",
        title: "Магазин 'Русский дом'",
        description:
            "Широкий выбор русских продуктов питания и товаров. Свежие продукты, доставка. Широкий выбор русских продуктов питания и товаров. Свежие продукты, доставка. Широкий выбор русских продуктов питания и товаров. Свежие продукты, доставка.",
        imageUrls: generateGalleryImages(50),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 50, 55) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "russian-grocery",
        languages: ["ru"],
        tags: ["русские продукты", "магазин", "доставка"],
        workingHours: [
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "23:00" },
            { start: "08:00", end: "23:00" },
            { start: "09:00", end: "21:00" },
        ],
        socialMediaUrls: ["https://facebook.com/russiangrocery2"],
        creatorId: "user-49",
        services: ["русские продукты", "свежие продукты", "доставка", "заказ онлайн"],
        siteLink: "https://russiangrocery2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-51",
        userType: "business",
        title: "Пекарня 'Свежий хлеб'",
        description:
            "Свежая выпечка каждый день: хлеб, булочки, пироги, торты. Традиционные рецепты. Свежая выпечка каждый день: хлеб, булочки, пироги, торты. Традиционные рецепты. Свежая выпечка каждый день: хлеб, булочки, пироги, торты. Традиционные рецепты.",
        imageUrls: generateGalleryImages(51),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 51, 55) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "bakeries",
        languages: ["ru", "uk"],
        tags: ["пекарня", "хлеб", "выпечка"],
        workingHours: [
            { start: "06:00", end: "20:00" },
            { start: "06:00", end: "20:00" },
            { start: "06:00", end: "20:00" },
            { start: "06:00", end: "20:00" },
            { start: "06:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://instagram.com/bakery"],
        creatorId: "user-50",
        services: ["хлеб", "булочки", "пироги", "торты", "свежая выпечка"],
        siteLink: "https://bakery.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-52",
        userType: "business",
        title: "Кондитерская 'Сладости'",
        description:
            "Домашняя выпечка и кондитерские изделия. Торты на заказ, пирожные, печенье. Домашняя выпечка и кондитерские изделия. Торты на заказ, пирожные, печенье. Домашняя выпечка и кондитерские изделия. Торты на заказ, пирожные, печенье.",
        imageUrls: generateGalleryImages(52),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 52, 55) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "bakeries",
        languages: ["ru"],
        tags: ["пекарня", "торты", "кондитерская"],
        workingHours: [
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://instagram.com/bakery2"],
        creatorId: "user-51",
        services: ["торты на заказ", "пирожные", "печенье", "выпечка"],
        siteLink: "https://bakery2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-53",
        userType: "business",
        title: "Бар 'Коктейль'",
        description:
            "Уютный бар с широким выбором коктейлей, крафтового пива и закусок. Живая музыка по выходным. Уютный бар с широким выбором коктейлей, крафтового пива и закусок. Живая музыка по выходным. Уютный бар с широким выбором коктейлей, крафтового пива и закусок. Живая музыка по выходным.",
        imageUrls: generateGalleryImages(53),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 53, 55) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "bars",
        languages: ["ru", "uk"],
        tags: ["бар", "коктейли", "пиво"],
        workingHours: [
            { start: "17:00", end: "02:00" },
            { start: "17:00", end: "02:00" },
            { start: "17:00", end: "02:00" },
            { start: "17:00", end: "02:00" },
            { start: "17:00", end: "03:00" },
            { start: "17:00", end: "03:00" },
            { start: "18:00", end: "02:00" },
        ],
        socialMediaUrls: ["https://instagram.com/bar"],
        creatorId: "user-52",
        services: ["коктейли", "крафтовое пиво", "закуски", "живая музыка"],
        siteLink: "https://bar.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-54",
        userType: "business",
        title: "Вино-бар 'Виноград'",
        description:
            "Винный бар с обширной картой вин. Дегустации, закуски, уютная атмосфера. Винный бар с обширной картой вин. Дегустации, закуски, уютная атмосфера. Винный бар с обширной картой вин. Дегустации, закуски, уютная атмосфера.",
        imageUrls: generateGalleryImages(54),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 54, 55) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "bars",
        languages: ["ru"],
        tags: ["бар", "вино", "дегустации"],
        workingHours: [
            { start: "18:00", end: "01:00" },
            { start: "18:00", end: "01:00" },
            { start: "18:00", end: "01:00" },
            { start: "18:00", end: "01:00" },
            { start: "18:00", end: "02:00" },
            { start: "18:00", end: "02:00" },
            { start: "19:00", end: "01:00" },
        ],
        socialMediaUrls: ["https://instagram.com/winebar"],
        creatorId: "user-53",
        services: ["вина", "дегустации", "закуски", "сырная тарелка"],
        siteLink: "https://winebar.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-55",
        userType: "business",
        title: "Кейтеринг 'Вкусно и точка'",
        description:
            "Организация кейтеринга для мероприятий: корпоративы, свадьбы, банкеты. Полный цикл услуг. Организация кейтеринга для мероприятий: корпоративы, свадьбы, банкеты. Полный цикл услуг. Организация кейтеринга для мероприятий: корпоративы, свадьбы, банкеты. Полный цикл услуг.",
        imageUrls: generateGalleryImages(55),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 55, 60) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "catering",
        languages: ["ru", "uk"],
        tags: ["кейтеринг", "мероприятия", "банкеты"],
        workingHours: [
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "22:00" },
            { start: "10:00", end: "22:00" },
            { start: "10:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://instagram.com/catering"],
        creatorId: "user-54",
        services: ["кейтеринг", "банкеты", "корпоративы", "свадьбы", "обслуживание"],
        siteLink: "https://catering.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-56",
        userType: "business",
        title: "Кейтеринговая служба 'Праздник'",
        description:
            "Профессиональный кейтеринг для любых мероприятий. Меню на заказ, обслуживание, доставка. Профессиональный кейтеринг для любых мероприятий. Меню на заказ, обслуживание, доставка. Профессиональный кейтеринг для любых мероприятий. Меню на заказ, обслуживание, доставка.",
        imageUrls: generateGalleryImages(56),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 56, 60) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "catering",
        languages: ["ru"],
        tags: ["кейтеринг", "мероприятия", "меню"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://instagram.com/catering2"],
        creatorId: "user-55",
        services: ["кейтеринг", "меню на заказ", "обслуживание", "доставка"],
        siteLink: "https://catering2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-57",
        userType: "business",
        title: "Ферма 'Эко-продукты'",
        description:
            "Экологически чистые продукты: овощи, фрукты, молочные продукты, мясо. Собственное производство. Экологически чистые продукты: овощи, фрукты, молочные продукты, мясо. Собственное производство. Экологически чистые продукты: овощи, фрукты, молочные продукты, мясо. Собственное производство.",
        imageUrls: generateGalleryImages(57),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 57, 60) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "farms-producers",
        languages: ["ru", "uk"],
        tags: ["ферма", "эко-продукты", "овощи"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "17:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/farm"],
        creatorId: "user-56",
        services: ["овощи", "фрукты", "молочные продукты", "мясо", "доставка"],
        siteLink: "https://farm.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-58",
        userType: "business",
        title: "Эко-ферма 'Здоровье'",
        description:
            "Органические продукты собственного производства. Овощи, фрукты, яйца, мед. Органические продукты собственного производства. Овощи, фрукты, яйца, мед. Органические продукты собственного производства. Овощи, фрукты, яйца, мед.",
        imageUrls: generateGalleryImages(58),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 58, 60) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "farms-producers",
        languages: ["ru"],
        tags: ["ферма", "органические продукты", "мед"],
        workingHours: [
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/farm2"],
        creatorId: "user-57",
        services: ["овощи", "фрукты", "яйца", "мед", "органические продукты"],
        siteLink: "https://farm2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-59",
        userType: "business",
        title: "Доставка еды 'Быстро'",
        description:
            "Быстрая доставка еды из ресторанов и кафе. Широкий выбор кухонь, удобное приложение. Быстрая доставка еды из ресторанов и кафе. Широкий выбор кухонь, удобное приложение. Быстрая доставка еды из ресторанов и кафе. Широкий выбор кухонь, удобное приложение.",
        imageUrls: generateGalleryImages(59),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 59, 60) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "food-delivery",
        languages: ["ru", "uk"],
        tags: ["доставка", "еда", "рестораны"],
        workingHours: [
            { start: "10:00", end: "23:00" },
            { start: "10:00", end: "23:00" },
            { start: "10:00", end: "23:00" },
            { start: "10:00", end: "23:00" },
            { start: "10:00", end: "00:00" },
            { start: "10:00", end: "00:00" },
            { start: "11:00", end: "23:00" },
        ],
        socialMediaUrls: ["https://instagram.com/delivery"],
        creatorId: "user-58",
        services: ["доставка еды", "заказ онлайн", "разные кухни", "быстрая доставка"],
        siteLink: "https://delivery.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-60",
        userType: "business",
        title: "Служба доставки 'Еда на дом'",
        description:
            "Доставка еды из лучших ресторанов города. Быстро, удобно, вкусно. Доставка еды из лучших ресторанов города. Быстро, удобно, вкусно. Доставка еды из лучших ресторанов города. Быстро, удобно, вкусно.",
        imageUrls: generateGalleryImages(60),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 60, 65) as [number, number]; })() as [
            number,
            number
        ],
        category: "food",
        subcategory: "food-delivery",
        languages: ["ru"],
        tags: ["доставка", "еда", "рестораны"],
        workingHours: [
            { start: "11:00", end: "22:00" },
            { start: "11:00", end: "22:00" },
            { start: "11:00", end: "22:00" },
            { start: "11:00", end: "22:00" },
            { start: "11:00", end: "23:00" },
            { start: "11:00", end: "23:00" },
            { start: "12:00", end: "22:00" },
        ],
        socialMediaUrls: ["https://instagram.com/delivery2"],
        creatorId: "user-59",
        services: ["доставка", "заказ онлайн", "множество ресторанов", "быстро"],
        siteLink: "https://delivery2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-61",
        userType: "business",
        title: "Продуктовый магазин 'Свежесть'",
        description:
            "Свежие продукты каждый день: овощи, фрукты, мясо, молочные продукты, бакалея. Свежие продукты каждый день: овощи, фрукты, мясо, молочные продукты, бакалея. Свежие продукты каждый день: овощи, фрукты, мясо, молочные продукты, бакалея.",
        imageUrls: generateGalleryImages(61),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 61, 65) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "grocery-stores",
        languages: ["ru", "uk"],
        tags: ["продукты", "магазин", "свежесть"],
        workingHours: [
            { start: "07:00", end: "22:00" },
            { start: "07:00", end: "22:00" },
            { start: "07:00", end: "22:00" },
            { start: "07:00", end: "22:00" },
            { start: "07:00", end: "23:00" },
            { start: "07:00", end: "23:00" },
            { start: "08:00", end: "22:00" },
        ],
        socialMediaUrls: ["https://facebook.com/grocery"],
        creatorId: "user-60",
        services: ["продукты", "свежие овощи", "мясо", "молочные продукты", "бакалея"],
        siteLink: "https://grocery.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-62",
        userType: "business",
        title: "Супермаркет 'Продукты'",
        description:
            "Большой выбор продуктов питания и товаров повседневного спроса. Низкие цены, акции. Большой выбор продуктов питания и товаров повседневного спроса. Низкие цены, акции. Большой выбор продуктов питания и товаров повседневного спроса. Низкие цены, акции.",
        imageUrls: generateGalleryImages(62),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 62, 65) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "grocery-stores",
        languages: ["ru"],
        tags: ["супермаркет", "продукты", "акции"],
        workingHours: [
            { start: "08:00", end: "21:00" },
            { start: "08:00", end: "21:00" },
            { start: "08:00", end: "21:00" },
            { start: "08:00", end: "21:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "09:00", end: "21:00" },
        ],
        socialMediaUrls: ["https://facebook.com/grocery2"],
        creatorId: "user-61",
        services: ["продукты", "товары повседневного спроса", "акции", "низкие цены"],
        siteLink: "https://grocery2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-63",
        userType: "business",
        title: "Магазин одежды 'Стиль'",
        description:
            "Модная одежда и обувь для мужчин и женщин. Актуальные коллекции, качественные материалы. Модная одежда и обувь для мужчин и женщин. Актуальные коллекции, качественные материалы. Модная одежда и обувь для мужчин и женщин. Актуальные коллекции, качественные материалы.",
        imageUrls: generateGalleryImages(63),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 63, 65) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "clothing-shoes",
        languages: ["ru", "uk"],
        tags: ["одежда", "обувь", "мода"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "11:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://instagram.com/clothing"],
        creatorId: "user-62",
        services: ["одежда", "обувь", "аксессуары", "примерка", "стилист"],
        siteLink: "https://clothing.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-64",
        userType: "business",
        title: "Бутик 'Элегант'",
        description:
            "Премиум одежда и обувь. Европейские бренды, индивидуальный подход. Премиум одежда и обувь. Европейские бренды, индивидуальный подход. Премиум одежда и обувь. Европейские бренды, индивидуальный подход.",
        imageUrls: generateGalleryImages(64),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 64, 65) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "clothing-shoes",
        languages: ["ru"],
        tags: ["одежда", "обувь", "премиум"],
        workingHours: [
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "20:00" },
            { start: "11:00", end: "20:00" },
            { start: "12:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://instagram.com/clothing2"],
        creatorId: "user-63",
        services: ["премиум одежда", "обувь", "бренды", "индивидуальный подбор"],
        siteLink: "https://clothing2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-65",
        userType: "business",
        title: "Косметический магазин 'Красота'",
        description:
            "Широкий ассортимент косметики и парфюмерии. Известные бренды, консультации косметолога. Широкий ассортимент косметики и парфюмерии. Известные бренды, консультации косметолога. Широкий ассортимент косметики и парфюмерии. Известные бренды, консультации косметолога.",
        imageUrls: generateGalleryImages(65),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 65, 70) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "cosmetics-perfume",
        languages: ["ru", "uk"],
        tags: ["косметика", "парфюмерия", "бренды"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "11:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://instagram.com/cosmetics"],
        creatorId: "user-64",
        services: ["косметика", "парфюмерия", "консультации", "тестирование"],
        siteLink: "https://cosmetics.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-66",
        userType: "business",
        title: "Парфюмерия 'Аромат'",
        description:
            "Элитная парфюмерия и косметика. Оригинальные ароматы, консультации парфюмера. Элитная парфюмерия и косметика. Оригинальные ароматы, консультации парфюмера. Элитная парфюмерия и косметика. Оригинальные ароматы, консультации парфюмера.",
        imageUrls: generateGalleryImages(66),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 66, 70) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "cosmetics-perfume",
        languages: ["ru"],
        tags: ["парфюмерия", "косметика", "элитная"],
        workingHours: [
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "20:00" },
            { start: "11:00", end: "20:00" },
            { start: "12:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://instagram.com/perfume"],
        creatorId: "user-65",
        services: ["парфюмерия", "косметика", "консультации", "подарочная упаковка"],
        siteLink: "https://perfume.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-67",
        userType: "business",
        title: "Детский магазин 'Малыш'",
        description:
            "Все для детей: одежда, игрушки, коляски, детская мебель, товары для новорожденных. Все для детей: одежда, игрушки, коляски, детская мебель, товары для новорожденных. Все для детей: одежда, игрушки, коляски, детская мебель, товары для новорожденных.",
        imageUrls: generateGalleryImages(67),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 67, 70) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "children-goods",
        languages: ["ru", "uk"],
        tags: ["дети", "игрушки", "одежда"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "11:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://facebook.com/children"],
        creatorId: "user-66",
        services: ["одежда для детей", "игрушки", "коляски", "детская мебель", "товары для новорожденных"],
        siteLink: "https://children.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-68",
        userType: "business",
        title: "Магазин детских товаров 'Радость'",
        description:
            "Широкий ассортимент товаров для детей всех возрастов. Качество и безопасность. Широкий ассортимент товаров для детей всех возрастов. Качество и безопасность. Широкий ассортимент товаров для детей всех возрастов. Качество и безопасность.",
        imageUrls: generateGalleryImages(68),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 68, 70) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "children-goods",
        languages: ["ru"],
        tags: ["дети", "товары", "безопасность"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/children2"],
        creatorId: "user-67",
        services: ["детские товары", "игрушки", "одежда", "обувь", "книги"],
        siteLink: "https://children2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-69",
        userType: "business",
        title: "Магазин мебели 'Дом'",
        description:
            "Мебель и товары для интерьера: гостиные, спальни, кухни, декор. Разные стили и цены. Мебель и товары для интерьера: гостиные, спальни, кухни, декор. Разные стили и цены. Мебель и товары для интерьера: гостиные, спальни, кухни, декор. Разные стили и цены.",
        imageUrls: generateGalleryImages(69),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 69, 70) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "furniture-interior",
        languages: ["ru", "uk"],
        tags: ["мебель", "интерьер", "декор"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "11:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://instagram.com/furniture"],
        creatorId: "user-68",
        services: ["мебель", "интерьер", "декор", "дизайн интерьера", "доставка"],
        siteLink: "https://furniture.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-70",
        userType: "business",
        title: "Мебельный салон 'Комфорт'",
        description:
            "Современная мебель для дома и офиса. Европейское качество, индивидуальные решения. Современная мебель для дома и офиса. Европейское качество, индивидуальные решения. Современная мебель для дома и офиса. Европейское качество, индивидуальные решения.",
        imageUrls: generateGalleryImages(70),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 70, 75) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "furniture-interior",
        languages: ["ru"],
        tags: ["мебель", "комфорт", "качество"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://instagram.com/furniture2"],
        creatorId: "user-69",
        services: ["мебель", "интерьер", "индивидуальные решения", "доставка", "сборка"],
        siteLink: "https://furniture2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-71",
        userType: "business",
        title: "Ювелирный магазин 'Бриллиант'",
        description:
            "Ювелирные изделия из золота и серебра. Кольца, серьги, цепочки, браслеты. Изготовление на заказ. Ювелирные изделия из золота и серебра. Кольца, серьги, цепочки, браслеты. Изготовление на заказ. Ювелирные изделия из золота и серебра. Кольца, серьги, цепочки, браслеты. Изготовление на заказ.",
        imageUrls: generateGalleryImages(71),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 71, 75) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "jewelry",
        languages: ["ru", "uk"],
        tags: ["ювелирные изделия", "золото", "серебро"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://instagram.com/jewelry"],
        creatorId: "user-70",
        services: ["ювелирные изделия", "изготовление на заказ", "ремонт", "оценка"],
        siteLink: "https://jewelry.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-72",
        userType: "business",
        title: "Ювелирная мастерская 'Золото'",
        description:
            "Изготовление и ремонт ювелирных изделий. Эксклюзивные дизайны, качественные материалы. Изготовление и ремонт ювелирных изделий. Эксклюзивные дизайны, качественные материалы. Изготовление и ремонт ювелирных изделий. Эксклюзивные дизайны, качественные материалы.",
        imageUrls: generateGalleryImages(72),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 72, 75) as [number, number]; })() as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "jewelry",
        languages: ["ru"],
        tags: ["ювелирные изделия", "изготовление", "ремонт"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/jewelry2"],
        creatorId: "user-71",
        services: ["изготовление", "ремонт", "дизайн", "оценка", "гравировка"],
        siteLink: "https://jewelry2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-73",
        userType: "business",
        title: "Медицинская клиника 'Здоровье'",
        description:
            "Многопрофильная медицинская клиника. Консультации, диагностика, лечение. Опытные врачи. Многопрофильная медицинская клиника. Консультации, диагностика, лечение. Опытные врачи. Многопрофильная медицинская клиника. Консультации, диагностика, лечение. Опытные врачи.",
        imageUrls: generateGalleryImages(73),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 73, 75) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "clinics",
        languages: ["ru", "uk"],
        tags: ["клиника", "медицина", "врачи"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/clinic"],
        creatorId: "user-72",
        services: ["консультации", "диагностика", "лечение", "анализы", "УЗИ"],
        siteLink: "https://clinic.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-74",
        userType: "business",
        title: "Клиника 'Медикал'",
        description:
            "Современная медицинская клиника с новейшим оборудованием. Широкий спектр медицинских услуг. Современная медицинская клиника с новейшим оборудованием. Широкий спектр медицинских услуг. Современная медицинская клиника с новейшим оборудованием. Широкий спектр медицинских услуг.",
        imageUrls: generateGalleryImages(74),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 74, 75) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "clinics",
        languages: ["ru"],
        tags: ["клиника", "медицина", "оборудование"],
        workingHours: [
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/clinic2"],
        creatorId: "user-73",
        services: ["медицинские услуги", "диагностика", "лечение", "анализы", "консультации"],
        siteLink: "https://clinic2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-75",
        userType: "business",
        title: "Стоматологическая клиника 'Улыбка'",
        description:
            "Современная стоматология: лечение, протезирование, имплантация, отбеливание. Безболезненно. Современная стоматология: лечение, протезирование, имплантация, отбеливание. Безболезненно. Современная стоматология: лечение, протезирование, имплантация, отбеливание. Безболезненно.",
        imageUrls: generateGalleryImages(75),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 75, 80) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "dentistry",
        languages: ["ru", "uk"],
        tags: ["стоматология", "лечение", "имплантация"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/dentistry"],
        creatorId: "user-74",
        services: ["лечение", "протезирование", "имплантация", "отбеливание", "гигиена"],
        siteLink: "https://dentistry.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-76",
        userType: "business",
        title: "Стоматология 'Дент'",
        description:
            "Профессиональная стоматологическая помощь. Лечение, протезирование, импланты, детская стоматология. Профессиональная стоматологическая помощь. Лечение, протезирование, импланты, детская стоматология. Профессиональная стоматологическая помощь. Лечение, протезирование, импланты, детская стоматология.",
        imageUrls: generateGalleryImages(76),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 76, 80) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "dentistry",
        languages: ["ru"],
        tags: ["стоматология", "лечение", "протезирование"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://instagram.com/dentistry2"],
        creatorId: "user-75",
        services: ["лечение", "протезирование", "импланты", "детская стоматология", "ортодонтия"],
        siteLink: "https://dentistry2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-77",
        userType: "business",
        title: "Аптека 'Здоровье'",
        description:
            "Широкий ассортимент лекарств и медицинских товаров. Консультации фармацевта, доставка. Широкий ассортимент лекарств и медицинских товаров. Консультации фармацевта, доставка. Широкий ассортимент лекарств и медицинских товаров. Консультации фармацевта, доставка.",
        imageUrls: generateGalleryImages(77),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 77, 80) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "pharmacies",
        languages: ["ru", "uk"],
        tags: ["аптека", "лекарства", "медицинские товары"],
        workingHours: [
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "23:00" },
            { start: "08:00", end: "23:00" },
            { start: "09:00", end: "22:00" },
        ],
        socialMediaUrls: ["https://facebook.com/pharmacy"],
        creatorId: "user-76",
        services: ["лекарства", "медицинские товары", "консультации", "доставка"],
        siteLink: "https://pharmacy.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-78",
        userType: "business",
        title: "Аптека 'Медика'",
        description:
            "Лекарства и медицинские товары. Круглосуточная доставка, консультации, скидки. Лекарства и медицинские товары. Круглосуточная доставка, консультации, скидки. Лекарства и медицинские товары. Круглосуточная доставка, консультации, скидки.",
        imageUrls: generateGalleryImages(78),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 78, 80) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "pharmacies",
        languages: ["ru"],
        tags: ["аптека", "лекарства", "доставка"],
        workingHours: [
            { start: "07:00", end: "23:00" },
            { start: "07:00", end: "23:00" },
            { start: "07:00", end: "23:00" },
            { start: "07:00", end: "23:00" },
            { start: "07:00", end: "00:00" },
            { start: "07:00", end: "00:00" },
            { start: "08:00", end: "23:00" },
        ],
        socialMediaUrls: ["https://facebook.com/pharmacy2"],
        creatorId: "user-77",
        services: ["лекарства", "медицинские товары", "доставка", "консультации", "скидки"],
        siteLink: "https://pharmacy2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-79",
        userType: "business",
        title: "Фитнес-клуб 'Сила и здоровье'",
        description:
            "Современный фитнес-клуб: тренажеры, групповые занятия, персональные тренировки, бассейн. Современный фитнес-клуб: тренажеры, групповые занятия, персональные тренировки, бассейн. Современный фитнес-клуб: тренажеры, групповые занятия, персональные тренировки, бассейн.",
        imageUrls: generateGalleryImages(79),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 79, 80) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "fitness-sports",
        languages: ["ru", "uk"],
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
        socialMediaUrls: ["https://facebook.com/fitness"],
        creatorId: "user-78",
        services: ["тренажеры", "групповые занятия", "персональные тренировки", "бассейн", "сауна"],
        siteLink: "https://fitness.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-80",
        userType: "business",
        title: "Спортивный центр 'Актив'",
        description:
            "Фитнес и спортивные программы для всех возрастов. Современное оборудование, опытные тренеры. Фитнес и спортивные программы для всех возрастов. Современное оборудование, опытные тренеры. Фитнес и спортивные программы для всех возрастов. Современное оборудование, опытные тренеры.",
        imageUrls: generateGalleryImages(80),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 80, 85) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "fitness-sports",
        languages: ["ru"],
        tags: ["фитнес", "спорт", "тренировки"],
        workingHours: [
            { start: "05:00", end: "24:00" },
            { start: "05:00", end: "24:00" },
            { start: "05:00", end: "24:00" },
            { start: "05:00", end: "24:00" },
            { start: "05:00", end: "24:00" },
            { start: "07:00", end: "23:00" },
            { start: "08:00", end: "22:00" },
        ],
        socialMediaUrls: ["https://facebook.com/fitness2"],
        creatorId: "user-79",
        services: ["фитнес", "тренировки", "групповые занятия", "персональный тренер", "кардио"],
        siteLink: "https://fitness2.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-81",
        userType: "business",
        title: "Ремонт и отделка 'Мастер'",
        description:
            "Качественный ремонт квартир и офисов. Отделочные работы, сантехника, электрика. Опыт более 10 лет. Качественный ремонт квартир и офисов. Отделочные работы, сантехника, электрика. Опыт более 10 лет. Качественный ремонт квартир и офисов. Отделочные работы, сантехника, электрика. Опыт более 10 лет.",
        imageUrls: generateGalleryImages(81),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 81, 85) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "repair-renovation",
        languages: ["ru", "uk"],
        tags: ["ремонт", "отделка", "строительство"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/repair"],
        creatorId: "user-80",
        services: ["ремонт", "отделка", "сантехника", "электрика", "покраска"],
        siteLink: "https://repair.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-82",
        userType: "individual",
        title: "Услуги электрика",
        description:
            "Установка и ремонт электропроводки, розеток, выключателей. Работаю по всей Праге. Установка и ремонт электропроводки, розеток, выключателей. Работаю по всей Праге. Установка и ремонт электропроводки, розеток, выключателей. Работаю по всей Праге.",
        imageUrls: generateGalleryImages(82),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 82, 85) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "electrician",
        languages: ["ru"],
        tags: ["электрик", "ремонт", "установка"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://instagram.com/electrician"],
        creatorId: "user-81",
        services: ["электропроводка", "розетки", "выключатели", "освещение"],
        siteLink: "https://electrician.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-83",
        userType: "business",
        title: "Клининговая служба 'Чистота'",
        description:
            "Профессиональная уборка квартир, офисов, после ремонта. Используем экологичные средства. Профессиональная уборка квартир, офисов, после ремонта. Используем экологичные средства. Профессиональная уборка квартир, офисов, после ремонта. Используем экологичные средства.",
        imageUrls: generateGalleryImages(83),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 83, 85) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "cleaning",
        languages: ["ru", "uk"],
        tags: ["уборка", "клининг", "чистота"],
        workingHours: [
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/cleaning"],
        creatorId: "user-82",
        services: ["уборка квартир", "уборка офисов", "после ремонта", "генеральная уборка"],
        siteLink: "https://cleaning.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-84",
        userType: "business",
        title: "Организация мероприятий 'Праздник'",
        description:
            "Организация корпоративных мероприятий, дней рождений, свадеб. Полный цикл услуг от планирования до реализации. Организация корпоративных мероприятий, дней рождений, свадеб. Полный цикл услуг от планирования до реализации. Организация корпоративных мероприятий, дней рождений, свадеб. Полный цикл услуг от планирования до реализации.",
        imageUrls: generateGalleryImages(84),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 84, 85) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "corporate-events",
        languages: ["ru", "uk"],
        tags: ["мероприятия", "корпоративы", "организация"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "18:00" },
            { start: "11:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/events", "https://instagram.com/events"],
        creatorId: "user-83",
        services: ["организация мероприятий", "корпоративы", "свадьбы", "дни рождения", "декор"],
        siteLink: "https://events.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-85",
        userType: "business",
        title: "Event Agency 'Celebration'",
        description:
            "Организация концертов, фестивалей и культурных мероприятий. Профессиональная команда, современное оборудование. Организация концертов, фестивалей и культурных мероприятий. Профессиональная команда, современное оборудование. Организация концертов, фестивалей и культурных мероприятий. Профессиональная команда, современное оборудование.",
        imageUrls: generateGalleryImages(85),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 85, 90) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "concerts-festivals",
        languages: ["ru", "uk"],
        tags: ["концерты", "фестивали", "культурные мероприятия"],
        workingHours: [
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "11:00", end: "19:00" },
            { start: "12:00", end: "18:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/eventagency"],
        creatorId: "user-84",
        services: ["организация концертов", "фестивали", "звук", "свет", "сцена"],
        siteLink: "https://eventagency.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-86",
        userType: "business",
        title: "Детский клуб 'Радуга'",
        description:
            "Развивающие занятия для детей от 2 до 10 лет. Творчество, музыка, спорт. Опытные педагоги. Развивающие занятия для детей от 2 до 10 лет. Творчество, музыка, спорт. Опытные педагоги. Развивающие занятия для детей от 2 до 10 лет. Творчество, музыка, спорт. Опытные педагоги.",
        imageUrls: generateGalleryImages(86),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 86, 95) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "children-clubs",
        languages: ["ru", "uk"],
        tags: ["дети", "развитие", "творчество"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/kidsclub"],
        creatorId: "user-85",
        services: ["развивающие занятия", "творчество", "музыка", "спорт", "группы продленного дня"],
        siteLink: "https://kidsclub.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-87",
        userType: "business",
        title: "Школа раннего развития 'Умники'",
        description:
            "Подготовка к школе, развитие речи, логики, математики. Индивидуальный подход к каждому ребенку. Подготовка к школе, развитие речи, логики, математики. Индивидуальный подход к каждому ребенку. Подготовка к школе, развитие речи, логики, математики. Индивидуальный подход к каждому ребенку.",
        imageUrls: generateGalleryImages(87),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 87, 95) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "early-development",
        languages: ["ru"],
        tags: ["дети", "развитие", "подготовка к школе"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/earlydev"],
        creatorId: "user-86",
        services: ["подготовка к школе", "развитие речи", "логика", "математика", "чтение"],
        siteLink: "https://earlydev.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-88",
        userType: "business",
        title: "Web Studio 'Digital Solutions'",
        description:
            "Разработка сайтов и мобильных приложений. Современные технологии, индивидуальный подход. Разработка сайтов и мобильных приложений. Современные технологии, индивидуальный подход. Разработка сайтов и мобильных приложений. Современные технологии, индивидуальный подход.",
        imageUrls: generateGalleryImages(88),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 88, 95) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "web-app-development",
        languages: ["ru", "uk"],
        tags: ["разработка", "сайты", "приложения"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/webstudio"],
        creatorId: "user-87",
        services: ["разработка сайтов", "мобильные приложения", "дизайн", "SEO", "поддержка"],
        siteLink: "https://webstudio.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-89",
        userType: "individual",
        title: "IT-консалтинг и поддержка",
        description:
            "Консультации по IT-инфраструктуре, настройка серверов, облачные решения. Техническая поддержка 24/7. Консультации по IT-инфраструктуре, настройка серверов, облачные решения. Техническая поддержка 24/7. Консультации по IT-инфраструктуре, настройка серверов, облачные решения. Техническая поддержка 24/7.",
        imageUrls: generateGalleryImages(89),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 89, 95) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "it-consulting",
        languages: ["ru", "uk"],
        tags: ["IT", "консалтинг", "поддержка"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://linkedin.com/itconsulting"],
        creatorId: "user-88",
        services: ["IT-консалтинг", "настройка серверов", "облачные решения", "техподдержка", "кибербезопасность"],
        siteLink: "https://itconsulting.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-90",
        userType: "business",
        title: "Бухгалтерские услуги 'Аккаунт'",
        description:
            "Ведение бухгалтерии, налоговая отчетность, консультации. Опыт работы более 15 лет. Ведение бухгалтерии, налоговая отчетность, консультации. Опыт работы более 15 лет. Ведение бухгалтерии, налоговая отчетность, консультации. Опыт работы более 15 лет.",
        imageUrls: generateGalleryImages(90),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 90, 95) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "accounting",
        languages: ["ru"],
        tags: ["бухгалтерия", "налоги", "отчетность"],
        workingHours: [
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/accounting"],
        creatorId: "user-89",
        services: ["ведение бухгалтерии", "налоговая отчетность", "консультации", "регистрация компаний"],
        siteLink: "https://accounting.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-91",
        userType: "business",
        title: "Юридические услуги 'Правовая защита'",
        description:
            "Юридические консультации, сопровождение сделок, представительство в суде. Опытные юристы. Юридические консультации, сопровождение сделок, представительство в суде. Опытные юристы. Юридические консультации, сопровождение сделок, представительство в суде. Опытные юристы.",
        imageUrls: generateGalleryImages(91),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 91, 95) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "legal-services",
        languages: ["ru", "uk"],
        tags: ["юридические услуги", "консультации", "суд"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/legal"],
        creatorId: "user-90",
        services: ["юридические консультации", "сопровождение сделок", "представительство в суде", "документооборот"],
        siteLink: "https://legal.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-92",
        userType: "business",
        title: "Курьерская служба 'Быстрая доставка'",
        description:
            "Доставка документов, посылок, продуктов по городу. Работаем 7 дней в неделю. Доставка документов, посылок, продуктов по городу. Работаем 7 дней в неделю. Доставка документов, посылок, продуктов по городу. Работаем 7 дней в неделю.",
        imageUrls: generateGalleryImages(92),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 92, 95) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "courier-services",
        languages: ["ru", "uk"],
        tags: ["доставка", "курьер", "логистика"],
        workingHours: [
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "08:00", end: "22:00" },
            { start: "09:00", end: "21:00" },
            { start: "10:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://facebook.com/courier"],
        creatorId: "user-91",
        services: ["доставка документов", "доставка посылок", "экспресс-доставка", "доставка продуктов"],
        siteLink: "https://courier.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-93",
        userType: "business",
        title: "Грузоперевозки 'Надежный транспорт'",
        description:
            "Перевозка мебели, техники, грузов. Квартирные и офисные переезды. Опытные грузчики. Перевозка мебели, техники, грузов. Квартирные и офисные переезды. Опытные грузчики. Перевозка мебели, техники, грузов. Квартирные и офисные переезды. Опытные грузчики.",
        imageUrls: generateGalleryImages(93),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 93, 95) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "freight-transport",
        languages: ["ru"],
        tags: ["грузоперевозки", "переезды", "транспорт"],
        workingHours: [
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/freight"],
        creatorId: "user-92",
        services: ["грузоперевозки", "квартирные переезды", "офисные переезды", "перевозка мебели", "грузчики"],
        siteLink: "https://freight.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-94",
        userType: "business",
        title: "Отель 'Уютный дом'",
        description:
            "Комфортабельные номера в центре города. Завтрак включен. Бронирование онлайн. Комфортабельные номера в центре города. Завтрак включен. Бронирование онлайн. Комфортабельные номера в центре города. Завтрак включен. Бронирование онлайн.",
        imageUrls: generateGalleryImages(94),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 94, 95) as [number, number]; })() as [
            number,
            number
        ],
        category: "hospitality",
        subcategory: "hotels",
        languages: ["ru", "uk"],
        tags: ["отель", "размещение", "бронирование"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/hotel", "https://instagram.com/hotel"],
        creatorId: "user-93",
        services: ["номера", "завтрак", "Wi-Fi", "парковка", "трансфер"],
        siteLink: "https://hotel.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-95",
        userType: "business",
        title: "Хостел 'Backpacker'",
        description:
            "Бюджетное размещение для путешественников. Общие комнаты и отдельные номера. Кухня, Wi-Fi. Бюджетное размещение для путешественников. Общие комнаты и отдельные номера. Кухня, Wi-Fi. Бюджетное размещение для путешественников. Общие комнаты и отдельные номера. Кухня, Wi-Fi.",
        imageUrls: generateGalleryImages(95),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 95, 100) as [number, number]; })() as [
            number,
            number
        ],
        category: "hospitality",
        subcategory: "hostels",
        languages: ["ru", "uk"],
        tags: ["хостел", "бюджетное размещение", "путешественники"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/hostel"],
        creatorId: "user-94",
        services: ["общие комнаты", "отдельные номера", "кухня", "Wi-Fi", "прачечная"],
        siteLink: "https://hostel.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-96",
        userType: "business",
        title: "Экологический консалтинг 'Зеленая планета'",
        description:
            "Консультации по экологическим вопросам, сертификация, аудит. Помогаем бизнесу стать экологичнее. Консультации по экологическим вопросам, сертификация, аудит. Помогаем бизнесу стать экологичнее. Консультации по экологическим вопросам, сертификация, аудит. Помогаем бизнесу стать экологичнее.",
        imageUrls: generateGalleryImages(96),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 96, 100) as [number, number]; })() as [
            number,
            number
        ],
        category: "eco",
        subcategory: "eco-consulting",
        languages: ["ru", "uk"],
        tags: ["экология", "консалтинг", "сертификация"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/eco"],
        creatorId: "user-95",
        services: ["экологический консалтинг", "сертификация", "аудит", "консультации"],
        siteLink: "https://eco.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-97",
        userType: "business",
        title: "Установка солнечных панелей 'Солнечная энергия'",
        description:
            "Установка и обслуживание солнечных панелей для домов и бизнеса. Экономия на электроэнергии. Установка и обслуживание солнечных панелей для домов и бизнеса. Экономия на электроэнергии. Установка и обслуживание солнечных панелей для домов и бизнеса. Экономия на электроэнергии.",
        imageUrls: generateGalleryImages(97),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 97, 100) as [number, number]; })() as [
            number,
            number
        ],
        category: "eco",
        subcategory: "solar-panels",
        languages: ["ru"],
        tags: ["солнечные панели", "энергия", "экология"],
        workingHours: [
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "09:00", end: "15:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/solar"],
        creatorId: "user-96",
        services: ["установка солнечных панелей", "обслуживание", "консультации", "проектирование"],
        siteLink: "https://solar.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-98",
        userType: "business",
        title: "Ремонт и отделка 'Профи'",
        description:
            "Комплексный ремонт квартир под ключ. Дизайн, отделка, сантехника, электрика. Гарантия качества. Комплексный ремонт квартир под ключ. Дизайн, отделка, сантехника, электрика. Гарантия качества. Комплексный ремонт квартир под ключ. Дизайн, отделка, сантехника, электрика. Гарантия качества.",
        imageUrls: generateGalleryImages(98),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 98, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "repair-renovation",
        languages: ["ru"],
        tags: ["ремонт", "отделка", "под ключ"],
        workingHours: [
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "08:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/repairpro"],
        creatorId: "user-97",
        services: ["ремонт под ключ", "дизайн", "отделка", "сантехника", "электрика"],
        siteLink: "https://repairpro.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-99",
        userType: "business",
        title: "Event Agency 'Celebration Plus'",
        description:
            "Организация корпоративных мероприятий, конференций, тимбилдингов. Полный цикл услуг. Организация корпоративных мероприятий, конференций, тимбилдингов. Полный цикл услуг. Организация корпоративных мероприятий, конференций, тимбилдингов. Полный цикл услуг.",
        imageUrls: generateGalleryImages(99),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 99, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "corporate-events",
        languages: ["ru", "uk"],
        tags: ["корпоративы", "конференции", "тимбилдинг"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/eventsplus"],
        creatorId: "user-98",
        services: ["корпоративные мероприятия", "конференции", "тимбилдинг", "кейтеринг", "техника"],
        siteLink: "https://eventsplus.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-100",
        userType: "business",
        title: "Фестивальное агентство 'Музыка мира'",
        description:
            "Организация музыкальных фестивалей и концертов. Звук, свет, сцена, артисты. Организация музыкальных фестивалей и концертов. Звук, свет, сцена, артисты. Организация музыкальных фестивалей и концертов. Звук, свет, сцена, артисты.",
        imageUrls: generateGalleryImages(100),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 100, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "concerts-festivals",
        languages: ["ru", "uk"],
        tags: ["фестивали", "концерты", "музыка"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "19:00" },
            { start: "12:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/festival"],
        creatorId: "user-99",
        services: ["организация фестивалей", "концерты", "звук", "свет", "продюсирование"],
        siteLink: "https://festival.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-101",
        userType: "business",
        title: "Детский развивающий центр 'Солнышко'",
        description:
            "Развивающие занятия, творчество, спорт для детей. Группы от 2 до 12 лет. Опытные педагоги. Развивающие занятия, творчество, спорт для детей. Группы от 2 до 12 лет. Опытные педагоги. Развивающие занятия, творчество, спорт для детей. Группы от 2 до 12 лет. Опытные педагоги.",
        imageUrls: generateGalleryImages(101),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 101, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "children-clubs",
        languages: ["ru", "uk"],
        tags: ["дети", "развитие", "творчество"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "17:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/sunshine"],
        creatorId: "user-100",
        services: ["развивающие занятия", "творчество", "спорт", "музыка", "английский"],
        siteLink: "https://sunshine.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-102",
        userType: "business",
        title: "Центр раннего развития 'Гений'",
        description:
            "Подготовка к школе, развитие интеллекта, памяти, внимания. Индивидуальный подход. Подготовка к школе, развитие интеллекта, памяти, внимания. Индивидуальный подход. Подготовка к школе, развитие интеллекта, памяти, внимания. Индивидуальный подход.",
        imageUrls: generateGalleryImages(102),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 102, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "early-development",
        languages: ["ru"],
        tags: ["дети", "развитие", "подготовка к школе"],
        workingHours: [
            { start: "10:00", end: "18:00" },
            { start: "10:00", end: "18:00" },
            { start: "10:00", end: "18:00" },
            { start: "10:00", end: "18:00" },
            { start: "10:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/genius"],
        creatorId: "user-101",
        services: ["подготовка к школе", "развитие интеллекта", "память", "внимание", "логика"],
        siteLink: "https://genius.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-103",
        userType: "business",
        title: "Mobile App Development Studio",
        description:
            "Разработка мобильных приложений для iOS и Android. Современные технологии, качественный код. Разработка мобильных приложений для iOS и Android. Современные технологии, качественный код. Разработка мобильных приложений для iOS и Android. Современные технологии, качественный код.",
        imageUrls: generateGalleryImages(103),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 103, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "web-app-development",
        languages: ["ru", "uk"],
        tags: ["приложения", "iOS", "Android"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/mobileapp"],
        creatorId: "user-102",
        services: ["iOS приложения", "Android приложения", "дизайн", "тестирование", "поддержка"],
        siteLink: "https://mobileapp.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-104",
        userType: "individual",
        title: "IT-консультант и системный администратор",
        description:
            "Консультации по IT-инфраструктуре, настройка сетей, облачные сервисы. Техническая поддержка. Консультации по IT-инфраструктуре, настройка сетей, облачные сервисы. Техническая поддержка. Консультации по IT-инфраструктуре, настройка сетей, облачные сервисы. Техническая поддержка.",
        imageUrls: generateGalleryImages(104),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 104, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "it-consulting",
        languages: ["ru"],
        tags: ["IT", "консалтинг", "системный администратор"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://linkedin.com/itadmin"],
        creatorId: "user-103",
        services: ["IT-консалтинг", "настройка сетей", "облачные сервисы", "техподдержка", "безопасность"],
        siteLink: "https://itadmin.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-105",
        userType: "business",
        title: "Юридическая фирма 'Правовая защита+'",
        description:
            "Юридические услуги для бизнеса и частных лиц. Консультации, сопровождение сделок, судебные споры. Юридические услуги для бизнеса и частных лиц. Консультации, сопровождение сделок, судебные споры. Юридические услуги для бизнеса и частных лиц. Консультации, сопровождение сделок, судебные споры.",
        imageUrls: generateGalleryImages(105),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 105, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "legal-services",
        languages: ["ru", "uk"],
        tags: ["юридические услуги", "консультации", "суд"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/legalplus"],
        creatorId: "user-104",
        services: ["юридические консультации", "сопровождение сделок", "судебные споры", "регистрация компаний"],
        siteLink: "https://legalplus.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-106",
        userType: "business",
        title: "Бухгалтерское бюро 'Финансы'",
        description:
            "Ведение бухгалтерии, налоговая отчетность, консультации. Работаем с малым и средним бизнесом. Ведение бухгалтерии, налоговая отчетность, консультации. Работаем с малым и средним бизнесом. Ведение бухгалтерии, налоговая отчетность, консультации. Работаем с малым и средним бизнесом.",
        imageUrls: generateGalleryImages(106),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 106, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "accounting",
        languages: ["ru"],
        tags: ["бухгалтерия", "налоги", "отчетность"],
        workingHours: [
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/accountingplus"],
        creatorId: "user-105",
        services: ["ведение бухгалтерии", "налоговая отчетность", "консультации", "расчет зарплаты"],
        siteLink: "https://accountingplus.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-107",
        userType: "business",
        title: "Экспресс-доставка 'Молниеносная'",
        description:
            "Быстрая доставка документов и посылок по городу. Работаем 24/7. Срочная доставка за 1 час. Быстрая доставка документов и посылок по городу. Работаем 24/7. Срочная доставка за 1 час. Быстрая доставка документов и посылок по городу. Работаем 24/7. Срочная доставка за 1 час.",
        imageUrls: generateGalleryImages(107),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 107, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "courier-services",
        languages: ["ru", "uk"],
        tags: ["доставка", "курьер", "экспресс"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/express"],
        creatorId: "user-106",
        services: ["экспресс-доставка", "доставка документов", "доставка посылок", "24/7"],
        siteLink: "https://express.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-108",
        userType: "business",
        title: "Грузоперевозки 'Надежный партнер'",
        description:
            "Квартирные и офисные переезды. Перевозка мебели, техники, грузов. Опытные грузчики, аккуратная работа. Квартирные и офисные переезды. Перевозка мебели, техники, грузов. Опытные грузчики, аккуратная работа. Квартирные и офисные переезды. Перевозка мебели, техники, грузов. Опытные грузчики, аккуратная работа.",
        imageUrls: generateGalleryImages(108),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 108, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "freight-transport",
        languages: ["ru"],
        tags: ["грузоперевозки", "переезды", "транспорт"],
        workingHours: [
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/freightplus"],
        creatorId: "user-107",
        services: ["квартирные переезды", "офисные переезды", "перевозка мебели", "грузчики", "упаковка"],
        siteLink: "https://freightplus.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-109",
        userType: "business",
        title: "Солнечные панели 'Энергия будущего'",
        description:
            "Установка и обслуживание солнечных панелей. Современные технологии, гарантия качества. Установка и обслуживание солнечных панелей. Современные технологии, гарантия качества. Установка и обслуживание солнечных панелей. Современные технологии, гарантия качества.",
        imageUrls: generateGalleryImages(109),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 109, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "eco",
        subcategory: "solar-panels",
        languages: ["ru", "uk"],
        tags: ["солнечные панели", "энергия", "экология"],
        workingHours: [
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "09:00", end: "15:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/solarfuture"],
        creatorId: "user-108",
        services: ["установка солнечных панелей", "обслуживание", "консультации", "проектирование", "гарантия"],
        siteLink: "https://solarfuture.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-110",
        userType: "business",
        title: "Экологический аудит и консалтинг",
        description:
            "Экологический аудит предприятий, сертификация, консультации по экологическим стандартам. Экологический аудит предприятий, сертификация, консультации по экологическим стандартам. Экологический аудит предприятий, сертификация, консультации по экологическим стандартам.",
        imageUrls: generateGalleryImages(110),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 110, 120) as [number, number]; })() as [
            number,
            number
        ],
        category: "eco",
        subcategory: "eco-consulting",
        languages: ["ru"],
        tags: ["экология", "аудит", "сертификация"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/ecoaudit"],
        creatorId: "user-109",
        services: ["экологический аудит", "сертификация", "консультации", "отчетность"],
        siteLink: "https://ecoaudit.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-111",
        userType: "business",
        title: "Сервис электромобилей 'EcoAuto'",
        description:
            "Ремонт и обслуживание электромобилей. Специализированное оборудование, опытные мастера. Ремонт и обслуживание электромобилей. Специализированное оборудование, опытные мастера. Ремонт и обслуживание электромобилей. Специализированное оборудование, опытные мастера.",
        imageUrls: generateGalleryImages(111),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 111, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "ev-service",
        languages: ["ru", "uk"],
        tags: ["электромобили", "ремонт", "обслуживание"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/evservice"],
        creatorId: "user-110",
        services: ["ремонт электромобилей", "обслуживание", "диагностика", "зарядные станции"],
        siteLink: "https://evservice.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-112",
        userType: "business",
        title: "EV Service Center",
        description:
            "Специализированный сервис для электромобилей. Ремонт батарей, зарядные устройства, диагностика. Специализированный сервис для электромобилей. Ремонт батарей, зарядные устройства, диагностика. Специализированный сервис для электромобилей. Ремонт батарей, зарядные устройства, диагностика.",
        imageUrls: generateGalleryImages(112),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 112, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "ev-service",
        languages: ["ru"],
        tags: ["электромобили", "батареи", "зарядка"],
        workingHours: [
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "09:00", end: "15:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/evcenter"],
        creatorId: "user-111",
        services: ["ремонт батарей", "зарядные устройства", "диагностика", "обслуживание"],
        siteLink: "https://evcenter.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-113",
        userType: "individual",
        title: "Автоэлектрик 'Электро'",
        description:
            "Ремонт и установка автоэлектрики. Генераторы, стартеры, проводка. Выезд на место. Ремонт и установка автоэлектрики. Генераторы, стартеры, проводка. Выезд на место. Ремонт и установка автоэлектрики. Генераторы, стартеры, проводка. Выезд на место.",
        imageUrls: generateGalleryImages(113),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 113, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "auto-electric",
        languages: ["ru", "uk"],
        tags: ["автоэлектрика", "ремонт", "генераторы"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://instagram.com/autoelectric"],
        creatorId: "user-112",
        services: ["ремонт автоэлектрики", "генераторы", "стартеры", "проводка", "выезд"],
        siteLink: "https://autoelectric.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-114",
        userType: "business",
        title: "Автоэлектрика 'Профи'",
        description:
            "Диагностика и ремонт электрооборудования автомобилей. Современное оборудование. Диагностика и ремонт электрооборудования автомобилей. Современное оборудование. Диагностика и ремонт электрооборудования автомобилей. Современное оборудование.",
        imageUrls: generateGalleryImages(114),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 114, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "auto",
        subcategory: "auto-electric",
        languages: ["ru"],
        tags: ["автоэлектрика", "диагностика", "ремонт"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/autoelectricpro"],
        creatorId: "user-113",
        services: ["диагностика", "ремонт электрооборудования", "генераторы", "стартеры"],
        siteLink: "https://autoelectricpro.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-115",
        userType: "individual",
        title: "Услуги сантехника",
        description:
            "Установка и ремонт сантехники. Протечки, засоры, установка оборудования. Работаю по всему городу. Установка и ремонт сантехники. Протечки, засоры, установка оборудования. Работаю по всему городу. Установка и ремонт сантехники. Протечки, засоры, установка оборудования. Работаю по всему городу.",
        imageUrls: generateGalleryImages(115),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 115, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "plumber",
        languages: ["ru", "uk"],
        tags: ["сантехник", "ремонт", "установка"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://instagram.com/plumber"],
        creatorId: "user-114",
        services: ["ремонт сантехники", "установка", "протечки", "засоры", "водонагреватели"],
        siteLink: "https://plumber.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-116",
        userType: "business",
        title: "Сантехнические услуги 'Аква'",
        description:
            "Профессиональный ремонт и установка сантехники. Гарантия на все работы. Опыт более 15 лет. Профессиональный ремонт и установка сантехники. Гарантия на все работы. Опыт более 15 лет. Профессиональный ремонт и установка сантехники. Гарантия на все работы. Опыт более 15 лет.",
        imageUrls: generateGalleryImages(116),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 116, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "plumber",
        languages: ["ru"],
        tags: ["сантехник", "ремонт", "установка"],
        workingHours: [
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/aqua"],
        creatorId: "user-115",
        services: ["ремонт сантехники", "установка оборудования", "протечки", "засоры", "гарантия"],
        siteLink: "https://aqua.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-117",
        userType: "business",
        title: "Клининговая компания 'Блеск'",
        description:
            "Профессиональная уборка домов, офисов, коммерческих помещений. Экологичные средства. Профессиональная уборка домов, офисов, коммерческих помещений. Экологичные средства. Профессиональная уборка домов, офисов, коммерческих помещений. Экологичные средства.",
        imageUrls: generateGalleryImages(117),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 117, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "cleaning",
        languages: ["ru", "uk"],
        tags: ["уборка", "клининг", "профессиональная уборка"],
        workingHours: [
            { start: "07:00", end: "22:00" },
            { start: "07:00", end: "22:00" },
            { start: "07:00", end: "22:00" },
            { start: "07:00", end: "22:00" },
            { start: "07:00", end: "22:00" },
            { start: "08:00", end: "21:00" },
            { start: "09:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://facebook.com/cleaningplus"],
        creatorId: "user-116",
        services: ["уборка домов", "уборка офисов", "после ремонта", "генеральная уборка", "химчистка"],
        siteLink: "https://cleaningplus.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-118",
        userType: "business",
        title: "Грузоперевозки и переезды 'Переезд-Про'",
        description:
            "Квартирные и офисные переезды. Перевозка мебели, техники, грузов. Упаковка, погрузка, разгрузка. Квартирные и офисные переезды. Перевозка мебели, техники, грузов. Упаковка, погрузка, разгрузка. Квартирные и офисные переезды. Перевозка мебели, техники, грузов. Упаковка, погрузка, разгрузка.",
        imageUrls: generateGalleryImages(118),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 118, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "moving-transport",
        languages: ["ru"],
        tags: ["переезды", "грузоперевозки", "перевозка"],
        workingHours: [
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "07:00", end: "20:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/moving"],
        creatorId: "user-117",
        services: ["квартирные переезды", "офисные переезды", "упаковка", "грузчики", "транспорт"],
        siteLink: "https://moving.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-119",
        userType: "business",
        title: "Переезд и грузоперевозки 'Надежно'",
        description:
            "Профессиональные переезды квартир и офисов. Аккуратная перевозка мебели и техники. Профессиональные переезды квартир и офисов. Аккуратная перевозка мебели и техники. Профессиональные переезды квартир и офисов. Аккуратная перевозка мебели и техники.",
        imageUrls: generateGalleryImages(119),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 119, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "moving-transport",
        languages: ["ru", "uk"],
        tags: ["переезды", "грузоперевозки", "перевозка"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/movingreliable"],
        creatorId: "user-118",
        services: ["переезды", "перевозка мебели", "перевозка техники", "грузчики", "упаковка"],
        siteLink: "https://movingreliable.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-120",
        userType: "business",
        title: "Окна и двери 'Свет'",
        description:
            "Установка и ремонт окон и дверей. Пластиковые, деревянные, алюминиевые. Гарантия качества. Установка и ремонт окон и дверей. Пластиковые, деревянные, алюминиевые. Гарантия качества. Установка и ремонт окон и дверей. Пластиковые, деревянные, алюминиевые. Гарантия качества.",
        imageUrls: generateGalleryImages(120),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 120, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "windows-doors",
        languages: ["ru"],
        tags: ["окна", "двери", "установка"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/windows"],
        creatorId: "user-119",
        services: ["установка окон", "установка дверей", "ремонт", "замена", "гарантия"],
        siteLink: "https://windows.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-121",
        userType: "business",
        title: "Окна и двери 'Комфорт'",
        description:
            "Изготовление и установка окон и дверей на заказ. Широкий выбор материалов и цветов. Изготовление и установка окон и дверей на заказ. Широкий выбор материалов и цветов. Изготовление и установка окон и дверей на заказ. Широкий выбор материалов и цветов.",
        imageUrls: generateGalleryImages(121),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 121, 200) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "windows-doors",
        languages: ["ru", "uk"],
        tags: ["окна", "двери", "изготовление"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/windowscomfort"],
        creatorId: "user-120",
        services: ["изготовление окон", "изготовление дверей", "установка", "замер", "гарантия"],
        siteLink: "https://windowscomfort.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-122",
        userType: "business",
        title: "Ландшафтный дизайн 'Природа'",
        description:
            "Проектирование и создание ландшафтного дизайна. Озеленение, дорожки, водоемы. Проектирование и создание ландшафтного дизайна. Озеленение, дорожки, водоемы. Проектирование и создание ландшафтного дизайна. Озеленение, дорожки, водоемы.",
        imageUrls: generateGalleryImages(122),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 122, 250) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "landscape-design",
        languages: ["ru", "uk"],
        tags: ["ландшафтный дизайн", "озеленение", "проектирование"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/landscape"],
        creatorId: "user-121",
        services: ["ландшафтный дизайн", "озеленение", "дорожки", "водоемы", "проектирование"],
        siteLink: "https://landscape.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-123",
        userType: "business",
        title: "Ландшафтный дизайн и озеленение",
        description:
            "Создание красивых садов и парков. Полный цикл работ от проектирования до ухода. Создание красивых садов и парков. Полный цикл работ от проектирования до ухода. Создание красивых садов и парков. Полный цикл работ от проектирования до ухода.",
        imageUrls: generateGalleryImages(123),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 123, 250) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "landscape-design",
        languages: ["ru"],
        tags: ["ландшафтный дизайн", "сады", "озеленение"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/landscapedesign"],
        creatorId: "user-122",
        services: ["проектирование", "озеленение", "уход за садом", "полив", "обрезка"],
        siteLink: "https://landscapedesign.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-124",
        userType: "business",
        title: "Строительство и кладка 'Крепость'",
        description:
            "Кладка кирпича, блоков, камня. Строительство домов, заборов, подпорных стен. Кладка кирпича, блоков, камня. Строительство домов, заборов, подпорных стен. Кладка кирпича, блоков, камня. Строительство домов, заборов, подпорных стен.",
        imageUrls: generateGalleryImages(124),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 124, 250) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "construction",
        languages: ["ru", "uk"],
        tags: ["строительство", "кладка", "кирпич"],
        workingHours: [
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "08:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/construction"],
        creatorId: "user-123",
        services: ["кладка кирпича", "кладка блоков", "строительство домов", "заборы", "подпорные стены"],
        siteLink: "https://construction.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-125",
        userType: "business",
        title: "Кладка и строительство 'Мастер'",
        description:
            "Профессиональная кладка и строительство. Опыт более 20 лет. Гарантия качества. Профессиональная кладка и строительство. Опыт более 20 лет. Гарантия качества. Профессиональная кладка и строительство. Опыт более 20 лет. Гарантия качества.",
        imageUrls: generateGalleryImages(125),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 125, 250) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "construction",
        languages: ["ru"],
        tags: ["кладка", "строительство", "качество"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/constructionmaster"],
        creatorId: "user-124",
        services: ["кладка", "строительство", "ремонт", "реставрация", "гарантия"],
        siteLink: "https://constructionmaster.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-126",
        userType: "business",
        title: "Монтаж отопления и вентиляции 'Тепло'",
        description:
            "Установка и ремонт систем отопления и вентиляции. Современное оборудование. Установка и ремонт систем отопления и вентиляции. Современное оборудование. Установка и ремонт систем отопления и вентиляции. Современное оборудование.",
        imageUrls: generateGalleryImages(126),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 126, 250) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "heating-ventilation",
        languages: ["ru", "uk"],
        tags: ["отопление", "вентиляция", "монтаж"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/heating"],
        creatorId: "user-125",
        services: ["монтаж отопления", "монтаж вентиляции", "ремонт", "обслуживание", "консультации"],
        siteLink: "https://heating.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-127",
        userType: "business",
        title: "Отопление и вентиляция 'Комфорт'",
        description:
            "Проектирование и монтаж систем отопления и вентиляции. Гарантия на все работы. Проектирование и монтаж систем отопления и вентиляции. Гарантия на все работы. Проектирование и монтаж систем отопления и вентиляции. Гарантия на все работы.",
        imageUrls: generateGalleryImages(127),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 127, 250) as [number, number]; })() as [
            number,
            number
        ],
        category: "home",
        subcategory: "heating-ventilation",
        languages: ["ru"],
        tags: ["отопление", "вентиляция", "проектирование"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/heatingcomfort"],
        creatorId: "user-126",
        services: ["проектирование", "монтаж отопления", "монтаж вентиляции", "обслуживание", "гарантия"],
        siteLink: "https://heatingcomfort.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-128",
        userType: "business",
        title: "Спортивные мероприятия 'Актив'",
        description:
            "Организация спортивных мероприятий, турниров, соревнований. Полный цикл организации. Организация спортивных мероприятий, турниров, соревнований. Полный цикл организации. Организация спортивных мероприятий, турниров, соревнований. Полный цикл организации.",
        imageUrls: generateGalleryImages(128),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 128, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "sports-events",
        languages: ["ru", "uk"],
        tags: ["спорт", "мероприятия", "турниры"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "17:00" },
            { start: "11:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/sportsevents"],
        creatorId: "user-127",
        services: ["организация турниров", "соревнования", "спортивные мероприятия", "техника", "судьи"],
        siteLink: "https://sportsevents.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-129",
        userType: "business",
        title: "Спортивные соревнования 'Чемпион'",
        description:
            "Организация спортивных соревнований и турниров. Профессиональная организация. Организация спортивных соревнований и турниров. Профессиональная организация. Организация спортивных соревнований и турниров. Профессиональная организация.",
        imageUrls: generateGalleryImages(129),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 129, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "sports-events",
        languages: ["ru"],
        tags: ["соревнования", "турниры", "спорт"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "18:00" },
            { start: "12:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/champion"],
        creatorId: "user-128",
        services: ["организация соревнований", "турниры", "техника", "медицинское обслуживание", "награждение"],
        siteLink: "https://champion.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-130",
        userType: "business",
        title: "Выставки и ярмарки 'Арт-Экспо'",
        description:
            "Организация выставок и ярмарок. Выставочные залы, стенды, реклама. Организация выставок и ярмарок. Выставочные залы, стенды, реклама. Организация выставок и ярмарок. Выставочные залы, стенды, реклама.",
        imageUrls: generateGalleryImages(130),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 130, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "exhibitions-fairs",
        languages: ["ru", "uk"],
        tags: ["выставки", "ярмарки", "экспо"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/expo"],
        creatorId: "user-129",
        services: ["организация выставок", "ярмарки", "выставочные залы", "стенды", "реклама"],
        siteLink: "https://expo.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-131",
        userType: "business",
        title: "Ярмарки и выставки 'Традиции'",
        description:
            "Организация традиционных ярмарок и выставок. Народные промыслы, ремесла, искусство. Организация традиционных ярмарок и выставок. Народные промыслы, ремесла, искусство. Организация традиционных ярмарок и выставок. Народные промыслы, ремесла, искусство.",
        imageUrls: generateGalleryImages(131),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 131, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "exhibitions-fairs",
        languages: ["ru"],
        tags: ["ярмарки", "выставки", "традиции"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
            { start: "12:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/traditions"],
        creatorId: "user-130",
        services: ["ярмарки", "выставки", "народные промыслы", "ремесла", "организация"],
        siteLink: "https://traditions.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-132",
        userType: "business",
        title: "Культурные встречи 'Диалог'",
        description:
            "Организация культурных встреч, лекций, дискуссий. Развитие культурного обмена. Организация культурных встреч, лекций, дискуссий. Развитие культурного обмена. Организация культурных встреч, лекций, дискуссий. Развитие культурного обмена.",
        imageUrls: generateGalleryImages(132),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 132, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "cultural-meetings",
        languages: ["ru", "uk"],
        tags: ["культура", "встречи", "лекции"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "19:00" },
            { start: "12:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/dialogue"],
        creatorId: "user-131",
        services: ["культурные встречи", "лекции", "дискуссии", "организация", "пространство"],
        siteLink: "https://dialogue.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-133",
        userType: "business",
        title: "Культурный центр 'Гармония'",
        description:
            "Организация культурных мероприятий, встреч, концертов. Развитие культурного сообщества. Организация культурных мероприятий, встреч, концертов. Развитие культурного сообщества. Организация культурных мероприятий, встреч, концертов. Развитие культурного сообщества.",
        imageUrls: generateGalleryImages(133),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 133, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "cultural-meetings",
        languages: ["ru"],
        tags: ["культура", "центр", "мероприятия"],
        workingHours: [
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://facebook.com/harmony"],
        creatorId: "user-132",
        services: ["культурные мероприятия", "встречи", "концерты", "лекции", "выставки"],
        siteLink: "https://harmony.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-134",
        userType: "business",
        title: "Семейные праздники 'Радость'",
        description:
            "Организация семейных праздников, дней рождений, юбилеев. Индивидуальный подход. Организация семейных праздников, дней рождений, юбилеев. Индивидуальный подход. Организация семейных праздников, дней рождений, юбилеев. Индивидуальный подход.",
        imageUrls: generateGalleryImages(134),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 134, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "family-celebrations",
        languages: ["ru", "uk"],
        tags: ["семейные праздники", "дни рождения", "юбилеи"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/joy"],
        creatorId: "user-133",
        services: ["семейные праздники", "дни рождения", "юбилеи", "кейтеринг", "декорации"],
        siteLink: "https://joy.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-135",
        userType: "business",
        title: "Организация семейных торжеств",
        description:
            "Полная организация семейных праздников. От планирования до проведения. Полная организация семейных праздников. От планирования до проведения. Полная организация семейных праздников. От планирования до проведения.",
        imageUrls: generateGalleryImages(135),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 135, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "family-celebrations",
        languages: ["ru"],
        tags: ["семейные праздники", "торжества", "организация"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
            { start: "12:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/familyevents"],
        creatorId: "user-134",
        services: ["планирование", "организация", "кейтеринг", "декорации", "фотосъемка"],
        siteLink: "https://familyevents.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-136",
        userType: "business",
        title: "Тимбилдинг 'Команда'",
        description:
            "Организация тимбилдинговых мероприятий для компаний. Сплочение коллектива. Организация тимбилдинговых мероприятий для компаний. Сплочение коллектива. Организация тимбилдинговых мероприятий для компаний. Сплочение коллектива.",
        imageUrls: generateGalleryImages(136),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 136, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "team-building",
        languages: ["ru", "uk"],
        tags: ["тимбилдинг", "команда", "корпоративы"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "17:00" },
            { start: "11:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/teambuilding"],
        creatorId: "user-135",
        services: ["тимбилдинг", "корпоративные мероприятия", "игры", "активности", "организация"],
        siteLink: "https://teambuilding.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-137",
        userType: "business",
        title: "Тимбилдинг и корпоративные активности",
        description:
            "Организация тимбилдингов и корпоративных активностей. Развитие команды. Организация тимбилдингов и корпоративных активностей. Развитие команды. Организация тимбилдингов и корпоративных активностей. Развитие команды.",
        imageUrls: generateGalleryImages(137),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 137, 300) as [number, number]; })() as [
            number,
            number
        ],
        category: "events",
        subcategory: "team-building",
        languages: ["ru"],
        tags: ["тимбилдинг", "активности", "команда"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "19:00" },
            { start: "12:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/teambuildingplus"],
        creatorId: "user-136",
        services: ["тимбилдинг", "активности", "игры", "квесты", "организация"],
        siteLink: "https://teambuildingplus.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-138",
        userType: "business",
        title: "Психологический центр 'Гармония души'",
        description:
            "Психологические консультации, терапия, поддержка. Опытные психологи. Психологические консультации, терапия, поддержка. Опытные психологи. Психологические консультации, терапия, поддержка. Опытные психологи.",
        imageUrls: generateGalleryImages(138),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 138, 400) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "psychology-consulting",
        languages: ["ru", "uk"],
        tags: ["психология", "консультации", "терапия"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "18:00" },
            { start: "11:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/psychology"],
        creatorId: "user-137",
        services: ["психологические консультации", "терапия", "поддержка", "групповые занятия"],
        siteLink: "https://psychology.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-139",
        userType: "individual",
        title: "Психолог-консультант",
        description:
            "Индивидуальные психологические консультации. Работа с тревогой, депрессией, отношениями. Индивидуальные психологические консультации. Работа с тревогой, депрессией, отношениями. Индивидуальные психологические консультации. Работа с тревогой, депрессией, отношениями.",
        imageUrls: generateGalleryImages(139),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 139, 400) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "psychology-consulting",
        languages: ["ru"],
        tags: ["психолог", "консультации", "терапия"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/psychologist"],
        creatorId: "user-138",
        services: ["индивидуальные консультации", "терапия", "поддержка", "онлайн консультации"],
        siteLink: "https://psychologist.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-140",
        userType: "business",
        title: "Диагностический центр 'Здоровье'",
        description:
            "Полная диагностика организма. Современное оборудование, опытные врачи. Полная диагностика организма. Современное оборудование, опытные врачи. Полная диагностика организма. Современное оборудование, опытные врачи.",
        imageUrls: generateGalleryImages(140),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 140, 400) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "diagnostic-centers",
        languages: ["ru", "uk"],
        tags: ["диагностика", "обследование", "здоровье"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/diagnostic"],
        creatorId: "user-139",
        services: ["диагностика", "обследование", "анализы", "УЗИ", "МРТ"],
        siteLink: "https://diagnostic.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-141",
        userType: "business",
        title: "Медицинский диагностический центр",
        description:
            "Комплексная диагностика и обследование. Лабораторные анализы, инструментальная диагностика. Комплексная диагностика и обследование. Лабораторные анализы, инструментальная диагностика. Комплексная диагностика и обследование. Лабораторные анализы, инструментальная диагностика.",
        imageUrls: generateGalleryImages(141),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 141, 400) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "diagnostic-centers",
        languages: ["ru"],
        tags: ["диагностика", "медицина", "обследование"],
        workingHours: [
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "07:00", end: "19:00" },
            { start: "08:00", end: "17:00" },
            { start: "09:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/medicaldiagnostic"],
        creatorId: "user-140",
        services: ["комплексная диагностика", "лабораторные анализы", "УЗИ", "КТ", "МРТ"],
        siteLink: "https://medicaldiagnostic.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-142",
        userType: "business",
        title: "Реабилитационный центр 'Восстановление'",
        description:
            "Реабилитация после травм и операций. Физиотерапия, массаж, ЛФК. Реабилитация после травм и операций. Физиотерапия, массаж, ЛФК. Реабилитация после травм и операций. Физиотерапия, массаж, ЛФК.",
        imageUrls: generateGalleryImages(142),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 142, 400) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "rehabilitation-centers",
        languages: ["ru", "uk"],
        tags: ["реабилитация", "восстановление", "физиотерапия"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/rehabilitation"],
        creatorId: "user-141",
        services: ["реабилитация", "физиотерапия", "массаж", "ЛФК", "восстановление"],
        siteLink: "https://rehabilitation.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-143",
        userType: "business",
        title: "Центр реабилитации 'Новая жизнь'",
        description:
            "Профессиональная реабилитация и восстановление. Индивидуальные программы. Профессиональная реабилитация и восстановление. Индивидуальные программы. Профессиональная реабилитация и восстановление. Индивидуальные программы.",
        imageUrls: generateGalleryImages(143),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 143, 400) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "rehabilitation-centers",
        languages: ["ru"],
        tags: ["реабилитация", "восстановление", "здоровье"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "17:00" },
            { start: "11:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/newlife"],
        creatorId: "user-142",
        services: ["реабилитация", "восстановление", "физиотерапия", "массаж", "индивидуальные программы"],
        siteLink: "https://newlife.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-144",
        userType: "business",
        title: "Массаж и физиотерапия 'Релакс'",
        description:
            "Лечебный массаж и физиотерапевтические процедуры. Опытные специалисты. Лечебный массаж и физиотерапевтические процедуры. Опытные специалисты. Лечебный массаж и физиотерапевтические процедуры. Опытные специалисты.",
        imageUrls: generateGalleryImages(144),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 144, 400) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "massage-physiotherapy",
        languages: ["ru", "uk"],
        tags: ["массаж", "физиотерапия", "лечение"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/relax"],
        creatorId: "user-143",
        services: ["лечебный массаж", "физиотерапия", "релаксация", "восстановление"],
        siteLink: "https://relax.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-145",
        userType: "business",
        title: "Физиотерапия и лечебный массаж",
        description:
            "Профессиональные физиотерапевтические процедуры и лечебный массаж. Профессиональные физиотерапевтические процедуры и лечебный массаж. Профессиональные физиотерапевтические процедуры и лечебный массаж.",
        imageUrls: generateGalleryImages(145),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 145, 400) as [number, number]; })() as [
            number,
            number
        ],
        category: "health",
        subcategory: "massage-physiotherapy",
        languages: ["ru"],
        tags: ["физиотерапия", "массаж", "лечение"],
        workingHours: [
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/physiotherapy"],
        creatorId: "user-144",
        services: ["физиотерапия", "лечебный массаж", "реабилитация", "восстановление"],
        siteLink: "https://physiotherapy.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-146",
        userType: "business",
        title: "Туризм и походы 'Приключение'",
        description:
            "Организация походов и туристических маршрутов. Пешие, горные, водные походы. Организация походов и туристических маршрутов. Пешие, горные, водные походы. Организация походов и туристических маршрутов. Пешие, горные, водные походы.",
        imageUrls: generateGalleryImages(146),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 146, 500) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "tourism-hiking",
        languages: ["ru", "uk"],
        tags: ["туризм", "походы", "приключения"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/adventure"],
        creatorId: "user-145",
        services: ["походы", "туристические маршруты", "снаряжение", "гиды", "организация"],
        siteLink: "https://adventure.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-147",
        userType: "business",
        title: "Горные походы и туризм",
        description:
            "Организация горных походов и туристических экспедиций. Опытные гиды, безопасность. Организация горных походов и туристических экспедиций. Опытные гиды, безопасность. Организация горных походов и туристических экспедиций. Опытные гиды, безопасность.",
        imageUrls: generateGalleryImages(147),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 147, 500) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "tourism-hiking",
        languages: ["ru"],
        tags: ["горные походы", "туризм", "экспедиции"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
            { start: "11:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/mountainhiking"],
        creatorId: "user-146",
        services: ["горные походы", "экспедиции", "гиды", "снаряжение", "безопасность"],
        siteLink: "https://mountainhiking.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-148",
        userType: "business",
        title: "Водные виды спорта 'Волна'",
        description:
            "Аренда оборудования для водных видов спорта. Кайтсерфинг, виндсерфинг, паддлбординг. Аренда оборудования для водных видов спорта. Кайтсерфинг, виндсерфинг, паддлбординг. Аренда оборудования для водных видов спорта. Кайтсерфинг, виндсерфинг, паддлбординг.",
        imageUrls: generateGalleryImages(148),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 148, 500) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "water-sports",
        languages: ["ru", "uk"],
        tags: ["водные виды спорта", "кайтсерфинг", "виндсерфинг"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
            { start: "11:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/wave"],
        creatorId: "user-147",
        services: ["аренда оборудования", "кайтсерфинг", "виндсерфинг", "паддлбординг", "обучение"],
        siteLink: "https://wave.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-149",
        userType: "business",
        title: "Водный спорт и активный отдых",
        description:
            "Водные виды спорта и активный отдых на воде. Обучение, аренда, организация мероприятий. Водные виды спорта и активный отдых на воде. Обучение, аренда, организация мероприятий. Водные виды спорта и активный отдых на воде. Обучение, аренда, организация мероприятий.",
        imageUrls: generateGalleryImages(149),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 149, 500) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "water-sports",
        languages: ["ru"],
        tags: ["водный спорт", "активный отдых", "обучение"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/watersports"],
        creatorId: "user-148",
        services: ["водные виды спорта", "обучение", "аренда", "организация мероприятий"],
        siteLink: "https://watersports.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-150",
        userType: "business",
        title: "Клубы по интересам 'Единомышленники'",
        description:
            "Организация клубов по интересам. Книжные, музыкальные, творческие клубы. Организация клубов по интересам. Книжные, музыкальные, творческие клубы. Организация клубов по интересам. Книжные, музыкальные, творческие клубы.",
        imageUrls: generateGalleryImages(150),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 150, 500) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "interest-clubs",
        languages: ["ru", "uk"],
        tags: ["клубы", "интересы", "сообщество"],
        workingHours: [
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "10:00", end: "21:00" },
            { start: "11:00", end: "20:00" },
            { start: "12:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://facebook.com/clubs"],
        creatorId: "user-149",
        services: ["клубы по интересам", "книжные клубы", "музыкальные клубы", "творческие клубы", "организация"],
        siteLink: "https://clubs.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-151",
        userType: "business",
        title: "Клубы и сообщества 'Вместе'",
        description:
            "Создание и организация клубов по интересам. Объединение единомышленников. Создание и организация клубов по интересам. Объединение единомышленников. Создание и организация клубов по интересам. Объединение единомышленников.",
        imageUrls: generateGalleryImages(151),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 151, 500) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "interest-clubs",
        languages: ["ru"],
        tags: ["клубы", "сообщества", "интересы"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/together"],
        creatorId: "user-150",
        services: ["организация клубов", "сообщества", "мероприятия", "встречи"],
        siteLink: "https://together.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-152",
        userType: "business",
        title: "Экстремальные виды спорта 'Адреналин'",
        description:
            "Организация экстремальных видов спорта. Скалолазание, парапланеризм, бейсджампинг. Организация экстремальных видов спорта. Скалолазание, парапланеризм, бейсджампинг. Организация экстремальных видов спорта. Скалолазание, парапланеризм, бейсджампинг.",
        imageUrls: generateGalleryImages(152),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 152, 500) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "extreme-sports",
        languages: ["ru", "uk"],
        tags: ["экстремальный спорт", "адреналин", "приключения"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/adrenaline"],
        creatorId: "user-151",
        services: ["экстремальные виды спорта", "скалолазание", "парапланеризм", "обучение", "снаряжение"],
        siteLink: "https://adrenaline.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-153",
        userType: "business",
        title: "Экстремальный спорт 'Экстрим'",
        description:
            "Организация экстремальных спортивных мероприятий. Безопасность и профессионализм. Организация экстремальных спортивных мероприятий. Безопасность и профессионализм. Организация экстремальных спортивных мероприятий. Безопасность и профессионализм.",
        imageUrls: generateGalleryImages(153),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 153, 500) as [number, number]; })() as [
            number,
            number
        ],
        category: "sports",
        subcategory: "extreme-sports",
        languages: ["ru"],
        tags: ["экстремальный спорт", "безопасность", "профессионализм"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
            { start: "11:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/extreme"],
        creatorId: "user-152",
        services: ["экстремальные мероприятия", "обучение", "снаряжение", "безопасность", "инструкторы"],
        siteLink: "https://extreme.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-154",
        userType: "business",
        title: "Работа и вакансии 'Карьера'",
        description:
            "Подбор персонала и поиск работы. Вакансии в различных сферах. Подбор персонала и поиск работы. Вакансии в различных сферах. Подбор персонала и поиск работы. Вакансии в различных сферах.",
        imageUrls: generateGalleryImages(154),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 154, 600) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "jobs-vacancies",
        languages: ["ru", "uk"],
        tags: ["работа", "вакансии", "карьера"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/career"],
        creatorId: "user-153",
        services: ["подбор персонала", "поиск работы", "вакансии", "резюме", "консультации"],
        siteLink: "https://career.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-155",
        userType: "business",
        title: "Кадровое агентство 'Профи'",
        description:
            "Профессиональный подбор персонала. Работа с соискателями и работодателями. Профессиональный подбор персонала. Работа с соискателями и работодателями. Профессиональный подбор персонала. Работа с соискателями и работодателями.",
        imageUrls: generateGalleryImages(155),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 155, 600) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "jobs-vacancies",
        languages: ["ru"],
        tags: ["кадровое агентство", "подбор персонала", "вакансии"],
        workingHours: [
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/profihr"],
        creatorId: "user-154",
        services: ["подбор персонала", "рекрутинг", "вакансии", "консультации", "тестирование"],
        siteLink: "https://profihr.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-156",
        userType: "business",
        title: "Бизнес-семинары 'Успех'",
        description:
            "Организация бизнес-семинаров и тренингов. Развитие бизнес-навыков. Организация бизнес-семинаров и тренингов. Развитие бизнес-навыков. Организация бизнес-семинаров и тренингов. Развитие бизнес-навыков.",
        imageUrls: generateGalleryImages(156),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 156, 600) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "business-seminars",
        languages: ["ru", "uk"],
        tags: ["бизнес-семинары", "тренинги", "развитие"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "18:00" },
            { start: "11:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/success"],
        creatorId: "user-155",
        services: ["бизнес-семинары", "тренинги", "обучение", "консультации", "организация"],
        siteLink: "https://success.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-157",
        userType: "business",
        title: "Бизнес-образование 'Лидер'",
        description:
            "Семинары и тренинги по бизнесу. Развитие лидерских качеств и бизнес-навыков. Семинары и тренинги по бизнесу. Развитие лидерских качеств и бизнес-навыков. Семинары и тренинги по бизнесу. Развитие лидерских качеств и бизнес-навыков.",
        imageUrls: generateGalleryImages(157),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 157, 600) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "business-seminars",
        languages: ["ru"],
        tags: ["бизнес-образование", "семинары", "лидерство"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
            { start: "12:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/leader"],
        creatorId: "user-156",
        services: ["семинары", "тренинги", "лидерство", "бизнес-навыки", "коучинг"],
        siteLink: "https://leader.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-158",
        userType: "business",
        title: "Консалтинг и коучинг 'Развитие'",
        description:
            "Бизнес-консалтинг и персональный коучинг. Развитие бизнеса и личностный рост. Бизнес-консалтинг и персональный коучинг. Развитие бизнеса и личностный рост. Бизнес-консалтинг и персональный коучинг. Развитие бизнеса и личностный рост.",
        imageUrls: generateGalleryImages(158),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 158, 600) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "consulting-coaching",
        languages: ["ru", "uk"],
        tags: ["консалтинг", "коучинг", "развитие"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "18:00" },
            { start: "11:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/development"],
        creatorId: "user-157",
        services: ["бизнес-консалтинг", "коучинг", "развитие бизнеса", "личностный рост", "консультации"],
        siteLink: "https://development.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-159",
        userType: "individual",
        title: "Бизнес-коуч и консультант",
        description:
            "Персональный бизнес-коучинг и консалтинг. Помощь в развитии бизнеса. Персональный бизнес-коучинг и консалтинг. Помощь в развитии бизнеса. Персональный бизнес-коучинг и консалтинг. Помощь в развитии бизнеса.",
        imageUrls: generateGalleryImages(159),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 159, 600) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "consulting-coaching",
        languages: ["ru"],
        tags: ["коучинг", "консалтинг", "бизнес"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
            null,
        ],
        socialMediaUrls: ["https://linkedin.com/coach"],
        creatorId: "user-158",
        services: ["бизнес-коучинг", "консалтинг", "развитие бизнеса", "стратегия", "онлайн консультации"],
        siteLink: "https://coach.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-160",
        userType: "business",
        title: "Онлайн-образование 'Учись онлайн'",
        description:
            "Онлайн-курсы и обучение. Широкий выбор программ и направлений. Онлайн-курсы и обучение. Широкий выбор программ и направлений. Онлайн-курсы и обучение. Широкий выбор программ и направлений.",
        imageUrls: generateGalleryImages(160),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 160, 600) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "online-education",
        languages: ["ru", "uk"],
        tags: ["онлайн-образование", "курсы", "обучение"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/onlinelearning"],
        creatorId: "user-159",
        services: ["онлайн-курсы", "обучение", "вебинары", "консультации", "сертификаты"],
        siteLink: "https://onlinelearning.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-161",
        userType: "business",
        title: "Платформа онлайн-обучения",
        description:
            "Онлайн-платформа для обучения. Курсы, вебинары, тренинги. Доступ 24/7. Онлайн-платформа для обучения. Курсы, вебинары, тренинги. Доступ 24/7. Онлайн-платформа для обучения. Курсы, вебинары, тренинги. Доступ 24/7.",
        imageUrls: generateGalleryImages(161),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 161, 600) as [number, number]; })() as [
            number,
            number
        ],
        category: "work",
        subcategory: "online-education",
        languages: ["ru"],
        tags: ["онлайн-платформа", "обучение", "курсы"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/onlineplatform"],
        creatorId: "user-160",
        services: ["онлайн-платформа", "курсы", "вебинары", "тренинги", "сертификаты"],
        siteLink: "https://onlineplatform.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-162",
        userType: "business",
        title: "Семейные мероприятия 'Вместе'",
        description:
            "Организация семейных мероприятий и праздников. Создание незабываемых моментов. Организация семейных мероприятий и праздников. Создание незабываемых моментов. Организация семейных мероприятий и праздников. Создание незабываемых моментов.",
        imageUrls: generateGalleryImages(162),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 162, 700) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "family-events",
        languages: ["ru", "uk"],
        tags: ["семейные мероприятия", "праздники", "организация"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/familytogether"],
        creatorId: "user-161",
        services: ["семейные мероприятия", "праздники", "организация", "кейтеринг", "декорации"],
        siteLink: "https://familytogether.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-163",
        userType: "business",
        title: "Организация семейных праздников",
        description:
            "Полная организация семейных праздников и мероприятий. От идеи до реализации. Полная организация семейных праздников и мероприятий. От идеи до реализации. Полная организация семейных праздников и мероприятий. От идеи до реализации.",
        imageUrls: generateGalleryImages(163),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 163, 700) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "family-events",
        languages: ["ru"],
        tags: ["семейные праздники", "организация", "мероприятия"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
            { start: "12:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/familyevents"],
        creatorId: "user-162",
        services: ["организация праздников", "мероприятия", "кейтеринг", "декорации", "фотосъемка"],
        siteLink: "https://familyevents.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-164",
        userType: "business",
        title: "Детские праздники 'Радость'",
        description:
            "Организация детских праздников и дней рождений. Аниматоры, кейтеринг, развлечения. Организация детских праздников и дней рождений. Аниматоры, кейтеринг, развлечения. Организация детских праздников и дней рождений. Аниматоры, кейтеринг, развлечения.",
        imageUrls: generateGalleryImages(164),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 164, 700) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "children-parties",
        languages: ["ru", "uk"],
        tags: ["детские праздники", "дни рождения", "аниматоры"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/joykids"],
        creatorId: "user-163",
        services: ["детские праздники", "аниматоры", "кейтеринг", "развлечения", "декорации"],
        siteLink: "https://joykids.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-165",
        userType: "business",
        title: "Детские праздники 'Сказка'",
        description:
            "Волшебные детские праздники с аниматорами и развлечениями. Незабываемые моменты. Волшебные детские праздники с аниматорами и развлечениями. Незабываемые моменты. Волшебные детские праздники с аниматорами и развлечениями. Незабываемые моменты.",
        imageUrls: generateGalleryImages(165),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 165, 700) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "children-parties",
        languages: ["ru"],
        tags: ["детские праздники", "сказка", "аниматоры"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
            { start: "12:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/fairytale"],
        creatorId: "user-164",
        services: ["детские праздники", "аниматоры", "развлечения", "кейтеринг", "декорации"],
        siteLink: "https://fairytale.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-166",
        userType: "business",
        title: "Летние лагеря 'Приключение'",
        description:
            "Организация летних лагерей для детей. Спорт, творчество, развитие. Организация летних лагерей для детей. Спорт, творчество, развитие. Организация летних лагерей для детей. Спорт, творчество, развитие.",
        imageUrls: generateGalleryImages(166),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 166, 700) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "summer-camps",
        languages: ["ru", "uk"],
        tags: ["летние лагеря", "дети", "приключения"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/summercamp"],
        creatorId: "user-165",
        services: ["летние лагеря", "спорт", "творчество", "развитие", "организация"],
        siteLink: "https://summercamp.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-167",
        userType: "business",
        title: "Детский летний лагерь 'Солнышко'",
        description:
            "Летний лагерь для детей с развивающими программами. Безопасность и веселье. Летний лагерь для детей с развивающими программами. Безопасность и веселье. Летний лагерь для детей с развивающими программами. Безопасность и веселье.",
        imageUrls: generateGalleryImages(167),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 167, 700) as [number, number]; })() as [
            number,
            number
        ],
        category: "family",
        subcategory: "summer-camps",
        languages: ["ru"],
        tags: ["летний лагерь", "дети", "развитие"],
        workingHours: [
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://facebook.com/sunshinecamp"],
        creatorId: "user-166",
        services: ["летний лагерь", "развивающие программы", "спорт", "творчество", "безопасность"],
        siteLink: "https://sunshinecamp.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-168",
        userType: "business",
        title: "Цифровой маркетинг 'Маркет'",
        description:
            "Комплексные услуги по цифровому маркетингу. SMM, контент-маркетинг, реклама. Комплексные услуги по цифровому маркетингу. SMM, контент-маркетинг, реклама. Комплексные услуги по цифровому маркетингу. SMM, контент-маркетинг, реклама.",
        imageUrls: generateGalleryImages(168),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 168, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "digital-marketing",
        languages: ["ru", "uk"],
        tags: ["цифровой маркетинг", "SMM", "реклама"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/marketing"],
        creatorId: "user-167",
        services: ["цифровой маркетинг", "SMM", "контент-маркетинг", "реклама", "аналитика"],
        siteLink: "https://marketing.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-169",
        userType: "business",
        title: "Агентство цифрового маркетинга",
        description:
            "Профессиональный цифровой маркетинг для бизнеса. Увеличение продаж и узнаваемости. Профессиональный цифровой маркетинг для бизнеса. Увеличение продаж и узнаваемости. Профессиональный цифровой маркетинг для бизнеса. Увеличение продаж и узнаваемости.",
        imageUrls: generateGalleryImages(169),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 169, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "digital-marketing",
        languages: ["ru"],
        tags: ["цифровой маркетинг", "реклама", "продвижение"],
        workingHours: [
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/digitalagency"],
        creatorId: "user-168",
        services: ["цифровой маркетинг", "реклама", "SMM", "контент", "аналитика"],
        siteLink: "https://digitalagency.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-170",
        userType: "business",
        title: "SEO и продвижение 'Топ'",
        description:
            "SEO-оптимизация и продвижение сайтов. Вывод в топ поисковых систем. SEO-оптимизация и продвижение сайтов. Вывод в топ поисковых систем. SEO-оптимизация и продвижение сайтов. Вывод в топ поисковых систем.",
        imageUrls: generateGalleryImages(170),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 170, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "seo-promotion",
        languages: ["ru", "uk"],
        tags: ["SEO", "продвижение", "оптимизация"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/seo"],
        creatorId: "user-169",
        services: ["SEO-оптимизация", "продвижение сайтов", "контент", "аналитика", "ссылки"],
        siteLink: "https://seo.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-171",
        userType: "business",
        title: "SEO-агентство 'Продвижение'",
        description:
            "Профессиональное SEO и продвижение. Увеличение органического трафика. Профессиональное SEO и продвижение. Увеличение органического трафика. Профессиональное SEO и продвижение. Увеличение органического трафика.",
        imageUrls: generateGalleryImages(171),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 171, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "seo-promotion",
        languages: ["ru"],
        tags: ["SEO", "продвижение", "трафик"],
        workingHours: [
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/seoagency"],
        creatorId: "user-170",
        services: ["SEO", "продвижение", "оптимизация", "аналитика", "отчеты"],
        siteLink: "https://seoagency.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-172",
        userType: "business",
        title: "Техническая поддержка 'Техподдержка 24/7'",
        description:
            "Круглосуточная техническая поддержка. Помощь с компьютерами, программами, сетью. Круглосуточная техническая поддержка. Помощь с компьютерами, программами, сетью. Круглосуточная техническая поддержка. Помощь с компьютерами, программами, сетью.",
        imageUrls: generateGalleryImages(172),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 172, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "tech-support",
        languages: ["ru", "uk"],
        tags: ["техподдержка", "помощь", "компьютеры"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/techsupport"],
        creatorId: "user-171",
        services: ["техподдержка", "ремонт компьютеров", "настройка", "установка программ", "сеть"],
        siteLink: "https://techsupport.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-173",
        userType: "business",
        title: "IT-поддержка и обслуживание",
        description:
            "Техническая поддержка и обслуживание IT-инфраструктуры. Быстрое решение проблем. Техническая поддержка и обслуживание IT-инфраструктуры. Быстрое решение проблем. Техническая поддержка и обслуживание IT-инфраструктуры. Быстрое решение проблем.",
        imageUrls: generateGalleryImages(173),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 173, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "technology",
        subcategory: "tech-support",
        languages: ["ru"],
        tags: ["IT-поддержка", "обслуживание", "техника"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
        ],
        socialMediaUrls: ["https://facebook.com/itsupport"],
        creatorId: "user-172",
        services: ["IT-поддержка", "обслуживание", "настройка", "ремонт", "консультации"],
        siteLink: "https://itsupport.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-174",
        userType: "business",
        title: "Налоговое консультирование 'Налоги'",
        description:
            "Налоговые консультации и помощь в оформлении документов. Опытные специалисты. Налоговые консультации и помощь в оформлении документов. Опытные специалисты. Налоговые консультации и помощь в оформлении документов. Опытные специалисты.",
        imageUrls: generateGalleryImages(174),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 174, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "tax-consulting",
        languages: ["ru", "uk"],
        tags: ["налоги", "консультации", "документы"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/tax"],
        creatorId: "user-173",
        services: ["налоговые консультации", "оформление документов", "отчетность", "помощь"],
        siteLink: "https://tax.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-175",
        userType: "business",
        title: "Налоговый консультант",
        description:
            "Профессиональные налоговые консультации для бизнеса и частных лиц. Профессиональные налоговые консультации для бизнеса и частных лиц. Профессиональные налоговые консультации для бизнеса и частных лиц.",
        imageUrls: generateGalleryImages(175),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 175, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "tax-consulting",
        languages: ["ru"],
        tags: ["налоговый консультант", "налоги", "консультации"],
        workingHours: [
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/taxconsultant"],
        creatorId: "user-174",
        services: ["налоговые консультации", "помощь с налогами", "оформление", "отчетность"],
        siteLink: "https://taxconsultant.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-176",
        userType: "business",
        title: "Финансовый консалтинг 'Финансы'",
        description:
            "Финансовое планирование и консалтинг. Помощь в управлении финансами. Финансовое планирование и консалтинг. Помощь в управлении финансами. Финансовое планирование и консалтинг. Помощь в управлении финансами.",
        imageUrls: generateGalleryImages(176),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 176, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "financial-consulting",
        languages: ["ru", "uk"],
        tags: ["финансовый консалтинг", "планирование", "финансы"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            null,
            null,
        ],
        socialMediaUrls: ["https://facebook.com/finance"],
        creatorId: "user-175",
        services: ["финансовое планирование", "консалтинг", "управление финансами", "инвестиции"],
        siteLink: "https://finance.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-177",
        userType: "business",
        title: "Финансовый консультант",
        description:
            "Профессиональные финансовые консультации. Планирование, инвестиции, управление. Профессиональные финансовые консультации. Планирование, инвестиции, управление. Профессиональные финансовые консультации. Планирование, инвестиции, управление.",
        imageUrls: generateGalleryImages(177),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 177, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "financial-consulting",
        languages: ["ru"],
        tags: ["финансовый консультант", "консультации", "инвестиции"],
        workingHours: [
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "08:00", end: "19:00" },
            { start: "09:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/financialconsultant"],
        creatorId: "user-176",
        services: ["финансовые консультации", "планирование", "инвестиции", "управление"],
        siteLink: "https://financialconsultant.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-178",
        userType: "business",
        title: "Нотариальные услуги 'Нотариус'",
        description:
            "Нотариальные услуги и заверение документов. Опытный нотариус. Нотариальные услуги и заверение документов. Опытный нотариус. Нотариальные услуги и заверение документов. Опытный нотариус.",
        imageUrls: generateGalleryImages(178),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 178, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "notary-services",
        languages: ["ru", "uk"],
        tags: ["нотариус", "документы", "заверение"],
        workingHours: [
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "09:00", end: "17:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/notary"],
        creatorId: "user-177",
        services: ["нотариальные услуги", "заверение документов", "консультации"],
        siteLink: "https://notary.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-179",
        userType: "business",
        title: "Нотариальная контора",
        description:
            "Полный спектр нотариальных услуг. Заверение документов, сделки, консультации. Полный спектр нотариальных услуг. Заверение документов, сделки, консультации. Полный спектр нотариальных услуг. Заверение документов, сделки, консультации.",
        imageUrls: generateGalleryImages(179),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 179, 800) as [number, number]; })() as [
            number,
            number
        ],
        category: "finance",
        subcategory: "notary-services",
        languages: ["ru"],
        tags: ["нотариальная контора", "документы", "сделки"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/notaryoffice"],
        creatorId: "user-178",
        services: ["нотариальные услуги", "заверение", "сделки", "консультации"],
        siteLink: "https://notaryoffice.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-180",
        userType: "business",
        title: "Такси и каршеринг 'Быстро'",
        description:
            "Услуги такси и каршеринга. Быстрая подача, комфортные автомобили. Услуги такси и каршеринга. Быстрая подача, комфортные автомобили. Услуги такси и каршеринга. Быстрая подача, комфортные автомобили.",
        imageUrls: generateGalleryImages(180),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 180, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "taxi-carsharing",
        languages: ["ru", "uk"],
        tags: ["такси", "каршеринг", "транспорт"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/taxi"],
        creatorId: "user-179",
        services: ["такси", "каршеринг", "трансфер", "доставка"],
        siteLink: "https://taxi.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-181",
        userType: "business",
        title: "Каршеринг и такси 'Комфорт'",
        description:
            "Каршеринг и такси премиум-класса. Комфортные автомобили, профессиональные водители. Каршеринг и такси премиум-класса. Комфортные автомобили, профессиональные водители. Каршеринг и такси премиум-класса. Комфортные автомобили, профессиональные водители.",
        imageUrls: generateGalleryImages(181),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 181, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "taxi-carsharing",
        languages: ["ru"],
        tags: ["каршеринг", "такси", "комфорт"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/carsharing"],
        creatorId: "user-180",
        services: ["каршеринг", "такси", "трансфер", "VIP-услуги"],
        siteLink: "https://carsharing.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-182",
        userType: "business",
        title: "Авиаперевозки 'Небо'",
        description:
            "Организация авиаперевозок грузов и пассажиров. Международные и внутренние рейсы. Организация авиаперевозок грузов и пассажиров. Международные и внутренние рейсы. Организация авиаперевозок грузов и пассажиров. Международные и внутренние рейсы.",
        imageUrls: generateGalleryImages(182),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 182, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "air-transport",
        languages: ["ru", "uk"],
        tags: ["авиаперевозки", "груз", "пассажиры"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/airtransport"],
        creatorId: "user-181",
        services: ["авиаперевозки", "груз", "пассажиры", "логистика", "таможня"],
        siteLink: "https://airtransport.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-183",
        userType: "business",
        title: "Авиационная логистика",
        description:
            "Профессиональные авиаперевозки грузов. Быстро, надежно, безопасно. Профессиональные авиаперевозки грузов. Быстро, надежно, безопасно. Профессиональные авиаперевозки грузов. Быстро, надежно, безопасно.",
        imageUrls: generateGalleryImages(183),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 183, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "air-transport",
        languages: ["ru"],
        tags: ["авиаперевозки", "логистика", "груз"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/airlogistics"],
        creatorId: "user-182",
        services: ["авиаперевозки", "логистика", "груз", "таможня", "документы"],
        siteLink: "https://airlogistics.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-184",
        userType: "business",
        title: "Железнодорожные перевозки 'Рельсы'",
        description:
            "Организация железнодорожных перевозок грузов. Надежно и выгодно. Организация железнодорожных перевозок грузов. Надежно и выгодно. Организация железнодорожных перевозок грузов. Надежно и выгодно.",
        imageUrls: generateGalleryImages(184),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 184, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "rail-transport",
        languages: ["ru", "uk"],
        tags: ["железнодорожные перевозки", "груз", "логистика"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/railtransport"],
        creatorId: "user-183",
        services: ["железнодорожные перевозки", "груз", "логистика", "документы"],
        siteLink: "https://railtransport.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-185",
        userType: "business",
        title: "Железнодорожная логистика",
        description:
            "Профессиональные железнодорожные перевозки. Большие объемы, выгодные тарифы. Профессиональные железнодорожные перевозки. Большие объемы, выгодные тарифы. Профессиональные железнодорожные перевозки. Большие объемы, выгодные тарифы.",
        imageUrls: generateGalleryImages(185),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 185, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "rail-transport",
        languages: ["ru"],
        tags: ["железнодорожная логистика", "перевозки", "груз"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/raillogistics"],
        creatorId: "user-184",
        services: ["железнодорожные перевозки", "логистика", "груз", "тарифы"],
        siteLink: "https://raillogistics.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-186",
        userType: "business",
        title: "Морские перевозки 'Волна'",
        description:
            "Организация морских перевозок грузов. Контейнерные и навалочные перевозки. Организация морских перевозок грузов. Контейнерные и навалочные перевозки. Организация морских перевозок грузов. Контейнерные и навалочные перевозки.",
        imageUrls: generateGalleryImages(186),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 186, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "sea-transport",
        languages: ["ru", "uk"],
        tags: ["морские перевозки", "груз", "контейнеры"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/se transport"],
        creatorId: "user-185",
        services: ["морские перевозки", "контейнеры", "груз", "логистика", "таможня"],
        siteLink: "https://seatransport.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-187",
        userType: "business",
        title: "Морская логистика и перевозки",
        description:
            "Профессиональные морские перевозки. Международные маршруты, надежная доставка. Профессиональные морские перевозки. Международные маршруты, надежная доставка. Профессиональные морские перевозки. Международные маршруты, надежная доставка.",
        imageUrls: generateGalleryImages(187),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 187, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "transport",
        subcategory: "sea-transport",
        languages: ["ru"],
        tags: ["морская логистика", "перевозки", "груз"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "17:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/sealogistics"],
        creatorId: "user-186",
        services: ["морские перевозки", "логистика", "контейнеры", "таможня", "документы"],
        siteLink: "https://sealogistics.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-188",
        userType: "business",
        title: "Гостевой дом 'Уют'",
        description:
            "Уютный гостевой дом в центре города. Комфортные номера, домашняя атмосфера. Уютный гостевой дом в центре города. Комфортные номера, домашняя атмосфера. Уютный гостевой дом в центре города. Комфортные номера, домашняя атмосфера.",
        imageUrls: generateGalleryImages(188),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 188, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "hospitality",
        subcategory: "guest-houses",
        languages: ["ru", "uk"],
        tags: ["гостевой дом", "размещение", "уют"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/guesthouse"],
        creatorId: "user-187",
        services: ["номера", "завтрак", "Wi-Fi", "парковка", "бронирование"],
        siteLink: "https://guesthouse.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-189",
        userType: "business",
        title: "Гостевой дом 'Домашний'",
        description:
            "Гостевой дом с домашней атмосферой. Уютные номера, завтрак включен. Гостевой дом с домашней атмосферой. Уютные номера, завтрак включен. Гостевой дом с домашней атмосферой. Уютные номера, завтрак включен.",
        imageUrls: generateGalleryImages(189),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 189, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "hospitality",
        subcategory: "guest-houses",
        languages: ["ru"],
        tags: ["гостевой дом", "домашняя атмосфера", "уют"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/homeguesthouse"],
        creatorId: "user-188",
        services: ["номера", "завтрак", "Wi-Fi", "кухня", "бронирование"],
        siteLink: "https://homeguesthouse.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-190",
        userType: "business",
        title: "Аренда жилья на короткий срок 'Квартира'",
        description:
            "Аренда квартир и апартаментов на короткий срок. Удобное расположение, полностью оборудованные. Аренда квартир и апартаментов на короткий срок. Удобное расположение, полностью оборудованные. Аренда квартир и апартаментов на короткий срок. Удобное расположение, полностью оборудованные.",
        imageUrls: generateGalleryImages(190),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 190, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "hospitality",
        subcategory: "short-term-rental",
        languages: ["ru", "uk"],
        tags: ["аренда", "квартиры", "апартаменты"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/shortrental"],
        creatorId: "user-189",
        services: ["аренда квартир", "апартаменты", "бронирование", "Wi-Fi", "бытовая техника"],
        siteLink: "https://shortrental.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-191",
        userType: "business",
        title: "Краткосрочная аренда 'Комфорт'",
        description:
            "Аренда жилья на день, неделю, месяц. Комфортные условия, выгодные цены. Аренда жилья на день, неделю, месяц. Комфортные условия, выгодные цены. Аренда жилья на день, неделю, месяц. Комфортные условия, выгодные цены.",
        imageUrls: generateGalleryImages(191),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 191, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "hospitality",
        subcategory: "short-term-rental",
        languages: ["ru"],
        tags: ["краткосрочная аренда", "жилье", "комфорт"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/comfortrental"],
        creatorId: "user-190",
        services: ["аренда жилья", "квартиры", "апартаменты", "бронирование", "Wi-Fi"],
        siteLink: "https://comfortrental.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-192",
        userType: "business",
        title: "Туристическая база 'Отдых'",
        description:
            "Туристическая база для активного отдыха. Кемпинг, домики, палатки. Туристическая база для активного отдыха. Кемпинг, домики, палатки. Туристическая база для активного отдыха. Кемпинг, домики, палатки.",
        imageUrls: generateGalleryImages(192),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 192, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "hospitality",
        subcategory: "tourist-bases",
        languages: ["ru", "uk"],
        tags: ["туристическая база", "кемпинг", "отдых"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/touristbase"],
        creatorId: "user-191",
        services: ["кемпинг", "домики", "палатки", "инфраструктура", "бронирование"],
        siteLink: "https://touristbase.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-193",
        userType: "business",
        title: "Кемпинг и туристическая база",
        description:
            "Туристическая база с кемпингом. Природа, активный отдых, комфорт. Туристическая база с кемпингом. Природа, активный отдых, комфорт. Туристическая база с кемпингом. Природа, активный отдых, комфорт.",
        imageUrls: generateGalleryImages(193),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 193, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "hospitality",
        subcategory: "tourist-bases",
        languages: ["ru"],
        tags: ["кемпинг", "туристическая база", "природа"],
        workingHours: [
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
            { start: "00:00", end: "23:59" },
        ],
        socialMediaUrls: ["https://facebook.com/camping"],
        creatorId: "user-192",
        services: ["кемпинг", "домики", "инфраструктура", "активный отдых", "бронирование"],
        siteLink: "https://camping.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-194",
        userType: "business",
        title: "Дизайн и иллюстрация 'Креатив'",
        description:
            "Графический дизайн и иллюстрации. Логотипы, брендинг, иллюстрации для книг. Графический дизайн и иллюстрации. Логотипы, брендинг, иллюстрации для книг. Графический дизайн и иллюстрации. Логотипы, брендинг, иллюстрации для книг.",
        imageUrls: generateGalleryImages(194),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 194, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "art",
        subcategory: "design-illustration",
        languages: ["ru", "uk"],
        tags: ["дизайн", "иллюстрация", "графика"],
        workingHours: [
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/creative"],
        creatorId: "user-193",
        services: ["графический дизайн", "иллюстрации", "логотипы", "брендинг", "веб-дизайн"],
        siteLink: "https://creative.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-195",
        userType: "individual",
        title: "Графический дизайнер и иллюстратор",
        description:
            "Профессиональный графический дизайн и иллюстрации. Индивидуальный подход. Профессиональный графический дизайн и иллюстрации. Индивидуальный подход. Профессиональный графический дизайн и иллюстрации. Индивидуальный подход.",
        imageUrls: generateGalleryImages(195),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 195, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "art",
        subcategory: "design-illustration",
        languages: ["ru"],
        tags: ["графический дизайнер", "иллюстратор", "креатив"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "19:00" },
            null,
        ],
        socialMediaUrls: ["https://instagram.com/designer"],
        creatorId: "user-194",
        services: ["графический дизайн", "иллюстрации", "логотипы", "брендинг", "веб-дизайн"],
        siteLink: "https://designer.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-196",
        userType: "business",
        title: "Музыкальные уроки 'Мелодия'",
        description:
            "Обучение игре на музыкальных инструментах. Фортепиано, гитара, скрипка. Обучение игре на музыкальных инструментах. Фортепиано, гитара, скрипка. Обучение игре на музыкальных инструментах. Фортепиано, гитара, скрипка.",
        imageUrls: generateGalleryImages(196),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 196, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "art",
        subcategory: "music-lessons",
        languages: ["ru", "uk"],
        tags: ["музыкальные уроки", "обучение", "инструменты"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "19:00" },
            { start: "12:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/melody"],
        creatorId: "user-195",
        services: ["музыкальные уроки", "фортепиано", "гитара", "скрипка", "вокал"],
        siteLink: "https://melody.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-197",
        userType: "individual",
        title: "Музыкальная студия 'Звук'",
        description:
            "Музыкальные уроки и студийная запись. Опытные преподаватели, современное оборудование. Музыкальные уроки и студийная запись. Опытные преподаватели, современное оборудование. Музыкальные уроки и студийная запись. Опытные преподаватели, современное оборудование.",
        imageUrls: generateGalleryImages(197),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 197, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "art",
        subcategory: "music-lessons",
        languages: ["ru"],
        tags: ["музыкальная студия", "уроки", "запись"],
        workingHours: [
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://facebook.com/sound"],
        creatorId: "user-196",
        services: ["музыкальные уроки", "студийная запись", "обучение", "инструменты"],
        siteLink: "https://sound.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-198",
        userType: "business",
        title: "Мастерские и ремесла 'Ремесло'",
        description:
            "Мастерские по различным ремеслам. Керамика, дерево, текстиль. Мастерские по различным ремеслам. Керамика, дерево, текстиль. Мастерские по различным ремеслам. Керамика, дерево, текстиль.",
        imageUrls: generateGalleryImages(198),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 198, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "art",
        subcategory: "workshops-crafts",
        languages: ["ru", "uk"],
        tags: ["мастерские", "ремесла", "творчество"],
        workingHours: [
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
            { start: "12:00", end: "17:00" },
        ],
        socialMediaUrls: ["https://facebook.com/craft"],
        creatorId: "user-197",
        services: ["мастерские", "керамика", "дерево", "текстиль", "обучение"],
        siteLink: "https://craft.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-199",
        userType: "business",
        title: "Ремесленные мастерские",
        description:
            "Мастерские для обучения ремеслам. Гончарное дело, резьба по дереву, шитье. Мастерские для обучения ремеслам. Гончарное дело, резьба по дереву, шитье. Мастерские для обучения ремеслам. Гончарное дело, резьба по дереву, шитье.",
        imageUrls: generateGalleryImages(199),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 199, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "art",
        subcategory: "workshops-crafts",
        languages: ["ru"],
        tags: ["ремесленные мастерские", "обучение", "творчество"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/workshops"],
        creatorId: "user-198",
        services: ["мастерские", "гончарное дело", "резьба по дереву", "шитье", "обучение"],
        siteLink: "https://workshops.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-200",
        userType: "business",
        title: "Экологический ландшафтный дизайн 'Эко-сад'",
        description:
            "Экологический ландшафтный дизайн. Устойчивые решения, местные растения. Экологический ландшафтный дизайн. Устойчивые решения, местные растения. Экологический ландшафтный дизайн. Устойчивые решения, местные растения.",
        imageUrls: generateGalleryImages(200),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 200, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "eco",
        subcategory: "landscape-design-eco",
        languages: ["ru", "uk"],
        tags: ["ландшафтный дизайн", "экология", "устойчивость"],
        workingHours: [
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "08:00", end: "18:00" },
            { start: "09:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/ecogarden"],
        creatorId: "user-199",
        services: ["ландшафтный дизайн", "экология", "устойчивые решения", "местные растения"],
        siteLink: "https://ecogarden.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-201",
        userType: "business",
        title: "Экологический ландшафт",
        description:
            "Создание экологически устойчивых ландшафтов. Забота об окружающей среде. Создание экологически устойчивых ландшафтов. Забота об окружающей среде. Создание экологически устойчивых ландшафтов. Забота об окружающей среде.",
        imageUrls: generateGalleryImages(201),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 201, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "eco",
        subcategory: "landscape-design-eco",
        languages: ["ru"],
        tags: ["экологический ландшафт", "устойчивость", "природа"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/ecolandscape"],
        creatorId: "user-200",
        services: ["ландшафтный дизайн", "экология", "устойчивость", "озеленение"],
        siteLink: "https://ecolandscape.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-202",
        userType: "business",
        title: "Утилизация и переработка отходов 'Эко-чистота'",
        description:
            "Утилизация и переработка отходов. Экологически безопасные решения. Утилизация и переработка отходов. Экологически безопасные решения. Утилизация и переработка отходов. Экологически безопасные решения.",
        imageUrls: generateGalleryImages(202),
        location: (() => { const [lat, lng] = [48.2082, 16.3738]; return generateCoordinates(lat, lng, 202, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "eco",
        subcategory: "waste-recycling",
        languages: ["ru", "uk"],
        tags: ["утилизация", "переработка", "отходы"],
        workingHours: [
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "08:00", end: "17:00" },
            { start: "09:00", end: "15:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/ecoclean"],
        creatorId: "user-201",
        services: ["утилизация отходов", "переработка", "экология", "консультации"],
        siteLink: "https://ecoclean.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-203",
        userType: "business",
        title: "Переработка отходов 'Рециклинг'",
        description:
            "Профессиональная переработка и утилизация отходов. Экологически ответственный подход. Профессиональная переработка и утилизация отходов. Экологически ответственный подход. Профессиональная переработка и утилизация отходов. Экологически ответственный подход.",
        imageUrls: generateGalleryImages(203),
        location: (() => { const [lat, lng] = [41.3851, 2.1734]; return generateCoordinates(lat, lng, 203, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "eco",
        subcategory: "waste-recycling",
        languages: ["ru"],
        tags: ["переработка", "утилизация", "рециклинг"],
        workingHours: [
            { start: "07:00", end: "18:00" },
            { start: "07:00", end: "18:00" },
            { start: "07:00", end: "18:00" },
            { start: "07:00", end: "18:00" },
            { start: "07:00", end: "18:00" },
            { start: "08:00", end: "16:00" },
            null,
        ],
        socialMediaUrls: ["https://facebook.com/recycling"],
        creatorId: "user-202",
        services: ["переработка отходов", "утилизация", "рециклинг", "консультации"],
        siteLink: "https://recycling.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-204",
        userType: "business",
        title: "Передержка и питомник 'Дом для питомцев'",
        description:
            "Передержка животных и питомник. Забота, уход, безопасность. Передержка животных и питомник. Забота, уход, безопасность. Передержка животных и питомник. Забота, уход, безопасность.",
        imageUrls: generateGalleryImages(204),
        location: (() => { const [lat, lng] = [40.4168, -3.7038]; return generateCoordinates(lat, lng, 204, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "pet-boarding",
        languages: ["ru", "uk"],
        tags: ["передержка", "питомник", "животные"],
        workingHours: [
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
            { start: "10:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/pethome"],
        creatorId: "user-203",
        services: ["передержка", "питомник", "уход", "кормление", "выгул"],
        siteLink: "https://pethome.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-205",
        userType: "business",
        title: "Питомник и передержка 'Забота'",
        description:
            "Профессиональная передержка животных. Комфортные условия, опытные специалисты. Профессиональная передержка животных. Комфортные условия, опытные специалисты. Профессиональная передержка животных. Комфортные условия, опытные специалисты.",
        imageUrls: generateGalleryImages(205),
        location: (() => { const [lat, lng] = [50.0755, 14.4378]; return generateCoordinates(lat, lng, 205, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "pet-boarding",
        languages: ["ru"],
        tags: ["питомник", "передержка", "забота"],
        workingHours: [
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://facebook.com/care"],
        creatorId: "user-204",
        services: ["передержка", "питомник", "уход", "кормление", "медицинская помощь"],
        siteLink: "https://care.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-206",
        userType: "business",
        title: "Выгул собак 'Прогулка'",
        description:
            "Профессиональный выгул собак. Регулярные прогулки, забота о питомцах. Профессиональный выгул собак. Регулярные прогулки, забота о питомцах. Профессиональный выгул собак. Регулярные прогулки, забота о питомцах.",
        imageUrls: generateGalleryImages(206),
        location: (() => { const [lat, lng] = [52.52, 13.405]; return generateCoordinates(lat, lng, 206, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "dog-walking",
        languages: ["ru", "uk"],
        tags: ["выгул собак", "прогулки", "забота"],
        workingHours: [
            { start: "06:00", end: "22:00" },
            { start: "06:00", end: "22:00" },
            { start: "06:00", end: "22:00" },
            { start: "06:00", end: "22:00" },
            { start: "06:00", end: "22:00" },
            { start: "07:00", end: "21:00" },
            { start: "08:00", end: "20:00" },
        ],
        socialMediaUrls: ["https://facebook.com/walk"],
        creatorId: "user-205",
        services: ["выгул собак", "прогулки", "забота", "кормление", "игры"],
        siteLink: "https://walk.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-207",
        userType: "individual",
        title: "Выгул собак и уход",
        description:
            "Выгул собак и уход за питомцами. Опыт работы с животными. Выгул собак и уход за питомцами. Опыт работы с животными. Выгул собак и уход за питомцами. Опыт работы с животными.",
        imageUrls: generateGalleryImages(207),
        location: (() => { const [lat, lng] = [48.8566, 2.3522]; return generateCoordinates(lat, lng, 207, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "dog-walking",
        languages: ["ru"],
        tags: ["выгул собак", "уход", "питомцы"],
        workingHours: [
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "07:00", end: "21:00" },
            { start: "08:00", end: "20:00" },
            { start: "09:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://instagram.com/dogwalker"],
        creatorId: "user-206",
        services: ["выгул собак", "уход", "кормление", "игры", "забота"],
        siteLink: "https://dogwalker.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-208",
        userType: "business",
        title: "Товары для животных 'Зоомагазин'",
        description:
            "Широкий ассортимент товаров для животных. Корма, игрушки, аксессуары. Широкий ассортимент товаров для животных. Корма, игрушки, аксессуары. Широкий ассортимент товаров для животных. Корма, игрушки, аксессуары.",
        imageUrls: generateGalleryImages(208),
        location: (() => { const [lat, lng] = [51.5074, -0.1278]; return generateCoordinates(lat, lng, 208, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "pet-supplies",
        languages: ["ru", "uk"],
        tags: ["зоомагазин", "товары для животных", "корма"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "19:00" },
            { start: "11:00", end: "18:00" },
        ],
        socialMediaUrls: ["https://facebook.com/petshop"],
        creatorId: "user-207",
        services: ["корма", "игрушки", "аксессуары", "товары для животных", "консультации"],
        siteLink: "https://petshop.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
    {
        id: "business-209",
        userType: "business",
        title: "Зоомагазин 'Питомец'",
        description:
            "Все для ваших питомцев. Качественные корма, игрушки, аксессуары. Все для ваших питомцев. Качественные корма, игрушки, аксессуары. Все для ваших питомцев. Качественные корма, игрушки, аксессуары.",
        imageUrls: generateGalleryImages(209),
        location: (() => { const [lat, lng] = [52.3676, 4.9041]; return generateCoordinates(lat, lng, 209, 900) as [number, number]; })() as [
            number,
            number
        ],
        category: "pets",
        subcategory: "pet-supplies",
        languages: ["ru"],
        tags: ["зоомагазин", "питомцы", "товары"],
        workingHours: [
            { start: "08:00", end: "21:00" },
            { start: "08:00", end: "21:00" },
            { start: "08:00", end: "21:00" },
            { start: "08:00", end: "21:00" },
            { start: "08:00", end: "21:00" },
            { start: "09:00", end: "20:00" },
            { start: "10:00", end: "19:00" },
        ],
        socialMediaUrls: ["https://facebook.com/pet"],
        creatorId: "user-208",
        services: ["корма", "игрушки", "аксессуары", "товары", "консультации"],
        siteLink: "https://pet.example.com",
        calendlyUrl: DEFAULT_CALENDLY_URL,
    },
].map(business => ({
    ...business,
    calendlyUrl: business.calendlyUrl || DEFAULT_CALENDLY_URL,
})) as Business[];
