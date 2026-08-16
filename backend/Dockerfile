FROM node:24-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]

FROM development AS build

RUN npm run build

FROM node:24-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/build ./
RUN npm ci --omit=dev && npm cache clean --force

EXPOSE 3333

CMD ["node", "bin/server.js"]
