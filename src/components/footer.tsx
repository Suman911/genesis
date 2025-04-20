"use client"

import Link from "next/link";
import Image from "next/image";
import { navs, supports } from "@/lib/navs";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { scrollToTop } from "./ui/util/toTop/useToTop";
import { FaLocationDot, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { MdAlternateEmail, MdPhoneInTalk } from "react-icons/md";

export default function Footer() {
    const pathname = usePathname();
    return (
        <footer className="bg-gray-800 text-white p-5 pt-16">
            {/* <!-- Main Footer Content --> */}
            <div className="container mx-auto">
                <div className="grid justify-evenly grid-cols-[auto] md:grid-cols-[200px_200px] lg:grid-cols-[auto_auto] xl:grid-cols-[300px_auto_auto_300px] 2xl:grid-cols-4 gap-8">

                    {/* <!-- Get In Touch Section --> */}
                    <div className="space-y-4 lg:col-span-1 md:col-span-2">
                        <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                        <div className="space-y-2 px-4">
                            <p className="flex items-center gap-2">
                                <FaLocationDot />
                                5/A/1 Shibnarayan Road, Uttarpara, Hooghly
                            </p>
                            <p className="flex items-center gap-2">
                                <MdAlternateEmail />
                                mitragenesis@gmail.com
                            </p>
                            <p className="flex items-center gap-2">
                                <MdPhoneInTalk />
                                +91-86974-58798
                            </p>
                            <div className="flex gap-4 mt-4">
                                <Link href="#" className="hover:text-gray-300"><FaFacebook className="size-8" /></Link>
                                <Link href="#" className="hover:text-gray-300"><FaTwitter className="size-8" /></Link>
                                <Link href="#" className="hover:text-gray-300"><FaInstagram className="size-8" /></Link>
                                <Link href="#" className="hover:text-gray-300"><FaLinkedin className="size-8" /></Link>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Company Section --> */}
                    <div className="lg:order-2">
                        <h3 className="text-xl font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 px-4">
                            {navs.map(nav => (
                                <li key={nav.name}>
                                    <Link
                                        href={nav.path}
                                        scroll={false} // Disable Next.js auto-scroll
                                        onClick={(e) => {
                                            // Only prevent default if we're on the same page
                                            if (pathname === nav.path) {
                                                e.preventDefault();
                                                scrollToTop();
                                            } else {
                                                // For new pages, scroll after navigation completes
                                                setTimeout(scrollToTop, 100);
                                            }
                                        }}
                                        className={clsx(
                                            "hover:text-gray-300 flex gap-2 items-center",
                                            { "text-orange-500": pathname === nav.path }
                                        )}
                                    >
                                        {nav.icon}
                                        {nav.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* <!-- Support Section --> */}
                    <div className="lg:order-4 xl:order-3">
                        <h3 className="text-xl font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 px-4">
                            {
                                supports.map(support => (
                                    <li key={support.name}><Link href={support.path} className="hover:text-gray-300">{support.name}</Link></li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* <!-- Online Payment Section --> */}
                    <div className="lg:order-3 xl:order-4 lg:col-span-1 md:col-span-2">
                        <h3 className="text-xl font-semibold mb-4">Online Payment Option</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                {/* <Image src='/Google_Play_Store_badge_EN.svg.webp' width={2560} height={759}  alt="Google Play" className="h-10" /> */}
                                <Image src='/download-on-the-app-store.svg' width={120} height={40} alt="App Store" className="h-10" />
                            </div>
                            <div className="mt-4">
                                {/* <Image src='/phonepe-pg-default-og-bf9e20a4bc20cca4a0536fbe4792c3ad.png' 
                            width={1682} height={1072}
                            alt="Phone Pay" className="size-1/2 p-2 m-auto rounded-3xl transition-transform duration-200 ease-in-out hover:scale-125 origin-center will-change-transform" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Copyright Section --> */}
            <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm">
                <p className="text-gray-400">
                    © Genesis Life Sciences. All right reserved.
                    <span className="ml-2">Designed & Maintained By <span>
                        <Link href="#" className="text-white hover:text-gray-300">Company</Link>
                    </span>
                    </span>
                </p>
            </div>
        </footer>
    )
}