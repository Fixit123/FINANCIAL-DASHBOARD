'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { User, Bell, Lock, Globe, Palette, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const settingsSections = [
  {
    id: 'profile',
    label: 'Profile Settings',
    icon: User,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
  },
  {
    id: 'security',
    label: 'Security',
    icon: Lock,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: Palette,
  },
  {
    id: 'language',
    label: 'Language & Region',
    icon: Globe,
  },
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const { theme, toggleTheme } = useTheme()

  return (
    <PageLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-4">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-DEFAULT/10 dark:bg-primary-DEFAULT/20 text-primary-DEFAULT'
                    : 'text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark'
                }`}
              >
                <section.icon size={20} />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-6">
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Profile Settings</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Ahmed Olayinka"
                      className="w-full px-4 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="ahmed@example.com"
                      className="w-full px-4 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Appearance</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                    Theme
                  </label>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-background-dark rounded-lg text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Add other sections as needed */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Notifications</h2>
                {/* Add notification settings */}
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Security</h2>
                {/* Add security settings */}
              </div>
            )}

            {activeSection === 'language' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Language & Region</h2>
                {/* Add language settings */}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 