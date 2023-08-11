"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input-otp";
import useAddresses from "@/hooks/use-addresses";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Address, Order } from "@/types";
import useUser from "@/hooks/use-user";
import useOrders from "@/hooks/use-orders";

const OtpVerifyForm = () => {

    const [isLoading, setIsLoading] = useState(true);
    const address = useAddresses()
    const user = useUser()
    const orders = useOrders()

    useEffect(()=> {     
        setIsLoading(false)
    }, [])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        const phone = localStorage.getItem("phone");
        data.phone = phone;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/otp-verification`, {
            data,
        });
        if(response.data){
            localStorage.setItem("accessToken", response.data.accessToken)
            user.addUser(response.data.user)
            if(response.data.addresses){
                response.data.addresses.forEach((item: Address)=> {
                    address.addAddress(item)
                } )
            }
            if(response.data.orders){
                response.data.orders.forEach((item: Order)=> {
                    orders.addOrder(item)
                } )
            }
            window.location = response.data.url;
        }else{
            window.location = response.data.url;
        }
        
        
    }

    const onResend = async () => {
        const phone = localStorage.getItem("phone");
        const data = {"phone": phone}
        if(!data.phone){
            toast.error("Phone no is required")
        }else{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/otp-send`, {
                data
            });
            if(response){
                toast.success(`OTP sent to ${response.data.phone}`)
            }
        }
        
    }


    return ( 
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <div className="flex flex-row items-center justify-center mb-10">
                    <h1 className="text-xl text-gray-400">Phone Number Verification</h1>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <h1 className="font-bold text-gray-500">Enter 4 digit code sent to your </h1>
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-500">phone no</h2>
                    </div>
                </div>
                <form  className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row items-start mt-10">
                        <div className="w-full flex flex-row items-center justify-center space-x-3">
                            <Input 
                                id="otpdigit1"  
                                register={register}
                                maxlength={1}
                                errors={errors} 
                                disabled={isLoading} 
                            />
                            <Input 
                                id="otpdigit2"  
                                register={register}
                                maxlength={1}
                                errors={errors}  
                                disabled={isLoading} 
                            />
                            <Input 
                                id="otpdigit3"  
                                register={register}
                                maxlength={1}
                                errors={errors}
                                disabled={isLoading} 
                            />
                            <Input 
                                id="otpdigit4"  
                                register={register}
                                maxlength={1}
                                errors={errors}
                                disabled={isLoading} 
                            />
                        </div>
                    </div>
                    <div>
                        <Button className="w-full" disabled={isLoading} type="submit">
                            Verify OTP
                        </Button>
                    </div>
                    
                </form>
                <div className="flex flex-col items-center py-4">
                    <div className="flex flex-row items-center space-x-4 " >
                        <p onClick={onResend} hidden={isLoading} className="text-sm text-orange-500 hover:underline cursor-pointer">Resend Code</p>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default OtpVerifyForm;