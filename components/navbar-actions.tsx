"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn } from '@/lib/utils'

import { useGlobalContext } from "@/app/Context/global-context";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import AccountNav from "@/components/account-nav";
import useAddresses from "@/hooks/use-addresses";
import useUser from "@/hooks/use-user";
import useOrders from "@/hooks/use-orders";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter()
    const pathname = usePathname()
    const { login } = useGlobalContext();

    const userRoutes = [{
        href:  `/login`,
        label:  "Login",
        active: pathname === `/login`
    }]

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cart = useCart()
    const address = useAddresses()
    const user = useUser()
    const orders = useOrders()

    if (!isMounted){
        return null;
    }

    return ( 
        <div className="ml-auto flex items-center gap-x-4 ">
            <div className='ml-auto mr-0 flex items-center gap-x-4'>
                    {!login && userRoutes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "lg:text-xl font-medium transition-colors hover:text-orange-500",
                                route.active ? "text-orange-500" : "text-neutral-500"
                            )}
                        >
                            {route.label}
                        </Link>
                    ))}
                    {login && (
                        <AccountNav/>
                    )}
                    
                </div>
            <Button onClick={() => router.push("/cart")} className="flex items-center rounded-md sm:px-2 sm:py-2  px-4 py-2">
                <ShoppingCart size={30} color="white"/>
                <span className="ml-2 text-l font-semibold text-white ">
                    {cart.items.length !==0 && cart.items.length+" items"}
                    {cart.items.length ===0 && "My Cart"}
                </span>
            </Button>
        </div>
     );
}
 
export default NavbarActions;