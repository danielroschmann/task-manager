import prisma from "../config/prisma.js"

export async function getTasks() {
    return await prisma.task.findMany();
}

export function getTask(id : number) {
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
