"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { useGlobalContext } from "@/app/Context/global-context";
import useUser from "@/hooks/use-user";

const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll)
    const { login,setLogin } = useGlobalContext();
    const user = useUser()
    const router = useRouter()

    useEffect(() => {
        
        if(searchParams.get("canceled")){
            toast.error("We are not delivering currently this location.")
        }

    }, [searchParams, removeAll])

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.product.price) * Number(item.quantity);
    }, 0)

    const onCheckout = async () => {

        if( user.items.length === 0 || !login ){ 
            router.push("/login")
        }else{
            const userId = user.items[0].id
            const accessToken = user.items[0].accessToken
            const phone = user.items[0].phone
            const productAndQuantity = items.map((item) => ({"productId":item.product.id, "quantity": item.quantity}))
            const dataSend = {"productAndQuantity": productAndQuantity, "userId": userId, "phone":phone, "accessToken": accessToken,}
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                data: dataSend
            }); 
            removeAll();  
            window.location = response.data.url;
        }
    }

    return ( 
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">
                Order Summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Order total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            
            <div className="mt-6">
                <h2 className="text-lg">Cash/UPI on Delivery</h2>
            </div>
            <Button disabled={items.length === 0} 
            onClick={onCheckout} 
            className="w-full mt-6">
                Checkout
            </Button>
        </div>
     );
}
 
export default Summary;