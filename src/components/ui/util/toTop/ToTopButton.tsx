"use client";

import useToTop from "./useToTop";
import { HiChevronUp } from "react-icons/hi";

export default function ToTopButton() {
    const [ visible, scrollToTop ] = useToTop();

    return (
        <button
            onClick={scrollToTop}
            className={`z-50 group fixed bottom-4 right-4 p-2 border-2 border-primary bg-primary text-white rounded-full shadow-lg overflow-hidden transition-all duration-200 ease-linear 
                ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            {/* Expanding Background */}
            <span className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out rounded-full"></span>

            {/* Icon - Above Background */}
            <HiChevronUp size={24} className="text-white group-hover:text-primary transition-colors duration-300 relative" />
        </button>
    );
}
