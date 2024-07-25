FROM node:18 AS base

# install pnpm and turbo
RUN npm i -g pnpm@9.0.3
RUN npm i -g turbo

######
# run turbo prune to produce a leaner workspace with only docs specific stuff.
FROM base AS builder

WORKDIR /app

COPY ../../ ./
RUN turbo prune --scope=web --docker

######
FROM base AS installer

WORKDIR /app

COPY ../../.gitignore .gitignore
COPY ../../turbo.json turbo.json
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm install

EXPOSE 3000:3000
CMD pnpm run dev --filter=web...