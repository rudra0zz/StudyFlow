-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_subjectId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
