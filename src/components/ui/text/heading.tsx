import React from "react";
interface headingSection extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}
interface heading extends React.HTMLAttributes<HTMLDivElement> {
    pageTitle: string 
}

export function Heading({ children, className = "", ...props }: headingSection) {
    return (
        <div {...props} className={`grid gap-y-6 place-items-center w-full select-none ${className}`}>
            {children}
        </div>
    );
}

export function TopHeading({ pageTitle, className = "", ...props } : heading) {
    return (
        <div {...props} className={`flex gap-2 md:gap-4 lg:gap-6 items-center ${className}`}>
            <Line />
            <h2 className="md:text-xl text-2xl text-ash">
                {pageTitle}
            </h2>
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

export function MainHeading({ children, className = "", ...props }: headingSection) {
    return (
        <div {...props} className={`text-3xl text-center md:text-4xl font-semibold ${className}`}>
            {children}
        </div>
    );
}