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
        location: generateCoordinates(centerLat, centerLng, 0, 15) as [
            number,
            number
        ],
        category: "food",
        subcategory: "cafes",
        languages: ["ru"],
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
        title: "Репетитор по математике",
        description:
            "Частный репетитор по математике. Индивидуальные занятия для школьников и студентов. Частный репетитор по математике. Индивидуальные занятия для школьников и студентов. Частный репетитор по математике. Индивидуальные занятия для школьников и студентов.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 1, 15) as [
            number,
            number
        ],
        category: "work",
        subcategory: "tutors",
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
            "Современный фитнес-клуб с профессиональным оборудованием и опытными тренерами. Современный фитнес-клуб с профессиональным оборудованием и опытными тренерами. Современный фитнес-клуб с профессиональным оборудованием и опытными тренерами.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 2, 15) as [
            number,
            number
        ],
        category: "sports",
        subcategory: "gyms",
        languages: ["ru"],
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
            "Аутентичная итальянская кухня в центре города. Свежие пасты, пицца из дровяной печи и отличное вино. Аутентичная итальянская кухня в центре города. Свежие пасты, пицца из дровяной печи и отличное вино. Аутентичная итальянская кухня в центре города. Свежие пасты, пицца из дровяной печи и отличное вино.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 3, 15) as [
            number,
            number
        ],
        category: "food",
        subcategory: "restaurants",
        languages: ["ru"],
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
            "Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, макияж. Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, макияж. Полный спектр услуг красоты: стрижки, окрашивание, маникюр, педикюр, макияж.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 4, 15) as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "beauty-salon",
        languages: ["ru", "uk"],
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
            "Большой выбор книг на разных языках. Художественная литература, научные издания, детские книги. Большой выбор книг на разных языках. Художественная литература, научные издания, детские книги. Большой выбор книг на разных языках. Художественная литература, научные издания, детские книги.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 5, 15) as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "hobby-creative",
        languages: ["ru", "uk"],
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
            "Профессиональная ветеринарная помощь. Консультации, вакцинация, хирургия, стоматология для животных. Профессиональная ветеринарная помощь. Консультации, вакцинация, хирургия, стоматология для животных. Профессиональная ветеринарная помощь. Консультации, вакцинация, хирургия, стоматология для животных.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 6, 15) as [
            number,
            number
        ],
        category: "pets",
        subcategory: "veterinary",
        languages: ["ru"],
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
            "Широкий ассортимент электроники: смартфоны, ноутбуки, планшеты, аксессуары. Гарантия и сервис. Широкий ассортимент электроники: смартфоны, ноутбуки, планшеты, аксессуары. Гарантия и сервис. Широкий ассортимент электроники: смартфоны, ноутбуки, планшеты, аксессуары. Гарантия и сервис.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 7, 15) as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "electronics",
        languages: ["ru"],
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
            "Занятия йогой для всех уровней. Хатха, виньяса, аштанга. Утренние и вечерние группы. Занятия йогой для всех уровней. Хатха, виньяса, аштанга. Утренние и вечерние группы. Занятия йогой для всех уровней. Хатха, виньяса, аштанга. Утренние и вечерние группы.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 8, 15) as [
            number,
            number
        ],
        category: "sports",
        subcategory: "yoga-meditation",
        languages: ["ru"],
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
            "Настоящая итальянская пицца, приготовленная в дровяной печи. Свежие ингредиенты и быстрая доставка. Настоящая итальянская пицца, приготовленная в дровяной печи. Свежие ингредиенты и быстрая доставка. Настоящая итальянская пицца, приготовленная в дровяной печи. Свежие ингредиенты и быстрая доставка.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 9, 15) as [
            number,
            number
        ],
        category: "food",
        subcategory: "fast-food",
        languages: ["ru"],
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
            "Обучение различным стилям танцев: латина, сальса, бачата, хип-хоп, современные танцы. Обучение различным стилям танцев: латина, сальса, бачата, хип-хоп, современные танцы. Обучение различным стилям танцев: латина, сальса, бачата, хип-хоп, современные танцы.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 10, 15) as [
            number,
            number
        ],
        category: "art",
        languages: ["ru"],
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
            "Специализированная кофейня с обжаркой собственного производства. Эспрессо, капучино, альтернативные методы заваривания. Специализированная кофейня с обжаркой собственного производства. Эспрессо, капучино, альтернативные методы заваривания. Специализированная кофейня с обжаркой собственного производства. Эспрессо, капучино, альтернативные методы заваривания.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 11, 15) as [
            number,
            number
        ],
        category: "food",
        subcategory: "cafes",
        languages: ["ru"],
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
            "Профессиональная фотосъемка: портреты, свадьбы, корпоративы, семейные фотосессии. Студия и выездная съемка. Профессиональная фотосъемка: портреты, свадьбы, корпоративы, семейные фотосессии. Студия и выездная съемка. Профессиональная фотосъемка: портреты, свадьбы, корпоративы, семейные фотосессии. Студия и выездная съемка.",
        imageUrls: generateGalleryImages(0),
        location: generateCoordinates(centerLat, centerLng, 12, 15) as [
            number,
            number
        ],
        category: "art",
        subcategory: "photography-video",
        languages: ["ru"],
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
    {
        id: "business-individual-1",
        userType: "individual",
        title: "Профессиональный фотограф",
        description:
            "Профессиональный фотограф. Специализируюсь на портретной и свадебной фотографии. Более 5 лет опыта. Профессиональный фотограф. Специализируюсь на портретной и свадебной фотографии. Более 5 лет опыта. Профессиональный фотограф. Специализируюсь на портретной и свадебной фотографии. Более 5 лет опыта.",
        imageUrls: generateGalleryImages(13),
        location: generateCoordinates(centerLat, centerLng, 13, 15) as [
            number,
            number
        ],
        category: "art",
        subcategory: "photography-video",
        languages: ["ru"],
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
        title: "Преподаватель английского языка",
        description:
            "Частный преподаватель английского языка. Индивидуальные и групповые занятия. Подготовка к экзаменам IELTS, TOEFL. Частный преподаватель английского языка. Индивидуальные и групповые занятия. Подготовка к экзаменам IELTS, TOEFL. Частный преподаватель английского языка. Индивидуальные и групповые занятия. Подготовка к экзаменам IELTS, TOEFL.",
        imageUrls: generateGalleryImages(14),
        location: generateCoordinates(centerLat, centerLng, 14, 15) as [
            number,
            number
        ],
        category: "work",
        subcategory: "tutors",
        languages: ["ru"],
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
    {
        id: "business-15",
        userType: "business",
        title: "Барбершоп 'Классик'",
        description:
            "Мужская парикмахерская и барбершоп. Классические и современные стрижки, бритье, укладка бороды. Мужская парикмахерская и барбершоп. Классические и современные стрижки, бритье, укладка бороды. Мужская парикмахерская и барбершоп. Классические и современные стрижки, бритье, укладка бороды.",
        imageUrls: generateGalleryImages(15),
        location: generateCoordinates(centerLat, centerLng, 15, 20) as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "barbershop",
        languages: ["ru", "uk"],
        tags: ["барбершоп", "стрижка", "бритье"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            null,
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
        location: generateCoordinates(centerLat, centerLng, 16, 20) as [
            number,
            number
        ],
        category: "pets",
        subcategory: "grooming",
        languages: ["ru"],
        tags: ["груминг", "собаки", "кошки"],
        workingHours: [
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "09:00", end: "18:00" },
            { start: "10:00", end: "16:00" },
            null,
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
        location: generateCoordinates(centerLat, centerLng, 17, 25) as [
            number,
            number
        ],
        category: "sports",
        subcategory: "gyms",
        languages: ["ru"],
        tags: ["фитнес", "тренажерный зал", "тренировки"],
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
        location: generateCoordinates(centerLat, centerLng, 18, 25) as [
            number,
            number
        ],
        category: "food",
        subcategory: "restaurants",
        languages: ["ru"],
        tags: ["ресторан", "французская кухня", "романтика"],
        workingHours: [
            { start: "18:00", end: "23:00" },
            { start: "18:00", end: "23:00" },
            { start: "18:00", end: "23:00" },
            { start: "18:00", end: "23:00" },
            { start: "18:00", end: "00:00" },
            { start: "18:00", end: "00:00" },
            { start: "18:00", end: "23:00" },
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
        location: generateCoordinates(centerLat, centerLng, 19, 25) as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "beauty-salon",
        languages: ["ru", "uk"],
        tags: ["салон", "красота", "маникюр", "педикюр"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            null,
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
        location: generateCoordinates(centerLat, centerLng, 20, 25) as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "hobby-creative",
        languages: ["ru"],
        tags: ["творчество", "краски", "рукоделие"],
        workingHours: [
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "10:00", end: "20:00" },
            { start: "11:00", end: "19:00" },
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
        location: generateCoordinates(centerLat, centerLng, 21, 25) as [
            number,
            number
        ],
        category: "pets",
        subcategory: "veterinary",
        languages: ["ru"],
        tags: ["ветеринар", "животные", "лечение"],
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
        location: generateCoordinates(centerLat, centerLng, 22, 25) as [
            number,
            number
        ],
        category: "shopping",
        subcategory: "electronics",
        languages: ["ru"],
        tags: ["электроника", "смартфоны", "гаджеты"],
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
        location: generateCoordinates(centerLat, centerLng, 23, 25) as [
            number,
            number
        ],
        category: "food",
        subcategory: "fast-food",
        languages: ["ru"],
        tags: ["бургеры", "фастфуд", "доставка"],
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
        location: generateCoordinates(centerLat, centerLng, 24, 25) as [
            number,
            number
        ],
        category: "beauty",
        subcategory: "barbershop",
        languages: ["ru", "uk"],
        tags: ["барбершоп", "стрижка", "мужская стрижка"],
        workingHours: [
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "20:00" },
            { start: "09:00", end: "21:00" },
            { start: "09:00", end: "21:00" },
            null,
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
        location: generateCoordinates(centerLat, centerLng, 25, 30) as [
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
].map(business => ({
    ...business,
    calendlyUrl: business.calendlyUrl || DEFAULT_CALENDLY_URL,
})) as Business[];
