# 🔍 AI 検索エージェント

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase">
  <img src="https://img.shields.io/badge/Mastra-0.10-purple?style=for-the-badge" alt="Mastra 0.10">
</div>

<p align="center">
  <strong>Brave Search × OpenAI GPT-4o-mini による、Web 検索 AI エージェント</strong>
</p>

自然言語で質問すると、AI が **Brave Search API** で Web を検索し、結果を要約して
出典リンク付きで回答します。検索の実行から要約までを 1 つのチャット体験にまとめた、
個人開発の MVP です。

---

## ✨ 主な機能

| 機能 | 内容 |
| --- | --- |
| 🔍 **AI 検索エージェント** | 自然言語の質問を理解し、`searchWeb` ツールで Brave Search を実行 → GPT-4o-mini が結果を統合・要約 |
| 💬 **ストリーミングチャット UI** | 回答をトークン単位でストリーミング表示。検索ツールの実行をバッジで可視化 |
| 🔐 **認証ゲート** | Supabase Auth でログイン済みユーザーのみが検索 API を利用可能 |
| 🎨 **モダンな UI** | Tailwind CSS + shadcn/ui、ダーク / ライトモード対応のレスポンシブデザイン |

> このリポジトリで「実装済み」と書かれている機能は、すべて実際に動作するものに限定しています。
> 未実装の構想は末尾の [今後の構想](#-今後の構想) に分けて記載しています。

---

## 🏗️ アーキテクチャ

検索ロジックを 1 箇所に集約し、「Mastra のツール定義」と「本番のストリーミング API」の
両方から同じ実装を再利用する構成にしています。

```
                       ┌──────────────────────────────┐
   ブラウザ (useChat)  │  components/chat/*            │  ストリーミング購読・ツール結果表示
                       └──────────────┬───────────────┘
                                      │  POST /api/search/chat
                       ┌──────────────▼───────────────┐
   本番 API 層         │  app/api/search/chat/route.ts │  Supabase 認証ゲート
                       │                               │  Vercel AI SDK streamText（自動リトライ）
                       └──────────────┬───────────────┘
                                      │  performSearch()
                       ┌──────────────▼───────────────┐
   検索ロジック層      │  src/mastra/tools/search-tool │  Brave Search API 呼び出し（Zod で型付け）
                       └──────────────┬───────────────┘
                                      │ 同じツール / プロンプトを共有
                       ┌──────────────▼───────────────┐
   エージェント定義層  │  src/mastra/agents/search-... │  同じ検索ツールを使う Mastra Agent 定義
                       └──────────────────────────────┘
```

> 本番のリクエストは「ブラウザ → API → `performSearch`」の経路を通ります。`search-agent.ts` は
> 同じ検索ツールとシステムプロンプトを共有する Mastra Agent の定義で、マルチエージェント化の起点として
> 用意しています（現在の本番経路では AI SDK のストリーミングを直接利用）。

### 設計上の工夫

- **検索ロジックとプロンプトの単一の真実の源** — Brave Search を叩く `performSearch` と
  システムプロンプトをそれぞれ 1 箇所に集約。本番 API と Mastra Agent が同じ実装を共有し、
  二重実装を排除。
- **認証によるアクセス制御** — API ルートの冒頭で Supabase セッションを検証し、
  未ログインは `401` を返す。LLM / 検索 API の無制限利用を防止。
- **ストリーミング + 自動リトライ** — AI SDK の `streamText` で逐次応答。一時的な API 障害には
  `maxRetries` による自動リトライで対応。
- **型安全なツール I/O** — 検索ツールの入出力を Zod スキーマで定義（`count` は 1〜20 に制約）。
  AI SDK のツール定義からも同じスキーマを参照。

### 技術選定の理由

- **Mastra** — エージェントとツールを宣言的に定義でき、Zod による型付きツールが書きやすい。
  検索ツールを `createTool` で定義し、本番 API と Mastra Agent の双方から再利用している。
- **Vercel AI SDK** — `streamText` と `useChat` でストリーミング UI を最小実装でき、
  応答性を重視するチャット体験に適する。
- **Brave Search API** — プライバシー重視で、最新情報を含む Web 検索を扱いやすい。
- **Supabase** — 認証とデータベースを一括で扱え、SSR（`@supabase/ssr`）に対応する。

---

## 🛠️ 技術スタック

| レイヤー | 採用技術 |
| --- | --- |
| フロントエンド | Next.js 15 (App Router) / React 19 / TypeScript 5 |
| スタイリング | Tailwind CSS / shadcn/ui / lucide-react |
| AI | Vercel AI SDK / Mastra (`@mastra/core`) / OpenAI GPT-4o-mini |
| 検索 | Brave Search API |
| 認証 | Supabase Auth（`@supabase/ssr` による Cookie ベースの SSR セッション） |
| 開発 | Turbopack / ESLint |

---

## 🚀 セットアップ

### 1. 必要環境

- Node.js 18 以上
- Supabase プロジェクト / OpenAI API キー / Brave Search API キー

### 2. インストールと環境変数

```bash
git clone https://github.com/Kizuna42/AIagent.git
cd AIagent
npm install

# 環境変数テンプレートをコピーして値を設定
cp .env.example .env.local
```

`.env.local` に以下を設定します（取得先は `.env.example` のコメント参照）。

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
BRAVE_SEARCH_API_KEY=...
```

### 3. 開発サーバー起動

```bash
npm run dev        # http://localhost:3000
```

---

## 📁 プロジェクト構造

```
.
├── app/
│   ├── api/search/chat/route.ts   # 検索チャット API（認証 + ストリーミング）
│   ├── auth/                      # サインアップ / ログイン等の認証ページ
│   ├── protected/                 # 認証必須ページ（検索 UI を表示）
│   └── page.tsx                   # ランディングページ
├── components/
│   ├── chat/                      # チャット UI（container / input / message）
│   └── ui/                        # shadcn/ui コンポーネント
├── lib/supabase/                  # Supabase クライアント（client / server / middleware）
└── src/mastra/
    ├── agents/search-agent.ts     # Mastra 検索エージェント
    ├── tools/search-tool.ts       # Brave Search ツール + performSearch
    └── index.ts                   # Mastra インスタンス定義
```

---

## 📜 開発コマンド

```bash
npm run dev      # 開発サーバー（Turbopack）
npm run build    # プロダクションビルド
npm start        # プロダクションサーバー
npm run lint     # ESLint
npx tsc --noEmit # 型チェック
```

---

## 🔭 今後の構想

現状は単一の検索エージェントですが、以下を拡張余地として想定しています（**未実装**）。

- 会話メモリの永続化（Mastra の `Memory` を本番 API に接続し、検索履歴を保持）
- 複数エージェント / ツールの追加と切り替え
- Supabase の RLS を用いたユーザー単位のデータ分離
- 検索結果のキャッシュとレート制限

---

## 📄 ライセンス

MIT License
