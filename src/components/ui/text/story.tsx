interface StoryProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Story({ children, className = "", ...props }: StoryProps) {
    return (
        <div 
            {...props} 
            className={`grid items-center gap-5 grid-cols-1 lg:grid-cols-11 p-2 py-10 xl:px-8 ${className}`}
        >
            {children}
        </div>
    );
}

export function StoryParagraph({ children, className = "", ...props }: StoryProps) {
    return (
        <div 
            {...props} 
            className={`xl:col-span-7 lg:col-span-6 ${className}`}
        >
            {children}
        </div>
    );
}

export function StoryImage({ children, className = "", ...props }: StoryProps) {
    return (
        <div 
            {...props} 
            className={`xl:col-span-4 lg:col-span-5 p-5 m-auto max-w-125 ${className}`}
        >
            {children}
        </div>
    );
}

export function ShortStory({ children, className = "", ...props }: StoryProps) {
    return (
        <div 
            {...props} 
            className={`grid grid-cols-1 md:grid-cols-6 p-2 py-10 md:p-8 ${className}`}
        >
            {children}
        </div>
    );
}

export function ShortStoryParagraph({ children, className = "", ...props }: StoryProps) {
    return (
        <div 
            {...props} 
            className={`md:col-span-3 py-6 ${className}`}
        >
            {children}
        </div>
    );
}
