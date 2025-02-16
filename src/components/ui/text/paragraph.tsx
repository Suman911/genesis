interface ParagraphProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Paragraph({ children, ...props }: ParagraphProps) {
    return (
        <div {...props} className={`px-5 ${props.className}`}>
            {children}
        </div>
    );
}

export function ParagraphScope({ children, ...props }: ParagraphProps) {
    return (
        <div {...props} className={`relative w-fit ${props.className}`}>
            <div className="text-primary text-2xl font-semibold px-6 peer flex items-center gap-4 after:block after:w-16 after:h-[3px] after:bg-primary">
                {children}
            </div>
            <div className="absolute left-0 right-0 mx-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-orange-400 duration-500 peer-hover:w-full"></div>
        </div>
    );
}

export function ParagraphTitle({ children, ...props }: ParagraphProps) {
    return (
        <h1 {...props} className={`font-bold md:text-6xl text-4xl p-6 ${props.className}`}>
            {children}
        </h1>
    );
}
export function ParagraphPara({ children, ...props }: ParagraphProps) {
    return (
        <div {...props} className={`font-medium text-justify my-2 cols ${props.className}`}>
            {children}
        </div>
    );
}