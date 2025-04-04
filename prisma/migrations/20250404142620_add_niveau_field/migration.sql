-- AlterTable
ALTER TABLE `utilisateur` ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `niveau` VARCHAR(191) NULL,
    ADD COLUMN `verificationToken` VARCHAR(191) NULL;
