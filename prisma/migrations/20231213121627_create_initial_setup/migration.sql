-- CreateTable
CREATE TABLE `communication` (
    `id` VARCHAR(36) NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `body` MEDIUMTEXT NOT NULL,
    `from` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'SCHEDULED',
    `provider` VARCHAR(191) NULL,
    `requestedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sendedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `detailId` VARCHAR(191) NULL,

    UNIQUE INDEX `communication_detailId_key`(`detailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail` (
    `id` VARCHAR(36) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `communication` ADD CONSTRAINT `communication_detailId_fkey` FOREIGN KEY (`detailId`) REFERENCES `detail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
