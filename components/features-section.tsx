import { Brain, Workflow, Shield, Zap, Globe, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "知的検索",
      description: "理解し、学習し、進化する検索体験",
      details: "文脈を理解した検索結果で、あなたの意図を正確に捉えます。",
    },
    {
      icon: Workflow,
      title: "自動化",
      description: "繰り返しを排除し、創造性に集中",
      details: "日常的な検索タスクを自動化し、より重要な作業に時間を。",
    },
    {
      icon: Shield,
      title: "プライバシー",
      description: "あなたのデータは、あなただけのもの",
      details: "厳格なプライバシー保護で、安心して利用できます。",
    },
    {
      icon: Zap,
      title: "瞬時の応答",
      description: "思考の速度で動く、待たない検索",
      details: "高度な最適化により、考えた瞬間に答えが見つかります。",
    },
    {
      icon: Globe,
      title: "統合検索",
      description: "世界中の情報を、一つの場所から",
      details: "複数のソースから情報を統合し、包括的な回答を提供。",
    },
    {
      icon: Users,
      title: "協働",
      description: "チームで共有する知識と洞察",
      details: "発見した情報をチームと簡単に共有し、集合知を構築。",
    }
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-24 fade-in-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin tracking-tight mb-6">
            <span className="gradient-text">機能</span>
            <span className="text-foreground/60">という名の</span>
            <span className="gradient-text">体験</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            技術の向こうに見える、新しい可能性。
            <br />
            AIと人間の知性が響き合う空間を。
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative fade-in-up stagger-${(index % 4) + 1}`}
            >
              {/* Card */}
              <div className="relative h-full p-8 bg-background/80 backdrop-blur-sm border border-border/50 rounded-3xl hover:bg-background/90 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
                {/* Floating background element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative space-y-6">
                  {/* Icon */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    {/* Subtle glow */}
                    <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed">
                      {feature.description}
                    </p>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {feature.details}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-32 text-center fade-in-up">
          {/* Performance indicator */}
          <div className="inline-flex items-center gap-4 px-8 py-4 glass rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-light text-foreground">リアルタイム稼働中</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <span className="text-sm font-light text-muted-foreground">
              平均応答時間 <span className="text-primary font-medium">50ms</span>
            </span>
          </div>
          
          {/* Subtle call to action */}
          <p className="mt-8 text-muted-foreground/60 font-light text-sm">
            機能を体験し、可能性を発見する
          </p>
        </div>
      </div>
    </section>
  );
}