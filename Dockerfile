FROM node:20 AS base


RUN apt-get update && apt-get install -y netcat-traditional

# install pnpm and turbo
RUN npm i -g pnpm@9.0.3
RUN npm i -g turbo

######
# run turbo prune to produce a leaner workspace with only docs specific stuff.
FROM base AS builder

WORKDIR /app

COPY . .
RUN turbo prune --scope=docs --docker

######
FROM base AS installer

WORKDIR /app

COPY .gitignore .gitignore
COPY turbo.json turbo.json
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm install

EXPOSE 3001:3001
CMD pnpm run dev --filter=docs...