import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminNav() {
    return (
        <nav className="bg-white shadow-md h-screen sticky top-0 flex flex-col w-full">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaRegUserCircle className="text-primary" size={24} />
                    Admin Panel
                </h1>
            </div>
            <ul className="flex-1 p-4 space-y-2 text-gray-700">
                <li>
                    <Link href="/admin/" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition">
                        <FiHome size={18} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/users/" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition">
                        <FiUsers size={18} />
                        <span>Users</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/settings/" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition">
                        <FiSettings size={18} />
                        <span>Settings</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
