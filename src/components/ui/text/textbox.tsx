interface text extends React.HTMLAttributes<HTMLDivElement>{
    children?:React.ReactNode
    placeholder?:string
}
export function TextGrid2({children,...props}:text){
    return (
        <div {...props} className={`md:grid grid-cols-2 gap-1 ${props.className || ''}`}>
        {children}
    </div>
    );
}
export function TextBox({children,...props}:text){
    return (
        <div className={`w-full p-4  ${props.className || ''}`}>
            <input {...props} className="w-full p-2 border-2 border-primary rounded-xl" type="text" />
        {children}
    </div>
    );
}
