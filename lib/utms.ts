const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/**
 * Lê os 5 UTMs da query string. Se nenhum vier na URL, tenta
 * localStorage.captured_utms (cobre navegação interna depois da LP com ?utm=).
 * UTM novo na URL sobrescreve o localStorage (last-touch).
 */
export function getUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  let found = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utms[key] = value;
      found = true;
    }
  }

  if (!found) {
    try {
      const stored = localStorage.getItem("captured_utms");
      return stored ? (JSON.parse(stored) as Record<string, string>) : {};
    } catch {
      return {};
    }
  }

  try {
    localStorage.setItem("captured_utms", JSON.stringify(utms));
  } catch {
    /* modo privado / storage bloqueado: segue sem persistir */
  }
  return utms;
}
