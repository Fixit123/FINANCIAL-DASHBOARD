'use client'

import { MoreVertical } from 'lucide-react'

interface MetricsCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

export default function MetricsCard({ title, value, change, icon }: MetricsCardProps) {
  const isPositive = change >= 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/10 dark:hover:shadow-blue-400/10">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
          {icon}
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        <span className={`text-sm font-medium px-2 py-0.5 rounded-lg ${
          isPositive 
            ? 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-500/10' 
            : 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-500/10'
        }`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  )
} 