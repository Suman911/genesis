import { LuUser, LuMail, LuPhone, LuCalendar } from "react-icons/lu";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Axios from "@/utils/Axios";

interface ProfileHeaderProps {
    name: string;
    user_name: string;
    email: string;
    ph_number: string;
    photo?: string | null;
    date_of_admission?: string | null;
}

const ProfileHeader = ({
    name,
    user_name,
    email,
    ph_number,
    photo,
    date_of_admission,
}: ProfileHeaderProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            const data: { message: string } = await Axios.post("/logout");

            if (data.message === "Logged out successfully") {
                router.push("/auth/login");
            } else {
                throw new Error("Unexpected server response");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Logout failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (error) console.error(error) }, [error])

    return (
        <div className="relative">
            <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="rounded-full w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-amber-400/30 blur-[100px]"
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

            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl" />
            <div className="relative backdrop-blur-md bg-slate-800/40 border border-primary-dark/50 rounded-2xl p-8 shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 shadow-lg animate-morph-border">
                            {photo ? (
                                <img
                                    src={photo}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary to-primary/20 flex items-center justify-center">
                                    <LuUser className="w-16 h-16 text-foreground" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        {user_name ? (<>
                            <div>
                                <h1 className="text-4xl font-bold text-foreground mb-2">{name}</h1>
                                <p className="text-lg text-gray">@{user_name}</p>
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="flex items-center gap-2 text-foreground/80">
                                    <LuMail className="w-4 h-4 text-info" />
                                    <span className="text-sm">{email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-foreground/80">
                                    <LuPhone className="w-4 h-4 text-success" />
                                    <span className="text-sm">{ph_number}</span>
                                </div>
                                {date_of_admission && (
                                    <div className="flex items-center gap-2 text-foreground/80">
                                        <LuCalendar className="w-4 h-4 text-warning" />
                                        <span className="text-sm">Joined {date_of_admission}</span>
                                    </div>
                                )}
                            </div>
                        </>) : (
                            <div>
                                <h1 className="text-4xl font-bold text-foreground mb-2">Profile Not Found</h1>
                                <p className="text-lg text-gray">The requested user profile does not exist.</p>
                            </div>)}
                    </div>
                </div>
                <div className="absolute top-5 right-5 flex justify-center">
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow hover:from-red-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
