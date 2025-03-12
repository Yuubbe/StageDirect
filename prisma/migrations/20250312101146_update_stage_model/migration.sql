/*
  Warnings:

  - You are about to drop the column `createdAt` on the `stage` table. All the data in the column will be lost.
  - You are about to drop the column `duree` on the `stage` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `stage` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `utilisateur` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `utilisateur` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `utilisateur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `stage` DROP COLUMN `createdAt`,
    DROP COLUMN `duree`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `utilisateur` DROP COLUMN `avatar`,
    DROP COLUMN `verificationToken`,
    DROP COLUMN `verified`;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `Entreprise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
