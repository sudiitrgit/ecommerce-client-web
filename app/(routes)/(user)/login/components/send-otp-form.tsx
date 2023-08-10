"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input-mobile";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";




const SendOtpForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<FieldValues>({
        defaultValues: {
            phone: '',       
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/otp-send`, {
            data
        });
        localStorage.setItem("phone",response.data.phone);
        window.location = response.data.url;
    }


    return ( 
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <div className="flex flex-row items-center justify-center mb-10">
                    <h1 className="text-xl text-gray-400">Phone Number Verification</h1>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <h1 className="font-bold text-gray-500">Enter your phone number to</h1>
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-500">Login/Sign up</h2>
                    </div>
                </div>
                <form  className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                        id="phone" 
                        label="+91" 
                        type="tel"
                        pattern="[6-9]{1}[0-9]{9}"
                        register={register}
                        maxlength={10}
                        errors={errors}
                    />
                    <div>
                        <Button className="w-full" disabled={isLoading} type="submit">
                            Send OTP
                        </Button>
                    </div>
                    
                </form>
                <div className="flex flex-col items-center py-4">
                    <span className="text-sm text-gray-500">By continuing, you agree to our</span>
                    <div className="flex flex-row items-center space-x-4">
                        <Link href="/" className="text-sm text-orange-500 underline">Terms of service</Link>
                        <Link href="/" className="text-sm text-orange-500 underline">Privacy policy</Link>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default SendOtpForm;