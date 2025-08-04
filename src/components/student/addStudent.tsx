'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Axios from '@/utils/Axios';
import Button from '@/components/ui/util/button';
import { Batch } from '@/lib/definitions';

type AddStudentProps = { batches: Batch[], open: boolean, onClose: () => void, onSave: () => void };

export default function AddStudent({ batches, open, onClose, onSave }: AddStudentProps) {
    const activeBatches = batches.filter(b => b.active === 1).map(b => ({
        ...b,
        sub_batches: b.sub_batches.filter(sb => sb.active === 1)
    }));
    const [subList, setSubList] = useState<Batch['sub_batches']>([]);
    const [form, setForm] = useState({
        name: '',
        user_name: '',
        email: '',
        ph_number: '',
        password: '',
        college: '',
        subject: '',
        batch_id: 0,
        sub_batch_id: 0,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (activeBatches.length) {
            setForm(f => ({ ...f, batch_id: activeBatches[0].id, sub_batch_id: activeBatches[0].sub_batches[0]?.id }));
            setSubList(activeBatches[0].sub_batches);
            setError('');
        }
        else {
            setError('No active batch available');
        }
    }, [batches]);

    useEffect(() => {
        const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', esc);
        return () => document.removeEventListener('keydown', esc);
    }, [onClose]);

    if (!open) return null;

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const changeBatch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const bId = Number(e.target.value);
        const sel = activeBatches.find(b => b.id === bId);
        setSubList(sel?.sub_batches ?? []);
        setForm(f => ({
            ...f,
            batch_id: bId,
            sub_batch_id: sel?.sub_batches[0]?.id ?? 0,
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
                batch_id: 0,
                sub_batch_id: 0,
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

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow max-h-120 overflow-y-scroll">
                <h2 className="mb-4 text-xl font-semibold">Add New Student</h2>

                <form onSubmit={submit} className="flex flex-col gap-3">
                    <input name="name" value={form.name} onChange={handle} placeholder="Name" className="w-full rounded border px-3 py-2" required />
                    <input name="user_name" value={form.user_name} onChange={handle} placeholder="Username" className="w-full rounded border px-3 py-2" />
                    <input type="email" name="email" value={form.email} onChange={handle} placeholder="Email" className="w-full rounded border px-3 py-2" required />
                    <input name="ph_number" value={form.ph_number} onChange={handle} placeholder="Phone" className="w-full rounded border px-3 py-2" required />
                    <input type="password" name="password" value={form.password} onChange={handle} placeholder="Password" className="w-full rounded border px-3 py-2" required />

                    <input name="college" value={form.college} onChange={handle} placeholder="College" className="w-full rounded border px-3 py-2" required />
                    <input name="subject" value={form.subject} onChange={handle} placeholder="Subject" className="w-full rounded border px-3 py-2" required />

                    <select name="batch_id" value={form.batch_id} onChange={changeBatch} className="w-full rounded border px-3 py-2">
                        {activeBatches.map(b => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>

                    <select name="sub_batch_id" value={form.sub_batch_id} onChange={handle} className="w-full rounded border px-3 py-2">
                        {subList.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex justify-end gap-2">
                        <Button round='xl' color='danger' type="button" onClick={onClose} disabled={saving}>
                            Cancel
                        </Button>
                        <Button round='xl' color='success' type="submit" disabled={saving}>
                            {saving ? 'Saving…' : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
