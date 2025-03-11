/*
  Warnings:

  - You are about to drop the column `avatar` on the `utilisateur` table. All the data in the column will be lost.
  - You are about to drop the `etudiant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `etablissement` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niveau` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stage` DROP FOREIGN KEY `Stage_utilisateurId_fkey`;

-- DropIndex
DROP INDEX `Stage_utilisateurId_fkey` ON `stage`;

-- AlterTable
ALTER TABLE `utilisateur` DROP COLUMN `avatar`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `etablissement` VARCHAR(191) NOT NULL,
    ADD COLUMN `niveau` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('SUPERADMIN', 'ADMIN', 'PROFESSEUR', 'ETUDIANT', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `etudiant`;
