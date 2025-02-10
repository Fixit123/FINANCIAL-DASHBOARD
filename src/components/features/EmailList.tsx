'use client'

import { useState } from 'react'
import { MoreVertical, Star, Clock } from 'lucide-react'
import Image from 'next/image'

interface Email {
  id: number;
  sender: {
    name: string;
    avatar: string;
  };
  subject: string;
  preview: string;
  time: string;
  isStarred: boolean;
}

const emails: Email[] = [
  {
    id: 1,
    sender: {
      name: 'Ahmed Olayinka',
      avatar: 'https://picsum.photos/seed/1/32/32'
    },
    subject: 'Q2 Financial Report',
    preview: "I've attached the Q2 financial report for your review...",
    time: '10:30 AM',
    isStarred: true
  },
  {
    id: 2,
    sender: {
      name: 'Sarah Johnson',
      avatar: 'https://picsum.photos/seed/2/32/32'
    },
    subject: 'Client Meeting Notes',
    preview: 'Here are the key points from our meeting with...',
    time: '9:15 AM',
    isStarred: false
  },
  {
    id: 3,
    sender: {
      name: 'Mike Wilson',
      avatar: 'https://picsum.photos/seed/3/32/32'
    },
    subject: 'Project Timeline Update',
    preview: 'Based on our recent progress, we need to adjust...',
    time: 'Yesterday',
    isStarred: false
  }
]

export default function EmailList() {
  const [starredEmails, setStarredEmails] = useState<Set<number>>(
    new Set(emails.filter(email => email.isStarred).map(email => email.id))
  )

  const toggleStar = (id: number) => {
    const newStarred = new Set(starredEmails)
    if (newStarred.has(id)) {
      newStarred.delete(id)
    } else {
      newStarred.add(id)
    }
    setStarredEmails(newStarred)
  }

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Recent Emails</h2>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <MoreVertical size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        {emails.map((email) => (
          <div key={email.id} className="flex items-start gap-4 p-3 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors cursor-pointer">
            <Image
              src={email.sender.avatar}
              alt={email.sender.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-text-light dark:text-text-dark truncate">{email.sender.name}</h3>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
                  <Clock size={14} />
                  <span>{email.time}</span>
                </div>
              </div>
              <p className="font-medium text-sm text-text-light dark:text-text-dark mb-1 truncate">{email.subject}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{email.preview}</p>
            </div>
            <button 
              onClick={() => toggleStar(email.id)}
              className={`text-gray-400 hover:text-primary-DEFAULT dark:hover:text-primary-dark ${
                starredEmails.has(email.id) ? 'text-primary-DEFAULT dark:text-primary-dark' : ''
              }`}
            >
              <Star size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 