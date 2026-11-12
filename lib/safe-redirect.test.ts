import assert from "node:assert/strict";
import { test } from "node:test";

import { getSafeRedirectPath } from "./safe-redirect.ts";

test("同一オリジンの相対パスはそのまま返す", () => {
  assert.equal(getSafeRedirectPath("/protected"), "/protected");
  assert.equal(getSafeRedirectPath("/protected?tab=1#top"), "/protected?tab=1#top");
});

test("未指定・空文字はフォールバックを返す", () => {
  assert.equal(getSafeRedirectPath(null), "/");
  assert.equal(getSafeRedirectPath(undefined), "/");
  assert.equal(getSafeRedirectPath(""), "/");
  assert.equal(getSafeRedirectPath(null, "/protected"), "/protected");
});

test("外部オリジンへのリダイレクトを拒否する", () => {
  for (const input of [
    "https://evil.com",
    "//evil.com",
    "///evil.com",
    "/\\evil.com",
    "/\t/evil.com",
    "/\n/evil.com",
    "/\r\n/evil.com",
    "\\\\evil.com",
    "javascript:alert(1)",
    "evil.com",
    "/%0a/evil.com/../",
  ]) {
    const result = getSafeRedirectPath(input);
    assert.ok(
      result.startsWith("/") && !result.startsWith("//"),
      `${JSON.stringify(input)} -> ${result}`,
    );
    assert.equal(new URL(result, "https://app.example").origin, "https://app.example");
  }
});

test("制御文字・バックスラッシュを含む値はフォールバックする", () => {
  assert.equal(getSafeRedirectPath("/\t/evil.com"), "/");
  assert.equal(getSafeRedirectPath("/foo\\bar"), "/");
});
