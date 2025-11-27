# Backend

Go で実装したバックエンド API サーバーのボイラーテンプレート。

## アーキテクチャ

オニオンアーキテクチャ（クリーンアーキテクチャ）を採用し、依存関係の方向を制御しています。

```
internal/
├── domain/          # ドメイン層
│   ├── user.go                  # エンティティ
│   └── repository.go            # リポジトリインターフェース
├── usecase/         # Application層
│   ├── interface.go             # UseCaseインターフェース
│   └── user_usecase.go          # ユースケース
├── handler/         # Interface層（Presentation層）
│   ├── user_handler.go          # HTTPハンドラー
│   ├── file_handler.go          # 静的ファイル配信（フロントエンドのビルド済み js の配信）
│   ├── swagger_handler.go       # Swagger UI
│   ├── router/                  # ルーティング設定
│   │   └── router.go
│   └── middleware/              # HTTPミドルウェア
│       ├── cors.go              # CORS設定
│       └── basic_auth.go        # Basic認証（本番環境のみ）
└── infra/           # Infrastructure層
    ├── repository/              # データアクセス実装
    │   └── csv_user_repository.go
    └── embed/                   # 静的ファイル埋め込み
        ├── embed.go
        ├── data/                # CSVデータ
        ├── dist/                # フロントエンドビルド成果物
        └── swagger/             # Swagger UI
```

### 依存関係の方向

```
Handler → UseCase → Domain ← Infra
```

## 使用ライブラリ

### コア機能

| ライブラリ                                                          | 用途                                |
| ------------------------------------------------------------------- | ----------------------------------- |
| 標準ライブラリ `net/http`                                           | HTTP サーバー（フレームワークレス） |
| 標準ライブラリ `log/slog`                                           | 構造化ロギング                      |
| [sethvargo/go-envconfig](https://github.com/sethvargo/go-envconfig) | 環境変数の読み込みと設定管理        |

### 開発支援

| ライブラリ                                                   | 用途                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------ |
| [oapi-codegen](https://github.com/oapi-codegen/oapi-codegen) | OpenAPI 仕様から Go コードを自動生成                   |
| [getkin/kin-openapi](https://github.com/getkin/kin-openapi)  | OpenAPI 仕様の検証とパース                             |
| [samber/lo](https://github.com/samber/lo)                    | 関数型プログラミング用ユーティリティ（Map, Filter 等） |

## 主要機能

### 1. OpenAPI による API 定義駆動開発

`openapi/openapi.yaml` から自動的にハンドラーインターフェースを生成します。

```bash
# コード生成
go generate ./...
```

### 2. グレースフルシャットダウン

SIGINT/SIGTERM を受信すると、進行中のリクエストを処理してから終了します。

### 3. 環境別設定

環境変数で動作を切り替えます。

| 環境変数          | デフォルト値  | 説明                             |
| ----------------- | ------------- | -------------------------------- |
| `PORT`            | `8080`        | サーバーポート                   |
| `ENV`             | `development` | 環境（`production`で認証有効化） |
| `BASIC_AUTH_USER` | `admin`       | Basic 認証ユーザー名             |
| `BASIC_AUTH_PASS` | `password`    | Basic 認証パスワード             |

### 4. Basic 認証（本番環境のみ）

`ENV=production` の場合のみ、全エンドポイントに Basic 認証が適用されます。

## ローカル開発

親ディレクトリの `compose.yml` を起動してください。

## テスト

```bash
# 全テスト実行
make test
```

## プロジェクト構成

```
backend/
├── cmd/
│   └── server/              # エントリーポイント
│       ├── main.go          # main関数
│       ├── server.go        # サーバーライフサイクル管理
│       └── dependencies.go  # 依存性注入
├── internal/                # プライベートパッケージ
├── pkg/                     # 公開パッケージ
│   ├── config/              # 設定管理
│   └── logger/              # ロガー初期化
├── tests/                   # テスト
│   ├── unit/                # ユニットテスト
│   └── integration/         # 統合テスト
└── openapi/                 # OpenAPI定義
    └── openapi.yaml
```

## API エンドポイント

| パス         | メソッド | 説明                         |
| ------------ | -------- | ---------------------------- |
| `/api/users` | GET      | ユーザー一覧取得             |
| `/`          | GET      | 静的ファイル配信（本番のみ） |
| `/api/docs`  | GET      | Swagger UI（開発環境のみ）   |

## 設計上の特徴

### インターフェース駆動

テスタビリティと柔軟性のため、主要なコンポーネントはインターフェースで定義されています。

- `domain.Repository`: データアクセス層のインターフェース
- `usecase.UserUseCase`: ビジネスロジック層のインターフェース

### 依存性注入

`cmd/server/dependencies.go` で依存関係を組み立て、各層に注入します。

### フレームワークレス設計

標準ライブラリの `net/http` を使用し、フレームワークに依存しない軽量な設計としています。
