/*
  Warnings:

  - You are about to drop the column `steps_count` on the `DailyProgress` table. All the data in the column will be lost.
  - You are about to drop the column `notificationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `dailyReminders` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `emailNotifications` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `notifications` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `privacySettings` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `pushNotifications` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserPreferences` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invitation_code]` on the table `ChallengeGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal_unit` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stake_amount` to the `ChallengeParticipant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage_of_pool` to the `ChallengeReward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ChallengeReward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `DailyProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `DailyProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `DailyProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance_after` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance_before` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UserPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChallengeGroup" DROP CONSTRAINT "ChallengeGroup_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeReward" DROP CONSTRAINT "ChallengeReward_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_userId_fkey";

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "point_value" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "escrow_address" TEXT,
ADD COLUMN     "frequency" TEXT NOT NULL DEFAULT 'daily',
ADD COLUMN     "goal_unit" TEXT NOT NULL,
ADD COLUMN     "reward_distribution_type" TEXT NOT NULL DEFAULT 'proportional',
ADD COLUMN     "total_pool" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ChallengeGroup" ADD COLUMN     "invitation_code" TEXT;

-- AlterTable
ALTER TABLE "ChallengeParticipant" ADD COLUMN     "current_progress" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "current_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "last_activity_at" TIMESTAMP(3),
ADD COLUMN     "longest_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stake_amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "total_points" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ChallengeReward" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "percentage_of_pool" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DailyProgress" DROP COLUMN "steps_count",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "verification_method" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "action_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'normal';

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "balance_after" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "balance_before" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fee" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "payment_method_id" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "notificationId",
ADD COLUMN     "completion_rate" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "longest_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_challenges_completed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_challenges_failed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_challenges_joined" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_points" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserHealthConnection" ADD COLUMN     "last_sync_at" TIMESTAMP(3),
ADD COLUMN     "sync_frequency" TEXT NOT NULL DEFAULT 'daily';

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "createdAt",
DROP COLUMN "dailyReminders",
DROP COLUMN "emailNotifications",
DROP COLUMN "notifications",
DROP COLUMN "privacySettings",
DROP COLUMN "pushNotifications",
DROP COLUMN "updatedAt",
ADD COLUMN     "activity_sharing" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "challenge_updates" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "daily_reminders" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "default_payment_method" TEXT,
ADD COLUMN     "default_withdrawal_method" TEXT,
ADD COLUMN     "email_notifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "friend_activity" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profile_visibility" TEXT NOT NULL DEFAULT 'friends',
ADD COLUMN     "push_notifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "reward_notifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "show_on_leaderboards" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserWallet" ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
ALTER COLUMN "is_primary" SET DEFAULT false;

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "user_wallet_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "account_identifier" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthData" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "connection_id" INTEGER NOT NULL,
    "data_type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "icon_url" TEXT,
    "point_value" INTEGER NOT NULL DEFAULT 100,
    "requirements" JSONB NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "earned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" SERIAL NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "progress" DOUBLE PRECISION NOT NULL,
    "streak_days" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolanaAccount" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "public_key" TEXT NOT NULL,
    "encrypted_private_key" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SolanaAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolanaTransaction" (
    "id" SERIAL NOT NULL,
    "signature" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "fee" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "block_time" TIMESTAMP(3),
    "related_challenge_id" INTEGER,
    "related_user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SolanaTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialActivity" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "activity_type" TEXT NOT NULL,
    "content" TEXT,
    "related_entity_type" TEXT,
    "related_entity_id" INTEGER,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStats" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "total_steps" INTEGER NOT NULL DEFAULT 0,
    "challenges_completed" INTEGER NOT NULL DEFAULT 0,
    "challenges_failed" INTEGER NOT NULL DEFAULT 0,
    "total_earned" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_staked" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "average_completion" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "total_badges" INTEGER NOT NULL DEFAULT 0,
    "total_points" INTEGER NOT NULL DEFAULT 0,
    "last_active" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HealthData_user_id_data_type_date_idx" ON "HealthData"("user_id", "data_type", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_name_key" ON "Badge"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserBadge_user_id_badge_id_key" ON "UserBadge"("user_id", "badge_id");

-- CreateIndex
CREATE INDEX "LeaderboardEntry_challenge_id_rank_idx" ON "LeaderboardEntry"("challenge_id", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_challenge_id_user_id_key" ON "LeaderboardEntry"("challenge_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SolanaAccount_user_id_key" ON "SolanaAccount"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SolanaAccount_public_key_key" ON "SolanaAccount"("public_key");

-- CreateIndex
CREATE INDEX "SolanaAccount_public_key_idx" ON "SolanaAccount"("public_key");

-- CreateIndex
CREATE UNIQUE INDEX "SolanaTransaction_signature_key" ON "SolanaTransaction"("signature");

-- CreateIndex
CREATE INDEX "SolanaTransaction_sender_idx" ON "SolanaTransaction"("sender");

-- CreateIndex
CREATE INDEX "SolanaTransaction_recipient_idx" ON "SolanaTransaction"("recipient");

-- CreateIndex
CREATE INDEX "SolanaTransaction_related_challenge_id_idx" ON "SolanaTransaction"("related_challenge_id");

-- CreateIndex
CREATE INDEX "SocialActivity_user_id_created_at_idx" ON "SocialActivity"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "Comment_activity_id_idx" ON "Comment"("activity_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_activity_id_user_id_key" ON "Like"("activity_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_user_id_key" ON "UserStats"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SystemSetting_key_key" ON "SystemSetting"("key");

-- CreateIndex
CREATE INDEX "Challenge_status_start_date_end_date_idx" ON "Challenge"("status", "start_date", "end_date");

-- CreateIndex
CREATE INDEX "Challenge_is_public_status_idx" ON "Challenge"("is_public", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeGroup_invitation_code_key" ON "ChallengeGroup"("invitation_code");

-- CreateIndex
CREATE INDEX "Notification_user_id_is_read_idx" ON "Notification"("user_id", "is_read");

-- CreateIndex
CREATE INDEX "Notification_user_id_type_idx" ON "Notification"("user_id", "type");

-- CreateIndex
CREATE INDEX "Transaction_user_id_transaction_type_idx" ON "Transaction"("user_id", "transaction_type");

-- CreateIndex
CREATE INDEX "Transaction_challenge_id_idx" ON "Transaction"("challenge_id");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_user_wallet_id_fkey" FOREIGN KEY ("user_wallet_id") REFERENCES "UserWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthData" ADD CONSTRAINT "HealthData_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "UserHealthConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeReward" ADD CONSTRAINT "ChallengeReward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeGroup" ADD CONSTRAINT "ChallengeGroup_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "SocialActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "SocialActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
