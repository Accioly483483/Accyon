import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: { absolute: "Política de Privacidade | Accyon" },
  description:
    "Como a Accyon coleta, usa e protege os dados enviados pelos formulários do site, e como exercer seus direitos previstos na LGPD.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

// TODO antes do launch: preencher CNPJ, endereço e e-mail do encarregado (DPO).
// Recomendável revisão jurídica deste texto.
const CNPJ = "{{CNPJ}}";
const ENDERECO = "{{endereço completo}}";
const EMAIL_ENCARREGADO = "{{e-mail do encarregado de dados}}";
const ATUALIZADO_EM = "7 de setembro de 2026";

function Bloco({ n, titulo, children }: { n: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-line py-8">
      <h2 className="text-subtitulo text-ink">
        <span className="mono mr-3 text-legenda text-ink-2">{n}</span>
        {titulo}
      </h2>
      <div className="mt-4 max-w-measure space-y-3 text-corpo text-ink-2">
        {children}
      </div>
    </section>
  );
}

export default function Privacidade() {
  return (
    <Section eyebrow="Privacidade" title="Política de Privacidade">
      <p className="max-w-measure text-corpo text-ink-2">
        Esta política explica quais dados a Accyon coleta pelos formulários deste
        site, para que usa, com quem compartilha e como você exerce os direitos
        previstos na Lei Geral de Proteção de Dados (Lei 13.709/2018).
      </p>
      <p className="mono mt-3 text-legenda text-ink-2">
        Atualizada em {ATUALIZADO_EM}
      </p>

      <div className="mt-12 border-t border-line">
        <Bloco n="01" titulo="Quem é o controlador dos dados">
          <p>
            A Accyon é a controladora dos dados pessoais tratados neste site.
            Dados de registro: CNPJ {CNPJ}, endereço {ENDERECO}. Contato do
            encarregado pelo tratamento de dados: {EMAIL_ENCARREGADO}.
          </p>
        </Bloco>

        <Bloco n="02" titulo="Quais dados são coletados">
          <p>
            Dados que você informa no formulário: nome, WhatsApp, e-mail, empresa
            que representa, serviços de interesse e o texto livre sobre a sua
            operação.
          </p>
          <p>
            Dados coletados automaticamente quando você usa o site: endereço IP,
            localização aproximada derivada do IP (cidade, estado, país),
            idioma do navegador, tipo de navegador, sistema operacional,
            tipo de dispositivo, resolução de tela e parâmetros de campanha
            (utm_source, utm_medium, utm_campaign, utm_term, utm_content) quando
            presentes no endereço de acesso.
          </p>
        </Bloco>

        <Bloco n="03" titulo="Para que os dados são usados">
          <p>
            Para entender o contexto da sua operação, responder ao seu contato e
            avaliar um possível projeto. Os dados técnicos e de campanha são
            usados para segurança, prevenção de uso indevido e para entender de
            onde vêm os contatos.
          </p>
        </Bloco>

        <Bloco n="04" titulo="Base legal">
          <p>
            O tratamento dos dados do formulário se apoia no seu consentimento,
            manifestado ao enviar o formulário, e na execução de procedimentos
            preliminares a um contrato, a seu pedido. Os dados técnicos se apoiam
            no legítimo interesse da Accyon em manter a segurança do site e
            avaliar a origem dos contatos.
          </p>
        </Bloco>

        <Bloco n="05" titulo="Com quem os dados são compartilhados">
          <p>
            Os dados são armazenados e processados por operadores contratados
            pela Accyon: Supabase (banco de dados) e Vercel (hospedagem). Esses
            operadores podem processar os dados em servidores fora do Brasil,
            inclusive nos Estados Unidos. A Accyon não vende dados pessoais e não
            os compartilha para fins de publicidade de terceiros.
          </p>
        </Bloco>

        <Bloco n="06" titulo="Por quanto tempo os dados são guardados">
          <p>
            Enquanto durar a avaliação do projeto e o relacionamento comercial, e
            pelos prazos exigidos por lei depois disso. Você pode pedir a
            exclusão antes desses prazos, salvo quando a Accyon precisar manter o
            dado para cumprir uma obrigação legal.
          </p>
        </Bloco>

        <Bloco n="07" titulo="Seus direitos">
          <p>Você pode, a qualquer momento, solicitar:</p>
          <ul className="space-y-2">
            <li>confirmação de que a Accyon trata dados seus, e acesso a eles;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>portabilidade dos dados a outro fornecedor;</li>
            <li>informação sobre com quem a Accyon compartilhou seus dados;</li>
            <li>revogação do consentimento.</li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, escreva para{" "}
            {EMAIL_ENCARREGADO}.
          </p>
        </Bloco>

        <Bloco n="08" titulo="Cookies e armazenamento local">
          <p>
            Este site não usa cookies de rastreamento de terceiros. Os parâmetros
            de campanha (UTMs) ficam guardados no armazenamento local do seu
            navegador para não se perderem enquanto você navega entre páginas.
            Se ferramentas de medição de terceiros forem adotadas no futuro, esta
            política será atualizada antes.
          </p>
        </Bloco>

        <Bloco n="09" titulo="Alterações nesta política">
          <p>
            Quando esta política mudar, a data de atualização no topo desta
            página muda junto. Mudanças relevantes serão sinalizadas no site.
          </p>
        </Bloco>
      </div>

      <p className="mt-10 text-corpo text-ink-2">
        Voltar para <Link href="/" className="text-sinal underline underline-offset-4">o início</Link>.
      </p>
    </Section>
  );
}
