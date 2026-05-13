import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

// Import your layout components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ["freelance", "AI", "career", "gig economy", "talent"],
  authors: [{ name: "NexusAI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexusai.com",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {/* Flex wrapper to keep footer at the bottom */}
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            {/* Main content area */}
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}