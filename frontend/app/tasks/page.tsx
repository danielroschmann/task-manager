import CreateTaskForm from "../components/CreateTaskForm";
import TaskList from "../components/TaskList";

export default function Page() {
    return (
        <main>
            <h1>Create Task</h1>
            
            <CreateTaskForm />
            <TaskList />

        </main>
    )
}