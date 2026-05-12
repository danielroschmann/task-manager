export async function prioritizeTasks(tasks: string[]) {
    const prompt = `Prioritize these tasks from the most important to the least important:
    
    ${tasks.join("\n")}`;

    const response = await fetch ("http://localhost:11434/api/generate", 
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "llama3",
            prompt,
            stream: false
        }),
        }
    );
    const data = await response.json();
    return data.response;
}
    
