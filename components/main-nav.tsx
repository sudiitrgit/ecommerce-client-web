"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Category } from '@/types'
import { useEffect, useState } from 'react'


interface MainNavProps {
    data: Category[],
}

const MainNav: React.FC<MainNavProps> = ({
    data,
}) => {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted){
        return null;
    }
      
    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }))

   

    return ( 
        <nav>
            <div className='flex flex-row justify-between'>
                <div className='mx-4 '>
                    <div className='mx-2 flex items-center w-full  lg:space-x-6 sm:space-x-2'>
                        {routes.map((route) => (
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
                    </div> 
                </div>
                
            </div>
        </nav>
     );
}
 
export default MainNav;