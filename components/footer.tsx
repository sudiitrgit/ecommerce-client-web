"use client"
import { useEffect, useState } from 'react'

const Footer = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(false)
    }, [])

    if (isLoading){
        return null
    }
    return ( 
        <footer className="bg-white border-t">
            <div className="mx-auto py-10">
                <p className="text-center text-xs text-black">
                    &copy; 2023 Chai Cigaratte Inc. All rights reserved.
                </p>
            </div>
        </footer>
     );
}
 
export default Footer;