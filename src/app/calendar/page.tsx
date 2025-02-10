'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location?: string
  type: 'meeting' | 'task' | 'reminder'
}

const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Team Meeting',
    date: '2024-02-15',
    time: '10:00 AM',
    location: 'Conference Room A',
    type: 'meeting'
  },
  {
    id: 2,
    title: 'Project Deadline',
    date: '2024-02-15',
    time: '5:00 PM',
    type: 'task'
  },
  {
    id: 3,
    title: 'Client Call',
    date: '2024-02-16',
    time: '2:30 PM',
    type: 'meeting'
  }
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showEventForm, setShowEventForm] = useState(false)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCurrentDate(newDate)
  }

  const getEventsForDate = (day: number | null) => {
    if (!day) return []
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return sampleEvents.filter(event => event.date === dateStr)
  }

  return (
    <PageLayout title="Calendar">
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            onClick={() => setShowEventForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-DEFAULT hover:bg-primary-dark text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Event
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm">
          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center border-b border-gray-200 dark:border-gray-700">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((day, index) => {
              const events = getEventsForDate(day)
              const isToday = day === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-b border-r border-gray-200 dark:border-gray-700 ${
                    day === null
                      ? 'bg-background-light dark:bg-background-dark'
                      : 'hover:bg-background-light dark:hover:bg-background-dark'
                  }`}
                >
                  {day && (
                    <>
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                        isToday
                          ? 'bg-primary-DEFAULT text-white'
                          : 'text-text-light dark:text-text-dark'
                      }`}>
                        {day}
                      </span>
                      <div className="mt-2 space-y-1">
                        {events.map(event => (
                          <div
                            key={event.id}
                            className={`p-1 rounded text-xs ${
                              event.type === 'meeting'
                                ? 'bg-primary-DEFAULT/10 text-primary-DEFAULT'
                                : event.type === 'task'
                                ? 'bg-warning-DEFAULT/10 text-warning-DEFAULT'
                                : 'bg-success-DEFAULT/10 text-success-DEFAULT'
                            }`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>{event.time}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin size={12} />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Event Form Modal */}
        {showEventForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-text-light dark:text-text-dark">Add New Event</h3>
              {/* Add event form here */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowEventForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
} 