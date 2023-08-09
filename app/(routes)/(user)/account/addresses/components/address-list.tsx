import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import AddressActions from './address-actions'
import useAddresses from '@/hooks/use-addresses'

interface AddressListProps {
    addressFormModalOpen: ()=>void
}

export default function AddressList({
    addressFormModalOpen
}: AddressListProps) {
    const addresses = useAddresses()
    const [isLoading, setIsLoading] = useState(true)
    const [selected, setSelected] = useState(addresses.items[0])

    useEffect(()=>{
        setIsLoading(false)
    }, [])

    if (isLoading){
        return null
    }

    return (
        <>
            <RadioGroup value={selected} onChange={setSelected}>
                <div className="space-y-2">
                    {addresses.items.map((address: any) => (
                        
                        <RadioGroup.Option
                        key={address.id}
                        value={address.id}
                        className={({ active, checked }) =>
                            `${
                            active
                                ? 'ring-2 ring-white  ring-offset-2 ring-offset-orange-300'
                                : ''
                            }
                            ${
                            checked ? 'bg-gray-50 ring-2 ring-white ring-offset-2 ring-offset-orange-300 text-white' : 'bg-white'
                            }
                            relative flex  cursor-pointer rounded-md px-5 py-4 `
                        }
                        >
                        {({ active, checked }) => (
                            <>
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex w-full  items-center">
                                        <div className="flex flex-row w-full items-center text-sm">
                                            <div className='mr-4'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                                className= { checked? "w-6 h-6 text-orange-400" : "w-6 h-6 text-black"} >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                </svg>
                                            </div>

                                            <div className='flex flex-col'>
                                                <RadioGroup.Label
                                                    as="p"
                                                    className={`font-medium  ${
                                                        checked ? 'text-orange-400' : 'text-gray-900'
                                                    }`}
                                                    >
                                                    {address.username}
                                                </RadioGroup.Label>

                                                <RadioGroup.Description
                                                    as="span"
                                                    className={`inline ${
                                                        checked ? 'text-gray-900' : 'text-gray-500'
                                                    }`}
                                                    >
                                                    <span>{address.addressline1}</span>{", "}
                                                    <span>{address.addressline2}</span>{", "}
                                                    <span >{address.landmark}</span>{", "}
                                                    <span>{address.city}</span>{", "}
                                                    <span>{address.state}</span>
                                                </RadioGroup.Description>
                                            </div>
                                            <div className='ml-auto'>
                                                <AddressActions addressId={address.id} addressFormModalOpen={addressFormModalOpen}/>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        </RadioGroup.Option>
                    ))}
                    </div>
            </RadioGroup>
        </>
    )
}


