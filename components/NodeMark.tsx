/**
 * O "nó" da Accyon: três braços que se encontram sem fechar, um deles ativo (azul).
 * Geometria do Brand Book: braços a 120°, vértice vazado, nenhum ângulo a 45°.
 * "aberto" para >=24px, "solido" para <20px (favicon, bullets).
 * Substituir pelo arquivo oficial de logo quando disponível.
 */
type Props = {
  size?: number;
  variant?: "aberto" | "solido";
  className?: string;
  title?: string;
};

export function NodeMark({ size = 24, variant = "aberto", className, title }: Props) {
  const stroke = variant === "solido" ? 5.2 : 3.4;
  const gap = variant === "solido" ? 0 : 3.2; // vértice vazado
  return (
    <svg
      width={size}
      height={size}
      viewBox="-20 -20 40 40"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* braço superior ativo */}
      <line x1="0" y1={-gap} x2="0" y2="-16" stroke="var(--sinal)" strokeWidth={stroke} />
      {/* braço inferior direito (120°) */}
      <line
        x1={gap * 0.87}
        y1={gap * 0.5}
        x2="13.9"
        y2="8"
        stroke="var(--ink-2)"
        strokeWidth={stroke}
      />
      {/* braço inferior esquerdo (240°) */}
      <line
        x1={-gap * 0.87}
        y1={gap * 0.5}
        x2="-13.9"
        y2="8"
        stroke="var(--ink-2)"
        strokeWidth={stroke}
      />
    </svg>
  );
}
