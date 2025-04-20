"use client";

import { navs } from "@/lib/navs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";

export default function NavbarMobile() {
    const pathname = usePathname();
    const [dropmenu, setDropmenu] = useState(false);
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
        setDropmenu(false);
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
                "p-4 z-50 w-full text-white fixed top-0 backdrop-blur-md shadow-lg block xl:hidden transition-all duration-500",
                isScrolled ? "bg-primary/80 shadow-lg" : "bg-black/30"
            )}
        >
            <div className="flex justify-between items-center">
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

                {/* Hamburger Menu */}
                <div className="hamburger h-10 w-10">
                    <button
                        onClick={() => setDropmenu(!dropmenu)}
                        className="h-full w-full focus:outline-none text-3xl"
                        aria-label={dropmenu ? "Close menu" : "Open menu"}
                    >
                        {dropmenu ? <TfiClose /> : <FiAlignJustify />}
                    </button>
                </div>
            </div>

            {/* Dropdown Menu */}
            <div
                className={clsx(
                    "overflow-hidden transition-all duration-300 ease-linear",
                    dropmenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <ul className="flex flex-col p-4">
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
                                    "m-2 p-3 w-full hover:bg-slate-700/80 rounded-lg text-lg transition-all duration-300 block",
                                    {
                                        "bg-slate-800/80 text-orange-400": pathname === nav.path,
                                    }
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    {nav.icon} {nav.name}
                                </div>
                            </Link>
                        </li>
                    ))}
                    {/* Notice Board Button */}
                    <li className="m-2">
                        <button 
                            className="bg-blue-600 p-3 w-full rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg transition-all duration-300"
                            onClick={() => handleNavigation('/notice-board')}
                        >
                            Notice Board
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}