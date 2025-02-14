"use client"

import { navs } from "@/lib/navs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavbarMobile({ }) {
    const pathname = usePathname();
    const [dropmenu, setDropmenu] = useState(false);
    return (
        <>
            <div className="p-2 z-50 w-full bg-primary text-white fixed top-0 shadow-lg block lg:hidden">
                <div className="flex justify-between">
                    <Link href="/">
                        <img className="size-12 ml-4 my-auto" src="/assets/images/logo_main.png" alt="logo" />
                    </Link>
                    <div className="hamburger block">
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
                <div className={`overflow-hidden transition-all duration-500 ease-in-out  ${dropmenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
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
        </>
    );
}