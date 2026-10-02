/**
 * Esteira horizontal em loop com os sinais de operação travando. A lista é
 * duplicada e anda -50%, então o fim encosta no começo sem salto. Pausa no
 * hover; prefers-reduced-motion: para e vira rolagem manual.
 */
export const SINAIS_ESTEIRA = [
  "Não dei a devolutiva no prazo.",
  "Esqueci de agendar a reunião.",
  "Não reservei o horário.",
  "Esqueci de retornar o contato.",
  "Não realizei o follow-up com o lead.",
  "Informações perdidas em conversas de WhatsApp.",
  "Informações cadastrais incompletas.",
  "Etapa do negócio desatualizada.",
  "Enviei a proposta, mas não acompanhei depois.",
  "Agendamentos para o mesmo horário.",
  "Não enviei o lembrete da reunião para o lead.",
  "Esqueci de reagendar um compromisso cancelado.",
  "Processos não listados.",
  "Etapas puladas.",
  "Tarefas sem visibilidade para cobrar.",
  "O processo funciona enquanto determinada pessoa está presente.",
  "Informação não lançada no sistema.",
  "Dados não atualizados.",
  "Informação não localizada.",
];

function Card({ texto }: { texto: string }) {
  return (
    <li className="flex min-h-[9.5rem] w-[17rem] flex-none flex-col gap-6 rounded-2xl border border-line bg-bg p-5">
      <div className="flex items-center justify-center gap-2">
        <span aria-hidden className="text-[1.25rem] leading-none">🗣️</span>
        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" className="text-danger">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </div>
      <span className="mt-auto text-corpo leading-snug text-ink">{texto}</span>
    </li>
  );
}

export function Esteira() {
  return (
    <div>
      <ul className="sr-only">
        {SINAIS_ESTEIRA.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div aria-hidden className="esteira">
        <ul className="esteira-trilho" style={{ animationDuration: "110s" }}>
          {[...SINAIS_ESTEIRA, ...SINAIS_ESTEIRA].map((t, i) => (
            <Card key={i} texto={t} />
          ))}
        </ul>
      </div>
    </div>
  );
}
