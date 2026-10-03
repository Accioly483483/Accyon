"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Columns3 } from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Leads", icon: Users },
  { href: "/admin/kanban", label: "Kanban", icon: Columns3 },
];

/** Sidebar no desktop; vira barra de abas no celular. */
export function AdminNav() {
  const path = usePathname();
  return (
    <nav
      aria-label="Seções do painel"
      className="flex gap-1 border-b border-[var(--line)] bg-[var(--surface)] px-4 py-2 md:min-h-[calc(100dvh-57px)] md:w-52 md:shrink-0 md:flex-col md:border-b-0 md:border-r md:px-3 md:py-4"
    >
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 rounded-[8px] px-3 py-2 text-[0.85rem] transition-colors ${
              active
                ? "bg-[var(--surface-3)] font-medium text-[var(--ink)]"
                : "text-[var(--ink-2)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
