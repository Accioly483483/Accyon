export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface py-8">
      <div className="container-accyon flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/accyon-lockup.png" alt="Accyon" className="h-5 w-auto" />
          <p className="text-legenda text-ink-2">
            Infraestrutura para operações que precisam avançar.
          </p>
        </div>
        <p className="mono text-legenda text-ink-2">
          CNPJ 66.008.856/0001-11 · Brasil · m.accioly@accioly483.cloud
        </p>
      </div>
    </footer>
  );
}
