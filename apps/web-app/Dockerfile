# 1. Pruner - Trích xuất packages cần thiết
FROM node:24-slim AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=web-app --docker

# 2. Deps - Cài đặt dependencies
FROM node:24-slim AS deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN --mount=type=cache,target=/root/.npm npm ci

# 3. Builder - Build ứng dụng
FROM node:24-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV PATH /app/node_modules/.bin:$PATH
# Copy code và node_modules
COPY --from=pruner /app/out/json/ .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
# Chạy lại lệnh này để npm thực hiện "re-link" các workspace con
RUN npm install
# Chạy build với cache để tăng tốc độ
RUN --mount=type=cache,target=/app/apps/web-app/.next/cache \
    npx turbo run build --filter=web-app

# 4. Runner
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Tạo user để bảo mật
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy kết quả từ standalone mode
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-app/.next/static ./apps/web-app/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-app/public ./apps/web-app/public
USER nextjs

EXPOSE 3000
ENV PORT=3000
CMD ["node", "apps/web-app/server.js"]