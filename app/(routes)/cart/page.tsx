"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useState, useEffect } from "react"
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null;
    }

    return ( 
        <div className="">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
                    <h1 className="text-3xl font-bold text-black">
                        Shopping Cart
                    </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start
                    gap-x-12">
                        <div className="lg:col-span-6 ">
                            {cart.items.length === 0 && (
                                <p className="text-neutral-500">No items in the Cart</p>
                            )}
                            <ul>
                                {cart.items.map((item) => (
                                    <CartItem
                                        key={item.product.id}
                                        data={item}
                                    />
                                ))}
                                
                            </ul>
                        </div>
                        <Summary />
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default CartPage;