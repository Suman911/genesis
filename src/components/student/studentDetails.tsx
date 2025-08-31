import { useEffect, useState } from "react";
import Portal from '@/components/ui/util/portal';
import { FiUser, FiFacebook, FiMail, FiPhone } from "react-icons/fi";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import Axios from "@/utils/Axios";
import { StudentInfo, StudentBatch } from "@/lib/definitions";
import UpdateStudent from "./updateStudent";

type StudentDetailsProps = { id: number | null; onClose: () => void; onDelete: () => void; };

function StudentDetails({ id, onClose, onDelete }: StudentDetailsProps) {
    const [student, setStudent] = useState<StudentInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showUpdate, setShowUpdate] = useState(false);

    const fetchStudent = async (studentId: number) => {
        setLoading(true);
        setError(null);
        try {
            const res: StudentInfo = await Axios.get(`/students/${studentId}`);

            res.batches.sort((a, b) => {
                if (a.status === "Active" && b.status !== "Active") return -1;
                if (a.status !== "Active" && b.status === "Active") return 1;
                return b.batch_id - a.batch_id;
            });
            setStudent(res);
        } catch {
            setStudent(null);
            setError("Failed to load student details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchStudent(id);
    }, [id]);

    useEffect(() => {
        const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", esc);
        return () => document.removeEventListener("keydown", esc);
    }, [onClose]);

    const deleteStudent = async () => {
        if (!id) return;
        if (confirm("Are you sure you want to delete this student?")) {
            try {
                await Axios.delete(`/students/${id}`);
                onDelete();
                onClose();
            } catch {
                setError("Failed to delete student");
            }
        }
    };

    return (
        <Portal open={Boolean(id)}>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            >
                <div
                    className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 overflow-hidden animate-fadeIn text-sm"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 relative">
                        <div className="absolute top-1.5 right-3 flex gap-3">
                            <button
                                onClick={() => setShowUpdate(true)}
                                className="text-white/80 hover:text-white cursor-pointer"
                                title="Edit"
                            >
                                <FaPen size={16} />
                            </button>
                            <button
                                onClick={deleteStudent}
                                className="text-white/80 hover:text-warning cursor-pointer"
                                title="Delete"
                            >
                                <FaTrashAlt size={16} />
                            </button>
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-danger cursor-pointer"
                                title="Close"
                            >
                                <CgClose size={22} />
                            </button>
                        </div>

                        {student && !loading && (
                            <div className="flex items-center gap-4">
                                {student.photo ? (
                                    <img
                                        src={student.photo}
                                        alt={student.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                                    />
                                ) : (
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 border-2 border-white shadow-md">
                                        <FiUser className="text-white text-2xl" />
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-base font-semibold text-white">{student.name}</h2>
                                    <div
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 ${student.isAlumni
                                            ? "bg-green-100 text-green-800"
                                            : "bg-blue-100 text-blue-800"
                                            }`}
                                    >
                                        {student.isAlumni
                                            ? "Alumni"
                                            : "Current"}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Loader / Error */}
                    {loading && (
                        <div className="p-6 flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                    {error && <div className="p-3 bg-red-50 text-red-600 text-center text-sm">{error}</div>}

                    {/* Student Info */}
                    {student && !loading && (
                        <>
                            <div className="p-6 grid grid-cols-2 gap-6">
                                {/* Left column */}
                                <div className="space-y-4">
                                    {/* Contact */}
                                    <section className="space-y-1.5">
                                        <h3 className="text-xs font-semibold text-gray-500 uppercase">Contact</h3>
                                        <div className="flex items-center gap-2">
                                            <FiMail className="text-gray-400" />
                                            <a href={`mailto:${student.email}`} className="text-blue-600 hover:underline truncate">
                                                {student.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiPhone className="text-gray-400" />
                                            <a href={`tel:${student.ph_number}`}>{student.ph_number}</a>
                                        </div>
                                        {student.facebook_profile && (
                                            <div className="flex items-center gap-2">
                                                <FiFacebook className="text-gray-400" />
                                                <a
                                                    href={student.facebook_profile}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Facebook
                                                </a>
                                            </div>
                                        )}
                                    </section>

                                    {/* Guardian */}
                                    <section className="space-y-1.5">
                                        <h3 className="text-xs font-semibold text-gray-500 uppercase">Guardian</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-[11px] text-gray-500">Name</p>
                                                <p>{student.guardian_name || "—"}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-gray-500">Contact</p>
                                                <a href={`tel:${student.guardian_number}`}>
                                                    {student.guardian_number || "—"}
                                                </a>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Address */}
                                    <section className="space-y-1.5">
                                        <h3 className="text-xs font-semibold text-gray-500 uppercase">Address</h3>
                                        <p>{student.address || "— —"}</p>
                                    </section>
                                </div>

                                {/* Right column */}
                                <div className="space-y-4">
                                    {/* Academic */}
                                    <section className="space-y-1.5">
                                        <h3 className="text-xs font-semibold text-gray-500 uppercase">Academic</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-[11px] text-gray-500">College</p>
                                                <p>{student.college}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-gray-500">Subject</p>
                                                <p>{student.subject}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-gray-500">Batch</p>
                                                <p>{student.batches[0]?.batch_name || "—"}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-gray-500">Status</p>
                                                <p>{student.batches[0]?.status || "—"}</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Personal */}
                                    <section className="space-y-1.5">
                                        <h3 className="text-xs font-semibold text-gray-500 uppercase">Personal</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-[11px] text-gray-500">DOB</p>
                                                <p>{student.date_of_birth || "—"}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-gray-500">Admission</p>
                                                <p>{student.date_of_admission || "—"}</p>
                                            </div>
                                            {student.date_of_passout && (
                                                <div>
                                                    <p className="text-[11px] text-gray-500">Passout</p>
                                                    <p>{student.date_of_passout}</p>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-[11px] text-gray-500">Username</p>
                                                <p>{student.user_name}</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            {/* All Batches - moved to bottom */}
                            {student.batches.length > 0 && (
                                <div className="px-6 pb-6">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Batches</h3>
                                    <div className="flex gap-5 flex-wrap">
                                        {student.batches.map((batch: StudentBatch) => (
                                            <div
                                                key={batch.batch_id}
                                                className="flex gap-5 items-center border rounded-md px-3 py-2 text-sm"
                                            >
                                                <span>{batch.batch_name}</span>
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs ${batch.status === "Active"
                                                        ? "bg-green-100 text-green-800"
                                                        : batch.status === "Dropped"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-gray-100 text-gray-800"
                                                        }`}
                                                >
                                                    {batch.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <UpdateStudent
                open={showUpdate}
                onClose={() => setShowUpdate(false)}
                onSave={() => id && fetchStudent(id)}
                student={student}
            />
        </Portal>
    );
}

export default StudentDetails;