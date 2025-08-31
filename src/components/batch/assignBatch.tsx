import { useState } from "react";
import Axios from "@/utils/Axios";
import Button from "@/components/ui/util/button";
import FloatingInput from "@/components/ui/form/floatingInput";

type AssignBatchProps = {
    open: number | null; // studentId
    onClose: () => void;
    onSave: () => void;
    courses: any[];
    setError: (m: string) => void;
};

export default function AssignBatch({ open: studentId, onClose, onSave, courses, setError }: AssignBatchProps) {
    const [selected, setSelected] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState(false);

    if (!studentId) return null;

    const handleSelect = (courseId: number, batchId: string) => {
        setSelected(prev => {
            const updated = { ...prev };
            if (batchId === "") {
                delete updated[courseId]; // remove course if deselected
            } else {
                updated[courseId] = Number(batchId);
            }
            return updated;
        });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const batch_ids = Object.values(selected);
            await Axios.post(`/students/assign/${studentId}`, { batch_ids });
            onSave();
            onClose();
        } catch (error) {
            setError(`Failed to assign batch: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
                <h3 className="text-xl font-bold mb-6">Assign Batches</h3>

                <div className="space-y-5 max-h-72 overflow-y-auto pr-2">
                    {courses.map(course => (
                        <div key={course.id} className="space-y-2">
                            <h4 className="font-semibold text-gray-700">{course.name}</h4>
                            <FloatingInput
                                as="select"
                                label="Batch"
                                name={`batch-${course.id}`}
                                value={selected[course.id] || ""}
                                onChange={(e) => handleSelect(course.id, e.target.value)}
                            >
                                <option value="">Select a batch</option>
                                {course.batches.map((batch: any) => (
                                    <option key={batch.id} value={batch.id}>
                                        {batch.name}
                                    </option>
                                ))}
                            </FloatingInput>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button color="warning"
                        onClick={() => {
                            onClose();
                            setSelected({});
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        onClick={handleSave}
                        disabled={loading || Object.values(selected).length === 0}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
