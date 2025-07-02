import { Cpu, Code, Users, Shield, Gauge, Workflow } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Cpu,
      title: "AI推論エンジン",
      description: "最新のLLMモデルを統合した高性能推論システム",
    },
    {
      icon: Code,
      title: "ノーコード設定",
      description: "プログラミング知識不要でエージェントを構築",
    },
    {
      icon: Workflow,
      title: "フロー制御",
      description: "複雑なワークフローを直感的に設計・管理",
    },
    {
      icon: Gauge,
      title: "パフォーマンス最適化",
      description: "ミリ秒単位の応答速度を実現する最適化技術",
    },
    {
      icon: Shield,
      title: "セキュリティ強化",
      description: "エンタープライズ級のセキュリティ機能を標準搭載",
    },
    {
      icon: Users,
      title: "チーム連携",
      description: "複数人でのエージェント開発・運用をサポート",
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4 tracking-tight">
          プラットフォーム機能
        </h2>
        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
          AIエージェント構築に必要な全ての機能を統合
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="group p-8 bg-background border border-border rounded-2xl hover:shadow-sm transition-all duration-200">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-foreground">平均応答時間: 50ms</span>
        </div>
      </div>
    </section>
  );
}