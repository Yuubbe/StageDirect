/*
  Warnings:

  - Added the required column `contactId` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entrepriseId` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stage` ADD COLUMN `contactId` INTEGER NOT NULL,
    ADD COLUMN `entrepriseId` INTEGER NOT NULL;
