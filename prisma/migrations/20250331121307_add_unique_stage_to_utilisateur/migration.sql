/*
  Warnings:

  - You are about to drop the column `niveau` on the `utilisateur` table. All the data in the column will be lost.
  - You are about to drop the `secteur_activite` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stageId]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `entreprise` DROP FOREIGN KEY `entreprise_fk_id_activite_fkey`;

-- DropForeignKey
ALTER TABLE `stage` DROP FOREIGN KEY `Stage_entrepriseId_fkey`;

-- DropIndex
DROP INDEX `entreprise_fk_id_activite_fkey` ON `entreprise`;

-- DropIndex
DROP INDEX `Stage_entrepriseId_fkey` ON `stage`;

-- AlterTable
ALTER TABLE `stage` MODIFY `entrepriseId` INTEGER NULL;

-- AlterTable
ALTER TABLE `utilisateur` DROP COLUMN `niveau`,
    ADD COLUMN `stageId` INTEGER NULL;

-- DropTable
DROP TABLE `secteur_activite`;

-- CreateTable
CREATE TABLE `SecteurActivite` (
    `id_activite` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle_activite` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_activite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Utilisateur_stageId_key` ON `Utilisateur`(`stageId`);

-- AddForeignKey
ALTER TABLE `Utilisateur` ADD CONSTRAINT `Utilisateur_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `entreprise`(`id_entreprise`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entreprise` ADD CONSTRAINT `entreprise_fk_id_activite_fkey` FOREIGN KEY (`fk_id_activite`) REFERENCES `SecteurActivite`(`id_activite`) ON DELETE RESTRICT ON UPDATE CASCADE;
