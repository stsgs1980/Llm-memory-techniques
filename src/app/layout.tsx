import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
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
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {/* WCAG: Skip to main content */}
        <a href="#main-content" className="zai-skip-link">
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
