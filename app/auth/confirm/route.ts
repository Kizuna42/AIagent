import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

// `next` クエリはユーザーが自由に指定できるため、同一オリジンのパスのみ許可する。
// 文字列の前方一致だけでは `/\t/evil.com` のように URL パーサーが制御文字を除去して
// `//evil.com` になる入力を防げないため、実際にパースしてオリジンを比較する。
function getSafeRedirectPath(next: string | null, origin: string): string {
  if (!next || !next.startsWith("/")) {
    return "/";
  }
  try {
    const url = new URL(next, origin);
    if (url.origin !== origin) {
      return "/";
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

function errorRedirect(message: string): never {
  redirect(`/auth/error?error=${encodeURIComponent(message)}`);
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = getSafeRedirectPath(searchParams.get("next"), origin);

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    } else {
      // redirect the user to an error page with some instructions
      errorRedirect(error.message);
    }
  }

  // redirect the user to an error page with some instructions
  errorRedirect("No token hash or type");
}
