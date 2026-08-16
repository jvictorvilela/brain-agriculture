# Brain Agriculture

API para o desafio técnico de gerenciamento de produtores rurais.

## Ambiente de desenvolvimento com Docker

### Requisitos

- Docker com Docker Compose

### Iniciar a aplicação

Na raiz do projeto, execute:

```bash
docker compose up --build
```

O comando inicia:

- API AdonisJS em `http://localhost:3333`;
- PostgreSQL em `localhost:5432`;
- migrations pendentes antes da inicialização da API;
- hot reload para alterações feitas no diretório `backend`.

Para iniciar em segundo plano:

```bash
docker compose up --build -d
```

Para acompanhar os logs da API:

```bash
docker compose logs -f api
```

Para encerrar os containers sem apagar os dados:

```bash
docker compose down
```

O banco é mantido no volume Docker `postgres_data`. Para reiniciar o ambiente
com um banco vazio, remova o volume explicitamente:

```bash
docker compose down --volumes
```

> As credenciais e a chave presentes no Compose são exclusivas para o ambiente
> local e devem ser substituídas em uma implantação real.

## Desenvolvimento sem o container da API

Com Node.js 24 ou superior instalado, mantenha apenas o PostgreSQL no Docker:

```bash
docker compose up -d postgres
cd backend
npm install
node ace migration:run
npm run dev
```

As variáveis esperadas pela aplicação estão documentadas em
`backend/.env.example`.

## Verificações

Dentro de `backend`:

```bash
npm run typecheck
npm run lint
npm test
```
