"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/preloader/preloader";
import Axios from "@/utils/Axios";
import { User } from "@/lib/definitions";

const IsAdmin = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const data: User = await Axios.get("/admins/me");
                setIsAdmin(data.role === "admin");
            } catch (error) {
                console.error("Failed to verify admin:", error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, []);

    useEffect(() => {
        if (isAdmin === false) {
            // const timeout = setTimeout(() => router.replace("/"), 5000);
            // return () => clearTimeout(timeout);
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
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-red-600 mb-2">Access Denied</h2>
                    <p className="text-gray-600">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default IsAdmin;
