import { User } from "@/types/user";
import { create } from "zustand";
import { mockUser } from "@/data/mockUser";

interface UserStore {
    currentUser: User | null;
    users: Record<string, User>;
    initialized: boolean;

    setCurrentUser: (user: User | null) => void;
    setUser: (user: User) => void;
    getUser: (id: string) => User | null;
    initializeMockData: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
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
        set({
            currentUser: mockUser,
            users: { [mockUser.id]: mockUser },
            initialized: true,
        });
    },
}));
