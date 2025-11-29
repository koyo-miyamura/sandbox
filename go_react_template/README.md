# Go + React ボイラーテンプレート

Go バックエンド + React フロントエンドのフルスタックアプリケーションテンプレート。
OpenAPI による API 定義駆動開発を採用しています。

## 概要

### バックエンド (Go)

- **言語**: Go 1.25
- **アーキテクチャ**: オニオンアーキテクチャ（クリーンアーキテクチャ）
- **HTTP サーバー**: 標準ライブラリ `net/http`（フレームワークレス）
- **主要機能**:
  - OpenAPI 仕様からコード自動生成
  - グレースフルシャットダウン
  - 本番環境での Basic 認証
  - 構造化ロギング（slog）

詳細は [backend/README.md](./backend/README.md) を参照してください。

### フロントエンド (React)

- **言語**: TypeScript
- **フレームワーク**: React 19
- **主要ライブラリ**:
  - React Router 7（ルーティング）
  - TanStack Query（サーバーステート管理）
  - Tailwind CSS 4 + daisyUI（スタイリング）
  - Vite（ビルドツール）
- **主要機能**:
  - OpenAPI から型定義と API クライアントを自動生成
  - MSW による API モック
  - 型安全な API 連携

詳細は [frontend/README.md](./frontend/README.md) を参照してください。

### OpenAPI による API 定義駆動開発

`openapi/openapi.yaml` で API 仕様を定義し、バックエンド・フロントエンドの両方でコードを自動生成します。

## プロジェクト構成

```
.
├── backend/                  # Go バックエンド
│   ├── cmd/server/           # エントリーポイント
│   ├── internal/             # アプリケーションコード
│   │   ├── domain/           # ドメイン層
│   │   ├── usecase/          # ユースケース層
│   │   ├── handler/          # ハンドラー層
│   │   └── infra/            # インフラ層
│   ├── pkg/                  # 公開パッケージ
│   └── tests/                # テスト
├── frontend/                 # React フロントエンド
│   ├── src/
│   │   ├── routes/           # ルート定義
│   │   ├── components/       # コンポーネント
│   │   ├── model/            # 自動生成された型定義
│   │   └── users/            # 自動生成された API クライアント
│   └── public/               # 静的ファイル
├── openapi/                  # OpenAPI 定義
│   ├── openapi.yaml          # API 仕様（マスター）
│   └── openapi.gen.yaml      # 生成された統合仕様
├── compose.yml               # Docker Compose 設定
├── Dockerfile                # 本番用 Dockerfile
└── Makefile                  # タスク定義
```

## 開発方法

### 前提条件

- Docker & Docker Compose
- Make

### セットアップ

#### **Docker for Windows, Docker for Mac**

```bash
make setup_with_user
```

このコマンドで以下が実行されます:

1. Docker ユーザー設定の生成（`.env`）とそれを使用する `compose.override.yml` をホームにコピー
2. フロントエンドの依存関係インストール

#### **Linux docker**

```bash
make setup_without_user
```

1. フロントエンドの依存関係インストール

#### 起動方法

- Docker Compose でバックエンド・フロントエンドを起動

起動後:

- フロントエンド: http://localhost:5173
- バックエンド: http://localhost:8080
- Swagger UI: http://localhost:8080/api/docs

### OpenAPI からコード生成

API 仕様を変更した後、以下のコマンドでコードを再生成します:

```bash
make generate_api_code
```

このコマンドで以下が実行されます:

1. OpenAPI 仕様をバンドル（`openapi.gen.yaml` 生成）
2. バックエンドのハンドラーインターフェース生成
3. フロントエンドの型定義と API クライアント生成

## ビルド方法

### Docker イメージのビルド

```bash
# 本番用イメージをビルド
make build_all
```

マルチステージビルドで以下を実行:

1. フロントエンドをビルド（`pnpm build`）
2. バックエンドにフロントエンド成果物を埋め込み
3. バックエンドをビルド（Go バイナリ生成）
4. Distroless イメージにバイナリをコピー

### ビルドしたイメージの実行

```bash
make run_image
```

http://localhost:8080 でアクセス可能（フロントエンドも含む）。

## 開発ワークフロー

1. **API 仕様の定義**: `openapi/openapi.yaml` を編集
2. **コード生成**: `make generate_api_code`
3. **バックエンド実装**: 生成されたインターフェースを実装
4. **フロントエンド実装**: 生成された API クライアントを使用
5. **動作確認**: `make run` で起動してテスト

## デプロイ

TBD
