"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import NeonButton from "@/components/ui/util/neonButton";
import { motion } from "motion/react";

const UnauthorizedPage = () => {
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRedirecting(true);
            router.replace("/auth/login");
        }, 15000);
        return () => clearTimeout(timer);
    }, [router]);

    const handleGoToLogin = () => {
        setRedirecting(true);
        router.replace("/auth/login");
    };

    return (
        <div className="flex min-h-screen items-center justify-center text-white">
            <motion.div
                className="relative z-10 w-full max-w-md p-10 rounded-2xl border border-white/30 bg-primary-dark/20 backdrop-blur-sm shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full p-3 bg-indigo-600/10 text-indigo-400">
                            <AiOutlineClockCircle size={24} />
                        </div>
                        <h1 className="text-2xl font-semibold">Session Expired</h1>
                    </div>

                    <p className="text-sm text-white/75 leading-relaxed">
                        Your session has expired for security reasons. Please log in again to continue.
                    </p>

                    <div className="w-full mt-2">
                        <NeonButton
                            onClick={handleGoToLogin}
                            color="warning"
                            size="md"
                            glow
                            className="w-full flex items-center justify-center gap-2"
                            disabled={redirecting}
                        >
                            <FiLogIn className="w-5 h-5" />
                            {redirecting ? "Redirecting..." : "Login Again"}
                        </NeonButton>
                    </div>

                    <small className="text-[11px] text-white/40 mt-3">
                        You&apos;ll be redirected automatically in 15 seconds.
                    </small>
                </div>
            </motion.div>
        </div>
    );
};

export default UnauthorizedPage;
