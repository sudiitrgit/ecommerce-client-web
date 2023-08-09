import { Address } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AddressStore {
    items: Address[],
    addAddress: (data: Address) => void,
    editAddress: (id: string, data: Address) => void,
    removeAddress: (id: string) => void,
} 

const useAddresses = create(
    persist<AddressStore>((set, get) => ({
        items: [],

        addAddress: (data: Address) => {
            const currentItems = get().items;
            set({ items: [...get().items, data] });
        },
        editAddress: (id: string, data: Address) => {
            set({items: [...get().items.map((item) => {
                if(item.id === id){
                    item.username = data.username
                    item.addressline1 = data.addressline1
                    item.addressline2 = data.addressline2
                    item.landmark = data.landmark
                    item.pincode = data.pincode
                    item.city = data.city
                    item.state = data.state
                    return item
                }else{
                    return item
                }
            }) ] });
        },
        removeAddress: (id: string) => {
            set({items: [...get().items.filter((item) => item.id !== id) ] });
        },
         
    }),{
        name: "addresses",
        storage: createJSONStorage(() => localStorage)
    })
)
 
export default useAddresses;

