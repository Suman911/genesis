"use client";
import Button from "@/components/ui/util/button";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import { scrollToTop } from "@/components/ui/util/toTop/useToTop";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

interface User {
    name?: string;
    image?: string;
}

const defaultUser: User = {
    name: "Guest",
    image: "",
};

function useUserFromCookie(): User | null {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        try {
            const userCookie = Cookies.get("user");
            setUser(userCookie ? JSON.parse(userCookie) : null);
        } catch {
            setUser(null);
        }
    }, []);
    return user;
}

const ProfileWidget = () => {
    const pathname = usePathname();
    const [isExpanded, setExpanded] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);
    const expandTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const retractTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const user = useUserFromCookie();
    const isLoggedIn = !!user;

    // Auto-collapse after 5s
    useEffect(() => {
        if (retractTimer.current) clearTimeout(retractTimer.current);
        if (isExpanded) {
            retractTimer.current = setTimeout(() => setExpanded(false), 5000);
        }
        return () => {
            if (retractTimer.current) clearTimeout(retractTimer.current);
        };
    }, [isExpanded]);

    // Auto-expand on homepage if not logged in
    useEffect(() => {
        if (pathname !== "/" || isLoggedIn) return;

        expandTimer.current = setTimeout(() => {
            setExpanded(true);
        }, 10000);

        return () => {
            if (expandTimer.current) clearTimeout(expandTimer.current);
        };
    }, [pathname, isLoggedIn]);

    // Collapse on outside click
    useEffect(() => {
        if (!isExpanded) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
                setExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isExpanded]);

    const handleExpand = useCallback(() => {
        if (expandTimer.current) clearTimeout(expandTimer.current);
        if (retractTimer.current) clearTimeout(retractTimer.current);
        setExpanded((prev) => !prev);
    }, []);

    const handleLinkClick = useCallback(() => {
        setExpanded(false);
        scrollToTop();
    }, []);

    const containerVariants = useMemo(() => ({
        collapsed: { width: 60, height: 52, borderRadius: "9999px 20px 20px 9999px" },
        expanded: {
            width: isLoggedIn ? 240 : 150,
            height: isLoggedIn ? 96 : 52,
            borderRadius: "9999px 20px 20px 9999px",
        },
    }), [isLoggedIn]);

    const imageVariants = useMemo(() => ({
        collapsed: { width: 40, height: 40 },
        expanded: { width: isLoggedIn ? 80 : 40, height: isLoggedIn ? 80 : 40 },
    }), [isLoggedIn]);

    return (
        <motion.div
            ref={widgetRef}
            onClick={handleExpand}
            className="fixed top-20 right-0 z-50 flex items-center bg-gray-300 shadow-lg transition-colors duration-300 overflow-hidden cursor-pointer"
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ borderTopLeftRadius: 9999, borderBottomLeftRadius: 9999, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
        >
            <motion.div
                className="rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mx-2"
                variants={imageVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ minWidth: 40, minHeight: 40 }}
            >
                {user?.image ? (
                    <img src={user.image} alt="profile" className="w-full h-full object-cover" />
                ) : (
                    <FiUser className="size-6 text-ash" />
                )}
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="ml-2 whitespace-nowrap"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {user?.name ? (
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-gray-800 font-extrabold">{user.name}</span>
                                <Button className="opacity-90">
                                    <Link
                                        href="/profile/"
                                        className="px-4 py-1"
                                        onClick={handleLinkClick}
                                    >
                                        Go to Profile
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <Button className="opacity-90">
                                <Link
                                    href="/auth/login/"
                                    className="px-4 py-1"
                                    onClick={handleLinkClick}
                                >
                                    Login
                                </Link>
                            </Button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProfileWidget;
