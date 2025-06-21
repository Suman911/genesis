"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProfileContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    return <h1>Profile ID: {id ? id : "Unknown"}</h1>;
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent />
        </Suspense>
    );
}
