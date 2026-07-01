'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { iconMap, Github } from '@/lib/icons'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Project } from '@/lib/types'

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.35, ease: 'easeOut' },
}

// Use centralized icon mapping from lib/icons.ts

// Fallback projects
const fallbackProjects: Project[] = [
  {
    icon: 'Award',
    title: 'Donation Platform / Menassat Al-Khair',
    description: 'An Arabic-first full-stack donation platform connecting donors, charities, and people in need. Features item donations, charity verification workflows, role-based dashboards, and responsive UI design.',
    technologies: ['React 19', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/Mohammed55676/',
    live_demo: '#',
    category: 'Full-Stack Web App',
    gradient: 'from-green-500 to-emerald-500',
    order: 0,
  },
  {
    icon: 'Code',
    title: 'Skyline Glass Website & Quote Funnel',
    description: 'A 6-page responsive site for a custom glass company in Durham, NC. Features modular CSS architecture (shared design tokens + page styles) with zero JS/framework bloat, plus a multi-field quote funnel that generated 500+ projects.',
    technologies: ['HTML5', 'Modular CSS', 'JavaScript', 'Responsive Design', 'Lead Gen'],
    github: 'https://github.com/Mohammed55676/',
    live_demo: '#',
    category: 'Client Web Project',
    gradient: 'from-blue-500 to-cyan-500',
    order: 1,
  },
]

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
    
    const handleUpdate = () => {
      fetchProjects()
    }
    window.addEventListener('content-updated', handleUpdate)
    
    return () => {
      window.removeEventListener('content-updated', handleUpdate)
    }
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data && data.length > 0 ? data : fallbackProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects(fallbackProjects)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="projects" className="section-container bg-white">
        <div className="text-center py-12 text-gray-600">Loading...</div>
      </section>
    )
  }
  return (
    <section id="projects" className="section-container bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary-200/12 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-300/12 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <motion.div {...fadeIn} className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600">
            Showcasing my work in machine learning, deep learning, and data analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: idx * 0.05 }}
              className="group relative bg-white dark:bg-theme-surface border border-gray-100 dark:border-theme-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4 text-white shadow-lg flex-shrink-0`}>
                {(() => {
                  const Icon = project.icon && iconMap[project.icon] ? iconMap[project.icon] : iconMap.Code
                  return <Icon className="w-7 h-7 text-white" />
                })()}
              </div>

              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-theme-text leading-tight flex-1">{project.title}</h3>
                <span className={`px-3 py-1 bg-gradient-to-r ${project.gradient} text-white rounded-full text-xs font-semibold whitespace-nowrap`}>
                  {project.category}
                </span>
              </div>

              <p className="text-gray-600 dark:text-theme-text-muted mb-4 leading-relaxed text-sm">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gray-50 dark:bg-theme-surface-elevated text-gray-700 dark:text-theme-text rounded-lg text-xs font-medium border border-gray-200 dark:border-theme-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(project.github || project.live_demo) && (
                <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-theme-border">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 dark:text-theme-primary hover:text-primary-700 dark:hover:text-theme-primary-hover font-semibold text-sm"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </Link>
                  )}
                  {project.live_demo && project.live_demo !== '#' && (
                    <Link
                      href={project.live_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-sm"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </Link>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeIn} className="mt-12 text-center">
          <Link
            href="https://github.com/Mohammed55676/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-primary-600 transition-all font-semibold shadow-lg"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
