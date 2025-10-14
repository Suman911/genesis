import { IoNewspaperSharp } from "react-icons/io5";
import { NewIcon } from "../ui/icon/newIcon";
import { ImportantIcon } from "../ui/icon/important";
import { NoticeType } from "@/lib/definitions";
import Button from "../ui/util/button";
import Link from "next/link";

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

                <div className="">
                    {/* Notice Link */}
                    {notice.document_url && <span className="mb-3 mr-3">
                        <Link
                            href={notice.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="px-2" size="sm" outlined>View Document</Button>
                        </Link>
                    </span>}
                    {/* Tag */}
                    <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full 
                            ${notice.is_urgent ? "bg-red-200 text-red-800" : "bg-blue-200 text-blue-800"}`}
                    >
                        {notice.tag}
                    </span>
                </div>
            </div>
        </div>
    );
}
