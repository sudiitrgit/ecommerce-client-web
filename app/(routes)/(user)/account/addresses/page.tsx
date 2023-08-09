"use client";

import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import AccountContainer from "@/components/account-container";
import AccountLeft from "@/components/account-left";
import AddressForm from './components/address-form';
import AddressList from './components/address-list';
import { useGlobalContext } from '@/app/Context/global-context';
import useAddresses from '@/hooks/use-addresses';

interface addressType  {
    id:string
    username: string
    addressline1: string
    addressline2: string
    landmark: string
    pincode: string
    city: string
    state: string
}

const AccountAddresses = () => {
    const { login } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [stateName, setStateName ] = useState("")
    const router = useRouter()
    const addresses = useAddresses()
    const [addressDefaultValue, setAddressDefaultValue] = useState({
        username: "",
        pincode: "",
        addressline1: "",
        addressline2: "",
        landmark: "",
        city: "",
    }
)

    useEffect(() => {
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if(!isEdit){
            setAddressDefaultValue({
                ...addressDefaultValue,
                username: "",
                pincode: "",
                addressline1: "",
                addressline2: "",
                landmark: "",
                city: "",
            })
            setStateName("")
        }
    }, [isEdit, addressDefaultValue])
    
    if(isLoading){
        return null
    }

    if(!login){
        router.push("/login")
    }

    function closeModal() {
        sessionStorage.removeItem("editAddressId")
        setIsEdit(false)
        setIsOpen(false)
    }

    function openModal() {

        const editAddressId = sessionStorage.getItem("editAddressId")
        if(editAddressId != null){
                const addressToEdit = addresses.items.filter( (address:addressType)=> {
                    return address.id === editAddressId
                })
                
                setAddressDefaultValue({
                    ...addressDefaultValue,
                    username: addressToEdit[0].username,
                    pincode: addressToEdit[0].pincode,
                    addressline1: addressToEdit[0].addressline1,
                    addressline2: addressToEdit[0].addressline2,
                    landmark: addressToEdit[0].landmark,
                    city: addressToEdit[0].city,
                })
                setStateName(addressToEdit[0].state)
                setIsEdit(true)
        }
        setIsOpen(true)
    }
    return ( 
        <AccountContainer>
            <AccountLeft/>
            {/* account address right header */}
            <div className="col-span-3"> 
                <div className='flex flex-col p-4 border-b-2'>
                    <h1 className='text-xl font-semibold'>My addresses</h1>
                    <button type='button' 
                        onClick={openModal} 
                        className='flex flex-row text-orange-500 mt-2'
                    >
                        <Plus size={20}/>
                        <p className='text-sm'>Add New Address</p>
                    </button>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto ">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className='mx-4'>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 text-gray-900 px-2"
                                    >
                                        {isEdit ? "Edit Address": "Enter complete address"}
                                    </Dialog.Title>
                                    <p className='text-sm text-gray-500 mt-2 px-2'>This allow us to find you easily and give you timely delivery experience</p>
                                    <div className="mt-2 flex flex-row">
                                        <AddressForm initialData={addressDefaultValue} stateName={stateName} isEdit={isEdit} closeModal={closeModal}/>
                                        <div className="fixed top-0 right-0 mr-4 mt-4 hover:cursor-pointer p-1 text-orange-400 border-2 border-orange-400 rounded-full">
                                            <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>
                </div>
                {/* address list display */}
                <div className='flex flex-col justify-left space-y-4 m-4'>
                    <AddressList addressFormModalOpen={openModal}/>
                </div>
            </div>
        </AccountContainer>
     );
}
 
export default AccountAddresses;