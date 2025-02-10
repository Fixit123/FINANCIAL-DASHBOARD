'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { Eye, EyeOff, Lock, Mail, User, Loader } from 'lucide-react'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

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
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!acceptTerms) {
      setError('Please accept the Terms of Service and Privacy Policy')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    // Basic password strength validation
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      // Rate limiting check
      const rateLimitKey = `signup_attempts_${email}`
      const attempts = parseInt(localStorage.getItem(rateLimitKey) || '0')
      if (attempts >= 3) {
        setError('Too many signup attempts. Please try again later.')
        return
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: name.trim()
          }
        }
      })

      if (signUpError) {
        localStorage.setItem(rateLimitKey, (attempts + 1).toString())
        setError(signUpError.message)
        return
      }

      // Clear rate limiting on success
      localStorage.removeItem(rateLimitKey)
      router.push('/auth/signin?message=Please check your email to confirm your account')
      router.refresh()
    } catch (err) {
      setError('An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null // Prevent hydration issues
  }

  return (
    <div className="w-full max-w-md p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="mb-6">
            {/* Add your logo here */}
            <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign up to get started</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <div className="relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                disabled={isLoading}
                autoComplete="name"
              />
              <User className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
            </div>
          </div>

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
                placeholder="Create a password"
                disabled={isLoading}
                autoComplete="new-password"
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
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters
            </p>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500 transition-colors duration-200"
                disabled={isLoading}
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="text-gray-600 dark:text-gray-400">
                I accept the{' '}
                <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 font-medium"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
} 