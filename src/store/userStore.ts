import { User } from "@/types/user";
import { create } from "zustand";

interface UserStore {
    currentUser: User | null;
    users: Record<string, User>;

    setCurrentUser: (user: User | null) => void;
    setUser: (user: User) => void;
    getUser: (id: string) => User | null;
}

export const useUserStore = create<UserStore>((set, get) => ({
    currentUser: null,
    users: {},
    setCurrentUser: user => set({ currentUser: user }),
    setUser: user =>
        set(state => ({ users: { ...state.users, [user.id]: user } })),
    getUser: id => {
        const users = get().users;
        return users[id] || null;
    },
}));
