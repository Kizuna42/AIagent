# CLAUDE.md

このファイルは Claude Code（claude.ai/code）がこのリポジトリで作業する際のガイドです。

## プロジェクト概要

**Brave Search × OpenAI GPT-4o-mini による Web 検索 AI エージェント**（個人開発の MVP）。
自然言語の質問を受け取り、AI が Web 検索を実行して結果を要約・回答する。
Next.js 16（App Router）+ Supabase 認証をベースに、Mastra と Vercel AI SDK で
エージェント機能を実装している。

実装済みの機能と今後の構想は [README.md](./README.md) を参照（README には「動作する機能」のみを記載）。

## 技術スタック

- **フロントエンド**: Next.js 16 (App Router) / React 19 / TypeScript 5
- **スタイリング**: Tailwind CSS / shadcn/ui / lucide-react
- **AI**: Vercel AI SDK (`ai`) / Mastra (`@mastra/core`) / OpenAI GPT-4o-mini
- **検索**: Brave Search API
- **認証**: Supabase Auth（`@supabase/ssr`）

## 開発コマンド

```bash
npm run dev       # 開発サーバー（Turbopack）http://localhost:3000
npm run build     # プロダクションビルド
npm start         # プロダクションサーバー
npm run lint      # ESLint
npx tsc --noEmit  # 型チェック
```

> 注: 自動テストは未整備（`npm test` は未定義）。変更後は最低限 `npm run lint` と
> `npx tsc --noEmit`、`npm run build` の通過を確認すること。

## アーキテクチャ

検索ロジックを 1 箇所に集約し、Mastra のツール定義と本番のストリーミング API の
両方から再利用する構成。

| レイヤー | ファイル | 役割 |
| --- | --- | --- |
| 検索ロジック | `src/mastra/tools/search-tool.ts` | Brave Search 呼び出し。`performSearch` を export し単一の真実の源に |
| エージェント定義 | `src/mastra/agents/search-agent.ts` | 同じ検索ツールと `SEARCH_SYSTEM_PROMPT` を使う Mastra Agent 定義（マルチエージェント化の起点） |
| 本番 API | `app/api/search/chat/route.ts` | 認証ゲート + AI SDK `streamText`（`maxRetries` による自動リトライ） |
| UI | `components/chat/*` | `useChat`（`append`）でストリーミング購読、検索ツールの実行をバッジ表示 |

### 認証フロー

- **クライアント**: `lib/supabase/client.ts`
- **サーバー**: `lib/supabase/server.ts`（Cookie ベースのセッション）
- **ミドルウェア**: `middleware.ts` で全ルートのセッションを更新
- **保護ルート**: `/app/protected/` は未認証時に `/auth/login` へリダイレクト
- 検索 API は冒頭で `supabase.auth.getUser()` を検証し、未ログインは `401` を返す

## コーディング規約

- 既存コードのスタイル・パターンに合わせる
- Server Components を基本とし、クライアント機能が必要な箇所のみ `'use client'`
- スタイリングは `cn()`（clsx + tailwind-merge）、アイコンは lucide-react
- 不要なデバッグログ（`console.log`）を残さない
- 秘密情報はコミットしない（`.env.local` は gitignore 済み。`.mastra` / `.next` 等の
  生成物も追跡しない）

## Git 運用

- コミットメッセージは Conventional Commits（`feat:` / `fix:` / `docs:` / `refactor:` / `chore:`）
- 機能単位でブランチを切り、PR 経由でマージ

## 今後の構想（未実装）

- 会話メモリの永続化（Mastra `Memory` を本番 API に接続）
- 複数エージェント / ツールの追加と切り替え
- Supabase RLS によるユーザー単位のデータ分離
- 検索結果キャッシュとレート制限
- 自動テスト（ユニット / E2E）の整備
