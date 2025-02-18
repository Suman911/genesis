import React from "react";
interface heading extends React.HTMLAttributes<HTMLDivElement>{
    children:React.ReactNode
}
export function Heading({children,...props}:heading){
    return (
        <div {...props} className={`grid gap-y-6 place-items-center w-full ${props.className || ''}`}>
            {children}
        </div>
    );
}
export function TopHeading({children,...props}:heading){
    return (
        <div {...props} className={`flex gap-2 md:gap-4 lg:gap-6 items-center ${props.className || ''}`}>
            <Line/>
            <div className="text-2xl text-ash">
            {children}
            </div>
            <Line/>
        </div>
    );
}

export function Line(){
    return (
        <div  className='h-1 bg-ash w-16'>
        </div>
    );
}

export function MainHeading({children,...props}:heading){
    return (
        <div {...props} className={`text-black text-3xl text-center md:text-4xl lg:text-5xl font-semibold ${props.className || ''}`}>
            {children}
        </div>
    );
}