'use client';
import { useEffect, useState } from "react";
import Axios from "@/utils/Axios";
import qs from "qs";
import Button from "@/components/ui/util/button";
import FloatingInput from "@/components/ui/form/input/floatingInput";
import QuotesTable from "@/components/quotes/quotesTable";
import EditQuote from "@/components/quotes/editQuote";
import { Quote } from "@/lib/definitions";
import ErrorAlert from "@/components/ui/util/errorAlert";

type QuoteRes = {
    quotes: Quote[];
    total: number;
};

type QueryParams = {
    limit: number
    page: number
    author?: string
    order_by?: [string, number][]
};

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sortAsc, setSortAsc] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editToQuote, setEditToQuote] = useState<Quote | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchQuotes();
    }, [limit, page, sortAsc]);

    const fetchQuotes = async () => {
        setLoading(true);
        try {
            const q: QueryParams = { limit, page };
            if (author) q.author = author;
            // order_by expects array of [field, asc]
            q.order_by = [['date', sortAsc ? 1 : 0]];
            const res: QuoteRes = await Axios.get("/quotes", {
                params: q,
                paramsSerializer: (params) => qs.stringify(params),
            });
            setQuotes(res.quotes);
            setTotal(res.total);
        } catch (error) {
            setQuotes([]);
            setError(`Failed to fetch quotes: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const editQuote = (q: Quote) => { setEditToQuote(q); setEditOpen(true); }

    const deleteQuotes = async (id: number) => {
        try {
            await Axios.delete(`/quotes/${id}`);
        }
        catch (error) {
            setQuotes([]);
            setError(`Failed to delete quotes: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            if (quotes.length === 1 && page > 1)
                setPage(page - 1);
            else
                fetchQuotes();
        }
    };

    return (
        <>
            <ErrorAlert message={error} onClose={() => setError("")} />
            <div className="p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Quotes</h1>
                    <Button color="info" onClick={() => { setEditToQuote(null); setEditOpen(true); }}>+ New Quote</Button>
                </div>
                <div className="bg-white p-4 rounded flex gap-4 items-center">
                    <FloatingInput label="Search by author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-64" />
                    <Button onClick={() => { setPage(1); fetchQuotes(); }}>Search</Button>
                    <Button outlined onClick={() => { setAuthor(''); setPage(1); fetchQuotes(); }}>Reset</Button>
                    <div className="ml-auto flex items-center gap-2">
                        <label className="text-sm">Sort by date</label>
                        <Button onClick={() => { setSortAsc(s => !s); }} outlined>{sortAsc ? "Asc" : "Desc"}</Button>
                        <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="border rounded px-2 py-1">
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <QuotesTable quotes={quotes} loading={loading} onEdit={editQuote} onDelete={deleteQuotes} />
                    {total > limit && (
                        <div className="flex justify-center gap-4 mt-4">
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border rounded">Prev</button>
                            <span className="px-3 py-1">{page}</span>
                            <button disabled={page * limit >= total} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded">Next</button>
                        </div>
                    )}
                </div>
                <EditQuote open={editOpen} onClose={() => setEditOpen(false)} onSave={() => fetchQuotes()} quote={editToQuote} />
            </div>
        </>
    );
}