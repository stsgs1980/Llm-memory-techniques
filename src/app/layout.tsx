import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CRTShader } from "@/components/effects/CRTShader";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LLM Memory Guide — Terminal Interface",
  description:
    "Interactive terminal guide to 6 LLM memory management techniques: summarization, hierarchical memory, RAG, fact extraction, sliding window, semantic cache.",
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
    description: "Interactive terminal guide to LLM memory management",
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
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <CRTShader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
