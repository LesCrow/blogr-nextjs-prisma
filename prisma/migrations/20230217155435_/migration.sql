/*
  Warnings:

  - The primary key for the `Director` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Director` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Director" DROP CONSTRAINT "Director_pkey";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey";

-- AlterTable
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_pkey";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Director_id_key" ON "Director"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_id_key" ON "Movie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
