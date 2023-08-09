"use client";

import { useGlobalContext } from "@/app/Context/global-context";
import axios from "axios";
import { CigaretteOff } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react"
import { toast } from "react-hot-toast";

const LogOut = () => {
    const { login, setLogin} = useGlobalContext();

    if(!login){
        redirect("/")
    }

    useEffect(() => {
        logout()
    },[])

    const  logout = async() =>{
        const phone = localStorage.getItem("phone")
        if(phone){
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`,{
                phone
            })
            
            if(res){
                setLogin(false);
                localStorage.removeItem("accessToken")
                localStorage.removeItem("user")
                localStorage.removeItem("cart-storage")
                localStorage.removeItem("phone")
                localStorage.removeItem("addresses")
            }
           
            window.location = res.data.url;
        }else{
            toast.error("Logout error.")
        }
    }
    return ( 
        <div className="w-full h-full flex flex-row items-center justify-center space-x-2">
            <CigaretteOff />
            <div>
                Log out  ........
            </div>
        </div>
     );
}
 
export default LogOut;