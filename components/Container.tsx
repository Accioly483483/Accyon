import { clsx } from "@/lib/clsx";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx("container-accyon", className)}>{children}</div>;
}
