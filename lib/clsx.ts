/** Junta classes, ignora falsy. Sem dependência. */
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
