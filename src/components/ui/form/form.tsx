import Button from "../util/button";

interface form extends React.HTMLAttributes<HTMLDivElement>{
    children:React.ReactNode
}
export function Form({children, className = "",...props}:form){
    return (
        <div {...props} className={`col-span-8 p-2 md:p-4 lg:p-8 h-full place-content-center${className}`}>
        {children}
    </div>
    );
}

export function Formtitle({children, className = "",...props}:form){
    return (
        <div {...props} className={`text-center text-3xl pt-6 ${className}`}>
        {children}
    </div>
    );
}
export function FormBody({children, className = "",...props}:form){
    return (
        <div {...props} className={`w-full px-2 sm:px-12 py-6 ${className}`}>
        {children}
    </div>
    );
}
export function FormBtn({children, className = "",...props}:form){
    return (
        <div {...props} className={`flex w-full px-2 sm:px-12 ${className}`}>
            <Button className="w-full sm:w-1/2 m-auto">    
            {children}
            </Button>
        </div>
    );
}