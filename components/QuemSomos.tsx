"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { Popup } from "./Popup";

/** Faixa no fim da Home (acima do rodapé), âncora #quem-somos do menu.
    O botão abre o "Quem somos" em pop-up (ex-página /quem-somos). */
export function QuemSomos() {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <section id="quem-somos" className="border-t border-line py-8">
      <Container className="flex justify-end">
        <button
          type="button"
          onClick={() => ref.current?.showModal()}
          aria-haspopup="dialog"
          aria-label="Quem somos: conheça a Accyon"
          className="group inline-flex items-center gap-3 rounded-full border border-line bg-surface py-2 pl-5 pr-2 text-[0.95rem] font-medium text-ink transition-[border-color,box-shadow] duration-300 ease-out hover:border-sinal hover:shadow-[0_0_0_1px_var(--sinal),0_8px_28px_-10px_color-mix(in_srgb,var(--sinal)_45%,transparent)]"
        >
          Conheça a
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/accyon-wordmark.png"
            alt=""
            className="-ml-1 inline-block h-[0.8em] w-auto"
          />
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-full border border-line-2 text-ink-2 transition-[color,border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-sinal group-hover:text-sinal"
          >
            <ArrowUpRight size={14} />
          </span>
        </button>
      </Container>

      <Popup ref={ref} label="Quem somos">
        <h2 className="px-8 text-center text-[1.375rem] font-medium leading-snug tracking-[-0.01em] text-ink">
          O que é a{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/accyon-wordmark.png"
            alt="Accyon"
            className="inline-block h-[0.7em] w-auto align-baseline"
          />
          ?
        </h2>
        <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-ink-2">
          <p>
            A Accyon é uma empresa brasileira de infraestrutura operacional e comercial,
            situada no Rio de Janeiro, fundada por Matheus Accioly.
          </p>
          <p>
            Ajudamos empreendedores e empresas a organizar, conectar e automatizar suas
            operações e vender mais.
          </p>
          <p>
            A empresa analisa como pessoas, processos e ferramentas trabalham atualmente,
            identifica gargalos e constrói estruturas sob medida utilizando processos, CRM,
            automações, integrações, inteligência artificial, dados e sistemas.
          </p>
          <p>
            O objetivo é criar uma operação mais clara, conectada e capaz de funcionar com
            mais velocidade e menos trabalho manual.
          </p>
        </div>
      </Popup>
    </section>
  );
}
