import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { AdminProviders } from "@/components/admin/Providers";
import "./admin.css";

const admin = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-admin",
  display: "optional",
});

export const metadata: Metadata = {
  title: { absolute: "Painel Accyon" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`admin-root ${admin.variable}`} suppressHydrationWarning>
      <AdminProviders>{children}</AdminProviders>
    </div>
  );
}
