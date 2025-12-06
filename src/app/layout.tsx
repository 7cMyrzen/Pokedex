import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/* Components */
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { GsapProvider } from "@/components/GsapProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });

export const metadata: Metadata = { title: "Pokédex", description: "Site web de Pokédex contenant des informations sur les Pokémon.", icons: { icon: "/logo.svg" } };

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>

      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem("theme");
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                const themeToApply = savedTheme && savedTheme !== "system" ? savedTheme : systemTheme;
                document.documentElement.classList.add(themeToApply);
              } catch (e) {}
            `,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full bg-fixed overflow-x-hidden bg-gradient-to-b from-background via-background to-muted/10`}>
        {/* Background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-red-500/20 to-rose-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-90 dark:opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -right-20 -bottom-20 w-[30rem] h-[30rem] bg-gradient-to-br from-rose-600/20 to-red-700/20 rounded-full mix-blend-multiply filter blur-3xl opacity-90 dark:opacity-70 animate-blob animation-delay-4000" />
          <div className="absolute top-2/3 left-2/3 w-[30rem] h-[30rem] bg-gradient-to-br from-red-600/20 to-rose-700/20 rounded-full mix-blend-multiply filter blur-3xl opacity-90 dark:opacity-70 animate-blob" />
        </div>
        {/* Header */}
        <header className="fixed top-8 mb-8 left-0 w-full z-50">
          <Header />
        </header>

        <GsapProvider>
          <SmoothScrollWrapper>
            <main className="w-full flex justify-center pt-24">
              {children}
            </main>

            <footer className="mt-40">
              <Footer />
            </footer>
          </SmoothScrollWrapper>
        </GsapProvider>

      </body>
    </html>
  );
}