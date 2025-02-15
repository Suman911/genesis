"use client";
import { navs } from "@/lib/navs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarPc() {
    const pathname = usePathname();
    return (
        <div className="p-2 z-50 w-full bg-primary text-white fixed top-0 shadow-lg hidden lg:block">
            <div className="flex justify-between">
                <Link href="/">
                    <img className="size-12 ml-4 my-auto" src="/assets/images/logo_main.png" alt="logo" />
                </Link>
                <div className="navigation block">
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

                {/* Notice Button (Desktop) */}
                <div className="btn my-auto mx-2 block">
                    <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg">
                        Notice Board
                    </button>
                </div>
            </div>
        </div>
    );
}