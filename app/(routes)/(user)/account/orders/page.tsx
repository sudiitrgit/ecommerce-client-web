"use client"
import AccountContainer from "@/components/account-container";
import AccountLeft from "@/components/account-left";
import Currency from "@/components/ui/currency";
import useOrders from "@/hooks/use-orders";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import axios from "axios";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

const AccountOrders =  () => {
    const [isLoading, setIsLoading] = useState(true)
    const orders = useOrders()
    const user = useUser()
    
    useEffect(()=> {
        setIsLoading(false)
    }, [])

    if(isLoading){
        return null
    }

    const updateOrder = async  (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        const orderId = button.id

        const userId = user.items[0].id
        const accessToken = user.items[0].accessToken
        const phone = user.items[0].phone
        const dataSend = {"orderId": orderId, "userId": userId, "phone":phone, "accessToken": accessToken,}
                
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/order`,{
            data: dataSend
        })
        orders.updateOrder(res.data)
        
    }

    return ( 
        <AccountContainer>
            <AccountLeft/>
            <div className="col-span-3"> 
                <div className="flex flex-col p-6 mt-4">
                    {orders.items.map((item) => (
                        <div key={item.id} className="border-2 bg-gray-50 rounded-md my-4">
                            <div className="flex flex-col ml-4">
                                <div className="w-full flex flex-row rounded-full  mt-2">
                                    {item.isPaid ? (
                                        <div className="bg-gray-500 w-full text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
                                            Order Completed.
                                        </div>
                                    ): (
                                        <div className= {cn("bg-orange-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                        ,item.isDelivered ? "w-3/4": "w-1/2"
                                        )}>
                                            {item.isDelivered? "Delivered": "Preparing your order"}
                                        </div>
                                    )}
                                    <div 
                                        className="text-orange-500 ml-auto mr-2 hover:cursor-pointer" 
                                        hidden={item.isPaid} 
                                    >
                                        <button onClick={updateOrder} id={item.id}>
                                            <RotateCw size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-row my-2 ">
                                    <span className="font-bold">{item.products}</span>
                                    <span className="
                                     text-orange-600 font-bold ml-auto mr-2"
                                    >
                                        <Currency value={item.totalPrice} /></span>
                                    <span>{item.isPaid}</span>
                                </div>
                                <div className="mb-2">
                                    { new Date(Date.parse(item.createdAt)).toLocaleString("en-IN", {timeZone: 'Asia/Kolkata', hour12: true,dateStyle: "full", timeStyle: "long" } )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AccountContainer>
     );
}
 
export default AccountOrders;