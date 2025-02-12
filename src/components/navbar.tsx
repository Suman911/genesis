"use client";

import Link from "next/link";
import { useState } from "react";

interface Navs {
    path: string;
    name: string;
}

export default function Navbar() {
    const [dropmenu, setDropmenu] = useState(false);
    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // if (!mounted) return null; // Prevents hydration mismatch

    const navs: Navs[] = [
        { path: "/", name: "Home" },
        { path: "/story", name: "Our Story" },
        { path: "/academic", name: "Academic" },
        { path: "/training", name: "Industry Training" },
        { path: "/profession", name: "Professional Grooming" },
        { path: "/gallery", name: "Gallery" },
        { path: "/contact", name: "Contact" },
    ];


    return (
        <div className="p-2 bg-primary text-white sticky top-0 shadow-lg">
            <div className="flex justify-between">
                <Link href="/">
                    <img className="size-12 ml-4 my-auto" src="/assets/images/logo_main.png" alt="logo" />
                </Link>

                {/* Navigation (Desktop) */}
                <div className="navigation hidden lg:block">
                    <ul className="flex space-x-4 h-full m-auto">
                        {navs.map((nav, index) => (
                            <li key={index} className="p-3 cursor-pointer hover:bg-slate-700 rounded-lg text-lg">
                                <Link href={nav.path}>{nav.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Notice Button (Desktop) */}
                <div className="btn my-auto mx-2 hidden lg:block">
                    <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg">
                        Notice Board
                    </button>
                </div>

                {/* Mobile Hamburger Menu */}
                <div className="hamburger block lg:hidden">
                    <button onClick={() => setDropmenu(!dropmenu)}>
                        <span className="m-auto text-4xl material-symbols-outlined">
                            {dropmenu ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {dropmenu && (
                <div className="navigation block lg:hidden">
                    <ul className="flex flex-col px-3">
                        {navs.map((nav) => (
                            <li key={nav.name} className="m-2 p-3 cursor-pointer hover:bg-slate-700 rounded-lg text-lg">
                                <Link href={nav.path}>{nav.name}</Link>
                            </li>
                        ))}
                        <li>
                            <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg">
                                Notice Board
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
