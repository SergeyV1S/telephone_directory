FROM node:22.12.0-alpine AS base

RUN apk update && apk add --no-cache libc6-compat bash

FROM base AS turbo-setup
WORKDIR /app

RUN npm install -g turbo@^2

FROM turbo-setup AS builder
WORKDIR /app

COPY . .

RUN npm install
RUN turbo prune --scope=client --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ ./
RUN npm install

ARG BASE_API_URL
ENV BASE_API_URL=$BASE_API_URL

COPY --from=builder /app/out/full/ ./
RUN npm run build --prefix apps/client

FROM nginx:stable-alpine AS production
COPY --from=installer /app/apps/client/dist /usr/share/nginx/html
COPY --from=installer /app/apps/client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]