import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Apex Motors | Catálogo Digital',
  description: 'Seminovos periciados • Entrega em todo Brasil',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-zinc-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}