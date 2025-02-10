'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Loader } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Memoize the Supabase client to prevent recreation on each render
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess(true)
    } catch (err) {
      setError('An error occurred while sending reset instructions')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md">
        <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">Reset Password</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email to receive password reset instructions
            </p>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-warning-DEFAULT bg-warning-DEFAULT/10 rounded-lg">
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center space-y-4">
                <div className="p-3 text-sm text-success-DEFAULT bg-success-DEFAULT/10 rounded-lg">
                  Reset instructions have been sent to your email. Please check your inbox.
                </div>
                <Link
                  href="/auth/signin"
                  className="inline-block text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-DEFAULT/80"
                >
                  Back to login
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent"
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-primary-DEFAULT hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Instructions'
                  )}
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Remember your password?{' '}
                  <Link
                    href="/auth/signin"
                    className="text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-DEFAULT/80"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
} 