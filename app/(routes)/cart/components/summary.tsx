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
import useOrders from "@/hooks/use-orders";
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import useAddresses from '@/hooks/use-addresses'

const Summary = () => {
    const addresses = useAddresses()
    const user = useUser()
    const orders = useOrders()
    const router = useRouter()
    const [selected, setSelected] = useState(addresses.items[0]?.id)
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll)
    const { login,setLogin } = useGlobalContext();
    

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
            if(selected){
                const userId = user.items[0].id
                const accessToken = user.items[0].accessToken
                const phone = user.items[0].phone
                const productAndQuantity = items.map((item) => ({"productId":item.product.id, "quantity": item.quantity}))
                const dataSend = {"productAndQuantity": productAndQuantity, 
                                   "userId": userId, 
                                   "phone":phone, 
                                   "accessToken": accessToken,
                                   "addressId": selected
                                }
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                    data: dataSend
                }); 
                orders.addOrder(response.data.order)
                removeAll();  
                window.location = response.data.url;
            }else{
                toast.error("Please provide address for delivery.")
            }
        }
    }

    return ( 
        <>
            <div className="mt-16 rounded-lg  px-4 py-6 sm:p-6 lg:col-span-6 lg:mt-0 lg:p-8">
                {login && <div className="bg-white border-orange-300 border-2 mb-6 rounded-md w-full">
                    <div className="w-full p-4 bg-gray-50 rounded-md">
                        <p className='text-lg font-semibold text-gray-800'>choose Address</p>
                        <RadioGroup value={selected} onChange={setSelected}>
                            <div className="space-y-2">
                                {addresses.items.map((address) => (
                                <RadioGroup.Option
                                    key={address.id}
                                    value={address.id}
                                    className={({ active, checked }) =>
                                    `${
                                        active
                                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-300'
                                        : ''
                                    }
                                    ${
                                        checked ? 'bg-orange-500  text-white' : 'bg-white'
                                    }
                                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                    }
                                >
                                    {({ active, checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                            <RadioGroup.Label
                                                as="p"
                                                className={`font-medium text-lg  ${
                                                checked ? 'text-white' : 'text-gray-900'
                                                }`}
                                            >
                                                {address.username}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                                as="span"
                                                className={`inline ${
                                                checked ? 'text-white' : 'text-gray-500'
                                                }`}
                                            >
                                                <span>{address.addressline1}{", "}</span>
                                                <span>{address.addressline2}{", "}</span>
                                                <span>{address.landmark}{", "}</span>
                                                <span>{address.city}{", "}</span>
                                                <span>{address.state}{", "}</span>
                                            </RadioGroup.Description>
                                            </div>
                                        </div>
                                        {checked && (
                                            <div className="shrink-0 text-white">
                                            {/* <CheckIcon className="h-6 w-6" /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                            </div>
                                        )}
                                        </div>
                                    </>
                                    )}
                                </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                </div>}
                <div className="bg-gray-50 p-4 rounded-md">
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
                
            </div>
            
        </>
     );
}
 
export default Summary;