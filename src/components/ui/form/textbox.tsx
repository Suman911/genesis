'use client'
import { useRef, useState } from "react";
import { validate } from "./validation";
interface text extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    placeholder?: string
}
export function TextGrid2({ children, className = "", ...props }: text) {
    return (
        <div {...props} className={`md:grid grid-cols-2 gap-1 ${className}`}>
            {children}
        </div>
    );
}
export function TextBox({ children, className = "", ...props }: text) {
    const [value, setValue] = useState("")
    const txtbox = useRef<HTMLInputElement | null>(null);
    const msgbox = useRef<HTMLDivElement | null>(null);
    return (
        <div className={`w-full relative py-4 px-0 sm:py-4  ${className}`}>
            <input ref={txtbox} value={value}
                onChange={
                    (e) => {
                        setValue(e.target.value)
                    }
                }
                onBlur={
                    ()=>validate(txtbox,msgbox,value)
                }
                {...props} className="w-full p-2 outline-none border-2 border-primary rounded-xl" type="text" required />
            {children}
            <div ref={msgbox} className="w-full text-sm text-center absolute left-0 top-15 text-red-500 hidden"></div>
        </div>
    );
}
