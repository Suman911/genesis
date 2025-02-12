"use client";

import Link from "next/link";
import { useState } from "react";
import { navs } from "@/lib/navs";
import { usePathname } from "next/navigation";

import clsx from "clsx";

export default function Navbar() {
    const pathname = usePathname();
    const [dropmenu, setDropmenu] = useState(false);
    return (
        <div className="p-2 bg-slate-900 text-white sticky top-0 shadow-lg z-50">
            <div className="flex justify-between">
                <div className="logo h-auto w-24 bg-red-600 m-2 text-center p-1">Logo
                </div>
                <div className="navigation hidden lg:block">
                    <ul className="flex space-x-4 h-full m-auto">
                        {
                            navs.map(
                                (nav) => (
                                    <li key={nav.name} className={clsx("m-2 p-3 cursor-pointer hover:bg-slate-700 rounded-lg text-lg", {
                                        "bg-slate-800 text-orange-400": pathname == nav.path
                                    })}>
                                        <Link href={nav.path} className="w-full h-full block">
                                            {nav.name}
                                        </Link>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
                <div className="btn my-auto mx-2 hidden lg:block">
                    <button className="bg-blue-600  p-2 rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg">Notice Board</button>
                </div>
                <div className="hamburger block lg:hidden">
                    <button onClick={
                        () => {
                            setDropmenu(!dropmenu);
                        }
                    } className="focus:outline-none">
                        <span className="m-auto text-4xl material-symbols-outlined " >
                            {dropmenu ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>

            </div>
            <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out  ${dropmenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="flex 
                flex-col px-3">
                    {
                        navs.map(
                            (nav) => (
                                <li key={nav.name} className={clsx("m-2 p-3 cursor-pointer hover:bg-slate-700 rounded-lg text-lg",
                                    {
                                        "bg-slate-700 text-orange-400": pathname == nav.path
                                    }
                                )}>
                                    <Link href={nav.path} className="w-full h-full block" onClick={() => {
                                        setDropmenu(!dropmenu);
                                    }}>
                                        {nav.name}
                                    </Link>
                                </li>
                            )
                        )
                    }
                    <li><button className="bg-blue-600  p-2 rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg">Notice Board</button></li>
                </ul>
            </div>
        </div>
    );
}