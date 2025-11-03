import FloatingInput from "@/components/ui/form/input/floatingInput";
import FloatingSelect from "@/components/ui/form/input/floatingSelect";
import { Search, Filter, Query } from "@/lib/definitions";

type StudentsSearchBarProps = {
    search: Search;
    setSearch: React.Dispatch<React.SetStateAction<Search>>;
    filters: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
    loading?: boolean;
    fetchStudents: (query: Query) => Promise<void>;
};

const StudentsSearchBar = ({ search, setSearch, filters, setFilters, loading, fetchStudents }: StudentsSearchBarProps) => {
    return (
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
    );
}
export default StudentsSearchBar;