import { useEffect, useState, useRef } from "react";
import Portal from '@/components/ui/util/portal';
import useDebounce from "@/hooks/useDebounce";
import Button from "@/components/ui/util/button";
import StudentsTable from "@/components/student/studentsTable";
import FloatingInput from "@/components/ui/form/input/floatingInput";
import FloatingSelect from "@/components/ui/form/input/floatingSelect";
import Axios from "@/utils/Axios";
import qs from "qs";
import { Student, Search, Filter, Query } from "@/lib/definitions";
import { FaTimes } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";

type studentResponse = {
    students: Student[];
    total: number;
};

type Props = {
    open: null | number;
    onClose: () => void;
    onDelete: () => void;
    setError: (m: string) => void;
};

export default function StudentsInBatch({ open, onClose, onDelete, setError }: Props) {
    const [students, setStudents] = useState<Student[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [filters, setFilters] = useState<Filter>({ order_by: [], limit: 10 });
    const [search, setSearch] = useState<Search>({});
    const dSearch = useDebounce(search, 1000);
    const pageCount = Math.ceil(total / (filters.limit || 10));
    const [page, setPage] = useState<number>(1);
    const prevPage = useRef<number | undefined>(page);
    const [deleted, setDeleted] = useState(false);
    const [deleteing, setDeleteing] = useState(false);

    const fetchStudents = async (query: Query) => {
        setLoading(true);
        try {
            const queryString = qs.stringify(query, { addQueryPrefix: true });
            const res: studentResponse = await Axios.get(`/students${queryString}`);
            setStudents(res.students);
            setTotal(res.total);
        } catch (error) {
            setStudents([]);
            setError(`Failed to fetch students: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (prevPage.current !== page) {
            fetchStudents({ ...filters, ...dSearch, page: page });
            prevPage.current = page;
            return;
        }
        fetchStudents({ ...filters, ...dSearch });
    }, [dSearch, page, reload]);

    useEffect(() => {
        if (open) {
            setFilters({ ...filters, batch_id: open as number });
            fetchStudents({ ...filters, batch_id: open as number });
        }
        else
            setStudents([]);
    }, [open])

    const RemoveButton = (sid: number) => {
        const remove = async (e: React.MouseEvent) => {
            e.stopPropagation();

            try {
                setDeleteing(true);
                await Axios.delete(`/students/unassign/${sid}/${open}`);
                setReload(r => !r);
                setDeleted(true);
            } catch (error) {
                setError(`Failed to unassign: ${error instanceof Error ? error.message : 'Unknown error'}`);
            } finally {
                setDeleteing(false);
            }
        };

        return (
            <button
                className={`bg-warning hover:bg-danger text-white rounded-full p-1
                    ${deleteing ? "animate-spin" : "animate-pulse"}`}
                onClick={remove}
                disabled={loading}
                title="Remove"
            >
                {deleteing ? <TfiReload size={20} /> : <FaTimes size={20} />}
            </button>
        );
    };

    return (
        <Portal open={Boolean(open)}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="relative bg-white shadow rounded-lg">
                    <div className="absolute -top-10 -right-5 flex gap-4 z-60">
                        <Button
                            color="info"
                            size="i"
                            onClick={() => setReload(r => !r)}
                            disabled={loading}
                            title="reload"
                        >
                            <TfiReload size={20} />
                        </Button>
                        <Button
                            color="danger"
                            size="i"
                            onClick={() => {
                                onClose();
                                if (deleted) onDelete();
                            }}
                            disabled={loading}
                        >
                            <FaTimes size={20} />
                        </Button>
                    </div>
                    <div className="p-5 overflow-hidden">
                        <div className="flex gap-4 p-4 m-4 pb-2 mb-0 items-center justify-between rounded rounded-b-none bg-neutral-200">
                            <span>Search</span>
                            <FloatingInput
                                type="text"
                                name="Search by name or email"
                                label="Search by name or email"
                                value={search.search ?? ''}
                                onChange={(e) => setSearch(s => ({ ...s, search: e.target.value || undefined }))}
                                className="bg-white w-60"
                            />
                            <FloatingInput
                                type="text"
                                name="College"
                                label="College"
                                value={search.college ?? ''}
                                onChange={(e) => setSearch(s => ({ ...s, college: e.target.value || undefined }))}
                                className="bg-white"
                            />
                            <FloatingInput
                                type="text"
                                name="Subject"
                                label="Subject"
                                value={search.subject ?? ''}
                                onChange={(e) => setSearch(s => ({ ...s, subject: e.target.value || undefined }))}
                                className="bg-white"
                            />
                            <FloatingSelect
                                name="limit"
                                label="Rows"
                                value={filters.limit}
                                disabled={loading}
                                onChange={(e) => {
                                    setFilters({ ...filters, limit: Number(e.target.value) });
                                    fetchStudents({ ...filters, limit: Number(e.target.value) })
                                }}
                                className="bg-white"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </FloatingSelect>
                        </div>
                        <div className="overflow-y-scroll max-h-80 scrollbar-none">
                            <StudentsTable students={students} loading={loading} limit={filters.limit}
                                onDelete={() => fetchStudents({ ...filters, ...dSearch, page: page })} modButton={RemoveButton} />
                        </div>
                        {pageCount > 1 && (
                            <div className="flex justify-center items-center gap-6 py-2">
                                <button
                                    className="px-4 py-2 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={page === 1 || loading}
                                    onClick={() => setPage((p) => p - 1)}
                                >
                                    Previous
                                </button>
                                <span className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        id="page"
                                        name="page"
                                        className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        type="number"
                                        min={1}
                                        max={pageCount}
                                        placeholder={prevPage.current?.toString() || '1'}
                                        defaultValue={prevPage.current}
                                        onFocus={(e) => e.target.value = ""}
                                        onBlur={(e) => {
                                            let val = e.target.value ? Number(e.target.value) : page;
                                            val = val > pageCount ? pageCount : val < 1 ? 1 : val;
                                            e.target.value = val.toString();
                                            if (val === page) prevPage.current = val; else setPage(val);
                                        }}
                                    />
                                    <span className="text-gray-500">of {pageCount}</span>
                                </span>
                                <button
                                    className="px-4 py-2 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={page === pageCount || loading}
                                    onClick={() => setPage((p) => p + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </Portal>
    );
}
