import { createHmac } from "crypto";

// Captcha de soma: trava bot casual no /login. Segredo derivado da service_role.
const SECRET = createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY ?? "x")
  .update("accyon-captcha-v1")
  .digest("hex");

export function tokenFor(answer: string): string {
  return createHmac("sha256", SECRET).update(String(answer).trim()).digest("hex");
}

export function newCaptcha() {
  const a = 1 + Math.floor(Math.random() * 8);
  const b = 1 + Math.floor(Math.random() * 8);
  return { a, b, token: tokenFor(String(a + b)) };
}
