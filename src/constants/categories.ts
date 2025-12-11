export interface FilterOption {
    key: string;
    label: string;
}

export interface CategoryWithSubcategories extends FilterOption {
    emoji: string;
    subcategories: FilterOption[];
}

export const CATEGORIES: CategoryWithSubcategories[] = [
    {
        key: "beauty",
        label: "Красота и уход",
        emoji: "✂️",
        subcategories: [
            { key: "barbershop", label: "Барбершоп" },
            { key: "beauty-salon", label: "Салон красоты" },
            { key: "manicure-pedicure", label: "Маникюр и педикюр" },
            { key: "massage", label: "Массаж" },
            { key: "hairdresser", label: "Парикмахерская" },
            { key: "tattoo-piercing", label: "Тату и пирсинг" },
            { key: "cosmetology", label: "Косметология" },
            { key: "spa-body-care", label: "СПА и уход за телом" },
        ],
    },
    {
        key: "auto",
        label: "Автоуслуги",
        emoji: "🚗",
        subcategories: [
            { key: "auto-service", label: "Автосервис / Ремонт" },
            { key: "tire-service", label: "Шиномонтаж" },
            { key: "car-wash", label: "Мойка автомобилей" },
            { key: "car-rental", label: "Аренда авто" },
            { key: "auto-parts", label: "Автозапчасти" },
            { key: "ev-service", label: "Сервис электромобилей" },
            { key: "auto-electric", label: "Автоэлектрика" },
        ],
    },
    {
        key: "food",
        label: "Еда и напитки",
        emoji: "🍽",
        subcategories: [
            { key: "restaurants", label: "Рестораны" },
            { key: "cafes", label: "Кафе и кофейни" },
            { key: "russian-grocery", label: "Русские продуктовые магазины" },
            { key: "bakeries", label: "Пекарни" },
            { key: "fast-food", label: "Фастфуд" },
            { key: "bars", label: "Бар" },
            { key: "catering", label: "Кейтеринг" },
            { key: "farms-producers", label: "Фермы и производители" },
            { key: "food-delivery", label: "Доставка еды" },
        ],
    },
    {
        key: "home",
        label: "Дом и услуги",
        emoji: "🛠",
        subcategories: [
            { key: "repair-renovation", label: "Ремонт и отделка" },
            { key: "electrician", label: "Электрик" },
            { key: "plumber", label: "Сантехник" },
            { key: "cleaning", label: "Уборка" },
            { key: "moving-transport", label: "Переезд и грузоперевозки" },
            { key: "windows-doors", label: "Окна и двери" },
            { key: "landscape-design", label: "Ландшафтный дизайн" },
            { key: "construction", label: "Кладка и строительство" },
            { key: "heating-ventilation", label: "Монтаж отопления и вентиляции" },
        ],
    },
    {
        key: "events",
        label: "События и развлечения",
        emoji: "🎉",
        subcategories: [
            { key: "parties", label: "Вечеринки" },
            { key: "sports-events", label: "Спортивные мероприятия" },
            { key: "concerts-festivals", label: "Концерты и фестивали" },
            { key: "exhibitions-fairs", label: "Выставки и ярмарки" },
            { key: "cultural-meetings", label: "Культурные встречи" },
            { key: "corporate-events", label: "Корпоративные мероприятия" },
            { key: "family-celebrations", label: "Семейные праздники" },
            { key: "team-building", label: "Организация тимбилдинга" },
        ],
    },
    {
        key: "shopping",
        label: "Магазины и торговля",
        emoji: "🏪",
        subcategories: [
            { key: "grocery-stores", label: "Продуктовые магазины" },
            { key: "clothing-shoes", label: "Одежда и обувь" },
            { key: "electronics", label: "Электроника" },
            { key: "cosmetics-perfume", label: "Косметика и парфюмерия" },
            { key: "children-goods", label: "Детские товары" },
            { key: "hobby-creative", label: "Хобби и товары для творчества" },
            { key: "furniture-interior", label: "Мебель и интерьер" },
            { key: "jewelry", label: "Ювелирные изделия" },
        ],
    },
    {
        key: "health",
        label: "Здоровье и медицина",
        emoji: "🏥",
        subcategories: [
            { key: "clinics", label: "Клиники" },
            { key: "dentistry", label: "Стоматология" },
            { key: "pharmacies", label: "Аптеки" },
            { key: "fitness-sports", label: "Фитнес и спорт" },
            { key: "psychology-consulting", label: "Психология и консультации" },
            { key: "diagnostic-centers", label: "Диагностические центры" },
            { key: "rehabilitation-centers", label: "Реабилитационные центры" },
            { key: "massage-physiotherapy", label: "Массаж и физиотерапия" },
        ],
    },
    {
        key: "sports",
        label: "Спорт и отдых",
        emoji: "🧘",
        subcategories: [
            { key: "gyms", label: "Тренажёрные залы" },
            { key: "yoga-meditation", label: "Йога и медитация" },
            { key: "tourism-hiking", label: "Туризм и походы" },
            { key: "water-sports", label: "Водные виды спорта" },
            { key: "interest-clubs", label: "Клубы по интересам" },
            { key: "sports-sections", label: "Спортивные секции" },
            { key: "extreme-sports", label: "Экстремальные виды спорта" },
        ],
    },
    {
        key: "work",
        label: "Работа и обучение",
        emoji: "💼",
        subcategories: [
            { key: "courses-trainings", label: "Курсы и тренинги" },
            { key: "tutors", label: "Репетиторы" },
            { key: "jobs-vacancies", label: "Работа и вакансии" },
            { key: "business-seminars", label: "Бизнес-семинары" },
            { key: "consulting-coaching", label: "Консалтинг и коучинг" },
            { key: "online-education", label: "Онлайн-образование" },
            { key: "master-classes", label: "Мастер-классы" },
        ],
    },
    {
        key: "family",
        label: "Семья и дети",
        emoji: "👪",
        subcategories: [
            { key: "playgrounds", label: "Детские площадки" },
            { key: "children-clubs", label: "Детские клубы" },
            { key: "family-events", label: "Семейные мероприятия" },
            { key: "children-parties", label: "Детские праздники" },
            { key: "early-development", label: "Школы раннего развития" },
            { key: "summer-camps", label: "Летние лагеря" },
        ],
    },
    {
        key: "technology",
        label: "Технологии и цифровые услуги",
        emoji: "💻",
        subcategories: [
            { key: "web-app-development", label: "Разработка сайтов и приложений" },
            { key: "it-consulting", label: "IT-консалтинг" },
            { key: "digital-marketing", label: "Цифровой маркетинг" },
            { key: "seo-promotion", label: "SEO и продвижение" },
            { key: "cybersecurity", label: "Кибербезопасность" },
            { key: "tech-support", label: "Техническая поддержка" },
        ],
    },
    {
        key: "finance",
        label: "Финансы и юридические услуги",
        emoji: "⚖️",
        subcategories: [
            { key: "accounting", label: "Бухгалтерия и учет" },
            { key: "tax-consulting", label: "Налоговое консультирование" },
            { key: "financial-consulting", label: "Финансовый консалтинг" },
            { key: "legal-services", label: "Юридические услуги" },
            { key: "notary-services", label: "Нотариальные услуги" },
            { key: "insurance", label: "Страхование" },
        ],
    },
    {
        key: "transport",
        label: "Транспорт и логистика",
        emoji: "🚚",
        subcategories: [
            { key: "courier-services", label: "Курьерские услуги" },
            { key: "freight-transport", label: "Грузоперевозки" },
            { key: "taxi-carsharing", label: "Такси и каршеринг" },
            { key: "air-transport", label: "Авиаперевозки" },
            { key: "rail-transport", label: "Железнодорожные перевозки" },
            { key: "sea-transport", label: "Морские перевозки" },
        ],
    },
    {
        key: "hospitality",
        label: "Гостеприимство и размещение",
        emoji: "🏨",
        subcategories: [
            { key: "hotels", label: "Отели" },
            { key: "hostels", label: "Хостелы" },
            { key: "guest-houses", label: "Гостевые дома и B&B" },
            { key: "short-term-rental", label: "Аренда жилья на короткий срок" },
            { key: "tourist-bases", label: "Туристические базы и кемпинги" },
        ],
    },
    {
        key: "art",
        label: "Искусство, культура и креатив",
        emoji: "🎨",
        subcategories: [
            { key: "photography-video", label: "Фотография и видеосъемка" },
            { key: "design-illustration", label: "Дизайн и иллюстрация" },
            { key: "music-lessons", label: "Музыкальные уроки и студии" },
            { key: "theater-studios", label: "Театральные студии" },
            { key: "workshops-crafts", label: "Мастерские и ремесла" },
            { key: "art-galleries", label: "Арт-галереи" },
        ],
    },
    {
        key: "eco",
        label: "Экологические и зеленые услуги",
        emoji: "🌱",
        subcategories: [
            { key: "landscape-design-eco", label: "Ландшафтный дизайн" },
            { key: "gardening", label: "Озеленение и садоводство" },
            { key: "waste-recycling", label: "Утилизация и переработка отходов" },
            { key: "solar-panels", label: "Установка солнечных панелей" },
            { key: "eco-consulting", label: "Экологический консалтинг" },
        ],
    },
    {
        key: "pets",
        label: "Услуги для животных",
        emoji: "🐾",
        subcategories: [
            { key: "grooming", label: "Груминг" },
            { key: "pet-boarding", label: "Передержка и питомники" },
            { key: "dog-walking", label: "Выгул собак" },
            { key: "veterinary", label: "Ветеринарные услуги" },
            { key: "pet-supplies", label: "Товары для животных" },
        ],
    },
];

export const getSubcategoriesByCategory = (categoryKey: string): FilterOption[] => {
    const category = CATEGORIES.find(cat => cat.key === categoryKey);
    return category?.subcategories || [];
};

export const getCategoryByKey = (categoryKey: string): CategoryWithSubcategories | undefined => {
    return CATEGORIES.find(cat => cat.key === categoryKey);
};

