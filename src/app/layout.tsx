import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "LLM Memory Guide",
  description:
    "Interactive guide to 6 LLM memory management techniques: summarization, hierarchical memory, RAG, fact extraction, sliding window, semantic cache.",
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
    description: "Interactive guide to LLM memory management",
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
        className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/* Background Layers */}
        <div className="grain" aria-hidden="true" />
        <div className="mesh-drift" aria-hidden="true" />
        <div className="dot-grid" aria-hidden="true" />
        <div className="contour" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        <div className="side-left" aria-hidden="true" />
        <div className="side-right" aria-hidden="true" />
        <div className="ambient" aria-hidden="true" />
        
        {children}
        <Toaster />
      </body>
    </html>
  );
}
