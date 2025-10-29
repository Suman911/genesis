"use client";
import { LuUser, LuBookOpen, LuPhone, LuUsers, LuFacebook } from "react-icons/lu";
import { useEffect, useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import InfoCard, { InfoItem } from "@/components/profile/InfoCard";
import BatchCard from "@/components/profile/BatchCard";
import NeonButton from "@/components/ui/util/neonButton";
import { StudentInfo } from "@/lib/definitions";
import qs from "qs";
import Axios from "@/utils/Axios";
import ErrorAlert from "@/components/ui/util/errorAlert";

type Q = { user_name?: string; }

const Profile = () => {
    const [profile, setProfile] = useState<StudentInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user_name = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("user_name")
        : null;

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError("");
            try {
                const q: Q = user_name ? { 'user_name': user_name } : {};
                const res: StudentInfo = await Axios.get("/students/profile", {
                    params: q,
                    paramsSerializer: (params) => qs.stringify(params),
                });
                setProfile(res);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Failed to load profile");
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (!user_name && profile?.user_name) {
            const newUrl = `/user/profile/?user_name=${encodeURIComponent(profile.user_name)}`;
            window.history.replaceState(null, "", newUrl);
        }
    }, [user_name, profile?.user_name]);

    // Skeleton / loading UI
    if (loading) {
        return (
            <>
                <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Header skeleton */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl" />
                            <div className="relative backdrop-blur-md bg-slate-800/40 border border-primary-dark/50 rounded-2xl p-8 shadow-xl animate-pulse">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="w-32 h-32 rounded-full bg-slate-700/30 border-4 border-primary/50 shadow-lg" />
                                    <div className="flex-1 space-y-4">
                                        <div className="h-8 w-3/4 bg-slate-700/30 rounded" />
                                        <div className="h-5 w-1/3 bg-slate-700/20 rounded" />
                                        <div className="flex gap-4 mt-4">
                                            <div className="h-4 w-32 bg-slate-700/20 rounded" />
                                            <div className="h-4 w-32 bg-slate-700/20 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cards skeleton grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="h-40 rounded-xl bg-slate-800/30 border border-primary-dark/50 p-6 animate-pulse" />
                            <div className="h-40 rounded-xl bg-slate-800/30 border border-primary-dark/50 p-6 animate-pulse" />
                            <div className="h-40 rounded-xl bg-slate-800/30 border border-primary-dark/50 p-6 animate-pulse" />
                            <div className="h-40 rounded-xl bg-slate-800/30 border border-primary-dark/50 p-6 animate-pulse" />
                        </div>

                        {/* Batches skeleton */}
                        <div className="h-32 rounded-xl bg-slate-800/30 border border-primary-dark/50 p-6 animate-pulse" />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <ErrorAlert message={error} onClose={() => setError("")} />
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Profile Header */}
                    <ProfileHeader
                        name={profile?.name ?? ""}
                        user_name={profile?.user_name ?? ""}
                        email={profile?.email ?? ""}
                        ph_number={profile?.ph_number ?? ""}
                        photo={profile?.photo}
                        date_of_admission={profile?.date_of_admission}
                    />
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <InfoCard title="Personal Information" icon={LuUser}>
                            <InfoItem
                                label="Date of Birth"
                                value={profile?.date_of_birth ?? null}
                            />
                            <InfoItem label="Address" value={profile?.address ?? null} />
                        </InfoCard>
                        {/* Academic Information */}
                        <InfoCard title="Academic Information" icon={LuBookOpen}>
                            <InfoItem label="College" value={profile?.college ?? null} />
                            <InfoItem label="Subject" value={profile?.subject ?? null} />
                        </InfoCard>
                        {/* Guardian Information */}
                        <InfoCard title="Guardian Information" icon={LuUsers}>
                            <InfoItem label="Guardian Name" value={profile?.guardian_name ?? null} />
                            <InfoItem label="Guardian Contact" value={profile?.guardian_number ?? null} />
                        </InfoCard>
                        {/* Social & Contact */}
                        <InfoCard title="Social & Contact" icon={LuPhone}>
                            <InfoItem label="Phone Number" value={profile?.ph_number ?? null} />
                            <InfoItem label="Email Address" value={profile?.email ?? null} />
                            {profile?.facebook_profile && (
                                <div className="pt-2">
                                    <NeonButton
                                        className="w-full"
                                        color="info"
                                        outlined
                                        glow
                                        size="sm"
                                        onClick={() => window.open(profile.facebook_profile!, "_blank")}
                                    >
                                        <LuFacebook className="w-4 h-4" />
                                        Facebook Profile
                                    </NeonButton>
                                </div>
                            )}
                        </InfoCard>
                    </div>
                    {/* Batch Enrollments */}
                    <BatchCard batches={profile?.batches} />
                </div>
            </div>

        </>
    );
};

export default Profile;
