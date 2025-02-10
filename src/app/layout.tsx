import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Financial Dashboard",
  description: "Financial Dashboard with Task Management Interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-background-light dark:bg-background-dark text-gray-900 dark:text-white antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1">
              <Header />
              <main className="ml-20 pt-16">
                <div className="max-w-[1200px] mx-auto p-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
