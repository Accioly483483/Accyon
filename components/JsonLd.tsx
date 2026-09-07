/**
 * Renderiza um bloco JSON-LD. Server component.
 * Conteúdo vem só dos arquivos de copy do projeto (confiável). Ainda assim,
 * escapamos "<" para "<" para nenhum valor conseguir fechar o <script>.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
