"use client"
import React from "react";

interface MapProps {
    className?: string;
    src: string;
    title?: string;
}

export default function Map({
    className = "w-full h-80",
    title = "location",
    src,
}: MapProps) {
    return (
        <div className={className}>
            <iframe
                src={src}
                className="w-full h-full rounded-2xl"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={title}
            />
        </div>
    );
}
