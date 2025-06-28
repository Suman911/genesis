import React from "react";

export type Location = {
    path: string;
    name: string;
    icon?: React.ReactNode
}

export type LocationGroup = {
    group: string;
    locations: Location[];
};

export type Nav = (Location | LocationGroup);

export type NoticeType = {
    id: number;
    title: string;
    description: string;
    document_url: string;
    target_timestamp: string;
    expiry_date: string;
    type: string;
    is_urgent: boolean;
    tag: string;
};

export type TestimonialType = {
    id: number;
    message: string;
    image: string;
    name: string;
}

export type User = {
    id: number;
    name: string;
    user_name?: string | null;
    email: string;
    ph_number?: string;
    password?: string;
    email_verified_at?: string | null;
    role: "user" | "alumni" | "admin";
};

