import { clsx } from "@/lib/clsx";

/**
 * Rótulo curto acima de um título. Padrão do Brand Book:
 * filete acima, retangular, caixa alta, mono, tracking +0.22em, cor Azul de Sinal.
 * Usar como sistema deliberado, não acima de toda seção.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "mono inline-block border-t border-line pt-3 text-eyebrow uppercase text-sinal",
        className,
      )}
    >
      {children}
    </span>
  );
}
