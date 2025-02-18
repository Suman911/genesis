

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function Button({ children, className = "" }: ButtonProps) {
    return (
        <button
            className={`relative overflow-hidden font-bold border-3 border-primary bg-primary text-white rounded-full py-3 px-5 mt-2 transition-all duration-300 ease-in-out ${className}`}
        >
            {/* Background Fill Effect */}
            <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
            {/* Text Layer (Ensures text stays visible) */}
            <span className="relative group-hover:text-primary transition-all duration-300">
                {children}
            </span>
        </button>
    );
};

