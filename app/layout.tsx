import type { Metadata } from 'next'
import { Syne, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] })

export const metadata: Metadata = {
  title: 'AtlasKodo.dev - Full-Stack Engineer & Solutions Architect',
  description: 'Elite full-stack engineer building production-grade platforms. From MVPs to enterprise dashboards, every line of code is intentional.',
  generator: 'v0.app',
  icons: {
    // Provide a standard favicon.ico so browsers don't fall back to a default icon
    // (and to avoid aggressive caching issues with non-standard favicon setups).
    shortcut: '/favicon.ico',
    icon: [
      { url: '/favicon.ico' },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ '--font-display': syne.style.fontFamily, '--font-body': outfit.style.fontFamily } as React.CSSProperties}>
      <body className="font-body antialiased bg-dark-950 text-light-100">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
