"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clsx } from "@/lib/clsx";
import { NodeMark } from "./NodeMark";
import { Button } from "./Button";

const NAV = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Infraestrutura", href: "/#infraestrutura" },
  { label: "Para quem", href: "/#para-quem" },
  { label: "Contato", href: "/contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement | null>(null);

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
          <Link href="/" className="flex items-center gap-2.5" aria-label="Accyon, início">
            <NodeMark size={22} />
            <span className="font-display text-[1.05rem] font-semibold tracking-[0.16em] text-ink">
              Accyon
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-2 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="/contato" variant="primary">
              Solicitar análise
            </Button>
          </div>

          <button
            type="button"
            className="press grid h-10 w-10 place-items-center md:hidden"
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
          "fixed inset-0 z-30 bg-bg/95 backdrop-blur transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="container-accyon flex flex-col gap-6 pt-28">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-subtitulo text-ink transition-all duration-300 ease-out"
              style={{
                transitionDelay: open ? `${100 + i * 50}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4">
            <Button href="/contato" variant="primary" arrow>
              Solicitar análise
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
