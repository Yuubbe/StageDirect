-- AlterTable
ALTER TABLE `utilisateur` ADD COLUMN `verificationToken` VARCHAR(191) NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
