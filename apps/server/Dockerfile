ARG APPNAME="${APPNAME}" \
  PORT="${PORT}" \
  NODE_ENV="prod" \
  LOCALE="true" \
  PRODUCTION_URL="${PRODUCTION_URL}" \
  SECRET="${SECRET}" \
  CLIENT_BASE_URL="${CLIENT_BASE_URL}" \
  DATABASE_HOST="${DATABASE_HOST}" \
  DATABASE_PORT="${DATABASE_PORT}" \
  DATABASE_USER="${DATABASE_USER}" \
  DATABASE_PASSWORD="${DATABASE_PASSWORD}" \
  DATABASE_NAME="${DATABASE_NAME}" \
  DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}"
  
FROM node:20.11-alpine AS turbo-builder

WORKDIR /var/www

RUN npm install -g turbo

COPY . .

RUN npm install
RUN turbo prune --scope=server --docker

FROM turbo-builder AS installer

RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /var/www

COPY --from=turbo-builder /var/www/out/json/ .
RUN npm install

COPY --from=turbo-builder /var/www/out/full/ .

RUN npm run build

FROM node:20.11-alpine AS production

WORKDIR /var/www

COPY --from=installer /var/www/apps/server/dist ./dist
COPY --from=installer /var/www/apps/server/src/db/drizzle/migrations ./dist/db/drizzle/migrations
COPY --from=installer /var/www/apps/server/src/db/drizzle/migrations/meta ./dist/db/drizzle/migrations/meta
COPY --from=installer /var/www/package-lock.json .
COPY apps/server/scripts/install-prod.sh ./scripts/install-prod.sh
COPY apps/server/package.json ./

RUN apk add --no-cache jq
# RUN sh ./scripts/install-prod.sh temporary
RUN npm install cookie-parser@^1.4.6 cors@^2.8.5 dotenv@^16.3.1 drizzle-orm@0.31.0 express@^4.21.2 morgan@^1.10.0 multer@^1.4.5-lts.1 pg@^8.12.0 postgres@^3.3.5 swagger-ui-express@^5.0.1 uuid@^10.0.0 winston@^3.10.0 zod@^3.22.2
# RUN npm install $(cat package.json | jq -r '.dependencies | to_entries | .[] | "\(.key)@\(.value)"')
RUN apk del jq

ENV APPNAME="${APPNAME}" \
  PORT="${PORT}" \
  NODE_ENV="${NODE_ENV}" \
  LOCALE="${LOCALE}" \
  PRODUCTION_URL="${PRODUCTION_URL}" \
  SECRET="${SECRET}" \
  CLIENT_BASE_URL="${CLIENT_BASE_URL}" \
  DATABASE_HOST="${DATABASE_HOST}" \
  DATABASE_PORT="${DATABASE_PORT}" \
  DATABASE_USER="${DATABASE_USER}" \
  DATABASE_PASSWORD="${DATABASE_PASSWORD}" \
  DATABASE_NAME="${DATABASE_NAME}" \
  DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}" 

EXPOSE ${PORT}
