import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Authentication - Financial Dashboard",
  description: "Authentication pages for Financial Dashboard",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark`}>
        {children}
      </body>
    </html>
  )
} 