import { useEffect, useState } from 'react';
import Portal from '@/components/ui/util/portal';
import Axios from '@/utils/Axios';
import Button from '@/components/ui/util/button';
import { Course, Batch } from '@/lib/definitions';
import FloatingInput from '@/components/ui/form/input/floatingInput';
import FloatingSelect from '@/components/ui/form/input/floatingSelect';

type AddStudentProps = { courses: Course[], open: boolean, onClose: () => void, onSave: () => void };

export default function AddStudent({ courses, open, onClose, onSave }: AddStudentProps) {
    const activeCourses = courses.filter(c => c.active === 1).map(c => ({
        ...c,
        batches: c.batches.filter(b => b.active === 1)
    }));
    const [batchList, setBatchList] = useState<Batch[]>([]);
    const [form, setForm] = useState({
        name: '',
        user_name: '',
        email: '',
        ph_number: '',
        password: '',
        college: '',
        subject: '',
        course_id: 0,
        batch_id: 0,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (activeCourses.length) {
            setForm(f => ({
                ...f,
                course_id: activeCourses[0].id,
                batch_id: activeCourses[0].batches[0]?.id ?? 0
            }));
            setBatchList(activeCourses[0].batches);
            setError('');
        }
        else {
            setError('No active course available');
        }
    }, [courses]);

    useEffect(() => {
        const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', esc);
        return () => document.removeEventListener('keydown', esc);
    }, [onClose]);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const changeCourse = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const cId = Number(e.target.value);
        const sel = activeCourses.find(c => c.id === cId);
        setBatchList(sel?.batches ?? []);
        setForm(f => ({
            ...f,
            course_id: cId,
            batch_id: sel?.batches[0]?.id ?? 0,
        }));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            await Axios.post('/users', form);
            onSave();
            setForm({
                name: '',
                user_name: '',
                email: '',
                ph_number: '',
                password: '',
                college: '',
                subject: '',
                course_id: 0,
                batch_id: 0,
            });
        } catch (err: unknown) {
            const message = err instanceof Error
                ? err.message
                : 'Failed to create user';
            setError(message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Portal open={Boolean(open)}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow max-h-120 overflow-y-scroll">
                    <h2 className="mb-4 text-xl font-semibold">Add New Student</h2>
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
                            name="email"
                            type="email"
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
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
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
                        <FloatingSelect
                            label="Course"
                            name="course_id"
                            value={form.course_id}
                            onChange={changeCourse}
                        >
                            {activeCourses.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </FloatingSelect>
                        <FloatingSelect
                            label="Batch"
                            name="batch_id"
                            value={form.batch_id}
                            onChange={handle}
                        >
                            {batchList.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
                                </option>
                            ))}
                        </FloatingSelect>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <Button round="xl" color="danger" type="button" onClick={onClose} disabled={saving}>
                                Cancel
                            </Button>
                            <Button round="xl" color="success" type="submit" disabled={saving}>
                                {saving ? "Saving…" : "Save"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Portal>
    );
}
