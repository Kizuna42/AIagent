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
      <nav className="w-full border-b border-border">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
          <Link href={"/"} className="text-lg font-medium text-foreground">
            AI Agent Platform
          </Link>
          <div className="flex items-center gap-4">
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <div className="flex-1">
        <Hero />
        <FeaturesSection />
        
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-foreground mb-4">導入手順</h2>
            <p className="text-muted-foreground font-light">簡単な設定でプラットフォームを開始</p>
          </div>
          {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground font-light">
            Powered by{" "}
            <span className="font-medium text-foreground">AI Agent Platform</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
