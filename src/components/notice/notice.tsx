import { IoNewspaperSharp } from "react-icons/io5";
import { NewIcon } from "../ui/icon/newIcon";
import { ImportantIcon } from "../ui/icon/important";
import { NoticeType } from "@/lib/definitions";
import Button from "../ui/util/button";

interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
    notice: NoticeType;
}

export default function Notice({ notice, className = "", ...props }: NoticeProps) {
    return (
        <div
            {...props}
            className={`group border border-gray-300 rounded-lg p-4 shadow-sm bg-white flex items-start gap-4 transition-colors duration-300 hover:bg-primary-fade hover:delay-0 delay-100 ${className}`}
        >
            <div className="text-2xl">
                {notice.is_urgent ? (
                    <ImportantIcon />
                ) : (
                    <NewIcon />
                )}
            </div>

            {/* Notice Content */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 flex items-start gap-2">
                    <span className="size-8">
                        <IoNewspaperSharp className="text-primary" />
                    </span>
                    {notice.title}
                </h2>
                <p className="text-gray-600 mb-2">{notice.description}</p>

                {/* Metadata */}
                {/* <div className="text-sm text-gray-500 mt-2">
                    <p>Posted on: {new Date(notice.posted_date).toLocaleDateString()}</p>
                    <p>Event Date: {new Date(notice.target_timestamp).toLocaleString()}</p>
                    <p>Expires on: {new Date(notice.expiry_date).toLocaleDateString()}</p>
                </div> */}

                <div className="">
                    {/* Notice Link */}
                    <span className="mb-3 mr-3">
                        <a
                            href={notice.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            <Button className="px-3 py-1 text-xs">View Document</Button>
                        </a>
                    </span>
                    {/* Tag */}
                    <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${notice.is_urgent ? "bg-red-200 text-red-800" : "bg-blue-200 text-blue-800"
                            }`}
                    >
                        {notice.tag}
                    </span>
                </div>
            </div>
        </div>
    );
}
