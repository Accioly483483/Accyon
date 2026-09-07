export interface LeadMetadata {
  // Server-side (headers Vercel)
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  location?: string; // "city, region, country" pronto para exibir

  // Client-side
  userAgent?: string;
  language?: string;
  screenResolution?: string;
  windowSize?: string;

  // Derivado do userAgent (server-side)
  browser?: string;
  os?: string;
  device?: string;

  [key: string]: unknown;
}

export function parseUserAgent(ua: string | undefined): {
  browser: string;
  os: string;
  device: string;
} {
  if (!ua) return { browser: "", os: "", device: "" };

  let browser = "Outro";
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";
  else if (ua.includes("Chrome/") && !ua.includes("Edg/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("MSIE") || ua.includes("Trident/")) browser = "IE";

  let os = "Outro";
  // iOS antes de macOS: o UA do iPhone contém "like Mac OS X".
  if (ua.includes("iPhone") || ua.includes("iPad") || ua.includes("iPod"))
    os = "iOS";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Mac OS X") || ua.includes("Macintosh")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";

  let device = "Desktop";
  if (ua.includes("Mobile") || ua.includes("Android") || ua.includes("iPhone"))
    device = "Mobile";
  else if (ua.includes("iPad") || ua.includes("Tablet")) device = "Tablet";

  return { browser, os, device };
}

/**
 * Junta metadata do cliente com os headers de geo/IP que a Vercel injeta.
 * Fora da Vercel esses headers não existem: os campos ficam vazios, sem quebrar.
 */
export function buildLeadMetadata(
  clientMetadata: Record<string, unknown> | undefined,
  headers: Headers,
): LeadMetadata {
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
  const rawCity = headers.get("x-vercel-ip-city") || "";
  const rawRegion = headers.get("x-vercel-ip-country-region") || "";
  const rawCountry = headers.get("x-vercel-ip-country") || "";

  const clean = (v: string, bad: string) =>
    v && v !== bad ? v : "";
  const city = clean(rawCity ? decodeURIComponent(rawCity) : "", "Unknown city");
  const region = clean(rawRegion, "Unknown region");
  const country = clean(rawCountry, "Unknown country");
  const location = [city, region, country].filter(Boolean).join(", ");

  const userAgent =
    (clientMetadata?.userAgent as string) || headers.get("user-agent") || "";
  const { browser, os, device } = parseUserAgent(userAgent);

  const result: LeadMetadata = {
    ...(clientMetadata || {}),
    userAgent: userAgent || undefined,
    ip: ip || undefined,
    city: city || undefined,
    region: region || undefined,
    country: country || undefined,
    location: location || undefined,
    browser: browser || undefined,
    os: os || undefined,
    device: device || undefined,
  };

  for (const key of Object.keys(result)) {
    if (result[key] === undefined || result[key] === "") delete result[key];
  }
  return result;
}
