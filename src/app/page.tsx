'use client'

import MetricsCard from '@/components/features/MetricsCard'
import RevenueChart from '@/components/features/RevenueChart'
import EmailList from '@/components/features/EmailList'
import TodoList from '@/components/features/TodoList'
import { DollarSign, Users, FileText, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Welcome Message */}
      <div className="relative mb-8 p-8 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-transparent dark:from-blue-500/20 dark:via-blue-400/10 dark:to-transparent rounded-2xl border border-blue-100 dark:border-blue-900">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-wave">👋</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Welcome back, Ahmed Olayinka
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Here's what's happening with your projects today
              </p>
            </div>
          </div>
          <div className="flex-1 w-full md:w-auto">
            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-600/25">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Revenue"
          value="$54,375"
          change={12.5}
          icon={<DollarSign className="text-blue-600 dark:text-blue-400" size={24} />}
        />
        <MetricsCard
          title="New Clients"
          value="684"
          change={-2.3}
          icon={<Users className="text-green-600 dark:text-green-400" size={24} />}
        />
        <MetricsCard
          title="Invoices Overdue"
          value="8"
          change={5.1}
          icon={<FileText className="text-amber-600 dark:text-amber-400" size={24} />}
        />
        <MetricsCard
          title="Growth Rate"
          value="24.5%"
          change={8.2}
          icon={<TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 border border-gray-100 dark:border-gray-700">
          <RevenueChart />
        </div>
        <div className="space-y-6">
          <EmailList />
          <TodoList />
        </div>
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-10deg); }
          40% { transform: rotate(10deg); }
          60% { transform: rotate(-10deg); }
          80% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 2s infinite;
          display: inline-block;
          transform-origin: 70% 70%;
        }
      `}</style>
    </div>
  )
}
