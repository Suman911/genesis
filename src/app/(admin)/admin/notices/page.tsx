"use client";
import { useEffect, useState } from "react";
import Axios from "@/utils/Axios";
import Button from "@/components/ui/util/button";
import ErrorAlert from "@/components/ui/util/errorAlert";
import FloatingInput from "@/components/ui/form/input/floatingInput";
import FloatingTextarea from "@/components/ui/form/input/floatingTextarea";
import { FaTrashAlt, FaPen, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { NoticeType } from "@/lib/definitions";
import clsx from "clsx";

const emptyNotice: Partial<NoticeType> = {
    title: "",
    description: "",
    document_url: "",
    target_timestamp: "",
    expiry_date: "",
    type: "",
    is_urgent: false,
    tag: "",
};

const SkeletonRow = () => (
    <tr className="animate-pulse">
        {Array.from({ length: 7 }).map((_, i) => (
            <td key={i} className="p-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </td>
        ))}
    </tr>
)


export default function NoticesPage() {
    const [notices, setNotices] = useState<NoticeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<NoticeType>>(emptyNotice);
    const [creating, setCreating] = useState(false);
    const [createForm, setCreateForm] = useState<Partial<NoticeType>>(emptyNotice);

    const fetchNotices = async () => {
        setLoading(true);
        try {
            const data: NoticeType[] = await Axios.get("/notices");
            setNotices(data);
        } catch (err: unknown) {
            const message = err instanceof Error
                ? err.message
                : 'Failed to load notices.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    // Delete
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this notice?")) return;
        try {
            await Axios.delete(`/notices/${id}`);
            setNotices(notices => notices.filter(n => n.id !== id));
        } catch {
            setError("Failed to delete notice.");
        }
    };

    // Edit
    const startEdit = (notice: NoticeType) => {
        setEditingId(notice.id);
        setEditForm({ ...notice });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm(emptyNotice);
    };

    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        setEditForm(f => ({
            ...f,
            [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
        }));
    };

    const saveEdit = async () => {
        if (!editingId) return;
        try {
            const { data: updated } = await Axios.put(`/notices/${editingId}`, editForm);
            setNotices(n => n.map(notice => notice.id === editingId ? updated : notice));
            cancelEdit();
        } catch {
            setError("Failed to update notice.");
        }
    };

    // Create
    const handleCreateChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        setCreateForm(f => ({
            ...f,
            [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
        }));
    };

    const saveCreate = async () => {
        try {
            const { data: created } = await Axios.post("/notices", createForm);
            setNotices(n => [created, ...n]);
            setCreating(false);
            setCreateForm(emptyNotice);
        } catch {
            setError("Failed to create notice.");
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <ErrorAlert message={error} onClose={() => setError("")} />
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Notices</h1>
                <Button color="info" size="lg" onClick={() => setCreating(true)}>
                    <FaPlus className="mr-2" /> New Notice
                </Button>
            </div>

            {/* Create Notice Form */}
            {creating && (
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <h2 className="text-lg font-semibold mb-2">Create Notice</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <FloatingInput label="Title" name="title" value={createForm.title ?? ""} onChange={handleCreateChange} required />
                        <FloatingInput label="Type" name="type" value={createForm.type ?? ""} onChange={handleCreateChange} required />
                        <FloatingInput label="Tag" name="tag" value={createForm.tag ?? ""} onChange={handleCreateChange} />
                        <FloatingInput label="Document URL" name="document_url" value={createForm.document_url ?? ""} onChange={handleCreateChange} />
                        <FloatingInput label="Target Date" name="target_timestamp" type="datetime-local" value={createForm.target_timestamp ?? ""} onChange={handleCreateChange} required />
                        <FloatingInput label="Expiry Date" name="expiry_date" type="datetime-local" value={createForm.expiry_date ?? ""} onChange={handleCreateChange} required />
                        <div className="col-span-2">
                            <FloatingTextarea label="Description" name="description" value={createForm.description ?? ""} onChange={handleCreateChange} required />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="is_urgent" checked={!!createForm.is_urgent} onChange={handleCreateChange} id="is_urgent_create" />
                            <label htmlFor="is_urgent_create">Urgent</label>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <Button color="danger" onClick={() => setCreating(false)}><FaTimes /> Cancel</Button>
                        <Button color="success" onClick={saveCreate}><FaSave /> Create</Button>
                    </div>
                </div>
            )}

            {/* Notices Table */}
            <div className="bg-white rounded-lg shadow p-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left">Title</th>
                            <th className="p-2 text-left">Type</th>
                            <th className="p-2 text-left">Tag</th>
                            <th className="p-2 text-left">Urgent</th>
                            <th className="p-2 text-left">Target</th>
                            <th className="p-2 text-left">Expiry</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <>
                                <SkeletonRow />
                                <SkeletonRow />
                                <SkeletonRow />
                                <SkeletonRow />
                                <SkeletonRow />
                            </>
                        ) : notices.length > 0 ? (
                            notices.map(notice =>
                                editingId === notice.id ? (
                                    <tr key={notice.id} className="bg-yellow-50">
                                        {/* ...edit cells as you already have... */}
                                    </tr>
                                ) : (
                                    <tr
                                        key={notice.id}
                                        className={clsx("border-b", notice.is_urgent && "bg-red-50")}
                                    >
                                        <td className="p-2 font-semibold">{notice.title}</td>
                                        <td className="p-2">{notice.type}</td>
                                        <td className="p-2">{notice.tag}</td>
                                        <td className="p-2 text-center">
                                            {notice.is_urgent ? "Yes" : "No"}
                                        </td>
                                        <td className="p-2">
                                            {new Date(notice.target_timestamp).toLocaleString()}
                                        </td>
                                        <td className="p-2">
                                            {new Date(notice.expiry_date).toLocaleString()}
                                        </td>
                                        <td className="p-2 flex gap-2">
                                            <Button
                                                color="warning"
                                                size="i"
                                                onClick={() => startEdit(notice)}
                                            >
                                                <FaPen />
                                            </Button>
                                            <Button
                                                color="danger"
                                                size="i"
                                                onClick={() => handleDelete(notice.id)}
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            )
                        ) : (
                            <tr>
                                <td colSpan={7} className="p-4 text-center text-gray-500">
                                    No notices found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div >
    );
}