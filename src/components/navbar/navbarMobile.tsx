"use client"

import { navs } from "@/lib/navs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
export default function NavbarMobile({ }) {
    const pathname = usePathname();
    const [dropmenu, setDropmenu] = useState(false);
    return (
        <>
            <div className="p-4 z-50 w-full bg-primary text-white fixed top-0 shadow-lg block lg:hidden">
                <div className="flex justify-between">
                    <Link href="/">
                        <img className="size-12 ml-4 my-auto" src="/assets/images/logo_main.png" alt="logo" />
                    </Link>
                    <div className="hamburger h-10 w-10">
                        <button onClick={
                            () => {
                                setDropmenu(!dropmenu);
                            }
                        } className="h-full w-full focus:outline-none text-3xl">
                            {dropmenu ? <TfiClose/> : <FiAlignJustify />}
                        </button>
                    </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-linear  ${dropmenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="flex p-4
                flex-col">
                        {
                            navs.map(
                                (nav) => (
                                    <li key={nav.name} className={clsx("m-2 p-3 cursor-pointer hover:bg-slate-700 rounded-lg text-lg",
                                        {
                                            "bg-slate-700 text-orange-400": pathname == nav.path
                                        }
                                    )}>
                                        <Link href={nav.path} className="flex w-full h-full items-center gap-4" onClick={() => {
                                            setDropmenu(!dropmenu);
                                        }}>
                                            {nav.icon}{nav.name}
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