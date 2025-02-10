'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, using basic validation
    if (!email) {
      setError('Please enter your email')
      return
    }
    
    // For demo, just show success message
    setSuccess(true)
    setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md">
        <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">Reset Password</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          {/* Form */}
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-warning-DEFAULT bg-warning-DEFAULT/10 rounded-lg">
                  {error}
                </div>
              )}

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
                  />
                  <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary-DEFAULT hover:bg-primary-dark text-white rounded-lg transition-colors"
              >
                Send Reset Instructions
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{' '}
                <Link
                  href="/login"
                  className="text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-DEFAULT/80"
                >
                  Back to login
                </Link>
              </p>
            </form>
          ) : (
            <div className="text-center">
              <div className="p-3 text-sm text-success-DEFAULT bg-success-DEFAULT/10 rounded-lg mb-6">
                Password reset instructions have been sent to your email
              </div>
              <Link
                href="/login"
                className="text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-DEFAULT/80"
              >
                Back to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 