/*
  Warnings:

  - You are about to drop the column `rssUrl` on the `Podcast` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[listenNotesId]` on the table `Podcast` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `listenNotesId` to the `Podcast` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Podcast_rssUrl_key";

-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "rssUrl",
ADD COLUMN     "listenNotesId" TEXT NOT NULL,
ADD COLUMN     "publisher" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_listenNotesId_key" ON "Podcast"("listenNotesId");
