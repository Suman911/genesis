"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import { scrollToTop } from "@/components/ui/util/toTop/useToTop";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation";

interface User {
    name?: string;
    image?: string;
}

const ProfileWidget = () => {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const widgetRef = useRef<HTMLDivElement>(null);
    const expandTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const retractTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Get user from cookie
    useEffect(() => {
        try {
            const userCookie = Cookies.get("user");
            setUser(userCookie ? JSON.parse(userCookie) : null);
        } catch {
            setUser(null);
        }
    }, []);

    // Auto-collapse after 5s whenever expanded (manual or auto)
    useEffect(() => {
        if (retractTimer.current) clearTimeout(retractTimer.current);
        if (expanded) {
            retractTimer.current = setTimeout(() => setExpanded(false), 5000);
        }
        return () => {
            if (retractTimer.current) clearTimeout(retractTimer.current);
        };
    }, [expanded]);

    // Auto-expand after delay if on homepage and not logged in
    useEffect(() => {
        if (pathname !== "/" || user) return;

        expandTimer.current = setTimeout(() => {
            setExpanded(true);
        }, 10000);

        return () => {
            if (expandTimer.current) clearTimeout(expandTimer.current);
        };
    }, [pathname, user]);

    // Collapse if clicking outside
    useEffect(() => {
        if (!expanded) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
                setExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [expanded]);

    const handleExpand = useCallback(() => {
        if (expandTimer.current) clearTimeout(expandTimer.current);
        if (retractTimer.current) clearTimeout(retractTimer.current);
        setExpanded((prev) => !prev);
    }, []);

    const handleLinkClick = useCallback(() => {
        setExpanded(false);
        scrollToTop();
    }, []);

    return (
        <div
            ref={widgetRef}
            onClick={handleExpand}
            className={`fixed top-20 right-0 z-50 flex items-center bg-white shadow-lg transition-all duration-300 overflow-hidden cursor-pointer rounded-l-full rounded-r-lg
                ${expanded ? "w-60" : "w-15"} ${expanded && user ? "h-24" : "h-13"}`}
        >
            <div className={`rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mx-2 ${expanded && user ? "size-20" : "size-10"}`}>
                {user?.image ? (
                    <img src={user.image} alt="profile" className="w-full h-full object-cover" />
                ) : (
                    <FiUser className="size-6 text-ash" />
                )}
            </div>

            {expanded && (
                <div className="ml-2 whitespace-nowrap">
                    {user?.name ? (
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-gray-800 font-extrabold">{user.name}</span>
                            <Link
                                href="/profile/"
                                className="px-4 py-1 rounded-md bg-primary hover:bg-primary/40 text-white hover:text-primary transition"
                                onClick={handleLinkClick}
                            >
                                Go to Profile
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login/"
                            className="px-4 py-1 rounded-md bg-primary hover:bg-primary/40 text-white hover:text-primary transition"
                            onClick={handleLinkClick}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileWidget;
