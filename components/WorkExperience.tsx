'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { WorkExperience } from '@/lib/types'
import { iconMap } from '@/lib/icons'

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.3, ease: 'easeOut' },
}

// Fallback work experience
const fallbackWorkExperience: WorkExperience[] = [
  {
    icon: 'Briefcase',
    title: 'Front-End Developer Intern',
    organization: 'Blue Ray Web Solutions',
    period: 'Internship',
    description: 'Completed practical training in front-end web development within a professional agency environment. Worked on responsive pages, UI improvements, and clean implementation using HTML, CSS, and JavaScript. Collaborated using Git/GitHub.',
    gradient: 'from-blue-500 to-cyan-500',
    type: 'Internship',
    order: 0,
  },
  {
    icon: 'Code',
    title: 'Front-End Developer',
    organization: 'Skyline Glass (Durham, NC)',
    period: 'Client Project',
    description: 'Built a 6-page responsive site with modular CSS architecture (shared tokens + per-page styles) and no JS/framework overhead. Designed multi-field quote funnel for lead gen resulting in 500+ projects highlighted and a 4.9★ client rating.',
    gradient: 'from-purple-500 to-pink-500',
    type: 'Work',
    order: 1,
  },
  {
    icon: 'Award',
    title: 'Full-Stack Developer',
    organization: 'Menassat Al-Khair (Graduation Project)',
    period: '2025 – Present',
    description: 'Built an Arabic-first full-stack donation platform connecting donors, charities, and people in need. Features item donations, charity verification flows, and role-based access control built with React 19, Vite, Node.js, and MongoDB.',
    gradient: 'from-green-500 to-emerald-500',
    type: 'Work',
    order: 2,
  },
]

export default function WorkExperience() {
  const [roles, setRoles] = useState<WorkExperience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkExperience()
    
    const handleUpdate = () => {
      fetchWorkExperience()
    }
    window.addEventListener('content-updated', handleUpdate)
    
    return () => {
      window.removeEventListener('content-updated', handleUpdate)
    }
  }, [])

  const fetchWorkExperience = async () => {
    try {
      const res = await fetch('/api/work-experience')
      const data = await res.json()
      setRoles(data && data.length > 0 ? data : fallbackWorkExperience)
    } catch (error) {
      console.error('Error fetching work experience:', error)
      setRoles(fallbackWorkExperience)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="experience" className="section-container">
        <div className="text-center py-12 text-gray-600">Loading...</div>
      </section>
    )
  }
  return (
    <section id="experience" className="section-container relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-primary-200/12 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-300/12 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div {...fadeIn} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-theme-text">
            Work Experience & <span className="gradient-text">Volunteering</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-theme-text-muted">
            Professional roles, leadership, and community involvement
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-white via-primary-100/30 to-white dark:from-theme-border dark:via-theme-primary/30 dark:to-theme-border shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative rounded-2xl bg-white/80 dark:bg-theme-surface/95 backdrop-blur-xl border border-white/60 dark:border-theme-border p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                    {(() => {
                      const Icon = role.icon && iconMap[role.icon] ? iconMap[role.icon] : iconMap.Briefcase
                      return <Icon className="w-6 h-6 text-white" />
                    })()}
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-theme-text">{role.title}</h3>
                        <p className="text-primary-600 dark:text-theme-primary font-medium">{role.organization}</p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm border ${
                          role.type === 'Work'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-sky-100 dark:bg-sky-950/80 text-blue-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/60'
                        }`}
                      >
                        {role.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-theme-text-muted">{role.period}</p>
                    <p className="text-gray-700 dark:text-theme-text/90 text-sm leading-relaxed">{role.description}</p>
                  </div>
                </div>

                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-theme-border to-transparent" />

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {['Leadership', 'Impact', 'Collaboration'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-theme-surface-elevated text-gray-700 dark:text-theme-text border border-gray-200 dark:border-theme-border shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

