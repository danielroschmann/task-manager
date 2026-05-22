import TaskItem from "./TaskItem";

async function getTasks() {
    const apiUrl = 'http://backend:5000';
    const data = await fetch(`${apiUrl}/tasks`, {
        cache: 'no-store'
    });
    const tasks = await data.json();
    return tasks;
}

export default async function TaskList() {
    const tasks = await getTasks();

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No tasks yet. Create your first task!
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {tasks.map((task: any) => (
                <TaskItem
                    key={task.id}
                    task={task}
                />
            ))}
        </ul>
    );
}