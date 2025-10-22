import { useEffect, useState } from "react";
import Portal from "@/components/ui/util/portal";
import Axios from "@/utils/Axios";
import FloatingInput from "@/components/ui/form/input/floatingInput";
import FloatingTextarea from "@/components/ui/form/input/floatingTextarea";
import Button from "@/components/ui/util/button";
import { Quote } from "@/lib/definitions";

type EditQuoteProps = {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    onCreate: () => void;
    quote?: Quote | null;
};

export default function EditQuote({ open, onClose, onSave, onCreate, quote }: EditQuoteProps) {
    const [form, setForm] = useState<Quote>({ id: 0, author: "", quote: "", category: "" });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (quote) setForm({ author: quote.author, quote: quote.quote, category: quote.category ?? "", id: quote.id });
        else setForm({ id: 0, author: "", quote: "", category: "" });
    }, [quote, open]);

    useEffect(() => {
        const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", esc);
        return () => document.removeEventListener("keydown", esc);
    }, [onClose]);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            if (form.id) {
                await Axios.put(`/quotes/${form.id}`, { author: form.author, quote: form.quote, category: form.category });
                onSave();
            } else {
                await Axios.post(`/quotes`, { author: form.author, quote: form.quote, category: form.category });
                onCreate();
            }
            onClose();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to save");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Portal open={Boolean(open)}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow max-h-120 overflow-y-auto">
                    <h2 className="mb-4 text-xl font-semibold">{form.id ? "Edit Quote" : "New Quote"}</h2>
                    <form onSubmit={submit} className="flex flex-col gap-3">
                        <FloatingInput label="Author" name="author" value={form.author} onChange={handle} required />
                        <FloatingTextarea
                            label="Quote"
                            name="quote"
                            value={form.quote ?? ""}
                            onChange={handle as any}
                            rows={4}
                            required
                        />
                        <FloatingInput label="Category" name="category" value={form.category ?? ""} onChange={handle} />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <Button round="xl" color="danger" type="button" onClick={onClose} disabled={saving}>Cancel</Button>
                            <Button round="xl" color="success" type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Portal>
    );
}