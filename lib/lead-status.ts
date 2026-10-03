/** Etapas do funil (colunas do kanban). Valor gravado em accyon_leads.status. */
export const LEAD_STATUSES = [
  { value: "novo", label: "Novo" },
  { value: "em_contato", label: "Em contato" },
  { value: "reuniao", label: "Reunião" },
  { value: "proposta", label: "Proposta" },
  { value: "fechado", label: "Fechado" },
  { value: "perdido", label: "Perdido" },
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number]["value"];

export const isLeadStatus = (s: string): s is LeadStatus =>
  LEAD_STATUSES.some((x) => x.value === s);

/** Status desconhecido (legado) cai em "novo". */
export const statusOf = (s: string): LeadStatus => (isLeadStatus(s) ? s : "novo");

export const statusLabel = (s: string) =>
  LEAD_STATUSES.find((x) => x.value === statusOf(s))!.label;
