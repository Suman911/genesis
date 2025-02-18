import React from "react";
interface card extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}
export function Contact({ children, className = "", ...props }: card) {
    return (
        <div {...props} className={`lg:grid grid-cols-12 gap-6 p-8 md:p-12 lg:p-16 ${className}`}>
            {children}
        </div>
    );
}
export function Contactcard({ children, className = "", ...props }: card) {
    return (
        <div {...props} className={`col-span-4 p-4 lg:p-6 bg-white rounded-2xl ${className}`}>
            {children}
        </div>
    );
}
export function ContactMethod({ children, className = "", ...props }: card) {
    return (
        <div {...props} className={`py-4 grid place-items-center text-center ${className}`}>
            {children}
        </div>
    );
}
export function CMIcon({ children, className = "", ...props }: card) {
    return (
        <div {...props} className={`text-6xl text-primary p-2 ${className}`}>
            {children}
        </div>
    );
}
export function CMtitle({ children, className = "", ...props }: card) {
    return (
        <div {...props} className={`p-2 text-primary text-2xl ${className}`}>
            {children}
        </div>
    );
}
export function CMdescription({ children, className = "", ...props }: card) {
    return (
        <div {...props} className={`text-ash p-2 ${className}`}>
            {children}
        </div>
    );
}