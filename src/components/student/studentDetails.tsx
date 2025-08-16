import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiUser } from "react-icons/fi";
import Axios from "@/utils/Axios";
import { StudentInfo } from "@/lib/definitions";

type StudentDetailsProps = { id: number | null; onClose: () => void };

function StudentDetails({ id, onClose }: StudentDetailsProps) {
    const [student, setStudent] = useState<StudentInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchStudent = async () => {
            setLoading(true);
            setError(null);
            setStudent(null);

            try {
                const res: StudentInfo = await Axios.get(`/students/${id}`);
                setStudent(res);
            } catch (err) {
                setError("Failed to load student details");
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    useEffect(() => {
        const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", esc);
        return () => document.removeEventListener("keydown", esc);
    }, [onClose]);

    if (!id) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>

                {/* Loading / Error States */}
                {loading && <p className="text-gray-500 text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Student Info */}
                {student && (
                    <div className="space-y-4">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center">
                            {student.photo ? (
                                <img
                                    src={student.photo}
                                    alt={student.name}
                                    className="w-32 h-32 rounded-full object-cover border shadow-md"
                                />
                            ) : (
                                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 border shadow-md">
                                    <FiUser className="text-gray-400 text-6xl" />
                                </div>
                            )}
                            <h2 className="text-2xl font-bold text-gray-800 mt-3">{student.name}</h2>
                            <p className="text-gray-600">{student.email}</p>
                            <p className="text-gray-600">{student.ph_number}</p>
                        </div>

                        {/* Details Section */}
                        <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
                            <p><span className="font-semibold">College:</span> {student.college}</p>
                            <p><span className="font-semibold">Subject:</span> {student.subject}</p>
                            <p><span className="font-semibold">Username:</span> {student.user_name}</p>
                            <p><span className="font-semibold">Address:</span> {student.address ?? "—"}</p>
                            <p><span className="font-semibold">Date of Birth:</span> {student.date_of_birth ?? "—"}</p>
                            <p><span className="font-semibold">Admission Date:</span> {student.date_of_admission ?? "—"}</p>
                            {student.date_of_passout && (
                                <p><span className="font-semibold">Passout Date:</span> {student.date_of_passout}</p>
                            )}
                            <p>
                                <span className="font-semibold">Guardian:</span> {student.guardian_name ?? "—"} ({student.guardian_number ?? "—"})
                            </p>

                            {student.facebook_profile && (
                                <p>
                                    <span className="font-semibold">Facebook:</span>{" "}
                                    <a
                                        href={student.facebook_profile}
                                        className="text-blue-600 underline"
                                        target="_blank"
                                    >
                                        Profile
                                    </a>
                                </p>
                            )}

                            <p
                                className={`font-semibold ${student.isAlumni ? "text-green-600" : "text-blue-600"
                                    }`}
                            >
                                {student.isAlumni ? "Alumni" : "Active Student"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}

export default StudentDetails;