import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PrivyProvider } from '@privy-io/react-auth'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Blog Site',
  description: 'A simple blog site with Privy authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            loginMethods: ['email', 'wallet'],
            appearance: {
              theme: 'light',
              accentColor: '#676FFF',
            },
          }}
        >
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </PrivyProvider>
      </body>
    </html>
  )
}
