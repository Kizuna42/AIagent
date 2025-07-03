import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon, Search } from "lucide-react";
import { ChatContainer } from "@/components/chat/chat-container";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          認証済みユーザー専用のAI検索プラットフォームです
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Search className="h-6 w-6 text-blue-600" />
            <h2 className="font-bold text-2xl">AI検索エージェント</h2>
          </div>
          <p className="text-muted-foreground">
            Brave Search APIを活用した高性能AI検索システム。
            質問を入力すると、Web上の最新情報を検索して回答します。
          </p>
        </div>
        
        <ChatContainer />
      </div>
      
      <div className="mt-8 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <p className="font-medium mb-2">使用方法:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>検索したい内容や質問を自然言語で入力</li>
          <li>AIが自動的にWeb検索を実行し、結果を分析</li>
          <li>関連情報やソースリンクと共に回答を提供</li>
        </ul>
      </div>
    </div>
  );
}
