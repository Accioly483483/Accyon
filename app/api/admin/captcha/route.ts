import { newCaptcha } from "@/lib/captcha";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return Response.json(newCaptcha());
}
