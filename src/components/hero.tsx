"use client";

// import OptimisedImage from "./ui/image/OptimisedImage";
import HeroVideo from "./ui/video/herovideo";
import { usePathname } from "next/navigation";

export default function Hero() {
    const path = usePathname();
    const isHome = path === "/";

    const headlines: Record<string, string> = {
        "/": "Welcome to Genesis",
        "/story/": "About Us",
        "/academic/": "Academics",
        "/training/": "Industry Training",
        "/profession/": "Professional Grooming",
        "/gallery/": "Gallery",
        "/contact/": "Contact Us",
    };

    if (!headlines[path]) return null;

    if (isHome)
        return (
            <div className="md:h-[680px] h-[500px] relative w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 -top-15">
                    <HeroVideo />
                </div>
                <div className="absolute inset-0 -top-1/3 text-white text-5xl md:text-8xl font-bold flex items-center text-center justify-center backdrop-brightness-90">
                    {headlines[path]}
                </div>
            </div>
        );

    return (
        <div className="md:h-[500px] h-[350px] relative w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="/assets/images/hero.png"
                    className="w-full h-full object-cover md:fixed relative -z-10"
                    loading="lazy"
                    alt="Hero Background"
                />
            </div>
            <div className="absolute inset-0 text-white text-5xl md:text-8xl font-bold flex items-center text-center justify-center  backdrop-brightness-90">
                {headlines[path]}
            </div>
        </div>
    );
}
