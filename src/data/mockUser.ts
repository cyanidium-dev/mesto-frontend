import { User } from "@/types/user";

export const mockUser: User = {
    id: "user-1",
    email: "user@example.com",
    name: "Иван Иванов",
    birthDay: new Date("1990-05-15"),
    city: "Прага",
    gender: "Мужской",
    interests: ["Спорт", "Музыка", "Технологии"],
    photoUrl: "/images/mockedData/girl.jpg",
};
