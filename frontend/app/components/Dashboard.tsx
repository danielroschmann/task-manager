'use client';

import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface Stats {
    total: number;
    completed: number;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, completed: 0 });
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [aiPrioritization, setAiPrioritization] = useState<string>('');
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const [tasksRes, statsRes] = await Promise.all([
                fetch(`${apiUrl}/tasks`, { cache: 'no-store' }),
                fetch(`${apiUrl}/tasks/stats`, { cache: 'no-store' })
            ]);

            const tasksData = await tasksRes.json();
            const statsData = await statsRes.json();

            setTasks(tasksData);
            setStats(statsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handlePrioritize() {
        setLoadingAI(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/tasks/prioritizetasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setAiPrioritization(data);
        } catch (error) {
            console.error('Error prioritizing tasks:', error);
        } finally {
            setLoadingAI(false);
        }
    }

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Total Tasks</h3>
                    <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Completed</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Remaining</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.total - stats.completed}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handlePrioritize}
                        disabled={loadingAI || stats.total === 0}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loadingAI ? 'Prioritizing...' : 'AI Prioritize'}
                    </button>
                </div>

                {aiPrioritization && (
                    <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h3 className="font-semibold text-purple-900 mb-2">AI Prioritization:</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{aiPrioritization}</p>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        {searchQuery ? 'No tasks found matching your search.' : 'No tasks yet. Create your first task!'}
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
