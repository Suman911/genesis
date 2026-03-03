'use client';
import AnimatedBg from "@/components/ui/backgroud/AnimatedBg";
import { motion } from "motion/react";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <AnimatedBg>
            <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="rounded-full w-125500px] bg-linear-to-r from-indigo-500/30 via-purple-500/20 to-amber-400/30 blur-[100px]"
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.5, 1, 0.6],
                            rotate: [0, 15, -15, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </motion.div>
            {children}
        </AnimatedBg>
    );
}