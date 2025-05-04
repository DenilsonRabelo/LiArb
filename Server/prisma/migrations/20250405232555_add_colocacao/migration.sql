/*
  Warnings:

  - You are about to drop the column `anoDaColocacao` on the `competicoes` table. All the data in the column will be lost.
  - You are about to drop the column `colocacao` on the `competicoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "competicoes" DROP COLUMN "anoDaColocacao",
DROP COLUMN "colocacao";

-- CreateTable
CREATE TABLE "colocacoes" (
    "id" SERIAL NOT NULL,
    "competicaoId" INTEGER NOT NULL,
    "posicao" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colocacoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "colocacoes" ADD CONSTRAINT "colocacoes_competicaoId_fkey" FOREIGN KEY ("competicaoId") REFERENCES "competicoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
