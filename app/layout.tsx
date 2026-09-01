import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/styles/scss/site.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumiere-lash-studio.teachercrispim-ctrlp.chatgpt.site"),
  title: "Kaylane Silva | Lash Designer e Extensão de Cílios",
  description:
    "Kaylane Silva é Lash Designer especializada em extensão de cílios com mapeamento personalizado, técnica delicada e acabamento sofisticado.",
  keywords: [
    "lash designer",
    "Kaylane Silva",
    "extensão de cílios",
    "volume brasileiro",
    "volume egípcio",
    "volume russo",
    "lash lifting",
  ],
  openGraph: {
    title: "Kaylane Silva — Lash Designer",
    description: "Seu olhar, sua assinatura.",
    url: "https://lumiere-lash-studio.teachercrispim-ctrlp.chatgpt.site",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kaylane Silva — Lash Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaylane Silva — Lash Designer",
    description: "Seu olhar, sua assinatura.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/assets/kaylane-silva-logo.png",
    shortcut: "/assets/kaylane-silva-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b2476d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
