import { Order } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface OrderStore {
    items: Order[],
    addOrder: (data: Order) => void,
    updateOrder: (data: Order) => void,
    removeOrder: () => void,
} 

const useOrders = create(
    persist<OrderStore>((set, get) => ({
        items: [],

        addOrder: (data: Order) => {
            set({ items: [data, ...get().items] });
        },
        updateOrder: (data: Order) => {
            set({items: [...get().items.map((item) => {
                if(item.id === data.id){
                    item.isDelivered = data.isDelivered
                    item.isPaid = data.isPaid
                    return item
                }else{
                    return item
                }
            }) ] });
        },
        
        removeOrder: () => set({ items: [] }),
    }),{
        name: "orders-storage",
        storage: createJSONStorage(() => localStorage)
    })
)
 
export default useOrders;

