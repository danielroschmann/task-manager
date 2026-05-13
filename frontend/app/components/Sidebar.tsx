'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", path: "/", icon: "📊" },
        { name: "Tasks", path: "/tasks", icon: "✓" },
        { name: "Electricity Prices", path: "/electricity-prices", icon: "⚡" }
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-green-700">Task Manager</h1>
            </div>

            <nav>
                <div className="mb-4 text-xs font-semibold text-gray-500 uppercase">Menu</div>
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    pathname === item.path
                                        ? "bg-green-50 text-green-700 font-medium"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
