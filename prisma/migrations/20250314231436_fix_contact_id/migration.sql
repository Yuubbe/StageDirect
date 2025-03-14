-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `etablissement` VARCHAR(191) NOT NULL,
    `niveau` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('USER', 'PROFESSEUR', 'ADMIN', 'SUPERADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitulé` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entreprise` (
    `id_entreprise` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_entreprise` VARCHAR(50) NOT NULL,
    `rue_entreprise` VARCHAR(60) NULL,
    `cp_entreprise` VARCHAR(10) NULL,
    `ville_entreprise` VARCHAR(30) NOT NULL,
    `pays_entreprise` VARCHAR(30) NOT NULL DEFAULT 'France',
    `service_entreprise` VARCHAR(30) NULL,
    `tel_entreprise` VARCHAR(20) NULL,
    `fax_entreprise` VARCHAR(20) NULL,
    `email_entreprise` VARCHAR(50) NULL,
    `taille_entreprise` VARCHAR(7) NULL,
    `fk_id_activite` INTEGER NOT NULL,
    `fk_id_contact` INTEGER NULL,
    `valider` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `entreprise_fk_id_contact_key`(`fk_id_contact`),
    PRIMARY KEY (`id_entreprise`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secteur_activite` (
    `id_activite` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle_activite` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_activite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id_contact` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_contact` VARCHAR(191) NOT NULL,
    `tel_contact` VARCHAR(191) NULL,
    `email_contact` VARCHAR(191) NULL,

    PRIMARY KEY (`id_contact`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `entreprise` ADD CONSTRAINT `entreprise_fk_id_activite_fkey` FOREIGN KEY (`fk_id_activite`) REFERENCES `secteur_activite`(`id_activite`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entreprise` ADD CONSTRAINT `entreprise_fk_id_contact_fkey` FOREIGN KEY (`fk_id_contact`) REFERENCES `Contact`(`id_contact`) ON DELETE SET NULL ON UPDATE CASCADE;
