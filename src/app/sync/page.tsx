'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { RefreshCw, Check, AlertTriangle, Clock, ArrowDownToLine } from 'lucide-react'

interface SyncStatus {
  id: number
  name: string
  lastSync: string
  status: 'success' | 'error' | 'pending' | 'syncing'
  progress?: number
  error?: string
}

const initialSyncStatus: SyncStatus[] = [
  {
    id: 1,
    name: 'Documents',
    lastSync: '2024-02-15 10:30 AM',
    status: 'success'
  },
  {
    id: 2,
    name: 'Calendar Events',
    lastSync: '2024-02-15 10:35 AM',
    status: 'success'
  },
  {
    id: 3,
    name: 'Team Data',
    lastSync: '2024-02-15 09:45 AM',
    status: 'error',
    error: 'Connection timeout'
  },
  {
    id: 4,
    name: 'Analytics',
    lastSync: '2024-02-15 10:00 AM',
    status: 'pending'
  }
]

export default function Sync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus[]>(initialSyncStatus)
  const [isSyncing, setIsSyncing] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    'Last full sync completed successfully',
    'Team Data sync failed - Connection timeout',
    'Documents sync completed - 150 files processed',
    'Calendar Events sync completed - 25 events updated'
  ])

  const handleSync = () => {
    setIsSyncing(true)
    // Simulate sync process
    setSyncStatus(prev => prev.map(item => ({
      ...item,
      status: 'syncing',
      progress: 0
    })))

    // Simulate progress updates
    const interval = setInterval(() => {
      setSyncStatus(prev => {
        const updated = prev.map(item => ({
          ...item,
          progress: item.progress ? Math.min(item.progress + 20, 100) : 20
        }))

        // Check if all items are at 100%
        if (updated.every(item => item.progress === 100)) {
          clearInterval(interval)
          setIsSyncing(false)
          // Update final status
          return updated.map(item => ({
            ...item,
            status: Math.random() > 0.2 ? 'success' : 'error',
            lastSync: new Date().toLocaleString(),
            progress: undefined
          }))
        }

        return updated
      })
    }, 1000)
  }

  const getStatusIcon = (status: SyncStatus['status']) => {
    switch (status) {
      case 'success':
        return <Check className="text-success-DEFAULT" size={20} />
      case 'error':
        return <AlertTriangle className="text-warning-DEFAULT" size={20} />
      case 'pending':
        return <Clock className="text-gray-400" size={20} />
      case 'syncing':
        return <RefreshCw className="text-primary-DEFAULT animate-spin" size={20} />
    }
  }

  return (
    <PageLayout title="Sync">
      <div className="grid gap-6">
        {/* Sync Controls */}
        <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Sync Status</h2>
              <p className="text-gray-600 dark:text-gray-400">Last full sync: {syncStatus[0].lastSync}</p>
            </div>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2 bg-primary-DEFAULT hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>

          {/* Sync Items */}
          <div className="space-y-4">
            {syncStatus.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-background-light dark:bg-background-dark rounded-lg">
                <div className="flex-shrink-0">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-text-light dark:text-text-dark">{item.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.lastSync}</span>
                  </div>
                  {item.status === 'syncing' && item.progress !== undefined && (
                    <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-DEFAULT transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                  {item.status === 'error' && item.error && (
                    <p className="text-sm text-warning-DEFAULT">{item.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sync Logs */}
        <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Sync Logs</h2>
            <button className="flex items-center gap-2 text-primary-DEFAULT hover:text-primary-dark">
              <ArrowDownToLine size={20} />
              Download Logs
            </button>
          </div>
          <div className="space-y-2">
            {logs.map((log, index) => (
              <div 
                key={index}
                className="p-2 text-sm text-text-light dark:text-text-dark font-mono bg-background-light dark:bg-background-dark rounded"
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 