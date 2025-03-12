/*
  Warnings:

  - You are about to drop the column `competences` on the `stage` table. All the data in the column will be lost.
  - You are about to drop the column `entrepriseId` on the `stage` table. All the data in the column will be lost.
  - You are about to drop the column `remuneration` on the `stage` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateurId` on the `stage` table. All the data in the column will be lost.
  - Added the required column `entreprise` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `utilisateur` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stage` DROP FOREIGN KEY `Stage_entrepriseId_fkey`;

-- DropForeignKey
ALTER TABLE `stage` DROP FOREIGN KEY `Stage_utilisateurId_fkey`;

-- DropIndex
DROP INDEX `Stage_entrepriseId_fkey` ON `stage`;

-- DropIndex
DROP INDEX `Stage_utilisateurId_fkey` ON `stage`;

-- AlterTable
ALTER TABLE `stage` DROP COLUMN `competences`,
    DROP COLUMN `entrepriseId`,
    DROP COLUMN `remuneration`,
    DROP COLUMN `utilisateurId`,
    ADD COLUMN `entreprise` VARCHAR(191) NOT NULL,
    ADD COLUMN `utilisateur` VARCHAR(191) NOT NULL;
