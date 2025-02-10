'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { Video as VideoIcon, Mic, MicOff, Camera, CameraOff, PhoneOff, Users, MessageSquare, Share, MoreVertical } from 'lucide-react'
import Image from 'next/image'

interface Participant {
  id: number
  name: string
  avatar: string
  isSpeaking: boolean
  isMuted: boolean
  isVideoOff: boolean
}

const participants: Participant[] = [
  {
    id: 1,
    name: 'Ahmed Olayinka',
    avatar: 'https://picsum.photos/seed/1/400/400',
    isSpeaking: true,
    isMuted: false,
    isVideoOff: false
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'https://picsum.photos/seed/2/400/400',
    isSpeaking: false,
    isMuted: true,
    isVideoOff: false
  },
  {
    id: 3,
    name: 'Mike Wilson',
    avatar: 'https://picsum.photos/seed/3/400/400',
    isSpeaking: false,
    isMuted: false,
    isVideoOff: true
  }
]

export default function VideoConference() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  return (
    <PageLayout title="Video Conference">
      <div className="space-y-6">
        {/* Main Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 aspect-video">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="relative bg-card-light dark:bg-card-dark rounded-lg overflow-hidden"
            >
              {participant.isVideoOff ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background-light dark:bg-background-dark">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                    <p className="mt-2 text-text-light dark:text-text-dark">{participant.name}</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={participant.avatar}
                  alt={participant.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-sm text-white bg-black/50 rounded-lg">
                    {participant.name}
                  </span>
                  {participant.isMuted && (
                    <span className="w-8 h-8 flex items-center justify-center bg-black/50 rounded-lg">
                      <MicOff size={16} className="text-warning-DEFAULT" />
                    </span>
                  )}
                </div>
                {participant.isSpeaking && (
                  <div className="px-2 py-1 text-sm text-white bg-success-DEFAULT rounded-lg">
                    Speaking
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 p-4 bg-card-light dark:bg-card-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
              isMuted
                ? 'bg-warning-DEFAULT text-white'
                : 'bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark'
            }`}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
              isVideoOff
                ? 'bg-warning-DEFAULT text-white'
                : 'bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark'
            }`}
          >
            {isVideoOff ? <CameraOff size={20} /> : <Camera size={20} />}
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-warning-DEFAULT text-white rounded-lg">
            <PhoneOff size={20} />
          </button>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
          <button className="w-12 h-12 flex items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg">
            <Users size={20} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg">
            <MessageSquare size={20} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg">
            <Share size={20} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </PageLayout>
  )
} 