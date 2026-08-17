# Brain Agriculture

API para o desafio técnico de gerenciamento de produtores rurais.

## Funcionalidades

- CRUD de produtores rurais com validação de CPF e CNPJ;
- propriedades rurais vinculadas aos produtores;
- validação das áreas também garantida por constraint no PostgreSQL;
- culturas plantadas por propriedade e safra;
- dashboard com totais e agrupamentos por estado, cultura e uso do solo;
- paginação e pesquisa de produtores;
- logs estruturados com identificador e duração das requisições;
- testes unitários e funcionais.

A especificação completa dos contratos está em
[`backend/docs/openapi.yaml`](backend/docs/openapi.yaml).

## Endpoints principais

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/health` | Saúde da API e do banco |
| `GET/POST` | `/api/v1/producers` | Lista ou cadastra produtores |
| `GET/PATCH/DELETE` | `/api/v1/producers/:id` | Consulta, altera ou exclui produtor |
| `POST` | `/api/v1/producers/:producerId/farms` | Cadastra propriedade |
| `GET/PATCH/DELETE` | `/api/v1/farms/:id` | Gerencia propriedade |
| `POST` | `/api/v1/farms/:farmId/plantings` | Registra cultura e safra |
| `DELETE` | `/api/v1/plantings/:id` | Remove plantio |
| `GET` | `/api/v1/dashboard` | Retorna indicadores do dashboard |

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

Com a aplicação no Docker:

```bash
docker compose exec -e DB_DATABASE=brain_agriculture_test api npm test
docker compose exec api npm run typecheck
docker compose exec api npm run lint
```

Ou, com Node.js 24+ instalado, dentro de `backend`:

```bash
npm run typecheck
npm run lint
npm test
```
