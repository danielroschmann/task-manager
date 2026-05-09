'use client';
import { useState } from "react";

export default function CreateTaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log("Submitting...");


        await fetch(`http://localhost:5000/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description
            })
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Task name"
            />
            <input 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            />
            <button type="submit">Submit</button>
        </form>
    )
}