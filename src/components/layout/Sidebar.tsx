'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  BarChart2,
  Wallet,
  MessageSquare,
  Video,
  Users,
  FileText,
  Settings
} from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
  { icon: Wallet, label: 'Banking', href: '/banking' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Video, label: 'Video', href: '/video' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: Settings, label: 'Settings', href: '/settings' }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-white dark:bg-card-dark border-r border-gray-100 dark:border-gray-800 z-30">
      <nav className="flex flex-col items-center py-8 gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary-600 text-white shadow-blue-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
            >
              <item.icon size={20} className={`transition-transform duration-200 group-hover:scale-110 ${
                isActive ? 'scale-110' : ''
              }`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
} 