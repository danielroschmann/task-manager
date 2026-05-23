import prisma from "../config/prisma.js"

export async function createEvent(title: string, description: string, startDate: Date, endDate: Date, calenderId: number) {
  return await prisma.event.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      calenderId
    }
  });
}

export async function getEvent(id: number) {
  return await prisma.event.findUniqueOrThrow({
    where: {
      id
    }
  });
}

export async function getEventsFromCalendar(id:number) {
  return await prisma.event.findMany({
    where: {
      calenderId: id
    }
  });
}
