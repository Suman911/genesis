import React from "react";

export type Location ={
    path: string;
    name: string;
    icon?:React.ReactNode
}

export type NoticeType = {
    id: number;
    title: string;
    description: string;
    document_url: string;
    posted_date: string;
    target_timestamp: string;
    expiry_date: string;
    type: string;
    isUrgent: boolean;
    tag: string;
};