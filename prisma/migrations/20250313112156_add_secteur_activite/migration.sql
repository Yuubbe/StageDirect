/*
  Warnings:

  - You are about to alter the column `nom_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `rue_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - You are about to alter the column `cp_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `ville_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `pays_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `service_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `tel_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `fax_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `email_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `taille_entreprise` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(7)`.
  - You are about to drop the `secteuractivite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `entreprise` DROP FOREIGN KEY `entreprise_fk_id_activite_fkey`;

-- DropIndex
DROP INDEX `entreprise_fk_id_activite_fkey` ON `entreprise`;

-- AlterTable
ALTER TABLE `entreprise` MODIFY `nom_entreprise` VARCHAR(50) NOT NULL,
    MODIFY `rue_entreprise` VARCHAR(60) NULL,
    MODIFY `cp_entreprise` VARCHAR(10) NULL,
    MODIFY `ville_entreprise` VARCHAR(30) NOT NULL,
    MODIFY `pays_entreprise` VARCHAR(30) NULL DEFAULT 'France',
    MODIFY `service_entreprise` VARCHAR(30) NULL,
    MODIFY `tel_entreprise` VARCHAR(20) NULL,
    MODIFY `fax_entreprise` VARCHAR(20) NULL,
    MODIFY `email_entreprise` VARCHAR(50) NULL,
    MODIFY `taille_entreprise` VARCHAR(7) NULL,
    MODIFY `fk_id_activite` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `secteuractivite`;

-- CreateTable
CREATE TABLE `secteur_activite` (
    `id_activite` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle_activite` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_activite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `entreprise` ADD CONSTRAINT `entreprise_fk_id_activite_fkey` FOREIGN KEY (`fk_id_activite`) REFERENCES `secteur_activite`(`id_activite`) ON DELETE RESTRICT ON UPDATE CASCADE;
