"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Axios from "@/utils/Axios";
import { User } from "@/lib/definitions";
import { motion, AnimatePresence } from "motion/react";
import ErrorAlert from "@/components/ui/util/errorAlert";
import NeonFloatInput from "@/components/ui/form/input/neonFloatInput";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isInside, setIsInside] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data: User = await Axios.post("/login", { email, password });
            const targetRoute = data?.role === "admin" ? "/admin/" : "/user/profile/";
            router.replace(targetRoute);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsInside(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setIsInside(false), 400);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div className="flex min-h-screen text-white items-center justify-center">
            <ErrorAlert message={error} onClose={() => setError("")} />
            <form
                onSubmit={handleSubmit}
                className="bg-primary-dark/20 relative border border-white/50 rounded-2xl max-w-md backdrop-blur-sm p-10 z-10 shadow-md w-full overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                <AnimatePresence>
                    {isInside && (
                        <motion.div
                            className="absolute rounded-full pointer-events-none shadow-[0_0_100px_40px_cyan] z-40"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ x: pos.x - 25, y: pos.y - 25, opacity: 1, scale: 1, }}
                            exit={{ opacity: 0, scale: 0.5, transition: { opacity: { duration: 0.5 }, scale: { duration: 0.3 } }, }}
                            transition={{
                                x: { duration: 0 },
                                y: { duration: 0 },
                                opacity: { duration: 0.3, delay: 0.1 },
                                scale: { duration: 0.3, delay: 0.1 },
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                mass: 0.8,
                            }}
                        />
                    )}
                </AnimatePresence>

                <div className="relative z-50">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    <NeonFloatInput
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        autoComplete="username"
                    />

                    <NeonFloatInput
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <button
                        type="submit"
                        className="w-full bg-primary text-white mt-2 p-4 rounded font-semibold text-xl
                        transition ease-in duration-300 hover:cursor-pointer relative
                        hover:shadow-[0_0_14px_5px_rgb(103,232,249)]"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;