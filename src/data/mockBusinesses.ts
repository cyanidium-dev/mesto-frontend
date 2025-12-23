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
].map(business => ({
    ...business,
    calendlyUrl: business.calendlyUrl || DEFAULT_CALENDLY_URL,
})) as Business[];
