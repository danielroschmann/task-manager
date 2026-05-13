'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskItem({task}: any) {
    const router = useRouter();
    const [isToggling, setIsToggling] = useState(false);

    async function toggleTask() {
        setIsToggling(true);
        await fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: "PATCH"
        });
        router.refresh();
        setIsToggling(false);
    }

    async function removeTask() {
        await fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: "DELETE"
        });
        router.refresh();
    }

    return (
        <li className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
            <button
                onClick={toggleTask}
                disabled={isToggling}
                className={`relative w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                    task.completed
                        ? "bg-green-600 border-green-600"
                        : "border-gray-300 hover:border-green-500"
                } ${isToggling ? "opacity-50" : ""}`}
            >
                {task.completed && (
                    <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M5 13l4 4L19 7"></path>
                    </svg>
                )}
            </button>

            <div className="flex-1">
                <div className={`font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {task.title}
                </div>
                {task.description && (
                    <div className={`text-sm mt-1 ${task.completed ? "line-through text-gray-300" : "text-gray-600"}`}>
                        {task.description}
                    </div>
                )}
            </div>

            <button
                onClick={removeTask}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete task"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
        </li>
    );
}