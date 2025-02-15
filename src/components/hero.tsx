"use client";

import OptimisedImage from "./ui/image/OptimisedImage";
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

    return (
        <div className="relative w-full md:h-[500px] h-[350px] flex items-center justify-center text-white text-5xl lg:text-8xl font-bold overflow-hidden">
            {isHome ? (
                <div className="absolute inset-0 -top-40">
                    <HeroVideo />
                </div>
            ) : (
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                        src="/assets/images/hero.png"
                        className="w-full h-full object-cover md:fixed relative -z-10"
                        alt="Hero Background"
                    />
                    <OptimisedImage
                        src="hero.png"
                        alt="image"
                        className=""
                        sizes="md:1200"
                    />
                </div>
            )}
            <div className="absolute inset-0 flex items-center text-center justify-center backdrop-brightness-90">
                {headlines[path]}
            </div>
        </div>
    );
}
