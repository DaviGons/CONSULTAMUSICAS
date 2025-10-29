# 🎵 Consulta de Músicas (Console App)

Um sistema simples de console para cadastrar, listar e deletar músicas, utilizando Node.js, TypeScript e Prisma para se conectar a um banco de dados PostgreSQL gerenciado pelo Docker.

---

## 🚀 Como Executar o Sistema

Siga estes passos na ordem correta para iniciar a aplicação.

**Pré-requisitos:**

- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [Docker](https://www.docker.com/products/docker-desktop/) (com Docker Compose)

### 1\. Instalar Dependências

No terminal, dentro da pasta do projeto, instale os pacotes do Node.js:

```bash
npm install
```

### 2\. Configurar Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto e cole o conteúdo abaixo nele. (Este passo é **obrigatório** para o Prisma se conectar ao banco).

```dotenv
DATABASE_URL="postgresql://admin:123456@localhost:5432/consultamusicas_db"
```

### 3\. Iniciar o Banco de Dados (Docker)

Com o Docker Desktop aberto, inicie o container do PostgreSQL em segundo plano:

```bash
docker-compose up -d
```

### 4\. Rodar a Migração (Criar Tabelas)

Este comando irá ler o `schema.prisma` e criar as tabelas necessárias no banco de dados Docker:

```bash
npx prisma migrate dev
```

_(Ele pode pedir um nome para a migração, apenas digite "init" e pressione Enter)._

### 5\. Executar a Aplicação

Finalmente, inicie o menu interativo:

```bash
npx ts-node index.ts
```

---

## 👥 Autores

- **Davi Gonçalves Silva** (RA 2505783)
- **Gustavo Zaia Pastro** (RA 2506964)
