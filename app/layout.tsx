import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster';

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Companhia Artificial',
  description: 'Companhia Artificial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt" suppressHydrationWarning>
        <body className={cn("bg-secondary", inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
