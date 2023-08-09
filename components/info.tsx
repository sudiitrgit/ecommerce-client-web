"use client"

import { ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";

interface InfoProps {
    data: Product
}

const Info: React.FC<InfoProps> = ({
    data
}) => {
    const cart = useCart();

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        cart.addItem({"product": data, "quantity": "1"});
    }

    let sizeOrQuantity = "Quantity";
    if(data.category.name.toLowerCase() === "cigarette"){
        sizeOrQuantity = "Size"
    }
    return ( 
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price}/>
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">
                    {sizeOrQuantity}:
                </h3>
                <div>
                    {data?.size?.name}
                </div>
            </div>
            <div className="mt-3 flex items-end justify-between">
                <h3 className="font-semibold text-black">Description:</h3>
            </div>
            <div className="mt-1 flex items-end justify-between">
                <p className="text-sm text-gray-600">
                    {data?.description}
                </p>
            </div>
            <div className="mt-10 flex item-center gap-x-3">
                <Button onClick={onAddToCart} className="flex items-center gap-x-2">
                    Add to Cart
                    <ShoppingCart/>
                </Button>
            </div>
        </div>
     );
}
 
export default Info;