interface ParagraphProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Paragraph({ children, className = "", ...props }: ParagraphProps) {
    return (
        <div {...props} className={`text-ash px-5 ${className}`}>
            {children}
        </div>
    );
}

export function ParagraphScope({ children, className = "", ...props }: ParagraphProps) {
    return (
        <div {...props} className={`relative w-fit ${className}`}>
            <div className="text-primary text-xl font-semibold px-6 peer flex items-center gap-4 after:block after:w-16 after:h-0.75 after:bg-primary">
                {children}
            </div>
            <div className="absolute left-0 right-0 mx-6 h-1 w-20 rounded-full bg-linear-to-r from-primary to-orange-400 duration-500 peer-hover:w-full"></div>
        </div>
    );
}

export function ParagraphTitle({ children, className = "", ...props }: ParagraphProps) {
    return (
        <h1 {...props} className={`font-bold text-4xl p-6 ${className}`}>
            {children}
        </h1>
    );
}
export function ParagraphPara({ children, className = "", ...props }: ParagraphProps) {
    return (
        <div {...props} className={`font-medium text-justify my-2 cols ${className}`}>
            {children}
        </div>
    );
}