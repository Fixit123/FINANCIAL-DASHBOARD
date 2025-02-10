'use client'

import PageLayout from '@/components/layout/PageLayout'
import { Mail, Phone, MapPin, Plus } from 'lucide-react'
import Image from 'next/image'

interface TeamMember {
  id: number
  name: string
  role: string
  avatar: string
  email: string
  phone: string
  location: string
  department: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Ahmed Olayinka',
    role: 'Financial Director',
    avatar: 'https://picsum.photos/seed/1/64/64',
    email: 'ahmed@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    department: 'Finance'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Senior Analyst',
    avatar: 'https://picsum.photos/seed/2/64/64',
    email: 'sarah@example.com',
    phone: '+1 (555) 234-5678',
    location: 'London, UK',
    department: 'Analytics'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    role: 'Project Manager',
    avatar: 'https://picsum.photos/seed/3/64/64',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Toronto, Canada',
    department: 'Operations'
  }
]

const departments = ['All', 'Finance', 'Analytics', 'Operations', 'Marketing']

export default function Team() {
  return (
    <PageLayout title="Team">
      <div className="grid gap-6">
        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  dept === 'All'
                    ? 'bg-primary-DEFAULT text-white'
                    : 'bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-DEFAULT hover:bg-primary-dark text-white rounded-lg transition-colors">
            <Plus size={20} />
            Add Team Member
          </button>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={64}
                  height={64}
                  quality={75}
                  loading="lazy"
                  sizes="64px"
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-text-light dark:text-text-dark">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-background-light dark:bg-background-dark text-sm rounded-full">
                    {member.department}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="text-gray-400" size={16} />
                  <span className="text-text-light dark:text-text-dark">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="text-gray-400" size={16} />
                  <span className="text-text-light dark:text-text-dark">{member.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-text-light dark:text-text-dark">{member.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
} 