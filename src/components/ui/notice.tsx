import { IoNewspaperSharp } from "react-icons/io5";
import { MdOutlineFiberNew } from "react-icons/md";
import { ImportantIcon } from "./icon/important";
import { NoticeType } from "@/lib/definitions";

interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
    notice: NoticeType;
}

export default function Notice({ notice, className = "", ...props }: NoticeProps) {
    return (
        <div
            {...props}
            className={`border border-gray-300 rounded-lg p-4 shadow-sm bg-white flex items-start gap-4 ${className}`}
        >
            {/* Icon based on urgency */}
            <div className="text-3xl">
                {notice.isUrgent ? (
                    <ImportantIcon className="size-8" />
                ) : (
                    <MdOutlineFiberNew className="text-blue-500" />
                )}
            </div>

            {/* Notice Content */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <IoNewspaperSharp className="text-primary" />
                    {notice.title}
                </h2>
                <p className="text-gray-600">{notice.description}</p>

                {/* Metadata */}
                <div className="text-sm text-gray-500 mt-2">
                    <p>Posted on: {new Date(notice.posted_date).toLocaleDateString()}</p>
                    <p>Event Date: {new Date(notice.target_timestamp).toLocaleString()}</p>
                    <p>Expires on: {new Date(notice.expiry_date).toLocaleDateString()}</p>
                </div>

                {/* Notice Link */}
                <div className="mt-3">
                    <a
                        href={notice.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        View Document
                    </a>
                </div>

                {/* Tag */}
                <span
                    className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${notice.isUrgent ? "bg-red-200 text-red-800" : "bg-blue-200 text-blue-800"
                        }`}
                >
                    {notice.tag}
                </span>
            </div>
        </div>
    );
}
