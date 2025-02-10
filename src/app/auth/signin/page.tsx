'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { Eye, EyeOff, Lock, Mail, Loader } from 'lucide-react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectedFrom') || '/'

  // Handle mounting state to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize the Supabase client
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      // Rate limiting check
      const rateLimitKey = `signin_attempts_${email}`
      const attempts = parseInt(localStorage.getItem(rateLimitKey) || '0')
      if (attempts >= 5) {
        setError('Too many login attempts. Please try again later.')
        return
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      if (signInError) {
        localStorage.setItem(rateLimitKey, (attempts + 1).toString())
        setError(signInError.message)
        return
      }

      // Clear rate limiting on success
      localStorage.removeItem(rateLimitKey)
      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null // Prevent hydration issues
  }

  const message = searchParams.get('message')

  return (
    <div className="w-full max-w-md p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="mb-6">
            {/* Add your logo here */}
            <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to continue to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <div className="p-4 text-sm text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800">
              {message}
            </div>
          )}
          
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                disabled={isLoading}
                autoComplete="email"
              />
              <Mail className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <Lock className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500 transition-colors duration-200"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors duration-200">
                Remember me
              </span>
            </label>
            <Link
              href="/auth/reset-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 font-medium"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
} 