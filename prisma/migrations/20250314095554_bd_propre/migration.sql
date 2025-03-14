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
  - You are about to alter the column `libelle_activite` on the `secteur_activite` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - A unique constraint covering the columns `[fk_id_contact]` on the table `entreprise` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `entreprise` DROP FOREIGN KEY `Entreprise_fk_id_activite_fkey`;

-- DropForeignKey
ALTER TABLE `entreprise` DROP FOREIGN KEY `Entreprise_fk_id_contact_fkey`;

-- AlterTable
ALTER TABLE `entreprise` MODIFY `nom_entreprise` VARCHAR(50) NOT NULL,
    MODIFY `rue_entreprise` VARCHAR(60) NULL,
    MODIFY `cp_entreprise` VARCHAR(10) NULL,
    MODIFY `ville_entreprise` VARCHAR(30) NOT NULL,
    MODIFY `pays_entreprise` VARCHAR(30) NOT NULL DEFAULT 'France',
    MODIFY `service_entreprise` VARCHAR(30) NULL,
    MODIFY `tel_entreprise` VARCHAR(20) NULL,
    MODIFY `fax_entreprise` VARCHAR(20) NULL,
    MODIFY `email_entreprise` VARCHAR(50) NULL,
    MODIFY `taille_entreprise` VARCHAR(7) NULL,
    MODIFY `valider` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `secteur_activite` MODIFY `libelle_activite` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `entreprise_fk_id_contact_key` ON `entreprise`(`fk_id_contact`);

-- AddForeignKey
ALTER TABLE `entreprise` ADD CONSTRAINT `entreprise_fk_id_activite_fkey` FOREIGN KEY (`fk_id_activite`) REFERENCES `secteur_activite`(`id_activite`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entreprise` ADD CONSTRAINT `entreprise_fk_id_contact_fkey` FOREIGN KEY (`fk_id_contact`) REFERENCES `Contact`(`id_contact`) ON DELETE SET NULL ON UPDATE CASCADE;
