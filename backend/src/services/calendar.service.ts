import prisma from "../config/prisma.js";

export async function createCalendar(name: string, userId: number, isMain: boolean = false) {
  if (isMain) {
    await prisma.calender.updateMany({
      where: {
        userId
      },
      data: {
        isMain: false
      }
    });
  }

  return await prisma.calender.create({
    data: {
      name,
      userId,
      isMain
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

export async function getAllCalendars() {
  return await prisma.calender.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getMainCalendar() {
  return await prisma.calender.findFirst({
    where: {
      isMain: true
    }
  });
}

export async function setMainCalendar(id: number) {
  await prisma.calender.updateMany({
    data: {
      isMain: false
    }
  });

  return await prisma.calender.update({
    where: {
      id
    },
    data: {
      isMain: true
    }
  });
}
