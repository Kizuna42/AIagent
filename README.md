# 🤖 AI 検索エージェント

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Supabase-Latest-green?style=for-the-badge&logo=supabase" alt="Supabase">
  <img src="https://img.shields.io/badge/Mastra-0.10.9-purple?style=for-the-badge" alt="Mastra">
</div>

<p align="center">
  <strong>先進のAI技術と直感的なデザインが織りなす、新しい検索体験</strong>
</p>

<p align="center">
  Brave Search API と OpenAI GPT-4を活用した、インテリジェントな検索プラットフォーム
</p>

---

## ✨ 主な機能

### 🔍 **AI 検索エージェント**

- **Brave Search API**を活用した Web 検索
- **OpenAI GPT-4o-mini**による結果の分析と要約
- 自然言語での質問に対する包括的な回答
- ソースリンクと関連情報の提供

### 🌤️ **天気エージェント**

- 位置情報に基づく天気予報
- 天気に応じた活動提案
- Open-Meteo API を使用した正確な気象データ

### 🎨 **モダンな UI/UX**

- **shadcn/ui**による洗練されたコンポーネント
- **Tailwind CSS**でのレスポンシブデザイン
- ダークモード・ライトモード対応
- リアルタイムチャット機能

### 🔐 **セキュリティ**

- **Supabase Auth**による認証システム
- Row Level Security (RLS)
- 認証済みユーザーのみアクセス可能

---

## 🚀 クイックスタート

### 1. 環境要件

- **Node.js** 18.0 以上
- **npm** または **yarn**
- **Supabase**アカウント

### 2. インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/aiagent-app.git
cd aiagent-app

# 依存関係をインストール
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の設定を追加：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# AI API設定
OPENAI_API_KEY=your-openai-api-key
BRAVE_SEARCH_API_KEY=your-brave-search-api-key
```

### 4. 開発サーバーの起動

```bash
# 開発サーバーを起動 (Turbopack使用)
npm run dev
```

🎉 **http://localhost:3000** でアプリケーションにアクセス！

---

## 📁 プロジェクト構造

```
aiagent-app/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── search/        # 検索API
│   ├── auth/              # 認証ページ
│   ├── protected/         # 認証必須ページ
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
│   ├── chat/              # チャット機能
│   ├── ui/                # shadcn/ui基本コンポーネント
│   └── ...
├── src/mastra/            # Mastraフレームワーク
│   ├── agents/            # AIエージェント
│   │   ├── search-agent.ts    # 検索エージェント
│   │   └── weather-agent.ts   # 天気エージェント
│   ├── tools/             # AIツール
│   │   ├── search-tool.ts     # 検索ツール
│   │   └── weather-tool.ts    # 天気ツール
│   └── workflows/         # ワークフロー
└── lib/                   # ユーティリティ
    └── supabase/          # Supabase設定
```

---

## 🔧 技術スタック

### **フロントエンド**

- **Next.js 15** - React フレームワーク (App Router)
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **shadcn/ui** - UI コンポーネント
- **Lucide React** - アイコン

### **バックエンド**

- **Supabase** - 認証・データベース
- **Mastra** - AI エージェントフレームワーク
- **OpenAI API** - GPT-4o-mini
- **Brave Search API** - Web 検索

### **開発ツール**

- **Turbopack** - 高速バンドラー
- **ESLint** - コード品質
- **Prettier** - コードフォーマット

---

## 🌟 使用方法

### 1. **アカウント作成**

- アプリケーションにアクセス
- 「サインアップ」からアカウントを作成
- メール認証を完了

### 2. **AI 検索を体験**

- 認証後、検索画面にアクセス
- 自然言語で質問を入力
- AI が自動的に Web 検索を実行し、結果を分析

### 3. **検索例**

```
「最新のAI技術のトレンドについて教えて」
「2024年の気候変動対策について」
「Next.js 15の新機能は何ですか？」
```

---

## 🛠️ 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# リンター実行
npm run lint

# 型チェック
npx tsc --noEmit
```

---

## 🔑 API 設定ガイド

### **Supabase 設定**

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. Project Settings → API から URL とキーを取得
3. Authentication → URL Configuration でリダイレクト URL を設定

### **OpenAI API**

1. [OpenAI Platform](https://platform.openai.com)で API キーを取得
2. 使用量に応じた料金プランを選択

### **Brave Search API**

1. [Brave Search API](https://api.search.brave.com)でアカウント作成
2. API キーを取得

---

## 📊 主要機能の詳細

### **検索エージェント**

- 自然言語クエリの理解
- 複数検索結果の統合・要約
- 関連リンクとソースの提供
- 文脈に応じた回答生成

### **天気エージェント**

- 位置ベースの天気予報
- 活動提案機能
- 詳細な気象データ表示

### **チャット機能**

- リアルタイム対話
- ストリーミング応答
- 検索履歴の保持
- レスポンシブデザイン

---

## 🚀 デプロイ

### **Vercel (推奨)**

```bash
# Vercelにデプロイ
npx vercel

# 環境変数を設定
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add OPENAI_API_KEY
vercel env add BRAVE_SEARCH_API_KEY
```

### **その他のプラットフォーム**

- **Netlify**
- **Railway**
- **Heroku**

---

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

1. **Fork** このリポジトリ
2. **Feature branch** を作成 (`git checkout -b feature/amazing-feature`)
3. **Commit** 変更 (`git commit -m 'Add amazing feature'`)
4. **Push** ブランチ (`git push origin feature/amazing-feature`)
5. **Pull Request** を作成

---

## 📄 ライセンス

このプロジェクトは **MIT License** の下で公開されています。

---

## 🙏 謝辞

- [Next.js](https://nextjs.org) - 素晴らしい React フレームワーク
- [Supabase](https://supabase.com) - 優れた BaaS プラットフォーム
- [Mastra](https://mastra.ai) - AI エージェントフレームワーク
- [shadcn/ui](https://ui.shadcn.com) - 美しい UI コンポーネント
- [Brave Search](https://search.brave.com) - プライバシー重視の検索 API

---

<div align="center">
  <p>
    <strong>毎日を少しだけ豊かにする、新しい検索体験</strong>
  </p>
  <p>
    Made with ❤️ by the AI Agent Team
  </p>
</div>
