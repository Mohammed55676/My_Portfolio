'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Brain, Database, Cloud, Smartphone, Wrench } from 'lucide-react'
import { iconMap } from '@/lib/icons'
import type { Skill } from '@/lib/types'

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.35, ease: 'easeOut' },
}

// Category icons and gradients mapping
const categoryConfig: Record<string, { icon: React.ComponentType<any>, gradient: string }> = {
  'Frontend': { icon: Code, gradient: 'from-blue-500 to-cyan-500' },
  'Backend': { icon: Cloud, gradient: 'from-purple-500 to-indigo-500' },
  'Databases': { icon: Database, gradient: 'from-green-500 to-emerald-500' },
  'Tools & Utilities': { icon: Wrench, gradient: 'from-amber-500 to-orange-500' },
  'Programming Languages': { icon: Code, gradient: 'from-blue-500 to-cyan-500' },
  'Software Engineering': { icon: Code, gradient: 'from-rose-500 to-pink-500' },
}

const fallbackSkills: Skill[] = [
  { name: 'React', category: 'Frontend', level: 'Advanced', order: 0 },
  { name: 'JavaScript', category: 'Frontend', level: 'Advanced', order: 1 },
  { name: 'HTML', category: 'Frontend', level: 'Advanced', order: 2 },
  { name: 'CSS', category: 'Frontend', level: 'Advanced', order: 3 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced', order: 4 },
  { name: 'Node.js', category: 'Backend', level: 'Intermediate', order: 5 },
  { name: 'Express.js', category: 'Backend', level: 'Intermediate', order: 6 },
  { name: 'REST APIs', category: 'Backend', level: 'Advanced', order: 7 },
  { name: 'Python', category: 'Backend', level: 'Intermediate', order: 8 },
  { name: 'MongoDB', category: 'Databases', level: 'Intermediate', order: 9 },
  { name: 'PostgreSQL', category: 'Databases', level: 'Intermediate', order: 10 },
  { name: 'Git & GitHub', category: 'Tools & Utilities', level: 'Advanced', order: 11 },
  { name: 'Vite', category: 'Tools & Utilities', level: 'Intermediate', order: 12 },
  { name: 'Linux', category: 'Tools & Utilities', level: 'Intermediate', order: 13 },
]

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
    
    const handleUpdate = () => {
      fetchSkills()
    }
    window.addEventListener('content-updated', handleUpdate)
    
    return () => {
      window.removeEventListener('content-updated', handleUpdate)
    }
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills')
      const data = await res.json()
      setSkills(data && data.length > 0 ? data : fallbackSkills)
    } catch (error) {
      console.error('Error fetching skills:', error)
      setSkills(fallbackSkills)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="skills" className="section-container bg-white">
        <div className="text-center py-12 text-gray-600">Loading...</div>
      </section>
    )
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  // Show empty state
  if (skills.length === 0) {
    return (
      <section id="skills" className="section-container bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 bg-primary-200/12 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-300/12 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-lg text-gray-600">
              Technologies and tools I work with
            </p>
          </motion.div>
          <div className="bg-white/70 rounded-xl p-8 border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <p className="text-gray-500">No skills added yet. Add skills from the Admin Panel.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="section-container bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary-200/12 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-300/12 rounded-full blur-3xl" />
      </div>

        <div className="relative z-10">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-lg text-gray-600">
              Technologies and tools I work with
            </p>
          </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills], idx) => {
            const config = categoryConfig[category] || { icon: Code, gradient: 'from-gray-500 to-gray-600' }
            const Icon = config.icon
            
            return (
              <motion.div
                key={category}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: idx * 0.05 }}
                className="group relative bg-white dark:bg-theme-surface border border-gray-100 dark:border-theme-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4 text-white shadow-lg flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-theme-text mb-4">{category}</h3>

                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => {
                    const SkillIcon = skill.icon && iconMap[skill.icon] ? iconMap[skill.icon] : null
                    
                    return (
                      <motion.span
                        key={skill.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-theme-surface-elevated text-gray-700 dark:text-theme-text rounded-lg text-xs font-medium border border-gray-200 dark:border-theme-border hover:border-primary-300 dark:hover:border-theme-primary hover:bg-primary-50 dark:hover:bg-theme-primary/15 transition-colors"
                      >
                        {SkillIcon && <SkillIcon className="w-3.5 h-3.5" />}
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="ml-1 text-xs text-gray-500 dark:text-theme-text-muted">({skill.level})</span>
                        )}
                      </motion.span>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

