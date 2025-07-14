import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { FeaturesSection } from "@/components/features-section";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
          <Link href={"/"} className="text-xl font-light gradient-text tracking-wide">
            AI Agent
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-light">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                機能
              </Link>
              <Link href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
                デモ
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding top to account for fixed nav */}
      <div className="pt-16">
        <Hero />
        
        <div id="features">
          <FeaturesSection />
        </div>
        
        {/* Demo Section */}
        <section id="demo" className="relative py-24 px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-thin tracking-tight">
                <span className="gradient-text">体験</span>
                <span className="text-foreground/60">から始まる</span>
                <span className="gradient-text">理解</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                説明よりも体験を。言葉よりも感覚を。
                <br />
                あなたの手で、可能性を確かめてください。
              </p>
            </div>
            
            <div className="mt-12">
              <Link href="/protected">
                <div className="group relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative glass rounded-2xl p-8 hover:bg-background/90 transition-all duration-300 hover:scale-105">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                        <span className="text-2xl text-white">AI</span>
                      </div>
                      <h3 className="text-xl font-light text-foreground">検索を体験する</h3>
                      <p className="text-muted-foreground text-sm">
                        実際のAI検索機能を今すぐお試しください
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Getting Started Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl font-thin text-foreground mb-4 tracking-tight">
                始まりの<span className="gradient-text">一歩</span>
              </h2>
              <p className="text-muted-foreground font-light">
                簡潔で、直感的な設定から
              </p>
            </div>
            
            <div className="fade-in-up stagger-2">
              {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Footer */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center space-y-4">
            <div className="text-2xl font-light gradient-text">AI Agent</div>
            <p className="text-sm text-muted-foreground/60 font-light max-w-md mx-auto">
              毎日を少しだけ豊かにする、新しい検索体験
            </p>
            <div className="pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground/40 font-light">
                Designed with care for the future
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
