import { useRouter } from "next/navigation";

export default async function TaskItem({task}: any) {
    async function toggleTask() {
        const router = useRouter();
        await fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: "PATCH"
        });
        router.refresh();
    }
    return (
        <li>
        <input 
            type="checkbox"
            checked={task.completed}
            onChange={toggleTask}    
        />
        
        {task.title}
        </li>
    )
}