/*
  Warnings:

  - Added the required column `duree` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stage` ADD COLUMN `duree` INTEGER NOT NULL;
