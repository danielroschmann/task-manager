import prisma from "../config/prisma.js";

export async function createCalendar(name: string) {
  return await prisma.calender.create({
    data: {
      name
    }
  });
}

export async function getCalendar(id: number) {
  return await prisma.calender.findUniqueOrThrow({
    where: {
      id
    }
  });
}
