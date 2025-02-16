/*
  Warnings:

  - You are about to drop the column `notes` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `refereePhone` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Referral` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refereeEmail]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Referral` DROP COLUMN `notes`,
    DROP COLUMN `refereePhone`,
    DROP COLUMN `source`;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_refereeEmail_key` ON `Referral`(`refereeEmail`);
