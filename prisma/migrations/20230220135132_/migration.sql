/*
  Warnings:

  - You are about to drop the column `url` on the `Director` table. All the data in the column will be lost.
  - You are about to drop the column `seen` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the `_MovieToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[api_id]` on the table `Director` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `api_id` to the `Director` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MovieToUser" DROP CONSTRAINT "_MovieToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToUser" DROP CONSTRAINT "_MovieToUser_B_fkey";

-- DropIndex
DROP INDEX "Director_url_key";

-- DropIndex
DROP INDEX "Movie_url_key";

-- AlterTable
ALTER TABLE "Director" DROP COLUMN "url",
ADD COLUMN     "api_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "seen",
DROP COLUMN "url",
ADD COLUMN     "favourite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "toWatch" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_MovieToUser";

-- CreateIndex
CREATE UNIQUE INDEX "Director_api_id_key" ON "Director"("api_id");
