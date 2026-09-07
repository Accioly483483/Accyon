import Link from "next/link";
import { NodeMark } from "./NodeMark";
import { SERVICOS } from "@/content/servicos";

const LINKS = [
  { label: "Início", href: "/" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Para quem", href: "/#para-quem" },
  { label: "Glossário", href: "/glossario" },
  { label: "Contato", href: "/contato" },
  { label: "Privacidade", href: "/privacidade" },
];

const colClass =
  "block py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-2 transition-colors hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface py-16">
      <div className="container-accyon">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-measure">
            <div className="flex items-center gap-2.5">
              <NodeMark size={20} />
              <span className="font-display text-[1rem] font-semibold tracking-[0.16em] text-ink">
                Accyon
              </span>
            </div>
            <p className="mt-4 text-corpo text-ink-2">
              Infraestrutura para operações que precisam avançar.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav className="flex flex-col gap-3">
              <p className="mono text-eyebrow uppercase text-ink-2/70">Site</p>
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={colClass}>
                  {l.label}
                </Link>
              ))}
            </nav>

            <nav className="flex flex-col gap-3">
              <p className="mono text-eyebrow uppercase text-ink-2/70">Frentes</p>
              {SERVICOS.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`} className={colClass}>
                  {s.nav}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="font-display text-subtitulo text-ink">
            Toda operação tem uma ordem. Nós encontramos a sua.
          </p>
          <p className="mono mt-6 text-legenda text-ink-2">
            Accyon · CNPJ 66.008.856/0001-11 · Brasil · accioly483@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
