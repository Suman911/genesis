import React from "react";
import StudentDetails from "./studentDetails";
import { Student } from "@/lib/definitions";

interface StudentsTableProps {
    students: Student[];
    loading: boolean;
    limit?: number;
}

const StudentsTable = ({ students, loading, limit = 10 }: StudentsTableProps) => {
    const [id, setId] = React.useState<number | null>(null);
    return (
        <div className="bg-neutral-200 m-4 mt-0">
            {loading ? (
                <table className="min-w-full divide-y divide-gray-400 text-sm">
                    <thead className="bg-neutral-200 font-medium text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">College</th>
                            <th className="px-4 py-2 text-left">Subject</th>
                            <th className="px-4 py-2 text-left">Batches</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {Array.from({ length: limit }).map((_, i) => (
                            <tr key={i} className="bg-neutral-100">
                                <td className="px-4 py-2">
                                    <div className="h-[21px] w-28 bg-gray-300 rounded animate-pulse"></div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="h-[21px] w-42 bg-gray-300 rounded animate-pulse"></div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="h-[21px] w-24 bg-gray-300 rounded animate-pulse"></div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="h-[21px] w-28 bg-gray-300 rounded animate-pulse"></div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="h-[21px] w-16 bg-gray-300 rounded animate-pulse"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : students.length === 0 ? (
                <div className="p-4 text-gray-500">No students found.</div>
            ) : (
                <table className="min-w-full divide-y divide-gray-400 text-sm">
                    <thead className="bg-neutral-200 font-medium text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">College</th>
                            <th className="px-4 py-2 text-left">Subject</th>
                            <th className="px-4 py-2 text-left">Batches</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 text-gray-800">
                        {students.map((student, i) => (
                            <tr key={i} className="bg-neutral-100 hover:bg-neutral-300 cursor-pointer" onClick={() => setId(student.id)}>
                                <td className="px-4 py-2">{i + 1}. {student.name}</td>
                                <td className="px-4 py-2">{student.college}</td>
                                <td className="px-4 py-2">{student.subject}</td>
                                <td className="px-4 py-2">{student.batches}</td>
                                <td className="px-4 py-2">
                                    {student.has_active ? (
                                        <span className="text-green-600 font-semibold">Active</span>
                                    ) : (
                                        <span className="text-gray-500">Inactive</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <StudentDetails id={id} onClose={() => setId(null)} />
        </div>
    );
};

export default StudentsTable;
