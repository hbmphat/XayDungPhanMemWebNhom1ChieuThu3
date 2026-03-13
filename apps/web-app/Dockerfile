# 1. Pruner
FROM node:24-slim AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=web-app --docker

# 2. Deps
FROM node:24-slim AS deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN --mount=type=cache,target=/root/.npm npm ci

# 3. Builder
FROM node:24-slim AS builder
WORKDIR /app
COPY --from=pruner /app/out/full/ .
COPY --from=deps /app/node_modules ./node_modules
WORKDIR /app/apps/web-app
ENV NEXT_TELEMETRY_DISABLED=1
RUN --mount=type=cache,target=/app/apps/web-app/.next/cache \
    --mount=type=cache,target=/root/.turbo \
    npx turbo run build --filter=web-app

# 4. Runner
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Tạo user để bảo mật
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/web-app/.next/standalone ./
COPY --from=builder /app/apps/web-app/public ./apps/web-app/public
COPY --from=builder /app/apps/web-app/.next/static ./apps/web-app/.next/static

EXPOSE 3000
CMD ["node", "apps/web-app/server.js"]