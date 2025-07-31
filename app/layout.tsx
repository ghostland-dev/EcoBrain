import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoBrain - Conformité Écologique Simplifiée par l'IA",
  description:
    "Transformez votre entreprise en leader écologique tout en économisant de l'argent. Audit gratuit en 2 minutes.",
  keywords: "écologie, conformité, CSRD, audit écologique, économies, IA, développement durable",
  authors: [{ name: "EcoBrain Team" }],
  openGraph: {
    title: "EcoBrain - Conformité Écologique Simplifiée par l'IA",
    description: "Transformez votre entreprise en leader écologique tout en économisant de l'argent.",
    type: "website",
    locale: "fr_FR",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
