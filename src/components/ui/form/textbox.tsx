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
        <div className={`w-full py-4 px-0 sm:py-4 ${className}`}>
            <input ref={txtbox} value={value} onChange={
                (e) => {
                    setValue(e.target.value)
                    const curr=txtbox.current
                    const id:string=curr?.id||'';
                    if (Object.keys(regexs).includes(id)) {
                        // check regex
                        const regex=regexs[id]
                        if(value.match(regex)){
                           console.log('Regex matches')
                        }
                        else{
                            console.log('Regex doesn\'t matches')
                        }
                    }
                }
            } {...props} className="w-full p-2 border-2 border-primary rounded-xl" type="text" />
            {children}
        </div>
    );
}
