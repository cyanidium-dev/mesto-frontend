import { User } from "@/types/user";

// Helper function to generate user profile picture
const getUserProfilePicture = (index: number): string => {
    const profilePictures = [
        "/images/mockedData/individualPfp.png",
        "/images/mockedData/eventImageSecondary.jpg",
        "/images/mockedData/individualPfp.png",
        "/images/mockedData/eventImageSecondary.jpg",
        "/images/mockedData/individualPfp.png",
        "/images/mockedData/eventImageSecondary.jpg",
        "/images/mockedData/individualPfp.png",
        "/images/mockedData/eventImageSecondary.jpg",
        "/images/mockedData/individualPfp.png",
        "/images/mockedData/eventImageSecondary.jpg",
        "/images/mockedData/individualPfp.png",
        "/images/mockedData/eventImageSecondary.jpg",
        "/images/mockedData/individualPfp.png",
    ];
    return profilePictures[index % profilePictures.length];
};

// Generate user names
const userNames = [
    'Алексей Founder "Mesto"',
    "Мария Организатор",
    "Дмитрий Художник",
    "Анна Шеф-повар",
    "Елена Красота",
    "Игорь Книжник",
    "Ольга Ветеринар",
    "Сергей Технолог",
    "Наталья Йога",
    "Павел Пицца",
    "Екатерина Танцы",
    "Андрей Кофе",
    "Виктория Фото",
];

const userEmails = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
    "user4@example.com",
    "user5@example.com",
    "user6@example.com",
    "user7@example.com",
    "user8@example.com",
    "user9@example.com",
    "user10@example.com",
    "user11@example.com",
    "user12@example.com",
    "user13@example.com",
];

const userCities = [
    "Прага",
    "Брно",
    "Острава",
    "Пльзень",
    "Либерец",
    "Оломоуц",
    "Усти-над-Лабем",
    "Градец-Кралове",
    "Ческе-Будеёвице",
    "Пардубице",
    "Злин",
    "Хавиржов",
    "Кладно",
];

const userGenders = ["Мужской", "Женский"];
const allInterests = [
    ["Спорт", "Музыка", "Технологии"],
    ["Музыка", "Искусство", "Путешествия"],
    ["Искусство", "Живопись", "Выставки"],
    ["Кулинария", "Еда", "Рестораны"],
    ["Красота", "Мода", "Стиль"],
    ["Книги", "Литература", "Образование"],
    ["Животные", "Природа", "Здоровье"],
    ["Технологии", "Программирование", "Гаджеты"],
    ["Йога", "Медитация", "Здоровье"],
    ["Еда", "Итальянская кухня", "Кулинария"],
    ["Танцы", "Музыка", "Вечеринки"],
    ["Кофе", "Кафе", "Обжарка"],
    ["Фотография", "Искусство", "Портреты"],
];

// Generate mock users
export const mockUsers: User[] = Array.from({ length: 13 }, (_, i) => ({
    id: `user-${i + 1}`,
    email: userEmails[i],
    name: userNames[i],
    birthDay: new Date(1990 + (i % 10), (i * 3) % 12, ((i * 5) % 28) + 1),
    city: userCities[i],
    gender: userGenders[i % 2],
    interests: allInterests[i],
    photoUrl: getUserProfilePicture(i),
    profilePictureUrl: getUserProfilePicture(i),
}));

// Export the first user as mockUser for backward compatibility
export const mockUser: User = mockUsers[0];
