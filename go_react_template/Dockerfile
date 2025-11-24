# ステージ1: フロントエンドのビルド
FROM node:24.11.0-slim AS frontend-builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app/frontend

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY frontend/ ./
RUN pnpm build

# ステージ2: バックエンドのビルド
FROM golang:1.25 AS backend-builder

WORKDIR /app/backend

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ ./

RUN rm -rf ./cmd/server/dist
COPY --from=frontend-builder /app/frontend/dist ./cmd/server/dist

RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/server/main.go

# ステージ3: 実行環境
FROM alpine:latest

RUN apk --no-cache add ca-certificates && \
  apk upgrade

WORKDIR /app

COPY --from=backend-builder /app/server ./server

ENV ENV=production

EXPOSE 8080

CMD ["./server"]
