'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Footer } from '@/lib/types'
import { iconMap } from '@/lib/icons'

// Fallback footer
const fallbackFooter: Footer = {
  name: 'Mohammed Hamdi',
  description: 'Software Engineering Student & Full-Stack Developer based in Amman, Jordan. Building practical web applications with clean interfaces.',
  quick_links: ['About', 'Education', 'Skills', 'Experience', 'Projects', 'Contact'],
  social_links: [
    { icon: 'Github', href: 'https://github.com/Mohammed55676/', label: 'GitHub' },
    { icon: 'Linkedin', href: 'https://www.linkedin.com/in/eng-mohammed-hamdi/?locale=en', label: 'LinkedIn' },
    { icon: 'Mail', href: 'mailto:mohaa34356@gmail.com', label: 'Email' },
  ],
  copyright_text: `© ${new Date().getFullYear()} Mohammed Hamdi. All rights reserved.`,
}

export default function Footer() {
  const [footer, setFooter] = useState<Footer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFooter()

    const handleUpdate = () => {
      fetchFooter()
    }
    window.addEventListener('content-updated', handleUpdate)

    return () => {
      window.removeEventListener('content-updated', handleUpdate)
    }
  }, [])

  const fetchFooter = async () => {
    try {
      const res = await fetch('/api/footer')
      const data = await res.json()
      setFooter(data || fallbackFooter)
    } catch (error) {
      console.error('Error fetching footer:', error)
      setFooter(fallbackFooter)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="text-center py-12 text-gray-600">Loading...</div>
      </footer>
    )
  }

  const footerData = footer || fallbackFooter
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4">{footerData.name}</h3>
            {footerData.description && (
              <p className="text-gray-400">
                {footerData.description}
              </p>
            )}
          </motion.div>

          {footerData.quick_links && footerData.quick_links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerData.quick_links.map((link, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="hover:text-primary-400 transition-colors"
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {footerData.social_links && footerData.social_links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                {footerData.social_links.map((social, i) => {
                  const Icon = social.icon && iconMap[social.icon] ? iconMap[social.icon] : iconMap.Mail
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.2, rotate: i % 2 === 0 ? 5 : -5 }}
                      className="hover:text-primary-400 transition-colors"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center text-gray-400"
        >
          <p>{footerData.copyright_text || `© ${currentYear} ${footerData.name}. All rights reserved.`}</p>
        </motion.div>
      </div>
    </footer>
  )
}
