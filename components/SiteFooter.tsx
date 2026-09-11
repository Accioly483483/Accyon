export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface py-16">
      <div className="container-accyon">
        <div className="max-w-measure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/accyon-lockup.png" alt="Accyon" className="h-6 w-auto" />
          <p className="mt-4 text-corpo text-ink-2">
            Infraestrutura para operações que precisam avançar.
          </p>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="mono text-legenda text-ink-2">
            Accyon · CNPJ 66.008.856/0001-11 · Brasil · accioly483@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
