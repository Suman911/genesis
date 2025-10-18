import { FaTrashAlt, FaPen } from "react-icons/fa";
import { Quote } from "@/lib/definitions";

type QuotesTableProps = {
    quotes: Quote[];
    loading: boolean;
    onEdit: (q: Quote) => void;
    onDelete: (id: number) => void;
};

export default function QuotesTable({ quotes, loading, onEdit, onDelete }: QuotesTableProps) {
    if (loading) {
        return <div className="p-4">Loading…</div>;
    }

    if (!quotes.length) {
        return <div className="p-4 text-gray-500">No quotes found.</div>;
    }

    return (
        <table className="min-w-full divide-y divide-gray-300 text-sm">
            <thead className="bg-neutral-200">
                <tr>
                    <th className="px-4 py-2 text-left">Author</th>
                    <th className="px-4 py-2 text-left">Quote</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-neutral-100">
                        <td className="px-4 py-2">{q.author}</td>
                        <td className="px-4 py-2">{q.quote.length > 120 ? q.quote.slice(0, 120) + "…" : q.quote}</td>
                        <td className="px-4 py-2">{q.category ?? "—"}</td>
                        <td className="px-4 py-2">{q.created_at ? new Date(q.created_at).toLocaleString() : "—"}</td>
                        <td className="px-4 py-2 flex gap-2">
                            <button title="Edit" onClick={() => onEdit(q)} className="text-info"><FaPen /></button>
                            <button title="Delete" onClick={() => { if (confirm("Delete this quote?")) onDelete(q.id); }} className="text-danger"><FaTrashAlt /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}