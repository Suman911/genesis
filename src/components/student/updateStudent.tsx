import { useEffect, useState } from "react";
import Portal from '@/components/ui/util/portal';
import Axios from "@/utils/Axios";
import Button from "@/components/ui/util/button";
import { StudentInfo } from "@/lib/definitions";
import FloatingInput from "@/components/ui/form/floatingInput";

type UpdateStudentProps = {
    student: StudentInfo | null;
    open: boolean;
    onClose: () => void;
    onSave: () => void;
};

type StudentUpdateForm = {
    id: number;
    name: string;
    user_name: string;
    email: string;
    ph_number: string;
    college: string;
    subject: string;
}

function toUpdateForm(student?: StudentInfo): StudentUpdateForm {
    if (!student) {
        return {
            id: 0,
            name: '',
            user_name: '',
            email: '',
            ph_number: '',
            college: '',
            subject: ''
        };
    }
    return {
        id: student.id,
        name: student.name,
        user_name: student.user_name,
        email: student.email,
        ph_number: student.ph_number,
        college: student.college,
        subject: student.subject,
    };
}

export default function UpdateStudent({
    student,
    open,
    onClose,
    onSave,
}: UpdateStudentProps) {

    const [form, setForm] = useState<StudentUpdateForm>(toUpdateForm());
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (student) {
            setForm(toUpdateForm(student));
            setError("");
        }
    }, [student]);

    useEffect(() => {
        const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", esc);
        return () => document.removeEventListener("keydown", esc);
    }, [onClose]);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;
        setSaving(true);
        setError("");
        try {
            await Axios.put(`/students/${form.id}`, form);
            onSave();
            onClose();
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Failed to update student";
            setError(message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Portal open={Boolean(open)}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow max-h-120 overflow-y-scroll">
                    <h2 className="mb-4 text-xl font-semibold">Update Student</h2>
                    <form onSubmit={submit} className="flex flex-col gap-3">
                        <FloatingInput
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handle}
                            required
                        />
                        <FloatingInput
                            label="Username"
                            name="user_name"
                            value={form.user_name}
                            onChange={handle}
                        />
                        <FloatingInput
                            label="Email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handle}
                            required
                        />
                        <FloatingInput
                            label="Phone"
                            name="ph_number"
                            value={form.ph_number}
                            onChange={handle}
                            required
                        />
                        <FloatingInput
                            label="College"
                            name="college"
                            value={form.college}
                            onChange={handle}
                            required
                        />
                        <FloatingInput
                            label="Subject"
                            name="subject"
                            value={form.subject}
                            onChange={handle}
                            required
                        />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <Button
                                round="xl"
                                color="danger"
                                type="button"
                                onClick={onClose}
                                disabled={saving}
                            >
                                Cancel
                            </Button>
                            <Button
                                round="xl"
                                color="success"
                                type="submit"
                                disabled={saving}
                            >
                                {saving ? "Updating…" : "Update"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Portal>
    );
}
