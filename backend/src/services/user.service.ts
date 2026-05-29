import prisma from "../config/prisma.js";

export async function createUser(firstName: string, lastName: string, email: string, password: string) {
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password
    }
  });
}
