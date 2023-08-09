"use client";

import { useGlobalContext } from '@/app/Context/global-context';
import useAddresses from '@/hooks/use-addresses';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

interface addressType  {
    id:string
    username: string
    addressline1: string
    addressline2: string
    landmark: string
    pincode: string
    city: string
}
interface AddressActionsProps{
    addressId: string
    addressFormModalOpen: () => void
}
const AddressActions: React.FC<AddressActionsProps> = ( {
    addressId,
    addressFormModalOpen
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const { login,setLogin } = useGlobalContext();
    const [ hide, setHide ] = useState(true)

    let addresses = useAddresses()

    useEffect(()=>{
        setIsLoading(false)
    }, [])

   

    if (isLoading){
        return null
    }
    
    const hideShowAction = () => {
        setHide(!hide)
    }

    const editAddress = () =>{
        const user = JSON.parse(localStorage.getItem("user") || "")
        if(user && login){
            if(addressId){
                setIsLoading(true)
                sessionStorage.setItem("editAddressId", addressId)
                addressFormModalOpen()
                setIsLoading(false)
                setHide(true)
            }
        }else{
            setLogin(false)
        }
    }

    const deleteAddress = async () => {
        const user = JSON.parse(localStorage.getItem("user") || "")
        if(user && login){
            if(addressId){
                const userId = user?.id || ""
                const accessToken = user?.accessToken || ""
                const phone = user?.phone || ""
                const data = {"userId": userId, "phone":phone, "accessToken": accessToken,}
                try {
                    setIsLoading(true)
                    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/address/${addressId}`, {
                        data
                    })

                    if(res){
                        addresses.removeAddress(addressId)
                    }
                } catch (error) {
                    toast.error("Something went wrong.")
                } finally{
                    
                }
            }
        }else{
            setLogin(false)
        }
    }

    return (
        <div className="flex flex-row items-center  p-2">  
            <div className={hide? "hidden": 'flex flex-col rounded-md w-20 border-2 text-gray-700 font-semibold  text-xs shadow-lg'}>
                    <button onClick={editAddress} disabled={isLoading} className='my-1 hover:text-orange-400 '>
                        Edit
                    </button>
                    <hr />
                    <button onClick={deleteAddress} disabled={isLoading} className='my-1 hover:text-orange-400 '>
                        Delete
                    </button>
            </div>
            <div className='ml-2 border-2 text-gray-900 rounded-full' onClick={hideShowAction}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    )
}
export default AddressActions
