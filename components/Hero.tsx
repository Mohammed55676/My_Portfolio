'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail, Phone, ArrowDown, Sparkles, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { Hero } from '@/lib/types'

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

// Fallback data
const fallbackHero: Hero = {
  name: 'Mohammed Hamdi',
  title: 'Software Engineering Student & Full-Stack Developer',
  subtitle: 'Based in Amman, Jordan',
  description: 'I build practical, user-focused web applications with clean interfaces, structured logic, and real-world problem solving.',
  email: 'mohaa34356@gmail.com',
  phone: '+962 77 653 2286',
  cv_url: '/cv.pdf',
  github_url: 'https://github.com/Mohammed55676/',
  linkedin_url: 'https://www.linkedin.com/in/eng-mohammed-hamdi/?locale=en',
  profile_image_url: '/download.jpeg',
  focus_tags: ['React', 'Full-Stack Development', 'Software Design', 'Git & Linux'],
  order: 0,
}

export default function Hero() {
  const [hero, setHero] = useState<Hero | null>(null)
  const [loading, setLoading] = useState(true)
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    fetchHero()

    // Listen for content updates from admin panel
    const handleUpdate = () => {
      fetchHero()
    }
    window.addEventListener('content-updated', handleUpdate)

    return () => {
      window.removeEventListener('content-updated', handleUpdate)
    }
  }, [])

  const fetchHero = async () => {
    try {
      const res = await fetch('/api/hero')
      const data = await res.json()
      setHero(data || fallbackHero)
    } catch (error) {
      console.error('Error fetching hero:', error)
      setHero(fallbackHero)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="home" className="min-h-[80vh] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </section>
    )
  }

  const rawHero = hero || fallbackHero
  const isDefaultTags = !rawHero.focus_tags || rawHero.focus_tags.length === 0 || (rawHero.focus_tags.includes('Node.js') && rawHero.focus_tags.includes('Tailwind CSS'))
  const heroData = {
    ...rawHero,
    focus_tags: isDefaultTags ? ['React', 'Full-Stack Development', 'Software Design', 'Git & Linux'] : rawHero.focus_tags,
  }
  // Resolve the CV link: ignore empty/placeholder values and fall back to the
  // bundled /cv.pdf so the button never downloads the current HTML page.
  const cvUrl = heroData.cv_url && heroData.cv_url !== '#' ? heroData.cv_url : '/cv.pdf'
  // Resolve the profile image the same way: ignore empty/placeholder values and
  // fall back to the bundled /download.jpeg if the stored URL is missing or fails to load.
  const profileSrc =
    imgFailed || !heroData.profile_image_url || heroData.profile_image_url === '#' || heroData.profile_image_url === '/profile.jpg'
      ? '/download.jpeg'
      : heroData.profile_image_url
  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-16 pb-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div {...fadeIn} className="space-y-6">

            <div className="space-y-2">
              <motion.div {...fadeIn}>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Hi, I'm{' '}
                  <span className="gradient-text">{heroData.name}</span>
                </h1>
              </motion.div>
            </div>

            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }}>
              {heroData.title && (
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/70 border border-primary-100 shadow-sm mb-4">
                  <GraduationCap className="w-5 h-5 text-primary-600" />
                  <div className="text-sm text-gray-700">
                    {heroData.title}
                  </div>
                </div>
              )}

              {heroData.description && (
                <p className="text-lg text-gray-600 mb-4">
                  {heroData.description}
                </p>
              )}

              <div className="space-y-2 text-gray-600 mb-6">
                {heroData.email && (
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ x: 7 }}
                  >
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${heroData.email}`} className="hover:text-primary-600">{heroData.email}</a>
                  </motion.div>
                )}
                {heroData.phone && (
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{heroData.phone}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {heroData.focus_tags && heroData.focus_tags.length > 0 && (
              <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.25 }} className="flex flex-wrap gap-2">
                {heroData.focus_tags.map((tag) => (
                  <span key={tag} className="pill bg-white/70 text-gray-700 border-gray-200 shadow-sm">
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.3 }} className="grid sm:grid-cols-3 gap-4">

            </motion.div>

            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="flex flex-wrap gap-4">
              <motion.a
                href={cvUrl}
                download="Mohammed-Hamdi-CV.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg"
              >
                <Download size={20} />
                Download CV
              </motion.a>
              {heroData.github_url && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={heroData.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors shadow-lg"
                  >
                    <Github size={20} />
                    GitHub
                  </Link>
                </motion.div>
              )}
              {heroData.linkedin_url && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={heroData.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors shadow-lg"
                  >
                    <Linkedin size={20} />
                    LinkedIn
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.25 }} className="flex justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Image
                  src={profileSrc}
                  alt={heroData.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, 384px"
                  onError={() => setImgFailed(true)}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-500 hover:text-primary-600 transition-colors"
        >
          <span className="text-sm font-medium mb-1">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </motion.a>
      </motion.div>
    </section>
  )
}
