import Link from "next/link";
import { clsx } from "@/lib/clsx";

/**
 * Botão / link de ação. Brand Book: cantos vivos (pílula proibida),
 * rótulo em mono caixa alta, feedback de toque (scale 0.98).
 * Variante "arrow": seta em wrapper quadrado próprio, desloca no hover do grupo.
 */
type Variant = "primary" | "ghost";

type CommonProps = {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AsLink = CommonProps & { href: string; onClick?: never; type?: never };
type AsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

const base =
  "press group inline-flex items-center gap-3 border font-mono text-eyebrow uppercase tracking-[0.16em] transition-colors";
const pad = "px-6 py-4";
const styles: Record<Variant, string> = {
  primary: "border-sinal bg-sinal text-bg hover:bg-sinal-hover",
  ghost: "border-line-2 bg-transparent text-ink-2 hover:text-ink",
};

function Arrow({ variant }: { variant: Variant }) {
  return (
    <span
      aria-hidden
      className={clsx(
        "grid h-7 w-7 place-items-center transition-transform duration-200 ease-out group-hover:translate-x-1",
        variant === "primary" ? "bg-bg/15" : "bg-surface",
      )}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h9M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", arrow, className, children } = props;
  const cls = clsx(base, pad, styles[variant], className);

  if ("href" in props && props.href) {
    const internal = props.href.startsWith("/");
    const inner = (
      <>
        {children}
        {arrow && <Arrow variant={variant} />}
      </>
    );
    return internal ? (
      <Link href={props.href} className={cls}>
        {inner}
      </Link>
    ) : (
      <a href={props.href} className={cls} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={cls}
    >
      {children}
      {arrow && <Arrow variant={variant} />}
    </button>
  );
}
