'use client';
import { useEffect, useState, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import Button from "@/components/ui/util/button";
import AddStudent from "@/components/student/addStudent";
import StudentsTable from "@/components/student/studentsTable";
import FloatingInput from "@/components/ui/form/input/floatingInput";
import FloatingSelect from "@/components/ui/form/input/floatingSelect";
import Axios from "@/utils/Axios";
import qs from "qs";
import { Student, Search, Filter, Query, Course, OrderMapKeys } from "@/lib/definitions";
import { FaSpinner, FaSortAlphaDown, FaSortAlphaUpAlt, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { IoCloseCircleOutline, IoArrowDown, IoArrowUp } from "react-icons/io5";
import clsx from "clsx";
import ErrorAlert from "@/components/ui/util/errorAlert";

type studentResponse = {
    students: Student[];
    total: number;
};

type OrderByVM = {
    checked: boolean;
    value: OrderMapKeys;
    label: string;
    asc: 1 | 0;
    num: boolean;
};

const initialOrder: OrderByVM[] = [
    { checked: false, value: 'admission', label: 'Admission', asc: 1, num: false },
    { checked: false, value: 'name', label: 'Name', asc: 1, num: false },
    { checked: false, value: 'college', label: 'College', asc: 1, num: false },
    { checked: false, value: 'subject', label: 'Subject', asc: 1, num: false },
    { checked: false, value: 'passout', label: 'Passout Year', asc: 1, num: true },
    { checked: false, value: 'active', label: 'Active', asc: 1, num: true }
];

export default function StudentPage() {
    const [showModal, setShowModal] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filter>({ order_by: [], limit: 10 });
    const [courses, setCourses] = useState<Course[]>([]);
    const [sortOpen, setSortOpen] = useState(false);
    const [orderBy, setOrderBy] = useState<OrderByVM[]>(initialOrder);
    const [search, setSearch] = useState<Search>({});
    const dSearch = useDebounce(search, 1000);
    const pageCount = Math.ceil(total / (filters.limit || 10));
    const [page, setPage] = useState<number>(1);
    const prevPage = useRef<number | undefined>(page);
    const [error, setError] = useState("");

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
        const fetchCourses = async () => {
            try {
                const res: Course[] = await Axios.get('/courses/names');
                setCourses(res);
            } catch (error) {
                setError(`Failed to fetch courses: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
        fetchCourses();
    }, []);

    useEffect(() => {
        if (prevPage.current !== page) {
            fetchStudents({ ...filters, ...dSearch, page: page });
            prevPage.current = page;
            return;
        }
        fetchStudents({ ...filters, ...dSearch });
    }, [dSearch, page]);

    return (
        <>
            <ErrorAlert message={error} onClose={() => setError("")} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Students</h1>
                    <div className="flex gap-4">
                        <Button size="lg" color="info" onClick={() => setShowModal(true)}>
                            + New Student
                        </Button>
                    </div>
                </div>

                <AddStudent courses={courses} open={showModal}
                    onSave={() => {
                        setShowModal(false);
                        fetchStudents({ ...filters, ...dSearch, page: page });
                    }}
                    onClose={() => {
                        setShowModal(false);
                    }} />

                {/* filter options */}
                <div className="bg-white rounded select-none">
                    <div className="bg-neutral-200 p-4 m-4 rounded [&>*:not(:last-child)]:mb-2">
                        <h3>Filters</h3>
                        <div className="flex gap-4 rounded">
                            <div className="flex gap-4 items-center bg-white p-2 rounded">
                                <FloatingSelect
                                    name="course"
                                    label="Course"
                                    value={filters.course_id ?? ''}
                                    onChange={(e) =>
                                        setFilters(f => ({
                                            ...f, batch_id: undefined,
                                            course_id: e.target.value ? Number(e.target.value) : undefined
                                        }))
                                    }
                                >
                                    <option value="">All Courses</option>
                                    {courses.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </FloatingSelect>
                                {filters.course_id && (
                                    <FloatingSelect
                                        name="batch"
                                        label="Batch"
                                        value={filters.batch_id ?? ''}
                                        onChange={(e) =>
                                            setFilters(f => ({
                                                ...f,
                                                batch_id: e.target.value ? Number(e.target.value) : undefined
                                            }))
                                        }
                                    >
                                        <option value="">All Batches</option>
                                        {courses.find(c => c.id === filters.course_id)
                                            ?.batches.map(b => (
                                                <option key={b.id} value={b.id}>{b.name}</option>
                                            ))}
                                    </FloatingSelect>
                                )}
                            </div>
                            <div className="flex gap-4 items-center bg-white p-2 rounded">
                                <FloatingSelect
                                    name="Status"
                                    label="Status"
                                    value={filters.status ?? ''}
                                    onChange={(e) => {
                                        const statusValue = e.target.value as 'Active' | 'Completed' | 'Dropped' | '';
                                        setFilters(f => ({
                                            ...f,
                                            status: statusValue === '' ? undefined : statusValue
                                        }));
                                    }}
                                >
                                    <option value="">All</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Dropped">Dropped</option>
                                </FloatingSelect>
                                {filters.status == 'Completed' && <>
                                    <span>Pass out year</span>
                                    <FloatingInput
                                        type="number"
                                        name="from"
                                        label="from"
                                        value={filters.passout?.from ?? ''}
                                        onChange={(e) => setFilters(f => ({
                                            ...f,
                                            passout: { ...f.passout, from: e.target.value ? Number(e.target.value) : undefined }
                                        }))}
                                        className="w-20"
                                    />
                                    <FloatingInput
                                        type="number"
                                        name="to"
                                        label="to"
                                        value={filters.passout?.to ?? ''}
                                        onChange={(e) => setFilters(f => ({
                                            ...f,
                                            passout: { ...f.passout, to: e.target.value ? Number(e.target.value) : undefined }
                                        }))}
                                        className="w-20"
                                    />
                                </>}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="relative flex gap-2 items-center">
                                <Button className="px-4 py-2"
                                    onClick={() => setSortOpen(o => !o)}
                                >
                                    Order By <TbArrowsSort />
                                </Button>
                                {filters.order_by && filters.order_by.length > 0 &&
                                    <span className="flex gap-1 text-sm text-ash bg-white p-1.5 rounded-full max-w-150  overflow-x-scroll scrollbar-none">
                                        {filters.order_by.map((order, index) => (
                                            <span key={index} className="flex items-center gap-1 bg-info/20 text-info px-2 py-1 rounded-full">
                                                {order[0].charAt(0).toUpperCase() + order[0].slice(1)}
                                                {order[1] ? <IoArrowDown /> : <IoArrowUp />}
                                                <IoCloseCircleOutline className="cursor-pointer text-danger"
                                                    size={16}
                                                    onClick={() => {
                                                        setFilters(f => ({
                                                            ...f,
                                                            order_by: f.order_by?.filter(o => o[0] !== order[0])
                                                        }));
                                                        setOrderBy(ob => ob.map(o => o.value === order[0] ? { ...o, checked: false } : o));
                                                    }} />
                                            </span>
                                        ))}
                                    </span>
                                }
                                {sortOpen &&
                                    <div className="absolute top-full left-0 mt-2 p-4 rounded-xl bg-primary-fade z-5">
                                        <IoCloseCircleOutline className="absolute -top-2 -right-2 text-danger bg-white rounded-full" size={24}
                                            onClick={() => setSortOpen(false)} />
                                        {orderBy.map((order, index) => (
                                            <div key={index} className="flex items-center justify-between gap-2 mb-2 w-40">
                                                <div className="flex items-center gap-2 cursor-pointer"
                                                    onClick={() => {
                                                        const checked = order.checked;
                                                        setOrderBy(ob =>
                                                            ob.map((item, i) =>
                                                                i === index ? { ...item, checked: !item.checked } : item
                                                            )
                                                        );
                                                        setFilters(f => ({
                                                            ...f,
                                                            order_by: checked
                                                                ? f.order_by?.filter(o => o[0] !== order.value)
                                                                : [...f.order_by, [order.value, order.asc]]
                                                        }))
                                                    }}
                                                >
                                                    <div className={clsx(
                                                        "w-5 h-5 rounded border-2 flex items-center justify-center",
                                                        order.checked ? "bg-info border-info" : "bg-white border-gray-400",
                                                        "peer-focus:ring-2 peer-focus:ring-info"
                                                    )}>
                                                        {order.checked && (
                                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className="text-sm">{order.label}</span>
                                                </div>
                                                <button className={clsx("p-1  rounded-lg",
                                                    order.asc ? "bg-info/20 text-info" : "bg-info/70 text-white",
                                                )}
                                                    onClick={() => {
                                                        const asc = order.asc ? 0 : 1;
                                                        setOrderBy(ob =>
                                                            ob.map((item, i) =>
                                                                i === index ? { ...item, asc } : item
                                                            )
                                                        );
                                                        setFilters(f => ({
                                                            ...f,
                                                            order_by: f.order_by?.map(o =>
                                                                o[0] === order.value ? [o[0], asc] : o
                                                            ) || [[order.value, asc]]
                                                        }));
                                                    }}
                                                >
                                                    {order.num ? (order.asc ? <FaSortNumericDown /> : <FaSortNumericUp />) : (order.asc ? <FaSortAlphaDown /> : <FaSortAlphaUpAlt />)}
                                                </button>
                                            </div>
                                        ))}
                                    </div>}
                            </div>
                            <div className="flex gap-4">
                                <Button color="warning" outlined
                                    disabled={loading}
                                    onClick={() => {
                                        const resetFilters: Filter = {
                                            ...filters, status: undefined, batch_id: undefined, passout: undefined, order_by: [],
                                        };
                                        setSortOpen(false);
                                        setOrderBy(initialOrder);
                                        setFilters(resetFilters);
                                        fetchStudents({ ...resetFilters, ...dSearch });
                                    }}>
                                    Reset Filters
                                </Button>
                                <Button color="success" outlined
                                    disabled={loading}
                                    onClick={() => {
                                        setSortOpen(false);
                                        fetchStudents({ ...filters, ...dSearch });
                                    }}>
                                    {loading
                                        ? <><FaSpinner className="animate-spin" /> Loading</>
                                        : 'Apply'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg">
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
                            onDelete={() => fetchStudents({ ...filters, ...dSearch, page: page })} />
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
            </div >
        </>
    );
}
