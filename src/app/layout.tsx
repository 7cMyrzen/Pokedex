import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { GsapProvider } from "@/components/GsapProvider";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Box } from "@mui/material";
import { BackgroundBlobs } from "@/components/Layout/BackgroundBlobs";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });

export const metadata: Metadata = { title: "Pokédex", description: "Site web de Pokédex contenant des informations sur les Pokémon.", icons: { icon: "/logo.svg" } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ margin: 0, height: '100%' }}>
        <ThemeRegistry>
          <Box sx={{
            minHeight: '100vh',
            width: '100%',
            overflowX: 'hidden',
            background: 'linear-gradient(to bottom, background.default, background.paper)', // Approx
            bgcolor: 'background.default',
            position: 'relative'
          }}>
            {/* Background elements (Blobs) */}
            <BackgroundBlobs />

            <Box component="header" sx={{ position: 'fixed', top: 32, mb: 4, left: 0, width: '100%', zIndex: 50 }}>
              <Header />
            </Box>

            <GsapProvider>
              <FavoritesProvider>
                <SmoothScrollWrapper>
                  <Box component="main" sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: 12, position: 'relative', zIndex: 1 }}>
                    {children}
                    <Analytics />
                  </Box>
                  <Box component="footer" sx={{ mt: 20 }}>
                    <Footer />
                  </Box>
                </SmoothScrollWrapper>
              </FavoritesProvider>
            </GsapProvider>

          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
