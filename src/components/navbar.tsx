"use client";

import Link from "next/link";
import { useState } from "react";
interface Navs {
    path: string;
    name: string
}
export default function Navbar() {
    const navs: Navs[] = [{ path: '/.', name: 'Home' }, { path: '/story', name: 'Our Story' }, { path: '/academic', name: 'Academic' }, { path: '/training', name: 'Industry Training' }, { path: '/profession', name: 'Professional Grooming' }, { path: '/gallery', name: 'Gallery' }, { path: '/contact', name: 'Contact' }]
    let [dropmenu, setDropmenu] = useState(false);
    return (
        <div className="p-2 bg-slate-900 text-white border sticky top-0 shadow-lg ">
            <div className="flex justify-between">
                <div className="logo h-auto w-24 bg-red-600 m-2 text-center p-1">Logo
                </div>
                <div className="navigation hidden lg:block">
                    <ul className="flex space-x-4 h-full m-auto">
                        {
                            navs.map(
                                (nav) => (
                                    <li className="m-2 p-3 cursor-pointer hover:bg-slate-700 rounded-lg text-lg">
                                        <Link href={nav.path}>
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
                    }>
                        <span className="m- auto text-4xl material-symbols-outlined " >
                            {dropmenu ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>

            </div>
            {dropmenu ? (<div className="navigation block lg:hidden ">
                <ul className="flex 
                flex-col px-3">
                    {
                        navs.map(
                            (nav) => (
                                <li className="m-2 p-3 cursor-pointer hover:bg-slate-700 rounded-lg text-lg">
                                    <Link href={nav.path} >
                                        {nav.name}
                                    </Link>
                                </li>
                            )
                        )
                    }
                    <li><button className="bg-blue-600  p-2 rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg">Notice Board</button></li>
                </ul>
            </div>) : null}
        </div>
    );
}