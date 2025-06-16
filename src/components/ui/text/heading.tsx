import React from "react";
interface heading extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Heading({ children, className = "", ...props }: heading) {
    return (
        <div {...props} className={`grid gap-y-6 place-items-center w-full ${className}`}>
            {children}
        </div>
    );
}

export function TopHeading({ children, className = "", ...props }: heading) {
    return (
        <div {...props} className={`flex gap-2 md:gap-4 lg:gap-6 items-center ${className}`}>
            <Line />
            <div className="md:text-xl text-2xl text-ash">
                {children}
            </div>
            <Line />
        </div>
    );
}

export function Line() {
    return (
        <div  className='h-1 bg-ash w-16 rounded-2xl'>
        </div>
    );
}

export function MainHeading({ children, className = "", ...props }: heading) {
    return (
        <div {...props} className={`text-3xl text-center md:text-4xl font-semibold ${className}`}>
            {children}
        </div>
    );
}