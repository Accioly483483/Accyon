/**
 * Camada de eventos. Fase 3: estrutura pronta, sem IDs.
 * Fase 2 (do plano): preencher NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_META_PIXEL_ID
 * e implementar os disparos. Por ora tudo é no-op silencioso + dataLayer.push.
 */
type EventName =
  | "cta_analysis_click"
  | "form_start"
  | "form_step"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "contact_click"
  | "scroll_50"
  | "scroll_90";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(name: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  // GA4 / Meta Pixel entram aqui quando os IDs existirem.
}

/** Chamado no sucesso do form, com o eventId do servidor (dedup futuro com CAPI). */
export function trackLead(args: {
  eventId?: string;
  formSlug: string;
  value?: number;
}) {
  track("form_success", args);
}
