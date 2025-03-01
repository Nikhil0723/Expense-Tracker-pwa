import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomMenuBar from "@/components/BottomMenuBar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AppSettingsProvider } from "@/context/AppSettingProvider";
import { TransactionProvider } from "@/context/TransactionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinGuard",
  description: "Organize your finances with FinGuard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  max-h-[100vh]`}
      >
        <AppSettingsProvider>
          <TransactionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className=" max-w-md mx-auto max-h-full relative dark:shadow-none shadow-md">
                {children}
              </main>
              <BottomMenuBar />
            </ThemeProvider>
          </TransactionProvider>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
