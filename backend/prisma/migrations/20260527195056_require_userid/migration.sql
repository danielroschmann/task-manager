/*
  Warnings:

  - Made the column `userId` on table `Calender` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Calender" DROP CONSTRAINT "Calender_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Calender" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calender" ADD CONSTRAINT "Calender_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
