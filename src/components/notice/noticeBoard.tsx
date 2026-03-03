"use client";

import { useState, useEffect } from "react";
import Axios from "@/utils/Axios"; // Use your Axios instance
import { Heading, TopHeading, MainHeading } from "@/components/ui/text/heading";
import Notice from "./notice";
import { NoticeType } from "@/lib/definitions";

export default function NoticeBoard() {
    const [notices, setNotices] = useState<NoticeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const data: NoticeType[]= await Axios.get("/notices");
                setNotices(data);
            } catch (err) {
                console.error("Error fetching notices:", err);
                setError("Failed to load notices. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    return (
        <div id="notice" className="p-2 py-10 xl:px-8 text-ash">
            <Heading>
                <TopHeading pageTitle="Importants"/>
                <MainHeading>Notice Board</MainHeading>
            </Heading>

            {loading && <p className="text-center text-gray-500">Loading notices...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="py-8 space-y-4 max-w-150 mx-auto">
                    {notices.map((notice) => (
                        <Notice key={notice.id} notice={notice} />
                    ))}
                </div>
            )}
        </div>
    );
}
