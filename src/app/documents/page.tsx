'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { File, FileText, Image as ImageIcon, Upload, FolderPlus, Search, MoreVertical, Download } from 'lucide-react'
import Image from 'next/image'

interface Document {
  id: number
  name: string
  type: 'pdf' | 'doc' | 'image'
  size: string
  modified: string
  shared: boolean
}

const documents: Document[] = [
  {
    id: 1,
    name: 'Q2 Financial Report 2024.pdf',
    type: 'pdf',
    size: '2.4 MB',
    modified: '2024-02-10',
    shared: true
  },
  {
    id: 2,
    name: 'Project Timeline.doc',
    type: 'doc',
    size: '1.8 MB',
    modified: '2024-02-09',
    shared: false
  },
  {
    id: 3,
    name: 'Meeting Notes.doc',
    type: 'doc',
    size: '956 KB',
    modified: '2024-02-08',
    shared: true
  },
  {
    id: 4,
    name: 'Company Overview.pdf',
    type: 'pdf',
    size: '3.2 MB',
    modified: '2024-02-07',
    shared: false
  }
]

const getIconForType = (type: string) => {
  switch (type) {
    case 'pdf':
      return <File className="text-warning-DEFAULT" />
    case 'doc':
      return <FileText className="text-primary-DEFAULT" />
    case 'image':
      return <ImageIcon className="text-success-DEFAULT" />
    default:
      return <File />
  }
}

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageLayout title="Documents">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-DEFAULT hover:bg-primary-dark text-white rounded-lg transition-colors">
              <Upload size={20} />
              Upload
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors border border-gray-200 dark:border-gray-700">
              <FolderPlus size={20} />
              New Folder
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-card-light dark:bg-card-dark rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getIconForType(doc.type)}
                  <div>
                    <h3 className="font-medium text-text-light dark:text-text-dark">{doc.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.size} • Modified {new Date(doc.modified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-400 hover:text-primary-DEFAULT dark:hover:text-primary-dark transition-colors">
                    <Download size={18} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
} 