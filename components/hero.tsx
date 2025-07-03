import { Bot, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto text-center space-y-16 fade-in-up">
        {/* Main hero content */}
        <div className="space-y-8">
          {/* Floating AI icon */}
          <div className="flex justify-center mb-12 stagger-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-30 pulse-glow"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl float">
                <Bot className="h-12 w-12 text-white" strokeWidth={1.5} />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-secondary animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Headlines */}
          <div className="space-y-8 stagger-2">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-thin tracking-tight leading-[0.9]">
              <span className="gradient-text">AI検索エージェント</span>
              <span className="block text-foreground/80 mt-2">で、</span>
            </h1>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-foreground/70 tracking-wide">
              毎日を少しだけ
              <span className="gradient-text font-light"> 豊かに。</span>
            </p>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed stagger-3">
            先進のAI技術と直感的なデザインが織りなす、
            <br className="hidden sm:inline" />
            新しい検索体験をあなたに。
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center stagger-4">
          <Link href="/protected">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-secondary hover:from-primary-deep hover:to-secondary-deep text-white px-12 py-4 h-14 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              今すぐ体験する
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="lg" 
            className="group px-12 py-4 h-14 text-lg font-light text-muted-foreground hover:text-foreground glass rounded-2xl border-0 transition-all duration-300 hover:scale-105"
          >
            <Zap className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
            デモを見る
          </Button>
        </div>

        {/* Core values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-24 max-w-4xl mx-auto">
          <div className="group text-center space-y-4 fade-in-up stagger-1">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-light to-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-deep rounded-lg"></div>
            </div>
            <h3 className="text-xl font-light text-foreground">直感的な操作</h3>
            <p className="text-muted-foreground leading-relaxed">
              考える前に、感じることから。
              <br />
              自然な操作で、複雑さを隠す。
            </p>
          </div>
          
          <div className="group text-center space-y-4 fade-in-up stagger-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary-light to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary-deep rounded-lg"></div>
            </div>
            <h3 className="text-xl font-light text-foreground">深いカスタマイズ</h3>
            <p className="text-muted-foreground leading-relaxed">
              あなたの思考に寄り添う、
              <br />
              柔軟で精密な設定。
            </p>
          </div>
          
          <div className="group text-center space-y-4 fade-in-up stagger-3">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-muted to-muted/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-foreground/60 to-foreground/40 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-light text-foreground">瞬間の応答</h3>
            <p className="text-muted-foreground leading-relaxed">
              待つことのない、
              <br />
              思考の速度で動く検索。
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
