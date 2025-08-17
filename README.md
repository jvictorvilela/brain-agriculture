# Brain Agriculture

Aplicação fullstack desenvolvida para o teste técnico da Brain Agriculture. O projeto permite gerenciar produtores rurais, propriedades, safras e culturas, além de apresentar um dashboard com os dados cadastrados.

## Tecnologias

### Frontend

- React
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Emotion
- Recharts
- Jest e React Testing Library

### Backend

- Node.js
- TypeScript
- AdonisJS
- Lucid ORM
- VineJS
- Japa

### Infraestrutura

- PostgreSQL
- Docker
- Docker Compose

## Como executar

É necessário ter o Docker com Docker Compose instalado.

Na raiz do projeto, execute:

```bash
docker compose up --build
```

O comando inicia o frontend, a API e o PostgreSQL. As migrations são executadas automaticamente durante a inicialização da API.

Após a inicialização, os serviços estarão disponíveis em:

- Frontend: `http://localhost:5173`
- API: `http://localhost:3333`
- PostgreSQL: `localhost:5432`

Para encerrar a aplicação:

```bash
docker compose down
```

## Seeds

Com os containers em execução, use o comando abaixo para popular o banco com dados de demonstração:

```bash
docker compose exec api npm run seed
```

O seed pode ser executado novamente sem duplicar os dados.

## Endpoints

Todos os endpoints da aplicação utilizam o prefixo `/api/v1`, com exceção do health check.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/health` | Verifica a saúde da API e do banco |
| `GET` | `/api/v1/producers` | Lista e pesquisa produtores |
| `POST` | `/api/v1/producers` | Cadastra um produtor |
| `GET` | `/api/v1/producers/:id` | Retorna um produtor e suas propriedades |
| `PATCH` | `/api/v1/producers/:id` | Atualiza um produtor |
| `DELETE` | `/api/v1/producers/:id` | Exclui um produtor |
| `POST` | `/api/v1/producers/:producerId/farms` | Cadastra uma propriedade |
| `GET` | `/api/v1/farms/:id` | Retorna uma propriedade |
| `PATCH` | `/api/v1/farms/:id` | Atualiza uma propriedade |
| `DELETE` | `/api/v1/farms/:id` | Exclui uma propriedade |
| `POST` | `/api/v1/farms/:farmId/plantings` | Registra uma cultura em uma safra |
| `DELETE` | `/api/v1/plantings/:id` | Exclui o registro de uma cultura |
| `GET` | `/api/v1/catalogs/harvests` | Lista as safras cadastradas |
| `GET` | `/api/v1/catalogs/crops` | Lista as culturas cadastradas |
| `GET` | `/api/v1/dashboard` | Retorna os indicadores do dashboard |

A especificação completa da API está disponível em [`backend/docs/openapi.yaml`](backend/docs/openapi.yaml).
