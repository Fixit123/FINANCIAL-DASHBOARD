'use client'

import PageLayout from '@/components/layout/PageLayout'
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const transactions = [
  {
    id: 1,
    type: 'credit',
    description: 'Client Payment - ABC Corp',
    amount: 15000,
    date: '2024-02-10'
  },
  {
    id: 2,
    type: 'debit',
    description: 'Office Supplies',
    amount: 250.50,
    date: '2024-02-09'
  },
  {
    id: 3,
    type: 'credit',
    description: 'Consulting Fee',
    amount: 5000,
    date: '2024-02-08'
  }
]

export default function Banking() {
  return (
    <PageLayout title="Banking">
      <div className="grid gap-6">
        {/* Account Balance Card */}
        <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Account Balance</h2>
              <p className="text-3xl font-bold mt-2 text-text-light dark:text-text-dark">$74,124.50</p>
            </div>
            <div className="w-12 h-12 bg-primary-DEFAULT/10 dark:bg-primary-DEFAULT/20 rounded-lg flex items-center justify-center">
              <CreditCard className="text-primary-DEFAULT" size={24} />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-primary-DEFAULT hover:bg-primary-dark text-white py-2 rounded-lg transition-colors">
              <DollarSign size={20} />
              Transfer Money
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-text-light dark:text-text-dark">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'credit' 
                      ? 'bg-success-DEFAULT/10 dark:bg-success-DEFAULT/20' 
                      : 'bg-warning-DEFAULT/10 dark:bg-warning-DEFAULT/20'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowUpRight className="text-success-DEFAULT dark:text-success-dark" size={20} />
                    ) : (
                      <ArrowDownRight className="text-warning-DEFAULT dark:text-warning-dark" size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-text-light dark:text-text-dark">{transaction.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-medium ${
                  transaction.type === 'credit'
                    ? 'text-success-DEFAULT dark:text-success-dark'
                    : 'text-warning-DEFAULT dark:text-warning-dark'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 