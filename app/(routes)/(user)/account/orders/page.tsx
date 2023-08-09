"use client";

import { useState, useEffect } from 'react'

import AccountContainer from "@/components/account-container";
import AccountLeft from "@/components/account-left";
import { useGlobalContext } from '@/app/Context/global-context';
import { redirect, useRouter } from 'next/navigation';


const AccountOrders = () => {
    const { login } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        setIsLoading(false)
    }, [])
    
    if(isLoading){
        return null
    }

    if(!login){
        router.push("/login")
    }

    return ( 
        <AccountContainer>
            <AccountLeft/>
            <div className="col-span-3"> 
                My Order content
            </div>
        </AccountContainer>
     );
}
 
export default AccountOrders;