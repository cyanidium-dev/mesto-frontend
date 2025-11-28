import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockUser, mockUsers } from "@/data/mockUser";

interface UserStore {
    currentUser: User | null;
    users: Record<string, User>;
    initialized: boolean;

    setCurrentUser: (user: User | null) => void;
    setUser: (user: User) => void;
    getUser: (id: string) => User | null;
    initializeMockData: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            currentUser: null,
            users: {},
            initialized: false,
            setCurrentUser: user => set({ currentUser: user }),
            setUser: user =>
                set(state => ({ users: { ...state.users, [user.id]: user } })),
            getUser: id => {
                const users = get().users;
                return users[id] || null;
            },
            initializeMockData: () => {
                if (get().initialized) return;
                const state = get();
                if (Object.keys(state.users).length === 0 && !state.currentUser) {
                    const usersRecord = mockUsers.reduce((acc, user) => {
                        acc[user.id] = user;
                        return acc;
                    }, {} as Record<string, User>);
                    set({
                        currentUser: mockUser,
                        users: usersRecord,
                        initialized: true,
                    });
                } else {
                    set({ initialized: true });
                }
            },
        }),
        {
            name: "user-storage",
            partialize: state => ({
                currentUser: state.currentUser,
                users: state.users,
            }),
            storage: {
                getItem: name => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    try {
                        const parsed = JSON.parse(str);
                        if (parsed.state?.currentUser?.birthDay) {
                            parsed.state.currentUser.birthDay = new Date(
                                parsed.state.currentUser.birthDay
                            );
                        }
                        if (parsed.state?.users) {
                            parsed.state.users = Object.fromEntries(
                                Object.entries(parsed.state.users).map(
                                    ([id, user]) => {
                                        const userData = user as User & {
                                            birthDay?: string | Date;
                                        };
                                        return [
                                            id,
                                            {
                                                ...userData,
                                                birthDay: userData.birthDay
                                                    ? new Date(userData.birthDay as string)
                                                    : undefined,
                                            } as User,
                                        ];
                                    }
                                )
                            );
                        }
                        return parsed;
                    } catch (error) {
                        console.error("Error parsing users from localStorage:", error);
                        return null;
                    }
                },
                setItem: (name, value) => {
                    try {
                        localStorage.setItem(name, JSON.stringify(value));
                    } catch (error) {
                        console.error("Error saving users to localStorage:", error);
                    }
                },
                removeItem: name => {
                    localStorage.removeItem(name);
                },
            },
        }
    )
);
