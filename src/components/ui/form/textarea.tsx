'use client'

import { useRef, useState } from "react";
import { validate } from "./validation";

interface textareaholder extends React.HTMLAttributes<HTMLElement> {
    children?: string
    placeholder?: string
}
export function TextArea({ children="", className = "", ...props }: textareaholder) {
    const [value,setValue]=useState(children)
    const textbox=useRef(null)
    const msgbox=useRef(null)
    return (
        <div className='w-full relative py-4 px-0 sm:py-4'>
            <textarea ref={textbox} {...props} name="txtadjbox" className={`h-32 w-full p-2 outline-none border-2 border-primary rounded-xl ${className}`}
            value={value}
            onChange={
                (e)=>setValue(e.target.value)
            }
            onBlur={
                ()=>validate(textbox,msgbox,value)
            }
            required
            />
            <div ref={msgbox} className="w-full text-sm text-center absolute left-0 top-full -translate-y-3.5 text-red-500 hidden"></div>
        </div>
    );
}