"use client";

import { cn } from '@/lib/utils';
import {  MapPin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react'

const AccountLeft = () => {
    const [isLoading, setIsLoading] = useState(true)
    const pathname = usePathname()

    useEffect(() => {
        setIsLoading(false)
    }, [])
    
    if(isLoading){
        return null
    }

    const phone = localStorage.getItem("phone")
    return ( 
        <div className="col-span-1 border-r-2">
            <div className="grid grid-rows-6 min-h-full">
                <div className="row-span-2  flex flex-col items-center justify-center border-b-2 border-gray-100		">
                    <p className='text-lg  font-medium text-gray-400'>+91-{phone}</p>
                </div>
                <div className="row-span-2 ">
                    <Link 
                        href="/account/addresses"
                        className={cn(
                            "hover:text-orange-500 ",
                            pathname === `/account/addresses` ? "text-orange-500" : "text-neutral-500"
                        )}
                    >
                        <div className={cn(
                            'flex flex-row items-center h-1/3 pl-4 border-b-2 border-gray-100 hover:bg-gray-50',
                            pathname === `/account/addresses` ? "bg-gray-50" : "bg-white"
                        )}>
                            <MapPin size={24}/>
                            <span className='ml-4'>My Addresses</span>
                        </div>
                    </Link>
                    <Link 
                            href="/account/orders"
                            className={cn(
                                "hover:text-orange-500",
                                pathname === `/account/orders` ? "text-orange-500" : "text-neutral-500"
                            )}
                        >
                            <div className={cn(
                            'flex flex-row items-center h-1/3 pl-4 border-b-2 border-gray-100 hover:bg-gray-50',
                            pathname === `/account/orders` ? "bg-gray-50" : "bg-white"
                        )}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span className='ml-4'>My Orders</span>
                            </div>
                    </Link>
                    <Link 
                        href="/account/addresses"
                        className="hover:text-orange-500"
                    >
                        <div className={cn(
                            'flex flex-row items-center h-1/3 pl-4 border-b-2 border-gray-100 hover:bg-gray-50',
                            pathname === `/logout` ? "bg-gray-50" : "bg-white"
                        )}>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <span className='ml-4'>Logout</span>
                        </div>
                    </Link>
                </div>
                <div className="row-span-2">
                    
                </div>
            </div>
        </div>
     );
}
 
export default AccountLeft;