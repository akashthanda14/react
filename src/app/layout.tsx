import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalMain from "@/components/ConditionalMain";
import { SessionProvider } from "@/components/SessionProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Akash Code Official — Structured Engineering Roadmaps",
    template: "%s | Akash Code Official",
  },
  description:
    "Structured, phase-based learning tracks for engineers targeting senior roles in Backend, DevOps, System Design, GenAI, and Full Stack — built from 20 years of production experience by @akashcodeofficial.",
  keywords: [
    "Akash Code Official",
    "akashcodeofficial",
    "engineering roadmap",
    "backend engineering",
    "system design",
    "devops",
    "genai",
    "full stack",
    "software engineering",
    "learning tracks",
    "mentorship",
    "production experience",
  ],
  authors: [{ name: "Akash Code Official", url: "https://www.instagram.com/akashcodeofficial" }],
  creator: "Akash Code Official",
  publisher: "Akash Code Official",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "Akash Code Official",
    title: "Akash Code Official — Structured Engineering Roadmaps",
    description:
      "Phase-based learning tracks in Backend, System Design, DevOps, and GenAI — built from 20 years of production experience. Trusted by 128K+ engineers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Code Official — Structured Engineering Roadmaps",
    description:
      "Phase-based learning tracks in Backend, System Design, DevOps, and GenAI — built from 20 years of production experience.",
    creator: "@akashcodeofficial",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7G1RJWFCRH"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7G1RJWFCRH');
            `,
          }}
        />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-body`}
      >
        <SessionProvider>
          <ConditionalNavbar />
          <ConditionalMain>{children}</ConditionalMain>
          <ConditionalFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
