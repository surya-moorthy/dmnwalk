/*
  Warnings:

  - You are about to drop the column `completion_rate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `current_streak` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longest_streak` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `total_challenges_completed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `total_challenges_failed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `total_challenges_joined` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `total_points` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "completion_rate",
DROP COLUMN "current_streak",
DROP COLUMN "longest_streak",
DROP COLUMN "total_challenges_completed",
DROP COLUMN "total_challenges_failed",
DROP COLUMN "total_challenges_joined",
DROP COLUMN "total_points",
ADD COLUMN     "userStatsId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;
