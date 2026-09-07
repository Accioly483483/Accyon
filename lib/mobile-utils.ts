import type { FocusEvent } from "react";

/**
 * Correção do bug de teclado virtual mobile (Instagram in-app, iOS Safari,
 * Android Chrome): ao focar um input, o teclado cobria input + botão.
 * Plugar em TODO input com onFocus={scrollInputIntoView}.
 */
export function scrollInputIntoView(
  e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
) {
  const target = e.currentTarget;
  setTimeout(() => {
    try {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      target.scrollIntoView();
    }
  }, 300); // espera a animação do teclado abrir
}
