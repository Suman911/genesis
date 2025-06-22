export default function AdminPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
                <p className="text-gray-700 mb-4">
                    Welcome to the admin dashboard. Here you can manage users, view reports, and perform administrative tasks.
                </p>
                <p className="text-gray-500 text-sm">
                    This is a placeholder page. Actual admin functionalities will be implemented soon.
                </p>
            </div>
        </div>
    );
}