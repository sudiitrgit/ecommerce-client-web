"use client";

import clsx from "clsx";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface InputProps {
    
    id: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean,
    pattern?: string,
    maxlength?: number
   
}

const Input: React.FC<InputProps> = ({
    id,
    required,
    register,
    errors,
    disabled,
    pattern,
    maxlength,
    
}) => {
    return ( 
        <>
            <input              
                id={id}
                autoComplete={id}
                disabled={disabled}
                {...register(id, { required })}
                pattern={pattern}
                maxLength={maxlength}
                className={clsx(`
                    form-input
                    block
                    w-20
                    h-16
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
                    sm:text-l
                    sm:leading-0`,
                    errors[id] && "focus:bg-red-800",
                    disabled && "opacity-50 cursor-default",
                    
                )}
            />                 
        </>
     );
}
 
export default Input;