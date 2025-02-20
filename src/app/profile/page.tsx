"use client";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Get "id" from URL query

    return <h1>Profile ID: {id ? id : "Unknown"}</h1>;
}
