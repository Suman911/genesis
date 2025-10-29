import { useEffect, useState } from "react";
import Portal from '@/components/ui/util/portal';
import Axios from "@/utils/Axios";
import StudentDetails from "./studentDetails";
import AssignBatch from "../batch/assignBatch";
import { Course } from "@/lib/definitions";
import Button from "@/components/ui/util/button";
import { FaPlus, FaTimes } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";

type Student = {
    id: number;
    college: string;
    subject: string;
    name: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    setError: (m: string) => void;
};

const UnassignedStudents = ({ open, onClose, setError }: Props) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState<number | null>(null);
    const [assignId, setAssignId] = useState<number | null>(null);

    const addToBatch = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setAssignId(id);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const res: Student[] = await Axios.get("/students/unassign");
                setStudents(res);
            } catch (error) {
                setStudents([]);
                setError(error instanceof Error? error.message: 'Failed to load unassigned students.');
            } finally {
                setLoading(false);
            }
        };
        const fetchCourses = async () => {
            try {
                const res: Course[] = await Axios.get('/courses/names?active=true');
                setCourses(res);
            } catch (error) {
                setError(`Failed to fetch courses: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
        fetchStudents();
        fetchCourses();
    }, [reload]);

    return (
        <Portal open={Boolean(open)}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
                    <div className="absolute top-2 right-2 flex gap-4">
                        <Button
                            color="info"
                            size="i"
                            onClick={() => setReload(r => !r)}
                            disabled={loading}
                            title="reload"
                        >
                            <TfiReload size={20} />
                        </Button>
                        <Button
                            color="danger"
                            size="i"
                            onClick={onClose}
                            disabled={loading}
                        >
                            <FaTimes size={20} />
                        </Button>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Unassigned Students</h2>
                    {loading ? (
                        <div className="py-8 text-center">Loading…</div>
                    ) : students.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">No unassigned students found.</div>
                    ) : (
                        <div className="overflow-y-scroll max-h-60 scrollbar-none">
                            <table className="min-w-full border rounded shadow bg-white">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">College</th>
                                        <th className="px-4 py-2 text-left">Subject</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((s) => (
                                        <tr key={s.id} className="border-t cursor-pointer" title={`View ${s.name} details`} onClick={() => setId(s.id)}>
                                            <td className="px-4 py-2">{s.name}</td>
                                            <td className="px-4 py-2">{s.college}</td>
                                            <td className="px-4 py-2">{s.subject}</td>
                                            <td className="px-4 py-2">
                                                <Button color="success" size="i" outlined title="Add to batch" onClick={addToBatch(s.id)}>
                                                    <FaPlus />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <StudentDetails id={id} onClose={() => setId(null)} onDelete={() => setReload(r => !r)} />
                    <AssignBatch open={assignId} onClose={() => setAssignId(null)} onSave={() => setReload(r => !r)} courses={courses} setError={setError} />
                </div>
            </div>
        </Portal>
    );
};

export default UnassignedStudents;