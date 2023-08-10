"use client";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
    data: {"product": Product, "quantity": string}
}

const CartItem: React.FC<CartItemProps> = ({
    data
}) => {
    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data.product.id);
    }

    const quantityPlus = () => {
        cart.quantityIncrease(data.product.id);
    }

    const quantityMinus = () => {
        cart.quantityDecrease(data.product.id);
    }

    return ( 
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden
            sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.product.images[0].url}
                    alt=""
                    className="object-scale-down object-center "
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0 text-gray-500 hover:text-orange-500 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={onRemove} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold text-black">
                            {data.product.name}
                        </p>
                    </div>
                    <div className="mt-1 flex ">
                        <div className="flex flex-row w-20 h-8 justify-between hover:cursor-pointer bg-orange-500 rounded-md  ">
                            <div className="text-white m-1" onClick={quantityMinus}>
                                <Minus size={20} />
                            </div>
                            <div className="text-white m-1">
                                <span>{data.quantity}</span>
                            </div>
                            <div className="text-white m-1" onClick={quantityPlus}>
                                <Plus size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Currency value={data.product.price}/>
                        <p  className="text-gray-500">
                            {data.product.size.name}
                        </p>
                    </div>
                </div>
            </div>
        </li>
     );
}
 
export default CartItem;