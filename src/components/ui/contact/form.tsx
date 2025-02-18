interface form extends React.HTMLAttributes<HTMLDivElement>{
    children:React.ReactNode
}
export function Form({children,...props}:form){
    return (
        <div {...props} className={`col-span-8 p-2 md:p-4 lg:p-8 h-full place-content-center${props.className || ''}`}>
        {children}
    </div>
    );
}

export function Formtitle({children,...props}:form){
    return (
        <div {...props} className={`text-center text-3xl  ${props.className || ''}`}>
        {children}
    </div>
    );
}
export function FormBody({children,...props}:form){
    return (
        <div {...props} className={`w-full px-12 py-6 ${props.className || ''}`}>
        {children}
    </div>
    );
}
export function FormBtn({children,...props}:form){
    return (
        <div {...props} className={` w-full px-10 ${props.className || ''}`}>
            <button className="w-full h-14 text-xl bg-primary text-white rounded-2xl hover:bg-gray-600">    
            {children}
            </button>
        </div>
    );
}