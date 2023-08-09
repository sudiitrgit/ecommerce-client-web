import { Product } from "@/types";
import { toast } from "react-hot-toast";
import { number } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
    items: {"product": Product, "quantity": string}[],
    addItem: (data: {"product": Product, "quantity": string}) => void,
    removeItem: (id: string) => void,
    quantityIncrease: (id: string) => void,
    quantityDecrease: (id: string) => void,
    removeAll: () => void
} 

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],

        addItem: (data: {"product": Product, "quantity": string}) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.product.id === data.product.id);

            if(existingItem){
                return toast("Item already in Cart.");
            }

            set({ items: [...get().items, data] });
            toast.success("Item Added to Cart.");
        },
        removeItem: (id: string) => {
            set({items: [...get().items.filter((item) => item.product.id !== id) ] });
            toast.success("Item removed from the Cart.");
        },
        quantityIncrease: (id: string) => {
            set({items: [...get().items.map((item) => {
                if(item.product.id === id){
                    let quantity = Number(item.quantity) 
                    item.quantity = (quantity + 1).toString()
                    return item
                }else{
                    return item
                }
            }) ] });
        },
        quantityDecrease: (id: string) => {
            set({items: [...get().items.filter((item) => {
                if(item.product.id === id){
                    if(item.quantity === "1"){
                        return false
                    }else{
                        return true
                    }
                }else{
                    return true
                }
            }).map((item) => {
                if(item.product.id === id){
                    let quantity = Number(item.quantity) 
                    item.quantity = (quantity - 1).toString()
                    return item
                }else{
                    return item
                }
            })
                
               ] });
        },
        removeAll: () => set({ items: [] }),
    }),{
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)
 
export default useCart;

