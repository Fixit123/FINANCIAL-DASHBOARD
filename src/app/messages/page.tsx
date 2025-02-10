'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { Search, Send, Paperclip } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: number
  sender: {
    name: string
    avatar: string
    online: boolean
  }
  messages: {
    id: number
    text: string
    time: string
    sent: boolean
  }[]
}

const conversations: Message[] = [
  {
    id: 1,
    sender: {
      name: 'Sarah Johnson',
      avatar: 'https://picsum.photos/seed/2/40/40',
      online: true
    },
    messages: [
      {
        id: 1,
        text: 'Hi, I reviewed the financial report you sent.',
        time: '10:30 AM',
        sent: false
      },
      {
        id: 2,
        text: 'Great! What do you think about the Q2 projections?',
        time: '10:32 AM',
        sent: true
      }
    ]
  },
  {
    id: 2,
    sender: {
      name: 'Mike Wilson',
      avatar: 'https://picsum.photos/seed/3/40/40',
      online: false
    },
    messages: [
      {
        id: 1,
        text: 'Team meeting at 2 PM today.',
        time: '9:15 AM',
        sent: false
      }
    ]
  }
]

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<Message | null>(conversations[0])
  const [newMessage, setNewMessage] = useState('')

  return (
    <PageLayout title="Messages">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100%-5rem)]">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-background-light dark:hover:bg-background-dark transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-background-light dark:bg-background-dark' : ''
                }`}
              >
                <div className="relative">
                  <Image
                    src={conversation.sender.avatar}
                    alt={conversation.sender.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {conversation.sender.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-DEFAULT dark:bg-success-dark rounded-full border-2 border-card-light dark:border-card-dark" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="font-medium text-text-light dark:text-text-dark">{conversation.sender.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {conversation.messages[conversation.messages.length - 1].text}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {conversation.messages[conversation.messages.length - 1].time}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="lg:col-span-2 bg-card-light dark:bg-card-dark rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <Image
                  src={selectedConversation.sender.avatar}
                  alt={selectedConversation.sender.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium text-text-light dark:text-text-dark">{selectedConversation.sender.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedConversation.sender.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-lg p-3 ${
                    message.sent 
                      ? 'bg-primary-DEFAULT text-white' 
                      : 'bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark'
                  }`}>
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sent ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent"
                />
                <button className="text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-DEFAULT/80">
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-card-light dark:bg-card-dark rounded-lg shadow-sm flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </PageLayout>
  )
} 