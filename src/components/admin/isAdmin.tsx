"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/preloader/preloader";
import Axios from "@/utils/Axios";
import { User } from "@/lib/definitions";
import Link from "next/link";

const IsAdmin = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const data: User = await Axios.get("/admins/me");
                setIsAdmin(data.role === "admin");
            } catch {
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, []);

    useEffect(() => {
        if (isAdmin === false) {
            const timeout = setTimeout(() => router.replace("/"), 5000);
            return () => clearTimeout(timeout);
        }
    }, [isAdmin]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center gap-2">
                    <Spinner>
                        <img src="/assets/images/logo_main.png" alt="Logo" className="w-16 h-16" />
                    </Spinner>
                    <p className="mt-25 text-gray-700 text-sm">Checking admin permissions...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
                    <div className="flex justify-center mb-4 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0zM12 9v4m0 4h.01" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
                    <p className="text-gray-700 mb-4">You do not have permission to view this page.</p>
                    <p className="text-sm text-gray-500 mb-6">Redirecting to home page in 5 seconds...</p>
                    <Link
                        href="/"
                        className="inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default IsAdmin;
