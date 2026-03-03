"use client";
import { useEffect, useRef, useState } from "react";
import Axios from "@/utils/Axios";
import Button from "@/components/ui/util/button";
import ErrorAlert from "@/components/ui/util/errorAlert";
import FloatingInput from "@/components/ui/form/input/floatingInput";
import FloatingTextarea from "@/components/ui/form/input/floatingTextarea";
import { FaTrashAlt, FaPen, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { NoticeType } from "@/lib/definitions";
import clsx from "clsx";
import { getDateTime } from "@/components/ui/util/date";
import { TfiReload } from "react-icons/tfi";

type NoticeTypeVM = NoticeType & { remove?: boolean };

const emptyNotice = (): NoticeTypeVM => ({
    id: 0,
    title: "",
    description: "",
    document_url: "",
    target_timestamp: getDateTime(),
    expiry_date: getDateTime({ months: 1 }),
    type: "",
    remove: false,
    is_urgent: false,
    tag: "",
});

const SkeletonRow = () => (
    <tr className="animate-pulse">
        {Array.from({ length: 7 }).map((_, i) => (
            <td key={i} className="p-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </td>
        ))}
    </tr>
);

type NoticeFormProps = {
    mode: "create" | "edit";
    formData: NoticeTypeVM;
    setFormData: React.Dispatch<React.SetStateAction<NoticeTypeVM>>;
    documentFile: File | null;
    setDocumentFile: React.Dispatch<React.SetStateAction<File | null>>;
    onSave: () => void;
    onCancel: () => void;
};

function NoticeForm({
    mode,
    formData,
    setFormData,
    documentFile,
    setDocumentFile,
    onSave,
    onCancel,
}: NoticeFormProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(f => ({ ...f, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert("File size must be less than 2MB.");
            return;
        }
        setDocumentFile(file);
    };

    return (
        <form
            className="grid grid-cols-2 gap-4"
            onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => {
                e.preventDefault();
                onSave();
            }}
        >
            <FloatingInput className="col-span-2" label="Title" name="title" value={formData.title ?? ""} onChange={handleChange} required />
            <FloatingInput label="Type" name="type" value={formData.type ?? ""} onChange={handleChange} />
            <FloatingInput label="Tag" name="tag" value={formData.tag ?? ""} onChange={handleChange} />
            <FloatingInput label="Target Date" name="target_timestamp" type="datetime-local" value={formData.target_timestamp ?? ""} onChange={handleChange} required />
            <FloatingInput label="Expiry Date" name="expiry_date" type="datetime-local" value={formData.expiry_date ?? ""} onChange={handleChange} required />
            <div className="col-span-2">
                <FloatingTextarea label="Description" name="description" value={formData.description ?? ""} onChange={handleChange} required />
            </div>
            <span className="flex flex-col gap-2">
                <label
                    htmlFor={`${mode}-file`}
                    title={formData.remove ? "Disabled" : "Document"}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition"
                >
                    <span className={formData.remove ? "text-danger font-bold" : ""}>{documentFile ? "Change Document" : "Upload Document"}</span>
                </label>
                <input
                    id={`${mode}-file`}
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={formData.remove}
                    ref={fileInputRef}
                />
                {documentFile && (
                    <span className="text-xs text-gray-600">
                        Selected: {documentFile.name} ({(documentFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                )}
            </span>
            <div className="inline-flex items-center gap-10 bg-neutral-300 py-2 px-4 rounded-full w-fit h-fit">
                <div className="flex items-center gap-2 col-span-2">
                    <input
                        type="checkbox"
                        name="is_urgent"
                        checked={formData.is_urgent}
                        onChange={e => setFormData(f => ({ ...f, is_urgent: e.target.checked }))}
                        id={`${mode}_urgent`}
                    />
                    <label htmlFor={`${mode}_urgent`}>Urgent</label>
                </div>
                {mode == 'edit' && <div className="flex items-center gap-2 col-span-2">
                    <input
                        type="checkbox"
                        name="remove"
                        checked={formData.remove}
                        onChange={e => {
                            if (documentFile && e.target.checked) {
                                setDocumentFile(null);
                                if (fileInputRef.current) fileInputRef.current.value = "";
                            }
                            setFormData(f => ({ ...f, remove: e.target.checked }));
                        }}
                        id="remove"
                    />
                    <label htmlFor='remove'>Delete Previous Document</label>
                </div>}
            </div>
            <div className="flex gap-2 col-span-2">
                <Button color="danger" type="button" onClick={onCancel}><FaTimes /> Cancel</Button>
                <Button color="success" type="submit"><FaSave /> {mode === "create" ? "Create" : "Save"}</Button>
            </div>
        </form>
    );
}

export default function NoticesPage() {
    const [notices, setNotices] = useState<NoticeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState(emptyNotice());
    const [createForm, setCreateForm] = useState(emptyNotice());
    const [documentFileCreate, setDocumentFileCreate] = useState<File | null>(null);
    const [documentFileEdit, setDocumentFileEdit] = useState<File | null>(null);
    const [creating, setCreating] = useState(false);

    const fetchNotices = async () => {
        setLoading(true);
        try {
            const data: NoticeType[] = await Axios.get("/notices?all=true");
            setNotices(data);
        } catch (error) {
            setError(`Failed to load notices: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this notice?")) return;
        try {
            await Axios.delete(`/notices/${id}`);
            setNotices(n => n.filter(notice => notice.id !== id));
        } catch (error) {
            setError(`Failed to delete notice: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const saveCreate = async () => {
        try {
            const formData = new FormData();
            Object.entries(createForm).forEach(([k, v]) => formData.append(k, String(v ?? "")));
            if (documentFileCreate) formData.append("document", documentFileCreate);

            const created: NoticeType = await Axios.post("/notices", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setNotices(n => [created, ...n]);
            setCreating(false);
            setCreateForm(emptyNotice());
            setDocumentFileCreate(null);
        } catch (error) {
            setError(`Failed to create notice: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const saveEdit = async () => {
        if (!editingId) return;
        try {
            const formData = new FormData();
            Object.entries(editForm).forEach(([k, v]) => formData.append(k, String(v ?? "")));
            if (documentFileEdit) formData.append("document", documentFileEdit);

            const updated: NoticeType = await Axios.post(`/notices/${editingId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setNotices(n => n.map(n => n.id === editingId ? updated : n));
            setEditingId(null);
            setEditForm(emptyNotice());
            setDocumentFileEdit(null);
        } catch (error) {
            setError(`Failed to update notice: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <ErrorAlert message={error} onClose={() => setError("")} />
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    <Button outlined size="i" onClick={fetchNotices}
                    >Notices <TfiReload className={loading ? 'animate-spin-reverse' : ''} />
                    </Button>
                </h1>
                <Button color="info" size="lg" onClick={() => setCreating(true)}>
                    <FaPlus className="mr-2" /> New Notice
                </Button>
            </div>

            {creating && (
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <h2 className="text-lg font-semibold mb-2">Create Notice</h2>
                    <NoticeForm
                        mode="create"
                        formData={createForm}
                        setFormData={setCreateForm}
                        documentFile={documentFileCreate}
                        setDocumentFile={setDocumentFileCreate}
                        onSave={saveCreate}
                        onCancel={() => setCreating(false)}
                    />
                </div>
            )}

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
                                <SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow />
                                <SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow />
                            </>
                        ) : notices.length > 0 ? (
                            notices.map(notice =>
                                editingId === notice.id ? (
                                    <tr key={notice.id} className="bg-yellow-50">
                                        <td colSpan={7} className="p-4">
                                            <NoticeForm
                                                mode="edit"
                                                formData={editForm}
                                                setFormData={setEditForm}
                                                documentFile={documentFileEdit}
                                                setDocumentFile={setDocumentFileEdit}
                                                onSave={saveEdit}
                                                onCancel={() => setEditingId(null)}
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={notice.id} className={clsx("border-b", notice.is_urgent && "bg-red-50")}>
                                        <td className="p-2 font-semibold">{notice.title}</td>
                                        <td className="p-2">{notice.type}</td>
                                        <td className="p-2">{notice.tag}</td>
                                        <td className="p-2 text-center">{notice.is_urgent ? "Yes" : "No"}</td>
                                        <td className="p-2">{new Date(notice.target_timestamp).toLocaleString()}</td>
                                        <td className="p-2">{new Date(notice.expiry_date).toLocaleString()}</td>
                                        <td className="p-2 flex gap-2">
                                            <Button color="warning" size="i" onClick={() => { setEditingId(notice.id); setEditForm({ ...notice, remove: false }); }}>
                                                <FaPen />
                                            </Button>
                                            <Button color="danger" size="i" onClick={() => handleDelete(notice.id)}>
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
        </div>
    );
}
