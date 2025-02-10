'use client'

import { useState, useMemo } from 'react'
import { 
  Calendar as CalendarIcon,
  RefreshCw,
  Bell,
  User,
  Sun,
  Moon,
  LogOut,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

interface Notification {
  id: number
  message: string
  time: string
}

const notifications: Notification[] = [
  {
    id: 1,
    message: "New comment on your report",
    time: "5m ago"
  },
  {
    id: 2,
    message: "Meeting scheduled for tomorrow",
    time: "1h ago"
  },
  {
    id: 3,
    message: "Your presentation was approved",
    time: "2h ago"
  }
]

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Memoize the Supabase client
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
      window.location.reload()
    }, 1000)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCurrentDate(newDate)
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/auth/signin')
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <header className="fixed top-0 right-0 left-20 h-16 bg-card-light dark:bg-card-dark border-b border-gray-200 dark:border-gray-700 z-10">
      <div className="flex items-center justify-end h-full px-6 gap-4">
        {/* Calendar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowCalendar(!showCalendar)
              setShowNotifications(false)
              setShowProfile(false)
            }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <CalendarIcon size={20} />
          </button>

          {showCalendar && (
            <div className="absolute right-0 mt-2 w-80 bg-card-light dark:bg-card-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="p-1 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="text-sm font-semibold text-text-light dark:text-text-dark">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => changeMonth(1)}
                    className="p-1 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-gray-500 dark:text-gray-400 font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {getDaysInMonth(currentDate).map((day, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded-lg text-sm ${
                        day === null
                          ? 'invisible'
                          : day === new Date().getDate() && 
                            currentDate.getMonth() === new Date().getMonth() &&
                            currentDate.getFullYear() === new Date().getFullYear()
                          ? 'bg-primary-DEFAULT text-white'
                          : 'text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          className={`p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${
            isRefreshing ? 'animate-spin' : ''
          }`}
        >
          <RefreshCw size={20} />
        </button>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfile(false)
              setShowCalendar(false)
            }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Bell size={20} />
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-card-light dark:bg-card-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-text-light dark:text-text-dark mb-4">Notifications</h3>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-3 p-2 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors">
                      <div className="flex-1">
                        <p className="text-sm text-text-light dark:text-text-dark">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotifications(false)
              setShowCalendar(false)
            }}
            className="flex items-center gap-2 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image
                src="https://picsum.photos/seed/1/32/32"
                alt="Profile"
                width={32}
                height={32}
                quality={75}
                loading="lazy"
                sizes="32px"
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-sm font-medium">Ahmed Olayinka</span>
            <ChevronDown size={16} />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-card-light dark:bg-card-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-2">
                <button 
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-2 p-2 text-sm text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
                >
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
                <Link
                  href="/settings"
                  className="w-full flex items-center gap-2 p-2 text-sm text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
                >
                  <Settings size={16} />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full flex items-center gap-2 p-2 text-sm text-warning-DEFAULT hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  {isLoading ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 