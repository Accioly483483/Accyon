"use client";

import { Button } from "./Button";
import { useLeadModal } from "./LeadModal";

export function OpenLeadModalButton({
  children,
  variant = "primary",
  arrow,
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
}) {
  const { open } = useLeadModal();
  return (
    <Button type="button" variant={variant} arrow={arrow} className={className} onClick={open}>
      {children}
    </Button>
  );
}
