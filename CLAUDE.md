# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with this AI Agent Platform repository.

## プロジェクト概要 (Project Overview)

### ビジョン
自作AIエージェントプラットフォームの構築 - ユーザーが直感的にAIエージェントを作成、カスタマイズ、実行できる包括的なWebアプリケーション

### 技術スタック
- **Frontend**: Next.js 15 (App Router) + TypeScript
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (認証・データベース)
- **開発ツール**: Claude Code for autonomous development

### 主要機能要件
1. **AIエージェント作成・管理**
   - ノーコードでのエージェント作成インターフェース
   - カスタマイズ可能なワークフロー設計
   - エージェントテンプレート機能

2. **高性能AI推論エンジン**
   - 複数のAIモデル対応
   - リアルタイム処理最適化
   - スケーラブルなリソース管理

3. **チーム連携機能**
   - プロジェクト共有・権限管理
   - リアルタイムコラボレーション
   - 進捗管理・レポート機能

4. **セキュリティ・パフォーマンス**
   - エンタープライズグレードセキュリティ
   - 分析・モニタリングダッシュボード
   - API管理・レート制限

## 開発環境・コマンド

### セットアップ
```bash
# プロジェクト作成済み（with-supabaseテンプレート使用）
npx create-next-app -e with-supabase

# 依存関係インストール
npm install

# 環境変数設定
cp .env.local.example .env.local
# 必要な環境変数を設定
```

### 開発コマンド
```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# リンター実行
npm run lint

# 型チェック
npm run type-check

# テスト実行
npm run test
```

## Git開発フロー・ルール

### ブランチ戦略
```
main (本番環境) 
├── develop (開発環境)
    ├── feature/[機能名] (機能開発)
    ├── bugfix/[修正内容] (バグ修正)
    └── hotfix/[緊急修正] (緊急対応)
```

### 開発ルール
1. **main直接pushは禁止** - 必ずPRを経由すること
2. **機能ごとにブランチ作成** - `feature/agent-builder`など
3. **コミットメッセージ規約**:
   ```
   [type]: [概要]
   
   feat: 新機能追加
   fix: バグ修正
   docs: ドキュメント更新
   style: コードフォーマット
   refactor: リファクタリング
   test: テスト追加・修正
   chore: その他の変更
   ```

4. **コミット頻度**: 機能単位で細かくコミット
5. **PR要件**: 
   - 機能説明・変更内容の詳細記載
   - 関連issue番号の記載
   - テスト結果・スクリーンショット添付

### Git運用例
```bash
# 新機能開発開始
git checkout develop
git pull origin develop
git checkout -b feature/ai-agent-builder

# 開発・コミット
git add .
git commit -m "feat: AIエージェント作成フォーム基本実装"

# 定期的なpush
git push origin feature/ai-agent-builder

# 完了後PR作成 → develop へマージ
# リリース準備完了後 → main へマージ
```

## アーキテクチャ詳細

### ディレクトリ構造
```
├── app/                    # Next.js App Router
│   ├── auth/              # 認証関連ページ
│   ├── protected/         # 認証必須ページ
│   ├── agents/            # AIエージェント管理
│   ├── dashboard/         # ダッシュボード
│   ├── api/               # API Routes
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── ui/               # shadcn/ui基本コンポーネント
│   ├── agents/           # エージェント関連コンポーネント
│   ├── dashboard/        # ダッシュボード関連
│   └── layout/           # レイアウトコンポーネント
├── lib/                  # ユーティリティ・設定
│   ├── supabase/         # Supabase設定
│   ├── ai/               # AI関連ユーティリティ
│   ├── auth/             # 認証ヘルパー
│   └── utils.ts          # 汎用ユーティリティ
├── types/                # TypeScript型定義
├── hooks/                # カスタムフック
├── stores/               # 状態管理（Zustand推奨）
└── public/               # 静的ファイル
```

### 認証フロー
- **クライアントサイド**: `@/lib/supabase/client` でブラウザ操作
- **サーバーサイド**: `@/lib/supabase/server` でCookieベースセッション
- **ミドルウェア**: 全ルートでセッション更新
- **保護ルート**: `/app/protected/` 認証必須、未認証時は `/auth/login` リダイレクト

### データモデル設計
```sql
-- users (Supabase Auth拡張)
-- profiles
-- agents
-- workflows  
-- executions
-- teams
-- permissions
```

## コンポーネント設計原則

### UIコンポーネント
- **shadcn/ui**: 基本コンポーネント（Button, Card, Input等）
- **cn()**: clsx + tailwind-merge でスタイリング
- **アイコン**: lucide-react使用
- **テーマ**: next-themes でダーク/ライトモード

### 状態管理
- **Local State**: React useState/useReducer
- **Global State**: Zustand推奨
- **Server State**: TanStack Query (React Query)
- **Form State**: React Hook Form + Zod

### パフォーマンス最適化
- **Server Components**: 可能な限りサーバーコンポーネント使用
- **Code Splitting**: 動的インポートで必要時ロード
- **Image Optimization**: Next.js Image コンポーネント
- **Bundle Analysis**: @next/bundle-analyzer

## 環境変数・設定

### 必須環境変数
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Services (例)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# その他
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 設定管理
- **開発環境**: `.env.local`
- **本番環境**: プラットフォーム環境変数
- **型安全**: `@/lib/env.ts` で環境変数バリデーション

## 主要機能実装ガイド

### 1. AIエージェント作成機能
```typescript
// components/agents/AgentBuilder.tsx
interface AgentConfig {
  name: string;
  description: string;
  model: string;
  prompt: string;
  tools: string[];
  settings: AgentSettings;
}
```

### 2. ワークフロー設計
```typescript
// types/workflow.ts
interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  config: NodeConfig;
  connections: Connection[];
}
```

### 3. リアルタイム実行監視
```typescript
// hooks/useAgentExecution.ts
const useAgentExecution = (agentId: string) => {
  // Supabase Realtime for live updates
};
```

## テスト戦略

### テスト構成
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Playwright
- **E2E Tests**: Cypress
- **API Tests**: Supertest

### テスト実行
```bash
# ユニットテスト
npm run test

# E2Eテスト
npm run test:e2e

# カバレッジレポート
npm run test:coverage
```

## デプロイメント・CI/CD

### デプロイ環境
- **開発**: Vercel Preview (feature branch)
- **ステージング**: Vercel (develop branch)
- **本番**: Vercel (main branch)

### CI/CDパイプライン
```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
      - name: Setup Node.js
      - name: Install dependencies
      - name: Run tests
      - name: Build
      - name: Deploy
```

## セキュリティ・パフォーマンス

### セキュリティ対策
- **RLS**: Supabase Row Level Security
- **認証**: JWT + Refresh Token
- **CSRF保護**: Next.js内蔵保護
- **入力サニタイズ**: Zod バリデーション
- **API制限**: Rate limiting

### パフォーマンス監視
- **Core Web Vitals**: 継続的測定
- **Bundle Size**: 定期的分析
- **DB Query**: Supabase Analytics
- **エラー追跡**: Sentry integration

## 開発者ガイド

### Claude Code連携
1. **自律開発**: Claude Codeに機能要件を明確に伝達
2. **レビュー**: 生成コードの品質確認
3. **テスト**: 機能テスト・統合テスト実行
4. **デプロイ**: 段階的リリース

### コード品質
- **ESLint**: 静的解析
- **Prettier**: フォーマッター
- **TypeScript**: 型安全性
- **Husky**: Git hooks でコード品質保証

### ドキュメント更新
- **README.md**: プロジェクト基本情報
- **CLAUDE.md**: 開発者向け詳細ガイド（本ファイル）
- **API Documentation**: OpenAPI/Swagger
- **Component Storybook**: UIコンポーネント文書

## トラブルシューティング

### よくある問題
1. **認証エラー**: Supabase設定確認
2. **ビルドエラー**: 型定義・依存関係確認
3. **パフォーマンス問題**: Bundle analyzer使用
4. **デプロイ失敗**: 環境変数・設定確認

### デバッグ方法
```bash
# 詳細ログ出力
DEBUG=* npm run dev

# 型チェック
npx tsc --noEmit

# 依存関係確認
npm ls
```

## 今後の拡張計画

### Phase 1: 基本機能
- [ ] ユーザー認証・管理
- [ ] 基本的なエージェント作成
- [ ] シンプルなワークフロー実行

### Phase 2: 高度な機能
- [ ] 複雑なワークフロー設計
- [ ] チーム連携機能
- [ ] 分析・レポート機能

### Phase 3: エンタープライズ
- [ ] 大規模チーム対応
- [ ] 高度なセキュリティ
- [ ] カスタム統合・API

---