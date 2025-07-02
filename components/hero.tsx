import { Bot, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <div className="flex flex-col items-center py-24 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <Bot className="h-8 w-8 text-white" strokeWidth={2} />
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
              AI Agent Platform
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              直感的操作で高度カスタマイズ可能な
              <br className="hidden sm:inline" />
              超高速AIエージェントを構築
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 h-12 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            今すぐ始める
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className="px-8 py-3 h-12 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          >
            デモを見る
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-md"></div>
            </div>
            <h3 className="text-base font-medium text-foreground">直感的操作</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              初心者でも迷わない
              <br />
              シンプルなUI設計
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-purple-600 rounded-md"></div>
            </div>
            <h3 className="text-base font-medium text-foreground">高度カスタマイズ</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              目的に応じた
              <br />
              エージェント挙動制御
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded-md"></div>
            </div>
            <h3 className="text-base font-medium text-foreground">超高速処理</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ラグ無しの
              <br />
              リアルタイム応答
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
