'use client'

import { usePrivy } from '@privy-io/react-auth'

export default function LoginButton() {
  const { login, logout, user, authenticated } = usePrivy()

  if (!authenticated) {
    return (
      <button
        onClick={login}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">
        Hello, {user?.email?.address || 'User'}
      </span>
      <button
        onClick={logout}
        className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        Sign Out
      </button>
    </div>
  )
}
