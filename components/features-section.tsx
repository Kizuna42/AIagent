import { Brain, Globe, Zap, ShieldCheck } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "自然言語で検索",
      description: "質問するだけで、AIが意図を読み取る",
      details: "自然文の質問をAIが解釈し、必要に応じてWeb検索を実行します。",
    },
    {
      icon: Globe,
      title: "出典つきの要約",
      description: "Brave Search の結果をAIが統合",
      details: "Brave Search API で取得した情報を GPT-4o-mini が要約し、出典リンクを添えて回答します。",
    },
    {
      icon: Zap,
      title: "ストリーミング応答",
      description: "答えがリアルタイムに紡がれていく",
      details: "回答をトークン単位でストリーミング表示し、検索ツールの実行も可視化します。",
    },
    {
      icon: ShieldCheck,
      title: "認証で保護",
      description: "ログインしたあなただけの検索",
      details: "Supabase 認証により、ログイン済みユーザーのみが検索機能を利用できます。",
    },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="mt-24 text-center fade-in-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm font-light text-muted-foreground">
              Brave Search × OpenAI GPT-4o-mini
            </span>
          </div>
          <p className="mt-8 text-muted-foreground/60 font-light text-sm">
            ログインして、AI検索を体験する
          </p>
        </div>
      </div>
    </section>
  );
}