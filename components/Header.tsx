'use client'

import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import LoginButton from './LoginButton'

export default function Header() {
  const { user } = usePrivy()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold">
            MyBlog
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-600">
              Home
            </Link>
            {user && (
              <Link href="/dashboard" className="hover:text-gray-600">
                Dashboard
              </Link>
            )}
          </nav>
        </div>
        <LoginButton />
      </div>
    </header>
  )
}
