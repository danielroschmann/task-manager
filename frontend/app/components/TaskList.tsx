export default async function GetTasks() {
    const data = await fetch('http://localhost:5000/tasks');
    const tasks = await data.json();
    return (
        <ul>
            {tasks.map((task: any) => (
                <li key={task.id}>{task.title}{task.description}</li>
            ))}
        </ul>
    )
}