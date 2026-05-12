import prisma from "../config/prisma.js"

export async function getTasks() {
    return await prisma.task.findMany();
}

export async function getTask(id : number) {
    return prisma.task.findUniqueOrThrow({
        where: {
            id
        }
    });
}

export async function createTask(title: string, description: string) {
    return await prisma.task.create({
        data: {
            title,
            description
        }
    });
}

export async function toggleTask(id: number) {
    const task = await getTask(id);
    return prisma.task.update({
        where: {
            id,
        },
        data: {
            completed: !task.completed,
        },
    });
}

export async function removeTask(id: number) {
    return prisma.task.delete({
        where: {
            id,
        }
    });
}
