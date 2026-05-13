import CreateTaskForm from "../components/CreateTaskForm";
import TaskList from "../components/TaskList";

export default function TasksPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Tasks</h1>
            <p className="text-gray-600 mb-8">Manage your daily tasks</p>

            <div className="bg-white rounded-lg shadow p-6">
                <CreateTaskForm />
                <TaskList />
            </div>
        </div>
    );
}