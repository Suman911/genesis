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
    const msg = useRef<HTMLDivElement | null>(null);
    return (
        <div className={`w-full relative py-4 px-0 sm:py-4  ${className}`}>
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
                            const regex = regexs[id];
                            const isValid = value.match(regex) !== null;
                            // Toggle the border color based on validation
                            curr?.classList.toggle('!border-red-600', !isValid);
                            curr?.classList.toggle('!border-green-400', isValid);

                            // Toggle the visibility of the error message
                            if (msg?.current) {
                                msg.current.classList.toggle('hidden', isValid);
                            }
                        }
                    }
                }
                {...props} className="w-full p-2 outline-none border-2 border-primary rounded-xl" type="text" />
            {children}
            {props.id && <div ref={msg} className="w-full text-sm text-center absolute left-0 top-15 text-red-500 hidden">Please enter your correct {props.id}</div>}
        </div>
    );
}
