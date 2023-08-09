"use client"

import {  useForm } from "react-hook-form";
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from "axios";
import { toast } from "react-hot-toast";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react";

import { stateType, states } from "@/app/(routes)/(user)/account/addresses/components/state-list";
import { useGlobalContext } from "@/app/Context/global-context";
import useAddresses from "@/hooks/use-addresses";


type Inputs = {
    username: string
    addressline1: string
    addressline2: string
    landmark: string
    pincode: string
    city: string
}

function isValidPinCode(str: string) {
    let regex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);
    if (str == null) {
        return "false";
    }
    if (regex.test(str) == true) {
        return "true";
    }
    else {
        return "false";
    }
}

const AddressformSchema: ZodType<Inputs> = z.object({
    username: z.string().trim().min(2, { message: "Please enter a name."}),
    addressline1: z.string().trim().min(2, { message: "Please enter Flat, House no."}),
    addressline2: z.string().trim().min(2, { message: "Please enter Area, Street."}),
    landmark: z.string().trim().min(2, { message: "Please enter a Landmark."}),
    pincode: z.string().min(6, {message: "Please enter a ZIP or postal code."}).max(6),
    city: z.string().trim().min(1, { message: "Please enter a City name."}),
}).refine((data) => isValidPinCode(data.pincode), {
    message: "Please enter a ZIP or postal code.",
    path: ["pincode"],
})

type AddressFormValues = z.infer<typeof AddressformSchema>

interface AddressFormProps {
    initialData: AddressFormValues,
    stateName: string,
    isEdit: boolean
    closeModal: () => void
}

const AddressForm: React.FC<AddressFormProps> = ({
    initialData,
    stateName,
    isEdit,
    closeModal,
}) => {
    const [stateIndex, setStateIndex ] = useState(9)
    const [selectedState, setSelectedState] = useState(states[stateIndex])
    const [query, setQuery] = useState('')
    const { login,setLogin } = useGlobalContext();
    const addresses = useAddresses()

    useEffect(() => {
        if(stateName){
            const index = states.findIndex(({id, name}) => {
                return name === stateName
            })
            setStateIndex(index)
            setSelectedState(states[stateIndex])
        }
    },[stateName, stateIndex])

    const filteredstate =
        query === ''
        ? states
        : states.filter((state) =>
            state.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const { register, 
            handleSubmit ,
            formState: { errors, isSubmitting }
            } = useForm<Inputs>({
                    resolver: zodResolver(AddressformSchema),
                    defaultValues: initialData ? {
                        ...initialData
                    }: {
                        username: "",
                        pincode: "",
                        addressline1: "",
                        addressline2: "",
                        landmark: "",
                        city: "",
                        
                    }
    })
    const onSubmit = async (data: Inputs) => {
        
        const user = JSON.parse(localStorage.getItem("user") || "")
        if( !user || !login ){
            setLogin(false)
        }else{
            const userId = user?.id || ""
            const accessToken = user?.accessToken || ""
            const phone = user?.phone || ""
            const dataSend = {...data, "state": selectedState.name, "userId": userId, "phone":phone, "accessToken": accessToken,}
            
            if(isEdit){
                const addressEditId = sessionStorage.getItem("editAddressId")
                if(addressEditId){
                    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/address/${addressEditId}`, {
                        data: dataSend
                    })
    
                    if(response){
                        addresses.editAddress(addressEditId, {...data, "state": selectedState.name, "id": addressEditId})
                        sessionStorage.removeItem("editAddressId")
                        closeModal()
                    }else{
                        toast.error("something went wrong")
                    }
                }
                
            }else{
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, {
                    data: dataSend
                })
                if(response){
                    addresses.addAddress(response.data.address)
                    closeModal()

                }else{
                    toast.error("something went wrong")
                }
            }
        }
        
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-left space-y-2 p-2">
                <div className="text-gray-600 font-semibold">
                    Full name (First and Last name)
                </div>
                <div>
                    <input 
                        type="text" 
                        id="username"
                        disabled={isSubmitting}
                        
                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                            focus:ring-2 focus:ring-inset focus:ring-orange-300
                            sm:text-md text-l sm:leading-0"
                            
                        {...register("username")}
                    />
                    { errors.username && 
                        <div className="flex flex-row text-xs text-red-500 space-x-2 mt-1">
                            <AlertCircle size={16} color="#f71818" strokeWidth={3} />
                            <span>{errors.username.message}</span>
                        </div>
                    }
                </div>
            </div>
            <div className="flex flex-col items-left space-y-2 p-2">
                <div className="text-gray-600 font-semibold">
                    Flat, House no, Building, Company, Apartment
                </div>
                <div>
                    <input 
                        type="text" 
                        id="addressline1"
                        disabled={isSubmitting}
                        
                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                            focus:ring-2 focus:ring-inset focus:ring-orange-300
                            sm:text-md text-l sm:leading-0"
                        {...register("addressline1")}
                    />
                    { errors.addressline1 && 
                        <div className="flex flex-row text-xs text-red-500 space-x-2 mt-1">
                            <AlertCircle size={16} color="#f71818" strokeWidth={3} />
                            <span>{errors.addressline1.message}</span>
                        </div>
                    }
                </div>
            </div>
            <div className="flex flex-col items-left space-y-2 p-2">
                <div className="text-gray-600 font-semibold">
                    Area, Street, Sector, Village
                </div>
                <div>
                    <input 
                        type="text" 
                        id="addressline2"
                        disabled={isSubmitting}
                        
                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                            focus:ring-2 focus:ring-inset focus:ring-orange-300
                            sm:text-md text-l sm:leading-0"
                        {...register("addressline2")}
                    />
                    { errors.addressline2 && 
                        <div className="flex flex-row text-xs text-red-500 space-x-2 mt-1">
                            <AlertCircle size={16} color="#f71818" strokeWidth={3} />
                            <span>{errors.addressline2.message}</span>
                        </div>
                    }
                </div>
            </div>
            <div className="flex flex-col items-left space-y-2 p-2">
                <div className="text-gray-600 font-semibold">
                    Landmark
                </div>
                <div>
                    <input 
                        type="text" 
                        id="landmark"
                        placeholder="E.g. near some Shop"
                        disabled={isSubmitting}
                        
                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                            focus:ring-2 focus:ring-inset focus:ring-orange-300
                            sm:text-md text-l sm:leading-0"
                        {...register("landmark")}
                    />
                    { errors.landmark && 
                        <div className="flex flex-row text-xs text-red-500 space-x-2 mt-1">
                            <AlertCircle size={16} color="#f71818" strokeWidth={3} />
                            <span>{errors.landmark.message}</span>
                        </div>
                    }
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col items-left space-y-2 p-2">
                    <div className="text-gray-600 font-semibold">
                        Town/City
                    </div>
                    <div>
                        <input 
                            type="text" 
                            id="city"
                            disabled={isSubmitting}
                            
                            className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900
                                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                focus:ring-2 focus:ring-inset focus:ring-orange-300
                                sm:text-md text-l sm:leading-0"
                            {...register("city")}
                        />
                        { errors.city && 
                            <div className="flex flex-row text-xs text-red-500 space-x-2 mt-1">
                                <AlertCircle size={16} color="#f71818" strokeWidth={3} />
                                <span>{errors.city.message}</span>
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col items-left space-y-2 p-2">
                    <div className="text-gray-600 font-semibold">
                        Pincode
                    </div>
                    <div>
                        <input 
                            type="text" 
                            id="pincode"
                            disabled={isSubmitting}
                            placeholder="6 digits PIN code"
                            maxLength={6}
                            
                            className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900
                                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                focus:ring-2 focus:ring-inset focus:ring-orange-300
                                sm:text-md text-l sm:leading-0"
                            {...register("pincode")}
                        />
                        { errors.pincode && 
                            <div className="flex flex-row text-xs text-red-500 space-x-2 mt-1">
                                <AlertCircle size={16} color="#f71818" strokeWidth={3} />
                                <span>{errors.pincode.message}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-left space-y-2 p-2">
                <div className="text-gray-600 font-semibold">
                    State
                </div>
                <div>
                    {/* states list start */}

                    <div className="w-full">
                        <Combobox value={selectedState} onChange={setSelectedState}>
                            <div className="relative mt-1">
                            <div className="relative w-full cursor-defaul text-left sm:text-sm">
                                <Combobox.Input
                                className="w-full form-input block py-2 pl-3 pr-10 text-sm rounded-md text-gray-900 
                                    ring-1 ring-inset ring-gray-300 border-0
                                    focus:ring-2 focus:ring-inset focus:ring-orange-300"
                                displayValue={(state: stateType) => state.name}
                                onChange={(event) => setQuery(event.target.value)}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-300"
                                    aria-hidden="true"
                                />
                                </Combobox.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery('')}
                            >
                                <Combobox.Options  className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  sm:text-sm">
                                {filteredstate.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                    </div>
                                ) : (
                                    filteredstate.map((state) => (
                                    <Combobox.Option
                                        key={state.id}
                                        className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-orange-300 text-gray-900' : 'text-gray-900'
                                        }`
                                        }
                                        value={state}
                                    >
                                        {({ selected, active }) => (
                                        <>
                                            <span
                                            className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                            }`}
                                            >
                                            {state.name}
                                            </span>
                                            {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active ? 'text-white' : 'text-teal-600'
                                                }`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            ) : null}
                                        </>
                                        )}
                                    </Combobox.Option>
                                    ))
                                )}
                                </Combobox.Options>
                            </Transition>
                            </div>
                        </Combobox>
                    </div>

                    {/* select states end */}
                </div>
            </div>
            <div className="mt-4 ml-1 mr-1">
                <button type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border
                     border-transparent bg-orange-500 px-8 py-2 text-lg 
                     font-medium text-white w-full"
                >
                    Save Address
                </button>
            </div>
        </form>
     );
}
 
export default AddressForm;