"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { clsx } from "@/lib/clsx";

/**
 * Revelação por scroll do Brand Book: subida 20px + blur 8->0 + opacidade,
 * IntersectionObserver (margem -12% na base), uma vez por elemento.
 *
 * Progressive enhancement: renderiza VISÍVEL no servidor. Só arma a animação
 * no cliente, se houver JS e não houver prefers-reduced-motion. Elemento já
 * visível no viewport ao montar não anima (evita flash). Sem listener de scroll.
 */
// idle: SSR, sem classe (visível). visible: já no viewport / reduced-motion,
// nenhuma classe adicionada. armed: abaixo da dobra, prestes a animar (.reveal).
// shown: animando/animado (.reveal.is-in).
type State = "idle" | "visible" | "armed" | "shown";

export function Reveal({
  as: Tag = "div" as ElementType,
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (reduce || inView) {
      setState("visible");
      return;
    }

    setState("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={clsx(
        state === "armed" && "reveal",
        state === "shown" && "reveal is-in",
        className,
      )}
      style={delay ? { ["--reveal-delay" as string]: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
