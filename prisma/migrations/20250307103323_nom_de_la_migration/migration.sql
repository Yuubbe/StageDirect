/*
  Warnings:

  - You are about to drop the `kanban` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `kanban` DROP FOREIGN KEY `Kanban_userId_fkey`;

-- DropTable
DROP TABLE `kanban`;
