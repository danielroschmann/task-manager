-- DropForeignKey
ALTER TABLE "Calender" DROP CONSTRAINT "Calender_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Calender" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calender" ADD CONSTRAINT "Calender_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
