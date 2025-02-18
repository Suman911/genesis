interface text extends React.HTMLAttributes<HTMLDivElement>{
    children?:React.ReactNode
    placeholder?:string
}
export function TextGrid2({children, className = "",...props}:text){
    return (
        <div {...props} className={`md:grid grid-cols-2 gap-1 ${className}`}>
        {children}
    </div>
    );
}
export function TextBox({children, className = "",...props}:text){
    return (
        <div className={`w-full py-4 px-0 sm:py-4 ${className}`}>
            <input {...props} className="w-full p-2 border-2 border-primary rounded-xl" type="text" />
        {children}
    </div>
    );
}
