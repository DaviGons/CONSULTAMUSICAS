-- CreateTable
CREATE TABLE "Musica" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nome_da_banda" TEXT NOT NULL,
    "produtora" TEXT,

    CONSTRAINT "Musica_pkey" PRIMARY KEY ("id")
);
