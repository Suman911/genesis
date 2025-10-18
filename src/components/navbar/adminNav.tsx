"use client";

import Link from "next/link";
import { IoIosImages } from "react-icons/io";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUserGroup, FaCircleUser, FaUserGraduate } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import { BiSolidQuoteRight } from "react-icons/bi";

const navItems = [
    { href: "", label: "Dashboard", Icon: RiDashboardHorizontalFill },
    { href: "batches", label: "Batches", Icon: FaUserGroup },
    { href: "notices", label: "Notice", Icon: IoNewspaperSharp },
    { href: "gallery", label: "Gallery", Icon: IoIosImages },
    { href: "students", label: "Students", Icon: FaCircleUser },
    { href: "alumni", label: "Alumni", Icon: FaUserGraduate },
    { href: "forms", label: "Forms", Icon: SiGoogleforms },
    { href: "quotes", label: "Quotes", Icon: BiSolidQuoteRight },
];

export default function AdminNav() {
    return (
        <nav className="bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col w-64 shadow-sm">
            <div className="flex items-center gap-3 px-6 py-5 border-b">
                <img src="/assets/images/logo_main.png" alt="Logo" className="object-contain size-12" />
                <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            </div>

            <ul className="flex-1 p-4 space-y-2 text-gray-700">
                {navItems.map(({ href, label, Icon }) => (
                    <li key={href}>
                        <Link
                            href={`/admin/${href}`}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition text-sm font-medium"
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
