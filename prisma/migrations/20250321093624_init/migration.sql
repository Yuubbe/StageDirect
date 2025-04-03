-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `entreprise`(`id_entreprise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id_contact`) ON DELETE RESTRICT ON UPDATE CASCADE;
