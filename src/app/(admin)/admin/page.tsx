"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Axios from "@/utils/Axios";

export default function AdminPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            const data: { message: string } = await Axios.post("/logout");

            if (data.message === "Logged out successfully") {
                router.push("/");
            } else {
                throw new Error("Unexpected server response");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Logout failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
                <p className="text-gray-700 mb-4">
                    Welcome to the admin dashboard. Here you can manage users, view reports, and perform administrative tasks.
                </p>
                <p className="text-gray-500 text-sm mb-8">
                    This is a placeholder page. Actual admin functionalities will be implemented soon.
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="px-5 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow hover:from-red-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
}
