"use client";

import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useGlobalContext } from '@/app/Context/global-context';

export default function AccountNav() {
  const [isLoading, setIsLoading] = useState(true)
  const { login, setLogin} = useGlobalContext();

  const phone = localStorage.getItem("phone");

  useEffect(()=>{
    setIsLoading(false)
  }, [])

  if (isLoading){
    return null
  }

  const  logout = async() =>{
    const phone = localStorage.getItem("phone")
    if(phone){
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`,{
            phone
        })
        
        if(res){
            setLogin(false);
            localStorage.removeItem("accessToken")
            localStorage.removeItem("phone")

            localStorage.removeItem("addresses")
            localStorage.removeItem("user-storage")
            localStorage.removeItem("cart-storage")
        }
       
        window.location = res.data.url;
    }else{
        toast.error("Logout error.")
    }
}
  
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left z-10">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-xl text-gray-600 hover:text-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ">
            Account
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-grsy-600 hover:text-orange-500"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-4 py-2 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-white text-orange-500' : 'text-gray-600'
                    } group flex w-full items-center rounded-md px-2 py-2 `}
                  >
                    <div className='flex flex-col items-start justify-start'>
                      <span className='font-bold text-l'>My Account</span>
                      <span className='text-sm mt-0'>{phone}</span>
                    </div>
                  </button>
                )}
              </Menu.Item> 
            </div>
            <div className="px-4 py-2 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/account/orders"
                    className={`${
                      active ? 'bg-white text-orange-500' : 'text-gray-600'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    My Orders
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className='px-4 py-2 '>
                <Menu.Item>
                    {({ active }) => (
                    <Link
                        href="/account/addresses"
                        className={`${
                        active ? 'bg-white text-orange-500' : 'text-gray-600'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                        Saved Address
                    </Link>
                    )}
              </Menu.Item>
            </div>
            <div className="px-4 py-2 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'bg-white text-orange-500' : 'text-gray-600'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  > 
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

