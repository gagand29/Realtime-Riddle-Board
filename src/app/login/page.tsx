'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleAuth = async () => {
    setError('')
    if (!email || !password || (isSignup && !name)) {
      setError('Please fill all fields')
      return
    }

    const { error } = isSignup
      ? await supabase.auth.signUp({ email, password, options: { data: { name } } })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) setError(error.message)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 space-y-5">
          <h2 className="text-2xl font-semibold text-center text-white">
            {isSignup ? 'Create Your Account' : 'Welcome Back'}
          </h2>

          {isSignup && (
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Gagan Doddanna"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300 flex justify-between items-center">
              Password
              {!isSignup && (
                <Link href="/forgot-password" className="text-xs text-blue-400 hover:underline">
                  Forgot?
                </Link>
              )}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>

          <p className="text-sm text-center text-gray-400">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              {isSignup ? 'Login' : 'Sign up'}
            </span>
          </p>

          <div className="border-t border-gray-700 pt-4 space-y-2">
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full bg-white text-black font-medium py-2 rounded-lg"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
