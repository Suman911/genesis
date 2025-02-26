'use client'

import { forwardRef, ForwardedRef ,useRef, useState, RefObject } from "react";
import { ValidatorFunction } from "./validation";

interface textareaholder extends React.HTMLAttributes<HTMLElement> {
    children?: string
    placeholder?: string
    textbox:ForwardedRef<HTMLTextAreaElement>
    validate:ValidatorFunction
}
export const TextArea=forwardRef(({ children="", className = "", textbox,validate,...props }: textareaholder)=>{
    const msgbox=useRef(null)
    return (
        <div className='w-full relative py-4 px-0 sm:py-4'>
            <textarea ref={textbox} {...props} name="txtadjbox" className={`h-32 w-full p-2 outline-none border-2 border-primary rounded-xl ${className}`}
            onBlur={
                ()=>validate(textbox as RefObject<HTMLTextAreaElement>,msgbox)
            }
            required
            />
            <div ref={msgbox} className="w-full text-sm text-center absolute left-0 top-full -translate-y-3.5 text-red-500 hidden"></div>
        </div>
    );
});