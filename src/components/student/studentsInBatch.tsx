import { useEffect, useState, useRef } from "react";
import Portal from '@/components/ui/util/portal';
import useDebounce from "@/hooks/useDebounce";
import Button from "@/components/ui/util/button";
import StudentsTable from "@/components/student/studentsTable";
import Axios from "@/utils/Axios";
import qs from "qs";
import { Student, Search, Filter, Query } from "@/lib/definitions";
import { FaTimes } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import Pagination from "../ui/util/pagination";
import StudentsSearchBar from "./studentsSearchBar";

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
    const prevPage = useRef(page);
    const [deleted, setDeleted] = useState(false);
    const [deleteing, setDeleteing] = useState(false);

    const fetchStudents = async (query: Query) => {
        setLoading(true);
        try {
            const res: studentResponse = await Axios.get('/students', {
                params: query,
                paramsSerializer: (params) => qs.stringify(params)
            });
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
        fetchStudents({ ...filters, ...dSearch, ...(prevPage.current !== page && { page }) });
        prevPage.current = page;
    }, [dSearch, page, reload]);

    useEffect(() => {
        if (open) {
            setFilters({ ...filters, batch_id: open });
            fetchStudents({ ...filters, batch_id: open });
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
                        <StudentsSearchBar {...{ search, setSearch, filters, setFilters, loading, fetchStudents }} />
                        <div className="overflow-y-scroll max-h-80 scrollbar-none">
                            <StudentsTable students={students} loading={loading} limit={filters.limit}
                                onDelete={() => fetchStudents({ ...filters, ...dSearch, page: page })} modButton={RemoveButton} />
                        </div>
                        <Pagination {...{ page, setPage, pageCount, loading, prevPage: prevPage.current }} />
                    </div>
                </div>
            </div >
        </Portal>
    );
}
