import React from "react";
interface card extends React.HTMLAttributes<HTMLDivElement>{
    children:React.ReactNode
}
export function Contact({children,...props}:card){
    return (
        <div {...props} className={`lg:grid grid-cols-12 gap-6 p-8 md:p-12 lg:p-16 ${props.className||''}`}>
            {children}
        </div>
    );
}
export function Contactcard({children,...props}:card){
    return (
        <div {...props} className={`col-span-4 p-4 lg:p-6 bg-white rounded-2xl ${props.className||''}`}>
            {children}
        </div>
    );
}
export function ContactMethod({children,...props}:card){
    return (
        <div {...props} className={`py-4 grid place-items-center text-center ${props.className||''}`}>
            {children}
        </div>
    );
}
export function CMIcon({children,...props}:card){
    return (
        <div {...props} className={`text-6xl text-primary p-2 ${props.className||''}`}>
            {children}
        </div>
    );
}
export function CMtitle({children,...props}:card){
    return (
        <div {...props} className={`p-2 text-primary text-2xl ${props.className||''}`}>
            {children}
        </div>
    );
}
export function CMdescription({children,...props}:card){
    return (
        <div {...props} className={`text-ash p-2 ${props.className||''}`}>
            {children}
        </div>
    );
}