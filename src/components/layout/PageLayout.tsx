'use client'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-text-light dark:text-text-dark">{title}</h1>
      {children}
    </div>
  )
} 