"use client";

import { useState, useEffect } from "react";

export const scrollToTop = () => {
    // Check if scroll is possible
    if (typeof window !== 'undefined' && window.scrollTo) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

export default function useToTop(): [boolean, () => void] {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisible = () => {
            const scrolled: number = document.documentElement.scrollTop;
            setVisible(scrolled > 300);
        };

        window.addEventListener("scroll", toggleVisible);
        return () => window.removeEventListener("scroll", toggleVisible);
    }, []);

    return [visible, scrollToTop];
}
