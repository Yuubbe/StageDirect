/*
  Warnings:

  - You are about to drop the column `createdAt` on the `entreprise` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `entreprise` table. All the data in the column will be lost.
  - Made the column `siret` on table `entreprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `site_web` on table `entreprise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `entreprise` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `siret` VARCHAR(191) NOT NULL,
    MODIFY `site_web` VARCHAR(191) NOT NULL;
