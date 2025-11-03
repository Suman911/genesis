'use client';

type PaginationProps = {
    page: number;
    setPage: (p: number) => void;
    prevPage: number;
    pageCount: number;
    loading?: boolean;
};

const Pagination =({ page, setPage, prevPage, pageCount, loading }: PaginationProps)=> {

    if (pageCount <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-6 py-2">
            <button
                className="px-4 py-2 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={page === 1 || loading}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>
            <span className="flex items-center gap-2 text-sm text-gray-700">
                <input
                    id="page"
                    name="page"
                    className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    type="number"
                    disabled={loading}
                    min={1}
                    max={pageCount}
                    placeholder={prevPage.toString() || '1'}
                    onFocus={(e) => (e.target.value = "")}
                    onBlur={(e) => {
                        let val = e.target.value ? Number(e.target.value) : page;
                        val = val > pageCount ? pageCount : val < 1 ? 1 : val;
                        e.target.value = '';
                        if (val !== page) setPage(val);
                    }}
                />
                <span className="text-gray-500">of {pageCount}</span>
            </span>
            <button
                className="px-4 py-2 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={page === pageCount || loading}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>
        </div>
    );
}
export default Pagination;