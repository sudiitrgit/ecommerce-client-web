import { User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
    items: User[],
    addUser: (data: User) => void,
    removeUser: () => void,
} 

const useUser = create(
    persist<UserStore>((set, get) => ({
        items: [],

        addUser: (data: User) => {
            const currentItems = get().items;
            set({ items: [...get().items, data] });
        },
        
        removeUser: () => set({ items: [] }),
    }),{
        name: "user-storage",
        storage: createJSONStorage(() => localStorage)
    })
)
 
export default useUser;

