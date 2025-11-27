# Frontend

React + TypeScript で実装したフロントエンドアプリケーションのボイラーテンプレート。

## 技術スタック

- **React 19**: UI ライブラリ
- **TypeScript**: 型安全な開発
- **Vite**: 高速ビルドツール
- **React Router 7**: ルーティング
- **TanStack Query (React Query)**: サーバーステート管理
- **Tailwind CSS 4**: ユーティリティファーストの CSS フレームワーク
- **daisyUI**: Tailwind CSS ベースの UI コンポーネントライブラリ

## 使用ライブラリ

### コア機能

| ライブラリ                                   | 用途                                                     |
| -------------------------------------------- | -------------------------------------------------------- |
| [React 19](https://react.dev/)               | UI ライブラリ                                            |
| [React Router 7](https://reactrouter.com/)   | クライアントサイドルーティング                           |
| [TanStack Query](https://tanstack.com/query) | サーバーステート管理・キャッシング・非同期データフェッチ |
| [Vite](https://vitejs.dev/)                  | 開発サーバー・ビルドツール（高速 HMR）                   |

### スタイリング

| ライブラリ                                 | 用途                                                    |
| ------------------------------------------ | ------------------------------------------------------- |
| [Tailwind CSS 4](https://tailwindcss.com/) | ユーティリティファーストの CSS フレームワーク           |
| [daisyUI](https://daisyui.com/)            | Tailwind ベースの UI コンポーネント（ボタン、カード等） |

### 開発支援

| ライブラリ                                         | 用途                                                          |
| -------------------------------------------------- | ------------------------------------------------------------- |
| [Orval](https://orval.dev/)                        | OpenAPI 仕様から TypeScript の型と API クライアントを自動生成 |
| [MSW (Mock Service Worker)](https://mswjs.io/)     | API モック（開発・テスト用）                                  |
| [ESLint](https://eslint.org/)                      | コード品質チェック                                            |
| [TypeScript ESLint](https://typescript-eslint.io/) | TypeScript 向け ESLint 設定                                   |
| [Faker.js](https://fakerjs.dev/)                   | モックデータ生成                                              |

## プロジェクト構成

```
frontend/
├── src/
│   ├── main.tsx                 # エントリーポイント
│   ├── main.css                 # グローバルスタイル
│   ├── routes/                  # ルート定義
│   │   ├── index.tsx            # ルーター設定
│   │   ├── Layout.tsx           # 共通レイアウト
│   │   ├── Home.tsx             # ホームページ
│   │   └── About.tsx            # About ページ
│   ├── components/              # 再利用可能なコンポーネント
│   │   └── Navigation.tsx       # ナビゲーションバー
│   ├── model/                   # OpenAPI から自動生成された型定義
│   ├── users/                   # ユーザー機能
│   │   ├── users.ts             # API クライアント（自動生成）
│   │   └── users.msw.ts         # MSW モック（自動生成）
│   ├── lib/                     # ユーティリティ
│   │   └── fetcher.ts           # API リクエストの基底関数
│   └── assets/                  # 静的アセット
├── public/                      # 公開ディレクトリ
├── orval.config.js              # Orval 設定（OpenAPI コード生成）
├── vite.config.ts               # Vite 設定
├── tsconfig.json                # TypeScript 設定
└── eslint.config.js             # ESLint 設定
```

## 主要機能

### 1. OpenAPI による型安全な API クライアント自動生成

バックエンドの OpenAPI 仕様から、TypeScript の型定義と API クライアントを自動生成します。

```bash
# コード生成
pnpm gen:openapi
```

生成されるファイルの例:

- `src/model/*.ts`: 型定義
- `src/users/users.ts`: TanStack Query を使った API クライアント
- `src/users/users.msw.ts`: MSW モックハンドラー

### 2. TanStack Query によるサーバーステート管理

API リクエストのキャッシング、リトライ、バックグラウンド更新を自動で処理します。

```tsx
// 使用例
const { data, isLoading, error } = useGetApiUsers();
```

### 3. MSW による API モック

開発中、バックエンドに依存せず API をモックできます。

### 4. React Router 7 によるルーティング

React Router を使用したクライアントサイドルーティング。
Data モードを使用しています。

## 開発方法

### 前提条件

- Node.js 24.x
- pnpm (corepack で有効化)

### セットアップ

```bash
# pnpm の有効化（初回のみ）
corepack enable

# 依存関係のインストール
pnpm install

# OpenAPI からコード生成
pnpm gen:openapi
```

### 開発サーバー起動

親ディレクトリの `compose.yml` を起動してください。

## API 連携

### 開発時

バックエンドが起動している場合、`src/lib/fetcher.ts` の設定で API エンドポイントを指定します。

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
```

### 環境変数

`.env.*` ファイルで設定可能

## スタイリング

### Tailwind CSS 4 + daisyUI

ユーティリティクラスと事前定義されたコンポーネントを組み合わせて使用します。

https://daisyui.com/components/

```tsx
// 例: daisyUI のボタン
<button className="btn btn-primary">Click me</button>

// 例: Tailwind のユーティリティクラス
<div className="flex items-center gap-4 p-4">
  ...
</div>
```

## OpenAPI コード生成設定

`orval.config.js` で Orval の動作をカスタマイズできます:

- TanStack Query v5 を使用
- MSW v2 のモックハンドラーを生成
- カスタム fetcher 関数を使用

## 設計上の特徴

### コンポーネント駆動開発

再利用可能なコンポーネントを `components/` に配置し、機能ごとに整理します。

### 型安全性

OpenAPI 仕様から自動生成された型により、API レスポンスの型安全性を保証します。

### 宣言的なデータフェッチ

TanStack Query により、ローディング状態やエラーハンドリングを宣言的に記述できます。
