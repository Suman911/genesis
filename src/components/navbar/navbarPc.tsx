"use client";
import { navs } from "@/lib/navs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarPc() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavigation = (path: string) => {
        if (pathname === path) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
        }
    };

    return (
        <div
            className={clsx(
                "p-2 z-50 w-full text-white fixed top-0 backdrop-blur-md hidden xl:block transition-all duration-500",
                isScrolled ? "h-16 bg-primary/80 shadow-lg" : "h-20 bg-black/0"
            )}
        >
            <div className="flex justify-between items-center h-full">
                {/* Logo */}
                <Link
                    href="/"
                    scroll={false}
                    onClick={() => handleNavigation('/')}
                >
                    <img
                        className="size-12 ml-4"
                        src="/assets/images/logo_main.png"
                        loading="lazy"
                        alt="logo"
                    />
                </Link>

                {/* Navigation Links */}
                <nav className="navigation block">
                    <ul className="flex space-x-4">
                        {navs.map((nav) => (
                            <li key={nav.name}>
                                <Link
                                    href={nav.path}
                                    scroll={false}
                                    onClick={(e) => {
                                        if (pathname === nav.path) {
                                            e.preventDefault();
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }
                                        handleNavigation(nav.path);
                                    }}
                                    className={clsx(
                                        "m-2 p-3 hover:bg-slate-700/80 rounded-lg text-lg transition-all duration-300 block",
                                        {
                                            "bg-slate-800/80 text-orange-400": pathname === nav.path,
                                        }
                                    )}
                                >
                                    {nav.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Notice Button */}
                <div className="btn my-auto mx-2">
                    <Link
                        href="/#notice"
                        scroll={false}
                        onClick={(e) => {
                            if (pathname === '/') {
                                e.preventDefault();
                                document.getElementById('notice')?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                handleNavigation('/#notice');
                            }
                        }}
                        className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg transition-all duration-300"
                    >
                        Notice Board
                    </Link>
                </div>
            </div>
        </div>
    );
}