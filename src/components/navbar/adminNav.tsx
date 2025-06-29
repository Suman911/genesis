"use client";

import { IoIosImages } from "react-icons/io";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUserGroup, FaCircleUser } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { SiGoogleforms } from "react-icons/si";
import Link from "next/link";

export default function AdminNav() {
    return (
        <nav className="bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col w-64 shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b">
                <img
                    src="/assets/images/logo_main.png"
                    alt="Logo"
                    className="object-contain size-12"
                />
                <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            </div>

            {/* Navigation Links */}
            <ul className="flex-1 p-4 space-y-2 text-gray-700">
                <li>
                    <Link
                        href="/admin/"
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition text-sm font-medium"
                    >
                        <RiDashboardHorizontalFill size={18} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/batches"
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition text-sm font-medium"
                    >
                        <FaUserGroup size={18} />
                        <span>Batches</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/notices"
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition text-sm font-medium"
                    >
                        <IoNewspaperSharp size={18} />
                        <span>Notice</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/gallery"
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition text-sm font-medium"
                    >
                        <IoIosImages size={18} />
                        <span>Gallery</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/students"
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition text-sm font-medium"
                    >
                        <FaCircleUser size={18} />
                        <span>Students</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/alumni"
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition text-sm font-medium"
                    >
                        <FaUserGraduate size={18} />
                        <span>Alumni</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/forms"
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition text-sm font-medium"
                    >
                        <SiGoogleforms size={18} />
                        <span>Forms</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
