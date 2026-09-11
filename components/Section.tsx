import { clsx } from "@/lib/clsx";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

/**
 * Bloco de seção da landing. Espaço macro do Brand Book (py-24 a py-40).
 * Eyebrow opcional (usar como sistema, não em toda seção).
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  surface,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  surface?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx("py-section", surface && "bg-surface", className)}
    >
      <Container>
        {(eyebrow || title || intro) && (
          <div className="mb-8 max-w-measure md:mb-10">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="mt-4 text-titulo font-medium text-ink">{title}</h2>
            )}
            {intro && <p className="mt-4 text-corpo text-ink-2">{intro}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
