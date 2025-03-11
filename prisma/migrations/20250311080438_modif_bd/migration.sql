/*
  Warnings:

  - The values [SUPERADMIN,PROFESSEUR,ETUDIANT] on the enum `Utilisateur_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `utilisateur` ADD COLUMN `avatar` VARCHAR(191) NULL,
    MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
