/*
  Warnings:

  - You are about to alter the column `valider` on the `entreprise` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - Made the column `rue_entreprise` on table `entreprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cp_entreprise` on table `entreprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pays_entreprise` on table `entreprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `service_entreprise` on table `entreprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel_entreprise` on table `entreprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email_entreprise` on table `entreprise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `taille_entreprise` on table `entreprise` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `entreprise` DROP FOREIGN KEY `entreprise_fk_id_activite_fkey`;

-- DropForeignKey
ALTER TABLE `entreprise` DROP FOREIGN KEY `entreprise_fk_id_contact_fkey`;

-- AlterTable
ALTER TABLE `entreprise` MODIFY `nom_entreprise` VARCHAR(191) NOT NULL,
    MODIFY `rue_entreprise` VARCHAR(191) NOT NULL,
    MODIFY `cp_entreprise` VARCHAR(191) NOT NULL,
    MODIFY `ville_entreprise` VARCHAR(191) NOT NULL,
    MODIFY `pays_entreprise` VARCHAR(191) NOT NULL,
    MODIFY `service_entreprise` VARCHAR(191) NOT NULL,
    MODIFY `tel_entreprise` VARCHAR(191) NOT NULL,
    MODIFY `fax_entreprise` VARCHAR(191) NULL,
    MODIFY `email_entreprise` VARCHAR(191) NOT NULL,
    MODIFY `taille_entreprise` VARCHAR(191) NOT NULL,
    ALTER COLUMN `fk_id_activite` DROP DEFAULT,
    MODIFY `valider` BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE `Entreprise` ADD CONSTRAINT `Entreprise_fk_id_activite_fkey` FOREIGN KEY (`fk_id_activite`) REFERENCES `Secteur_activite`(`id_activite`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entreprise` ADD CONSTRAINT `Entreprise_fk_id_contact_fkey` FOREIGN KEY (`fk_id_contact`) REFERENCES `Contact`(`id_contact`) ON DELETE SET NULL ON UPDATE CASCADE;
