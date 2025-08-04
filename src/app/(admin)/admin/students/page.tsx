'use client';
import { useEffect, useState } from "react";
import Button from "@/components/ui/util/button";
import AddStudent from "@/components/student/addStudent";
import StudentsTable from "@/components/student/studentsTable";
import axios from "@/utils/Axios";
import qs from "qs";
import { Student, Filter, Batch } from "@/lib/definitions";

export default function StudentPage() {
    const [showModal, setShowModal] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    // const [sortOpen, setSortOpen] = useState(false);
    const [filters, setFilters] = useState<Filter>({});
    const [batches, setBatches] = useState<Batch[]>([]);
    const [passout, setPassOut] = useState(false);

    const fetchStudents = async (filters: Filter) => {
        setLoading(true);
        try {
            const query = qs.stringify(filters, { addQueryPrefix: true });
            console.log('Fetching students with query:', query);
            const res: Student[] = await axios.get(`/students${query}`);
            setStudents(res);
        } catch (error) {
            console.error('Failed to fetch students:', error);
        }
        setLoading(false);
    };

    const fetchbatches = async () => {
        try {
            const res: Batch[] = await axios.get('/batches/names');
            setBatches(res);
        } catch (error) {
            console.error('Failed to fetch batches:', error);
        }
    }

    useEffect(() => {
        fetchStudents({});
        fetchbatches();
    }, []);

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Students</h1>
                <div className="flex gap-4">
                    {/* <Button className="px-4 py-2" onClick={() => setSortOpen(true)}>
                        Filter
                    </Button> */}
                    <Button size="lg" color="info" onClick={() => setShowModal(true)}>
                        + New Student
                    </Button>
                </div>
            </div>

            <AddStudent batches={batches} open={showModal}
                onSave={() => {
                    setShowModal(false);
                    fetchStudents(filters);
                }}
                onClose={() => {
                    setShowModal(false);
                }} />

            {/* search options */}
            <div className="">
                <h3>Filters</h3>
                <div className="flex gap-4">
                    <select
                        value={filters.status ?? ''}
                        onChange={(e) => {
                            const statusValue = e.target.value as 'active' | 'completed' | 'inactive' | '';
                            setPassOut(statusValue == 'completed');
                            setFilters(f => ({
                                ...f,
                                status: statusValue === '' ? undefined : statusValue
                            }));
                        }}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select
                        value={filters.batch_id ?? ''}
                        onChange={(e) => setFilters(f => ({ ...f, batch_id: e.target.value ? Number(e.target.value) : undefined }))}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">All Batches</option>
                        {batches.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                        {passout && <>
                            <span>Pass out year</span>
                            <input
                                type="number"
                                placeholder="from"
                                value={filters.passout?.from ?? ''}
                                onChange={(e) => setFilters(f => ({
                                    ...f,
                                    passout: { ...f.passout, from: e.target.value ? Number(e.target.value) : undefined }
                                }))}
                                className="border rounded px-3 py-2"
                            />
                            <input
                                type="number"
                                placeholder="to"
                                value={filters.passout?.to ?? ''}
                                onChange={(e) => setFilters(f => ({
                                    ...f,
                                    passout: { ...f.passout, to: e.target.value ? Number(e.target.value) : undefined }
                                }))}
                                className="border rounded px-3 py-2"
                            />
                        </>}
                    </div>
                    <div className="flex gap-4">
                        <Button color="warning" outlined
                            onClick={() => {
                                const resetFilters: Filter = {
                                    ...filters, status: undefined, batch_id: undefined, passout: undefined,
                                };
                                setPassOut(false);
                                setFilters(resetFilters);
                                fetchStudents(resetFilters);
                            }}>
                            Reset Filters
                        </Button>
                        <Button color="success" outlined
                            onClick={() => {
                                fetchStudents(filters);
                            }}>
                            Apply
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg">
                <div className="flex gap-4 p-4 m-4 pb-0 mb-0 items-center justify-between rounded rounded-b-none bg-neutral-200">
                    <span>Search</span>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={filters.search ?? ''}
                        onChange={(e) => setFilters(f => ({ ...f, search: e.target.value || undefined }))}
                        className="border rounded px-2 py-1 bg-white"
                    />
                    <input
                        type="text"
                        placeholder="College"
                        value={filters.college ?? ''}
                        onChange={(e) => setFilters(f => ({ ...f, college: e.target.value || undefined }))}
                        className="border rounded px-2 py-1 bg-white"
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        value={filters.subject ?? ''}
                        onChange={(e) => setFilters(f => ({ ...f, subject: e.target.value || undefined }))}
                        className="border rounded px-2 py-1 bg-white"
                    />
                    <select
                        value={filters.count ?? 10}
                        onChange={(e) => setFilters(f => ({ ...f, count: e.target.value !== '10' ? Number(e.target.value) : undefined }))}
                        className="border rounded px-2 py-1 bg-white"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="bg-neutral-200 m-4 mt-0">
                    {loading ? (
                        <div className="p-4 text-gray-500">Loading...</div>
                    ) : students.length === 0 ? (
                        <div className="p-4 text-gray-500">No students found.</div>
                    ) : (
                        <StudentsTable className="" students={students} />
                    )}
                </div>
            </div>
        </div >
    );
}
