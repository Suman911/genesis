"use client"

import Link from "next/link";
// import Image from "next/image";
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-8">
            {/* <!-- Main Footer Content --> */}
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* <!-- Get In Touch Section --> */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined">
                                    home_pin
                                </span>
                                5/A/1 Shibnarayan Road, Uttarpara, Hooghly
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined">
                                    mail
                                </span>
                                info@genesislifesciences.org.in
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined">
                                    phone
                                </span>
                                8697458798
                            </p>
                            <div className="flex gap-4 mt-4">
                                <Link href="#" className="hover:text-gray-300"><i className="fab fa-facebook"></i></Link>
                                <Link href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></Link>
                                <Link href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></Link>
                                <Link href="#" className="hover:text-gray-300"><i className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Company Section --> */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 list-[circle]">
                            <li><Link href="/story/" className="hover:text-gray-300">Our Story</Link></li>
                            <li><Link href="/academics/" className="hover:text-gray-300">Academics</Link></li>
                            <li><Link href="/training/" className="hover:text-gray-300">Industry Training</Link></li>
                            <li><Link href="/profession/" className="hover:text-gray-300">Professional Grooming</Link></li>
                            <li><Link href="/gallery/" className="hover:text-gray-300">Gallery</Link></li>
                            <li><Link href="/contact/" className="hover:text-gray-300">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* <!-- Support Section --> */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-gray-300">Blog</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Notice Board</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Workshop</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Terms</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Cookie policy</Link></li>
                        </ul>
                    </div>

                    {/* <!-- Online Payment Section --> */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Online Payment Option</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-10" />
                                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
                            </div>
                            <div className="mt-4">
                                <img src="https://www.phonepe.com/webstatic/8420/static/phonepe-pg-default-og-bf9e20a4bc20cca4a0536fbe4792c3ad.png" alt="PhonePe" className="size-1/2 p-2 m-auto rounded-3xl transition-transform duration-200 ease-in-out hover:scale-125 origin-center will-change-transform" />
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