import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLM Memory Guide — Индустриальный справочник по управлению памятью",
  description:
    "Интерактивный гид по 6 техникам управления памятью LLM: суммаризация, иерархическая память, RAG, извлечение фактов, sliding window, семантический кэш. Сравнения, калькуляторы, демо.",
  keywords: [
    "LLM",
    "memory management",
    "RAG",
    "summarization",
    "context window",
    "tokens",
    "GPT-4",
    "Claude",
    "AI",
  ],
  authors: [{ name: "LLM Memory Guide" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "LLM Memory Guide",
    description: "Интерактивный гид по управлению памятью LLM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
