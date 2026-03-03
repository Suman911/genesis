"use client";
import { navs } from "@/lib/navs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Location, LocationGroup } from "@/lib/definitions";

interface NavDropdownProps extends React.HTMLAttributes<HTMLLIElement> {
    nav: LocationGroup;
    pathname: string;
    openDropdowns: Record<string, boolean>;
    setOpenDropdowns: Dispatch<SetStateAction<Record<string, boolean>>>;
    handleNavigation: (path: string) => void;
}

interface NavLinkProps extends React.HTMLAttributes<HTMLLIElement> {
    nav: Location;
    pathname: string;
    handleNavigation: (path: string) => void;
}

export default function NavbarPc() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            const dropdowns = document.querySelectorAll(".navbar-dropdown");
            let inside = false;
            dropdowns.forEach((el) => {
                if (el.contains(event.target as Node)) inside = true;
            });
            if (!inside) setOpenDropdowns({});
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleNavigation = (path: string) => {
        if (pathname === path) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 500);
        }
    };

    return (
        <div
            className={clsx(
                "p-2 z-50 w-full text-white fixed top-0 backdrop-blur-md hidden md:block transition-all duration-500",
                isScrolled ? "h-16 bg-primary/80 shadow-lg" : "h-20 bg-black/0"
            )}
        >
            <div className="flex justify-between items-center h-full">
                {/* Logo */}
                <Link
                    href="/"
                    scroll={false}
                    onClick={() => handleNavigation('/')}
                >
                    <img
                        className="size-12 ml-4"
                        src="/assets/images/logo_main.png"
                        loading="lazy"
                        alt="logo"
                    />
                </Link>

                {/* Navigation Links */}
                <nav className="navigation block">
                    <ul className="flex">
                        {navs.map((nav) => (
                            ("group" in nav) ? (
                                <NavDropdown
                                    key={nav.group}
                                    nav={nav}
                                    pathname={pathname}
                                    openDropdowns={openDropdowns}
                                    setOpenDropdowns={setOpenDropdowns}
                                    handleNavigation={handleNavigation}
                                />
                            ) : (
                                <NavLink
                                    key={nav.path}
                                    nav={nav}
                                    pathname={pathname}
                                    handleNavigation={handleNavigation}
                                />
                            )
                        ))}
                    </ul>
                </nav>

                {/* Notice Button */}
                <div className="btn my-auto mx-2">
                    <Link
                        href="/#notice"
                        scroll={false}
                        onClick={(e) => {
                            if (pathname === '/') {
                                e.preventDefault();
                                document.getElementById('notice')?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                handleNavigation('/#notice');
                            }
                        }}
                        className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 shadow-blue-600/50 shadow-lg text-lg transition-all duration-300"
                    >
                        Notice Board
                    </Link>
                </div>
            </div>
        </div>
    );
}

function NavDropdown({
    nav,
    pathname,
    openDropdowns,
    setOpenDropdowns,
    handleNavigation,
}: NavDropdownProps){
    const isActive = nav.locations.some((loc) => pathname === loc.path);

    return (
        <li className="relative navbar-dropdown">
            <button
                type="button"
                className={clsx(
                    "m-2 p-3 hover:bg-slate-700/80 rounded-lg text-lg transition-all duration-300 block",
                    { "bg-slate-800/80 text-orange-400": isActive }
                )}
                onClick={() =>
                    setOpenDropdowns((prev) => ({
                        ...prev,
                        [nav.group]: !prev[nav.group],
                    }))
                }
            >
                {nav.group}
            </button>
            {openDropdowns[nav.group] && (
                <ul className="absolute left-0 mt-3 w-64 rounded-xl transition-all duration-200 shadow-2xl bg-linear-to-br from-primary/90 via-slate-800/90 to-primary/80">
                    {nav.locations.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                scroll={false}
                                onClick={() => {
                                    setOpenDropdowns({});
                                    handleNavigation(item.path);
                                }}
                                className={clsx(
                                    "flex items-center gap-2 px-5 py-3 hover:bg-orange-500/20 hover:text-orange-400 rounded-xl text-base transition-all duration-200",
                                    {
                                        "bg-orange-500/10 text-orange-400": pathname === item.path,
                                    }
                                )}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

function NavLink({ nav, pathname, handleNavigation }: NavLinkProps){
    return (
        <li>
            <Link
                href={nav.path}
                scroll={false}
                onClick={(e) => {
                    if (pathname === nav.path) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    handleNavigation(nav.path);
                }}
                className={clsx(
                    "m-2 p-3 hover:bg-slate-700/80 rounded-lg text-lg transition-all duration-300 block",
                    {
                        "bg-slate-800/80 text-orange-400": pathname === nav.path,
                    }
                )}
            >
                {nav.name}
            </Link>
        </li>
    );
}