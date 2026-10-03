"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "@/lib/clsx";
import { OpenLeadModalButton } from "./OpenLeadModalButton";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Quem somos", href: "/#quem-somos" },
  { label: "FAQ", href: "/faq" },
  { label: "Contato", href: "/contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const secao = useSecaoNaTela(pathname);
  // item ativo: rota atual; na Home, a seção (#como-funciona / #quem-somos) que está na tela
  const ativo = (href: string) =>
    href.startsWith("/#")
      ? pathname === "/" && secao === href.slice(2)
      : href === "/"
        ? pathname === "/" && !secao
        : pathname === href;

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute left-0 top-0 h-px w-px" />
      <header
        className={clsx(
          "sticky top-0 z-40 transition-colors duration-200 ease-out",
          scrolled
            ? "border-b border-line bg-bg/85 backdrop-blur"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-accyon flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center" aria-label="Accyon, início">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/accyon-lockup.png" alt="Accyon" className="h-6 w-auto md:h-7" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo(item.href) ? "page" : undefined}
                className={clsx(
                  "whitespace-nowrap font-mono text-[0.68rem] uppercase tracking-[0.05em] underline-offset-[6px] transition-colors",
                  ativo(item.href)
                    ? "text-ink underline decoration-sinal decoration-2"
                    : "text-ink-2 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <OpenLeadModalButton variant="primary">
              Falar com especialista
            </OpenLeadModalButton>
          </div>

          <button
            type="button"
            className="press grid h-10 w-10 place-items-center lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6">
              <span
                className={clsx(
                  "absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ease-out",
                  open ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1/2 block h-px w-6 bg-ink transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ease-out",
                  open ? "top-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* overlay mobile */}
      <div
        className={clsx(
          "fixed inset-0 z-30 bg-bg/95 backdrop-blur transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="container-accyon flex flex-col gap-6 pt-28">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={ativo(item.href) ? "page" : undefined}
              className={clsx(
                "font-display text-subtitulo transition-all duration-300 ease-out",
                ativo(item.href) ? "text-sinal" : "text-ink",
              )}
              style={{
                transitionDelay: open ? `${100 + i * 50}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4" onClickCapture={() => setOpen(false)}>
            <OpenLeadModalButton variant="primary" arrow className="font-semibold">
              Falar com especialista
            </OpenLeadModalButton>
          </div>
        </nav>
      </div>
    </>
  );
}

/* Na Home, qual seção com item no menu está na tela: #como-funciona quando ocupa
   o meio da tela; #quem-somos (faixa curta no fim, nunca chega ao meio) quando
   aparece inteira. Fora delas, null. */
function useSecaoNaTela(pathname: string) {
  const [secao, setSecao] = useState<"como-funciona" | "quem-somos" | null>(null);
  useEffect(() => {
    setSecao(null);
    if (pathname !== "/") return;
    const visto = { "como-funciona": false, "quem-somos": false };
    const regras: [keyof typeof visto, IntersectionObserverInit][] = [
      ["como-funciona", { rootMargin: "-45% 0px -45% 0px" }],
      ["quem-somos", { threshold: 1 }],
    ];
    const ios = regras.map(([id, opts]) => {
      const io = new IntersectionObserver(([e]) => {
        visto[id] = e.isIntersecting;
        setSecao(visto["quem-somos"] ? "quem-somos" : visto["como-funciona"] ? "como-funciona" : null);
      }, opts);
      const el = document.getElementById(id);
      if (el) io.observe(el);
      return io;
    });
    return () => ios.forEach((io) => io.disconnect());
  }, [pathname]);
  return secao;
}
