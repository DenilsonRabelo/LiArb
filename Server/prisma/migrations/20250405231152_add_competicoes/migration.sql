-- CreateTable
CREATE TABLE "competicoes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "colocacao" TEXT,
    "anoDaColocacao" TIMESTAMP(3),
    "local" TEXT,
    "premio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competicoes_pkey" PRIMARY KEY ("id")
);
