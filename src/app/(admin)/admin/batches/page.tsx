"use client";
import { useEffect, useState } from "react";
import Axios from "@/utils/Axios";
import Button from "@/components/ui/util/button";
import { FaPen, FaSave, FaPlus, FaUndo, FaEye, FaEyeSlash, FaTrashAlt } from "react-icons/fa";
import { Course, Batch } from "@/lib/definitions";
import UnassignedStudents from "@/components/student/unassignedStudents"
import StudentsInBatch from "@/components/student/studentsInBatch";
import ErrorAlert from "@/components/ui/util/errorAlert";

type CourseVM = Course & { editing: boolean };

const deepClone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));
// const deepClone = <T,>(o: T): T => structuredClone(o); don't remove this, it's a better way to deep clone but not supported in all browsers yet
const stripUiFields = ({ editing: _, ...payload }: CourseVM): Course => payload as Course;

export default function BatchesPage() {
    const [courses, setCourses] = useState<CourseVM[]>([]);
    const [backup, setBackup] = useState<CourseVM[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingIndex, setSavingIndex] = useState<number | null>(null);
    const [showUnassigned, setShowUnassigned] = useState(false);
    const [editing, setEditing] = useState(false);
    const [openBatch, setOpenBatch] = useState<number | null>(null);
    const [error, setError] = useState("");

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data: Course[] = await Axios.get("/courses/");
            const withUi = data.map((c) => ({ ...c, editing: false })) as CourseVM[];
            setCourses(withUi);
            setBackup(deepClone(withUi));
        } catch (error) {
            setError(`Failed to unassign: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => setEditing(courses.some((c) => c.editing)), [courses]);

    const toggleEdit = (idx: number) => {
        const course = courses[idx];
        if (course.editing) {
            const hasUnsavedChanges =
                course.name !== backup[idx].name ||
                course.active !== backup[idx].active ||
                course.batches.some((b, bIdx) => {
                    const backupBatch = backup[idx].batches[bIdx];
                    return b.name !== backupBatch.name || b.active !== backupBatch.active;
                });
            if (hasUnsavedChanges) {
                alert("You have unsaved changes. Please save or reset before editing.");
            } else {
                setCourses((prev) => prev.map((c, i) => (i === idx ? { ...c, editing: false } : c)));
            }
        } else {
            setCourses((prev) => prev.map((c, i) => (i === idx ? { ...c, editing: true } : c)));
        }
    };

    const updateCourseField = (idx: number, field: keyof Course, v: Course[keyof Course]) =>
        setCourses((prev) => {
            const copy: CourseVM[] = deepClone(prev);
            (copy[idx][field] as Course[keyof Course]) = v;
            return copy;
        });

    const updateBatchField = (cIdx: number, bIdx: number, field: keyof Batch, v: Batch[keyof Batch]) =>
        setCourses((prev) => {
            const copy = deepClone(prev);
            (copy[cIdx].batches[bIdx][field] as Batch[keyof Batch]) = v;
            return copy;
        });

    const addBatch = (cIdx: number) =>
        setCourses((prev) => {
            const copy = deepClone(prev);
            const nextSeq = copy[cIdx].batches.reduce((m, b) => Math.max(m, b.seq ?? 0), 0) + 1;
            copy[cIdx].batches.push({
                id: 0,
                course_id: copy[cIdx].id,
                seq: nextSeq,
                name: "new",
                active: 1,
                student_count: 0,
            });
            return copy;
        });

    const removeCourse = (cIdx: number) =>
        setCourses((prev) => {
            const copy = deepClone(prev);
            copy.splice(cIdx, 1);
            return copy;
        });

    const resetCourse = (cIdx: number) => {
        setCourses((prev) => {
            const copy = deepClone(prev);
            copy[cIdx] = deepClone(backup.find((c) => c.id === copy[cIdx].id)!);
            return copy;
        });
    };

    const addNewCourse = () => {
        const idx = courses.length;
        const newCourse: CourseVM = {
            id: 0,
            name: `Course ${idx}`,
            active: 1,
            student_count: 0,
            batches: [
                {
                    id: 0,
                    course_id: 0,
                    seq: 1,
                    name: "Batch 1",
                    active: 1,
                    student_count: 0,
                },
            ],
            editing: true,
        };
        setCourses((prev) => [newCourse, ...prev]);
    };

    const saveCourse = async (cIdx: number) => {
        const vm = courses[cIdx];
        const payload = stripUiFields(vm);
        setSavingIndex(cIdx);
        try {
            const response: CourseVM = await Axios.put(`/courses/${vm.id}`, payload);
            const updated = { ...response, editing: false };

            setCourses((prev) => prev.map((c, i) => (i === cIdx ? updated : c)));
            setBackup((prev) => prev.map((c, i) => (i === cIdx ? updated : c)));
        } catch (error) {
            setError(`Failed to edit courses: ${error instanceof Error ? error.message : "Unknown error"}${error}`);
        } finally {
            setSavingIndex(null);
        }
    };

    const deleteCourse = async (cIdx: number) => {
        const course = courses[cIdx];
        if (!course.id) {
            setCourses((prev) => prev.filter((_, i) => i !== cIdx));
            return;
        }
        setSavingIndex(cIdx);
        try {
            await Axios.delete(`/courses/${course.id}`);
            setCourses((prev) => prev.filter((_, i) => i !== cIdx));
            setBackup((prev) => prev.filter((_, i) => i !== cIdx));
        } catch (error) {
            setError(`Failed to delete course. ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setSavingIndex(null);
        }
    };

    const deleteBatch = async (cIdx: number, bIdx: number) => {
        const batch = courses[cIdx].batches[bIdx];
        if (batch.student_count > 0) {
            alert("Cannot delete batch with enrolled students.");
            return;
        }
        setSavingIndex(cIdx);
        try {
            await Axios.delete(`/courses/batch/${batch.id}`);
            setCourses((prev) => {
                const copy = deepClone(prev);
                copy[cIdx].batches.splice(bIdx, 1);
                return copy;
            });
            setBackup((prev) => {
                const copy = deepClone(prev);
                copy[cIdx].batches.splice(bIdx, 1);
                return copy;
            });
        } catch (error) {
            setError(`Failed to delete batch. ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setSavingIndex(null);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading…</div>;

    return (
        <>
            <ErrorAlert message={error} onClose={() => setError("")} />
            <UnassignedStudents open={showUnassigned} onClose={() => setShowUnassigned(false)} setError={setError} />
            <StudentsInBatch open={openBatch} onClose={() => setOpenBatch(null)} onDelete={fetchCourses} setError={setError} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex justify-between">
                    <Button size="lg" color="primary" onClick={() => setShowUnassigned(true)} disabled={savingIndex !== null || editing}>
                        Unassigned Students
                    </Button>
                    <Button size="lg" color="info" onClick={addNewCourse} disabled={savingIndex !== null}>
                        + New Course
                    </Button>
                </div>
                {courses.map((course, cIdx) => (
                    <div
                        key={course.id === 0 ? `new-${cIdx}` : course.id}
                        className={`w-full border rounded-lg shadow p-4 transition-colors duration-300 ${course.active ? "bg-white" : "bg-gray-100"
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            {course.editing ? (
                                <input
                                    value={course.name}
                                    onChange={(e) => updateCourseField(cIdx, "name", e.target.value)}
                                    className="flex-1 border px-3 py-2 rounded"
                                    disabled={savingIndex === cIdx}
                                />
                            ) : (
                                <>
                                    <div className="flex-1">
                                        <h2 className={`text-xl font-semibold ${course.active ? "text-green-700" : "text-gray-500"}`}>
                                            {course.name}
                                        </h2>
                                        <span className="text-ash font-bold animate-pulse">
                                            Currently Enrolled Students: {course.student_count}
                                        </span>
                                    </div>
                                    {course.batches.length === 0 && (
                                        <Button
                                            color="danger"
                                            outlined
                                            onClick={() => deleteCourse(cIdx)}
                                            disabled={savingIndex !== null}
                                        >
                                            Delete this course
                                        </Button>
                                    )}
                                </>
                            )}

                            {course.editing ?
                                <>
                                    <Button
                                        color={course.active ? "info" : "gray"}
                                        size="i"
                                        onClick={() => updateCourseField(cIdx, "active", course.active ? 0 : 1)}
                                        disabled={savingIndex !== null}
                                    >
                                        {course.active ? <FaEye /> : <FaEyeSlash />}
                                    </Button>
                                    <Button color="info" size="i" onClick={() => addBatch(cIdx)} disabled={savingIndex !== null}>
                                        <FaPlus />
                                    </Button>
                                    {course.id === 0 ? (
                                        <Button color="danger" size="i" onClick={() => removeCourse(cIdx)} disabled={savingIndex !== null}>
                                            <FaTrashAlt />
                                        </Button>
                                    ) : (
                                        <Button color="danger" size="i" onClick={() => resetCourse(cIdx)} disabled={savingIndex !== null}>
                                            <FaUndo />
                                        </Button>
                                    )}
                                    <Button color="success" size="i" onClick={() => saveCourse(cIdx)} disabled={savingIndex === cIdx}>
                                        {savingIndex === cIdx ? "Saving…" : <FaSave />}
                                    </Button>
                                </>
                                :
                                <Button color="warning" outlined size="i" disabled={savingIndex !== null} onClick={() => toggleEdit(cIdx)}>
                                    <FaPen />
                                </Button>}
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                            {course.batches.map((batch, bIdx) => (
                                course.editing ? (
                                    <div
                                        key={bIdx}
                                        className={`px-3.5 py-2 rounded-xl shadow-sm ${batch.active ? "bg-green-100" : "bg-gray-200"}`}
                                    >
                                        <input
                                            value={batch.name}
                                            onChange={(e) => updateBatchField(cIdx, bIdx, "name", e.target.value)}
                                            className="border px-2 py-1 rounded w-full"
                                            disabled={savingIndex === cIdx}
                                        />
                                        <div className="flex justify-end gap-1 mt-1">
                                            <Button
                                                color={batch.active ? "info" : "gray"}
                                                size="i"
                                                onClick={() => updateBatchField(cIdx, bIdx, "active", batch.active ? 0 : 1)}
                                                disabled={savingIndex !== null}
                                            >
                                                {batch.active ? <FaEye /> : <FaEyeSlash />}
                                            </Button>
                                            {batch.student_count === 0 && batch.id !== 0 && (
                                                <Button
                                                    color="danger"
                                                    size="i"
                                                    onClick={() => deleteBatch(cIdx, bIdx)}
                                                    disabled={savingIndex !== null}
                                                >
                                                    <FaTrashAlt />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        key={bIdx}
                                        disabled={editing}
                                        onClick={() => setOpenBatch(batch.id)}
                                        className={`px-6 py-4 rounded-xl shadow-sm 
                                            ${batch.active ? "bg-green-100" : "bg-gray-200"}
                                            ${editing ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
                                    >
                                        <h3>{batch.name}</h3>
                                        <span className="text-sm text-gray-500">Students: {batch.student_count}</span>
                                    </button>
                                )
                            ))}

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
