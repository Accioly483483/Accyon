import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { LeadModalProvider } from "@/components/LeadModal";
import { graph, organizationNode, websiteNode, personNode } from "@/lib/schema";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LeadModalProvider>
      <JsonLd data={graph([organizationNode(), websiteNode(), personNode()])} />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </LeadModalProvider>
  );
}
