'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, using basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    // For demo, just redirect to login
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md">
        <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign up to get started</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-warning-DEFAULT bg-warning-DEFAULT/10 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent"
                  placeholder="Enter your full name"
                />
                <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

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

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent"
                  placeholder="Create a password"
                />
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary-DEFAULT bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded focus:ring-primary-DEFAULT dark:focus:ring-primary-dark"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-DEFAULT/80"
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link
                  href="/privacy"
                  className="text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-DEFAULT/80"
                >
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-DEFAULT hover:bg-primary-dark text-white rounded-lg transition-colors"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-DEFAULT/80"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
} 