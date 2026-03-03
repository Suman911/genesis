import React from "react";
interface card extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}
interface cardSpan extends React.HTMLAttributes<HTMLSpanElement> {
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
        <div {...props} className={`col-span-5 p-4 lg:p-6 bg-white rounded-2xl ${className}`}>
            {children}
        </div>
    );
}
export function ContactMethod({ children, className = "", ...props }: card) {
    return (
        <div {...props} className={`py-2 grid place-items-center text-center ${className}`}>
            {children}
        </div>
    );
}
export function CMIcon({ children, className = "", ...props }: cardSpan) {
    return (
        <span {...props} className={`text-4xl text-primary p-2 ${className}`}>
            {children}
        </span>
    );
}
export function CMtitle({ children, className = "", ...props }: card) {
    return (
        <div {...props} className={`text-primary text-2xl flex items-center gap-2 ${className}`}>
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