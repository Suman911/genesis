import React from "react";
import { Student } from "@/lib/definitions";

interface StudentsTableProps extends React.HTMLAttributes<HTMLDivElement> {
    students: Student[];
}

const StudentsTable = ({ students, ...props }: StudentsTableProps) => {
    return (
        <div {...props}>
            <table className="min-w-full divide-y divide-gray-400">
                <thead className="bg-neutral-200">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">College</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Subject</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Batches</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                    {students.map((student) => (
                        <tr key={student.id} className="bg-neutral-100 hover:bg-neutral-300">
                            <td className="px-4 py-2 text-sm text-gray-800">{student.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{student.college}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{student.subject}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{student.batches}</td>
                            <td className="px-4 py-2 text-sm">
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
        </div>
    )
}

export default StudentsTable