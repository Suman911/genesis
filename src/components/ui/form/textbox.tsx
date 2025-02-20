'use client'
import { useRef, useState } from "react";
import { regexs } from "@/lib/regexs";
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
    return (
        <div className={`w-full py-4 px-0 sm:py-4  ${className}`}>
            <input ref={txtbox} value={value}
                onChange={
                    (e) => {
                        setValue(e.target.value)
                    }
                }
                onBlur={
                    () => {
                        const curr = txtbox.current
                        const id = curr?.id || '';
                        if (Object.keys(regexs).includes(id)) {
                            // check regex
                            const regex = regexs[id]
                            if (value.match(regex)) {
                                if(curr?.classList.contains('!border-red-600')){
                                    curr?.classList.remove('!border-red-600');
                                }
                                if(!curr?.classList.contains('!border-green-400')){
                                    curr?.classList.add('!border-green-400');
                                }
                            }
                            else {
                                if(curr?.classList.contains('!border-green-400')){
                                    curr?.classList.remove('!border-green-400');
                                }
                                if(!curr?.classList.contains('!border-red-600')){
                                    curr?.classList.add('!border-red-600');
                                }
                            }
                        }
                    }
                }
                {...props} className="w-full p-2 outline-none border-2 border-primary rounded-xl" type="text" />
            {children}
        </div>
    );
}
