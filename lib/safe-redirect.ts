// `next` などユーザーが自由に指定できるリダイレクト先を、同一オリジンの相対パスに制限する。
// 文字列の前方一致だけでは `/\t/evil.com`（ブラウザがタブ・改行を除去して `//evil.com` になる）や
// `/\evil.com` を取りこぼすため、WHATWG URL パーサーで解決した結果のオリジンを検証する。
const PLACEHOLDER_ORIGIN = "http://localhost";

export function getSafeRedirectPath(next: string | null | undefined, fallback = "/"): string {
  if (!next || !next.startsWith("/")) {
    return fallback;
  }
  // 制御文字・バックスラッシュはブラウザ間で解釈が揺れるため一律に拒否する
  if (/[\u0000-\u001f\u007f\\]/.test(next)) {
    return fallback;
  }
  let url: URL;
  try {
    url = new URL(next, PLACEHOLDER_ORIGIN);
  } catch {
    return fallback;
  }
  if (url.origin !== PLACEHOLDER_ORIGIN || next.startsWith("//")) {
    return fallback;
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
