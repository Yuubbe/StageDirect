/*
  Warnings:

  - A unique constraint covering the columns `[siret]` on the table `Entreprise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Entreprise_siret_key` ON `Entreprise`(`siret`);
