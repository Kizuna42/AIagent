import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

// `next` クエリはユーザーが自由に指定できるため、同一オリジンの相対パスのみ許可する。
// `//evil.com` や `/\evil.com`、`https://evil.com` を渡されてもオープンリダイレクトにならないようにする。
function getSafeRedirectPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return "/";
  }
  return next;
}

function errorRedirect(message: string): never {
  redirect(`/auth/error?error=${encodeURIComponent(message)}`);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = getSafeRedirectPath(searchParams.get("next"));

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
