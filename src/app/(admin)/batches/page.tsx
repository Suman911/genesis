"use client";

import { useEffect, useState } from "react";
import Axios from "@/utils/Axios";
import Button from "@/components/ui/util/button";
import { FaPen, FaSave, FaPlus, FaUndo, FaEye, FaEyeSlash, FaTrashAlt } from "react-icons/fa";
import { Batch, SubBatch } from "@/lib/definitions";

type BatchVM = Batch & { editing: boolean };

const deepClone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));
// const deepClone = <T,>(o: T): T => structuredClone(o); don't remove this, it's a better way to deep clone but not supported in all browsers yet
const stripUiFields = ({ editing, ...payload }: BatchVM): Batch => payload as Batch;

export default function BatchesPage() {
    const [batches, setBatches] = useState<BatchVM[]>([]);
    const [backup, setBackup] = useState<BatchVM[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingIndex, setSavingIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchBatches = async () => {
            const data: Batch[] = await Axios.get("/batches/");
            const withUi = data.map((b) => ({ ...b, editing: false })) as BatchVM[];
            setBatches(withUi);
            setBackup(deepClone(withUi));
            setLoading(false);
        };
        fetchBatches();
    }, []);

    const toggleEdit = (idx: number) => {
        const batch = batches[idx];
        if (batch.editing) {
            const hasUnsavedChanges = batch.name !== backup[idx].name || batch.active !== backup[idx].active || batch.sub_batches.some((s, sIdx) => {
                const backupSub = backup[idx].sub_batches[sIdx];
                return s.name !== backupSub.name || s.active !== backupSub.active;
            });
            if (hasUnsavedChanges) {
                alert("You have unsaved changes. Please save or reset before editing.");
            } else {
                setBatches((prev) => prev.map((b, i) => (i === idx ? { ...b, editing: false } : b)));
            }
        } else {
            setBatches((prev) => prev.map((b, i) => (i === idx ? { ...b, editing: true } : b)));
        }
    };

    const updateBatchField = (idx: number, field: keyof Batch, v: any) =>
        setBatches((prev) => {
            const copy = deepClone(prev);
            (copy[idx] as any)[field] = v;
            return copy;
        });

    const updateSubField = (bIdx: number, sIdx: number, field: keyof SubBatch, v: any) =>
        setBatches((prev) => {
            const copy = deepClone(prev);
            (copy[bIdx].sub_batches[sIdx] as any)[field] = v;
            return copy;
        });

    const addSubBatch = (bIdx: number) =>
        setBatches((prev) => {
            const copy = deepClone(prev);
            const nextSeq = copy[bIdx].sub_batches.reduce((m, s) => Math.max(m, s.seq ?? 0), 0) + 1;
            copy[bIdx].sub_batches.push(
                {
                    id: 0,
                    batch_id: copy[bIdx].id,
                    seq: nextSeq, name: "",
                    active: 1,
                    student_count: 0
                });
            return copy;
        });

    const removeBatch = (bIdx: number) =>
        setBatches((prev) => {
            const copy = deepClone(prev);
            copy.splice(bIdx, 1);
            return copy;
        });

    const resetBatch = (bIdx: number) =>
        setBatches((prev) => {
            const copy = deepClone(prev);
            copy[bIdx] = deepClone(backup.find((b) => b.id === copy[bIdx].id)!);
            return copy;
        });

    const addNewBatch = () => {
        const newBatch: BatchVM = {
            id: 0,
            name: "",
            active: 1,
            student_count: 0,
            sub_batches: [],
            editing: true,
        };
        setBatches((prev) => [newBatch, ...prev]);
    };

    const saveBatch = async (bIdx: number) => {
        const vm = batches[bIdx];
        const payload = stripUiFields(vm);
        setSavingIndex(bIdx);
        try {
            const response: BatchVM = await Axios.put(`/batches/${vm.id}`, payload);
            const updated = { ...response, editing: false };

            setBatches((prev) => prev.map((b, i) => (i === bIdx ? updated : b)));
            setBackup((prev) => prev.map((b, i) => (i === bIdx ? updated : b)));
        } finally {
            setSavingIndex(null);
        }
    };

    const deleteBatch = async (bIdx: number) => {
        const batch = batches[bIdx];
        if (!batch.id) {
            setBatches((prev) => prev.filter((_, i) => i !== bIdx));
            return;
        }
        setSavingIndex(bIdx);
        try {
            await Axios.delete(`/batches/${batch.id}`);
            setBatches((prev) => prev.filter((_, i) => i !== bIdx));
            setBackup((prev) => prev.filter((_, i) => i !== bIdx));
        } catch (error) {
            alert(`Failed to delete batch. ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setSavingIndex(null);
        }
    };

    const deleteSubBatch = async (bIdx: number, sIdx: number) => {
        const subBatch = batches[bIdx].sub_batches[sIdx];
        if (subBatch.student_count > 0) {
            alert("Cannot delete sub-batch with enrolled students.");
            return;
        }
        setSavingIndex(bIdx);
        try {
            await Axios.delete(`/batches/sub/${subBatch.id}`);
            setBatches((prev) => {
                const copy = deepClone(prev);
                copy[bIdx].sub_batches.splice(sIdx, 1);
                return copy;
            });
            setBackup((prev) => {
                const copy = deepClone(prev);
                copy[bIdx].sub_batches.splice(sIdx, 1);
                return copy;
            });
        } catch (error) {
            alert(`Failed to delete sub-batch. ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setSavingIndex(null);
        }
    };

    if (loading)
        return <div className="flex items-center justify-center min-h-screen">Loading…</div>;

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex justify-end">
                <Button className="px-4 py-2 mb-4" onClick={addNewBatch} disabled={savingIndex !== null}>
                    + New Batch
                </Button>
            </div>
            {batches.map((batch, bIdx) => (
                <div
                    key={batch.id === 0 ? `new-${bIdx}` : batch.id}
                    className={`w-full border rounded-lg shadow p-4 transition-colors duration-300 ${batch.active ? "bg-white" : "bg-gray-100"}`}
                >
                    <div className="flex items-center gap-4">
                        {batch.editing ? (
                            <input
                                value={batch.name}
                                onChange={(e) => updateBatchField(bIdx, "name", e.target.value)}
                                className="flex-1 border px-3 py-2 rounded"
                                disabled={savingIndex === bIdx}
                            />
                        ) : (
                            <>
                                <div className="flex-1">
                                    <h2 className={`text-xl font-semibold ${batch.active ? "text-green-700" : "text-gray-500"}`}>{batch.name}</h2>
                                    <span className="text-ash font-bold animate-pulse">Currently Enrolled Students: {batch.student_count}</span>
                                </div>
                                {batch.sub_batches.length === 0 && (
                                    <Button className="p-1" onClick={() => deleteBatch(bIdx)} disabled={savingIndex !== null}>
                                        Delete this batch
                                    </Button>
                                )}
                            </>
                        )}

                        <Button className="p-1" onClick={() => toggleEdit(bIdx)} disabled={savingIndex !== null}><FaPen /></Button>
                        {batch.editing && (
                            <>
                                <Button className="p-1" onClick={() => updateBatchField(bIdx, "active", batch.active ? 0 : 1)} disabled={savingIndex !== null}>
                                    {batch.active ? <FaEye /> : <FaEyeSlash />}
                                </Button>
                                <Button className="p-1" onClick={() => addSubBatch(bIdx)} disabled={savingIndex !== null}><FaPlus /></Button>
                                {batch.id === 0 ?
                                    <Button className="p-1" onClick={() => removeBatch(bIdx)} disabled={savingIndex !== null}><FaTrashAlt /></Button> :
                                    <Button className="p-1" onClick={() => resetBatch(bIdx)} disabled={savingIndex !== null}><FaUndo /></Button>
                                }
                                <Button className="p-1" onClick={() => saveBatch(bIdx)} disabled={savingIndex === bIdx}>
                                    {savingIndex === bIdx ? "Saving…" : <FaSave />}
                                </Button>
                            </>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4">
                        {batch.sub_batches.map((sub, sIdx) => (
                            <div key={sIdx} className={`px-6 py-4 rounded-xl shadow-sm ${sub.active ? "bg-green-100" : "bg-gray-200"}`}>
                                {batch.editing ? (
                                    <input
                                        value={sub.name}
                                        onChange={(e) => updateSubField(bIdx, sIdx, "name", e.target.value)}
                                        className="border px-2 py-1 rounded w-full"
                                        disabled={savingIndex === bIdx}
                                    />
                                ) : (
                                    <>
                                        <h3>{sub.name}</h3>
                                        <span className="text-sm text-gray-500">Students: {sub.student_count}</span>
                                    </>
                                )}
                                {batch.editing && (
                                    <div className="flex justify-end gap-1 mt-1">
                                        <Button className="p-1" onClick={() => updateSubField(bIdx, sIdx, "active", sub.active ? 0 : 1)} disabled={savingIndex !== null}>
                                            {sub.active ? <FaEye /> : <FaEyeSlash />}
                                        </Button>
                                        {sub.student_count === 0 && sub.id !== 0 && (
                                            <Button className="p-1" onClick={() => deleteSubBatch(bIdx, sIdx)} disabled={savingIndex !== null}>
                                                <FaTrashAlt />
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}