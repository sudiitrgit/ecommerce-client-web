"use client";

import clsx from "clsx";
import { Smartphone } from "lucide-react";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface InputProps {
    label: string,
    id: string,
    type?: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean,
    pattern?: string,
    maxlength?: number
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
    pattern,
    maxlength,
}) => {
    return ( 
        <div>
            <div className="flex flex-row items-start mt-10">
                <div className="flex flex-row items-left justify-center mr-2 mt-1">
                    <Smartphone className="text-gray-400" />
                    <label 
                        className="block text-l font-medium leading-6 text-gray-400"
                        htmlFor={id}
                    >
                    {label}
                    </label>
                </div> 
                <div className="w-full">
                    <input 
                        type={type} 
                        id={id}
                        autoComplete={id}
                        disabled={disabled}
                        {...register(id, { required })}
                        pattern={pattern}
                        maxLength={maxlength}
                        className={clsx(`
                            form-input
                            block
                            w-full
                            rounded-md
                            border-0
                            py-1.5
                            text-gray-900
                            shadow-sm
                            ring-1
                            ring-inset
                            ring-gray-300
                            placeholder:text-gray-400
                            focus:ring-2
                            focus:ring-inset
                            focus:ring-gray-300
                            sm:text-md
                            text-l
                            sm:leading-0`,
                            errors[id] && "focus:bg-red-800",
                            disabled && "opacity-50 cursor-default",
                            
                        )}
                    />
                </div>
            </div>
        </div>
     );
}
 
export default Input;