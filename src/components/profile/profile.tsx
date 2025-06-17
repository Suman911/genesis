"use client";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { scrollToTop } from "@/components/ui/util/toTop/useToTop";
import Link from "next/link";
import { FiUser } from "react-icons/fi";

interface User {
    name?: string;
    image?: string;
}

const ProfileWidget = () => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            try {
                setUser(JSON.parse(userCookie));
            } catch {
                setUser(null);
            }
        } else {
            setUser(null);
            // setUser({
            //     name: "John Doe",
            //     image: "https://via.placeholder.com/150"
            // });
        }
    }, []);

    useEffect(() => {
        if (!expanded) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (
                widgetRef.current &&
                !widgetRef.current.contains(event.target as Node)
            ) {
                setExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [expanded]);

    return (
        <div
            ref={widgetRef}
            className={`fixed top-20 right-0 z-50 flex items-center bg-white shadow-lg transition-all duration-300 overflow-hidden cursor-pointer rounded-l-full rounded-r-lg
        ${expanded ? "w-60" : "w-15"}
        ${expanded && user ? "h-24" : "h-13"}
        `}
            onClick={() => setExpanded((e) => !e)}
        >
            <div className={`rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mx-2
                ${expanded && user ? "size-20" : "size-10"}`}>
                {user && user.image ? (
                    <img
                        src={user.image}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <FiUser className="size-6 text-ash" />
                )}
            </div>
            {expanded && (
                <div className="ml-2 whitespace-nowrap">
                    {user && user.name ? (
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-gray-800 font-extrabold">{user.name}</span>
                            <Link
                                href="/profile/"
                                className="px-4 py-1 rounded-md bg-primary hover:bg-primary/40 text-white hover:text-primary transition"
                                onClick={() => {
                                    setExpanded(false);
                                    scrollToTop();
                                }}
                            >
                                Go to Profile
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login/"
                            className="px-4 py-1 rounded-md bg-primary hover:bg-primary/40 text-white hover:text-primary transition"
                            onClick={() => {
                                setExpanded(false);
                                scrollToTop();
                            }}
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