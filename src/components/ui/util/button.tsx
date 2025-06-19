interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function Button({ children, className = "" }: ButtonProps) {
    return (
        <button
            className={`group relative overflow-hidden font-bold border-3 border-primary bg-primary text-white rounded-full transition-all duration-300 ease-in-out select-none ${className}`}
        >
            {/* Background Fill Effect */}
            <span className="absolute inset-0 w-0 group-hover:w-full bg-transparent group-hover:bg-white rounded-full transition-all duration-300 ease-in-out"></span>

            {/* Text Layer (Ensures text stays visible) */}
            <span className="relative group-hover:text-primary transition-all duration-300">
                {children}
            </span>
        </button>
    );
};
