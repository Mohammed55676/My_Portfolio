'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, CheckCircle, Clock, FileText, Sparkles } from 'lucide-react'
import type { ResearchArea, Publication } from '@/lib/types'
import { iconMap } from '@/lib/icons'

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.3, ease: 'easeOut' },
}

// Fallback research areas — populate your own from the admin panel (Research Areas).
const fallbackResearchAreas: ResearchArea[] = []

// Fallback publications — populate your own from the admin panel (Publications).
const fallbackPublications: Publication[] = []

export default function ResearchAndPublications() {
  const [researchAreas, setResearchAreas] = useState<ResearchArea[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    
    const handleUpdate = () => {
      fetchData()
    }
    window.addEventListener('content-updated', handleUpdate)
    
    return () => {
      window.removeEventListener('content-updated', handleUpdate)
    }
  }, [])

  const fetchData = async () => {
    try {
      const [areasRes, pubsRes] = await Promise.all([
        fetch('/api/research-areas'),
        fetch('/api/publications'),
      ])
      const areasData = await areasRes.json()
      const pubsData = await pubsRes.json()
      setResearchAreas(areasData && areasData.length > 0 ? areasData : fallbackResearchAreas)
      setPublications(pubsData && pubsData.length > 0 ? pubsData : fallbackPublications)
    } catch (error) {
      console.error('Error fetching data:', error)
      setResearchAreas(fallbackResearchAreas)
      setPublications(fallbackPublications)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="research" className="section-container">
        <div className="text-center py-12 text-gray-600">Loading...</div>
      </section>
    )
  }
  return (
    <section id="research" className="section-container bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-80 h-80 bg-primary-200/12 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-300/12 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <motion.div {...fadeIn} className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Research Interests & <span className="gradient-text">Publications</span>
          </h2>
          <p className="text-lg text-gray-600">
            Areas of focus and key research contributions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map((area, idx) => (
            <motion.div
              key={area.title}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: idx * 0.05 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center text-white mb-4`}>
                {(() => {
                  const Icon = area.icon && iconMap[area.icon] ? iconMap[area.icon] : iconMap.Brain
                  return <Icon className="w-6 h-6" />
                })()}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{area.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{area.description}</p>
              <div className="flex flex-wrap gap-2">
                {area.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs bg-gray-50 text-gray-700 border border-gray-200 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <motion.div {...fadeIn} className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Selected Publications</h3>
            <p className="text-gray-600">Recent publications and manuscripts in progress</p>
          </motion.div>

          <div className="space-y-4">
            {publications.map((pub, idx) => (
              <motion.div
                key={pub.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: idx * 0.05 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pub.gradient} flex items-center justify-center text-white`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900 leading-snug">{pub.title}</h4>
                    <p className="text-sm text-gray-600">{pub.authors}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium">{pub.type}</span>
                      {pub.journal && <span className="text-primary-700 font-semibold">{pub.journal}</span>}
                      {pub.year && <span className="text-gray-500">({pub.year})</span>}
                      {pub.doi && <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg font-medium">DOI: {pub.doi}</span>}
                      {pub.volume && <span className="text-gray-500">{pub.volume}</span>}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold">
                      {(() => {
                        const status = pub.status?.trim() || ''
                        if (status === 'Published') {
                          return (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700">
                              <CheckCircle className="w-3.5 h-3.5" /> Published
                            </span>
                          )
                        }
                        if (status === 'Major Revision') {
                          return (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                              <Clock className="w-3.5 h-3.5" /> Major Revision
                            </span>
                          )
                        }
                        if (status === 'Published (Abstract)') {
                          return (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                              <Sparkles className="w-3.5 h-3.5" /> Abstract
                            </span>
                          )
                        }
                        if (status === 'Under Review') {
                          return (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                              <Clock className="w-3.5 h-3.5" /> Under Review
                            </span>
                          )
                        }
                        if (status === 'Draft') {
                          return (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                              <FileText className="w-3.5 h-3.5" /> Draft
                            </span>
                          )
                        }
                        // Fallback for any other status
                        return (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                            <FileText className="w-3.5 h-3.5" /> {status || 'Unknown'}
                          </span>
                        )
                      })()}
                    </div>
                  </div>
                  {pub.link && pub.link !== '#' && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

