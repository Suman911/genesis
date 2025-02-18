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
        <div {...props} className={`text-center text-3xl  ${className}`}>
        {children}
    </div>
    );
}
export function FormBody({children, className = "",...props}:form){
    return (
        <div {...props} className={`w-full px-12 py-6 ${className}`}>
        {children}
    </div>
    );
}
export function FormBtn({children, className = "",...props}:form){
    return (
        <div {...props} className={` w-full px-10 ${className}`}>
            <button className="w-full h-14 text-xl bg-primary text-white rounded-2xl hover:bg-gray-600">    
            {children}
            </button>
        </div>
    );
}