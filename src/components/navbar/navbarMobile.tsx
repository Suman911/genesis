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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={clsx(
                "p-4 z-50 w-full text-white fixed top-0 backdrop-blur-md shadow-lg block lg:hidden transition-all duration-500",
                isScrolled ? "bg-primary/80 shadow-lg" : "bg-black/30"
            )}
        >
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
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
                        <Link
                            href={nav.path}
                            key={nav.name}
                            className={clsx(
                                "m-2 p-3 hover:bg-slate-700/80 rounded-lg text-lg transition-all duration-300",
                                {
                                    "bg-slate-800/80 text-orange-400": pathname === nav.path,
                                }
                            )}
                            onClick={() => setDropmenu(false)}
                        >
                            <li
                                className="flex w-full h-full items-center gap-4"
                            >
                                {nav.icon} {nav.name}
                            </li>
                        </Link>
                    ))}
                    {/* Notice Board Button */}
                    <li>
                        <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg transition-all duration-300">
                            Notice Board
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
