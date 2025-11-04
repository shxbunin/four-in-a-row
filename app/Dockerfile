FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM alpine:3.19 AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist

CMD ["sh", "-c", "echo 'React build ready' && sleep infinity"]
