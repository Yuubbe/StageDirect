/*
  Warnings:

  - The primary key for the `entreprise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[contact_email]` on the table `Entreprise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adresse` to the `Entreprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code_postal` to the `Entreprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_email` to the `Entreprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_nom` to the `Entreprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_telephone` to the `Entreprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secteur` to the `Entreprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Entreprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ville` to the `Entreprise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stage` DROP FOREIGN KEY `Stage_entrepriseId_fkey`;

-- DropIndex
DROP INDEX `Stage_entrepriseId_fkey` ON `stage`;

-- AlterTable
ALTER TABLE `entreprise` DROP PRIMARY KEY,
    ADD COLUMN `adresse` VARCHAR(191) NOT NULL,
    ADD COLUMN `code_postal` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact_email` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact_nom` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact_telephone` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `secteur` VARCHAR(191) NOT NULL,
    ADD COLUMN `siret` VARCHAR(191) NULL,
    ADD COLUMN `site_web` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `ville` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Entreprise_contact_email_key` ON `Entreprise`(`contact_email`);
