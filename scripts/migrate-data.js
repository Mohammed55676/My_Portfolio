/**
 * Data Migration Script
 *
 * Seeds Supabase with the portfolio's content. The data below mirrors the
 * fallback content used by the React components (Hero, About, Education,
 * WorkExperience, Projects, Skills, Contact, Footer).
 *
 * Prerequisites:
 * 1. Install dotenv: npm install dotenv
 * 2. Set your Supabase credentials in .env.local
 * 3. Run the SQL schema (supabase_schema_final.sql) in the Supabase SQL Editor
 *
 * Usage:
 * Run: node scripts/migrate-data.js
 *
 * Safe to run multiple times — existing records are detected and skipped.
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Education
const educationData = [
  {
    degree: 'Bachelor’s Degree in Software Engineering',
    institution: 'Al-Zaytoonah University of Jordan',
    location: 'Amman, Jordan',
    period: 'Expected Graduation: 2026',
    highlights: [
      'Focus on Practical Software Architecture',
      'Full-Stack Web Development Curriculum',
      'Graduation Project: Menassat Al-Khair',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    icon: 'GraduationCap',
    order: 0,
  },
]

// Publications — add your own entries here if/when you have them.
const publicationsData = []

// Work Experience
const workExperienceData = [
  {
    icon: 'Briefcase',
    title: 'Front-End Developer Intern',
    organization: 'Blue Ray Web Solutions',
    period: 'Internship',
    description:
      'Completed practical training in front-end web development within a professional agency environment. Worked on responsive pages, UI improvements, and clean implementation using HTML, CSS, and JavaScript. Collaborated using Git/GitHub.',
    gradient: 'from-blue-500 to-cyan-500',
    type: 'Internship',
    order: 0,
  },
  {
    icon: 'Code',
    title: 'Front-End Developer',
    organization: 'Skyline Glass (Durham, NC)',
    period: 'Client Project',
    description:
      'Built a 6-page responsive site with modular CSS architecture (shared tokens + per-page styles) and no JS/framework overhead. Designed multi-field quote funnel for lead gen resulting in 500+ projects highlighted and a 4.9★ client rating.',
    gradient: 'from-purple-500 to-pink-500',
    type: 'Work',
    order: 1,
  },
  {
    icon: 'Award',
    title: 'Full-Stack Developer',
    organization: 'Menassat Al-Khair (Graduation Project)',
    period: '2025 – Present',
    description:
      'Built an Arabic-first full-stack donation platform connecting donors, charities, and people in need. Features item donations, charity verification flows, and role-based access control built with React 19, Vite, Node.js, and MongoDB.',
    gradient: 'from-green-500 to-emerald-500',
    type: 'Work',
    order: 2,
  },
]

// Projects
const projectsData = [
  {
    icon: 'Award',
    title: 'Donation Platform / Menassat Al-Khair',
    description:
      'An Arabic-first full-stack donation platform connecting donors, charities, and people in need. Features item donations, charity verification workflows, role-based dashboards, and responsive UI design.',
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
    description:
      'A 6-page responsive site for a custom glass company in Durham, NC. Features modular CSS architecture (shared design tokens + page styles) with zero JS/framework bloat, plus a multi-field quote funnel that generated 500+ projects.',
    technologies: ['HTML5', 'Modular CSS', 'JavaScript', 'Responsive Design', 'Lead Gen'],
    github: 'https://github.com/Mohammed55676/',
    live_demo: '#',
    category: 'Client Web Project',
    gradient: 'from-blue-500 to-cyan-500',
    order: 1,
  },
]

// Research Areas — add your own entries here if/when you have them.
const researchAreasData = []

// Courses — add your own entries here if/when you have them.
const coursesData = []

// Skills
const skillsData = [
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

// About
const aboutData = {
  title: 'About Me',
  description:
    'I am Mohammed Hamdi, a software engineering student based in Amman, Jordan. I enjoy building web applications that are clear, useful, and easy to use. My strongest work is in React-based interfaces, application structure, and turning ideas into working products.',
  values: [
    {
      title: 'User-Focused Design',
      description:
        'Building practical, accessible interfaces that solve real-world problems smoothly and intuitively.',
    },
    {
      title: 'Structured Architecture',
      description:
        'Organizing code flow into clear roles, clean APIs, and maintainable full-stack systems.',
    },
    {
      title: 'Problem Solving',
      description:
        'Digitizing scattered processes and connecting people with useful services through structured platforms.',
    },
  ],
  quick_facts: [
    { label: 'Specialties', value: 'React, Full-Stack Web Development, UI/UX' },
    { label: 'Tech Stack', value: 'React, Node.js, Express, Tailwind CSS, MongoDB/PostgreSQL' },
    { label: 'Main Project', value: 'Donation Platform / Menassat Al-Khair' },
  ],
  order: 0,
}

// Hero
const heroData = {
  name: 'Mohammed Hamdi',
  title: 'Software Engineering Student & Full-Stack Developer',
  subtitle: 'Based in Amman, Jordan',
  description:
    'I build practical, user-focused web applications with clean interfaces, structured logic, and real-world problem solving.',
  email: 'mohaa34356@gmail.com',
  phone: '+962 77 653 2286',
  cv_url: '/cv.pdf',
  github_url: 'https://github.com/Mohammed55676/',
  linkedin_url: 'https://www.linkedin.com/in/eng-mohammed-hamdi/',
  profile_image_url: '/profile.jpg',
  focus_tags: ['React', 'Full-Stack Development', 'Node.js', 'Tailwind CSS'],
  order: 0,
}

// Contact Info
const contactInfoData = [
  { icon: 'Mail', text: 'mohaa34356@gmail.com', href: 'mailto:mohaa34356@gmail.com', gradient: 'from-blue-500 to-cyan-500', is_external: false, order: 0 },
  { icon: 'Phone', text: '+962 77 653 2286', href: 'tel:+962776532286', gradient: 'from-green-500 to-emerald-500', is_external: false, order: 1 },
  { icon: 'Github', text: 'github.com/Mohammed55676', href: 'https://github.com/Mohammed55676/', gradient: 'from-gray-700 to-gray-900', is_external: true, order: 2 },
  { icon: 'Linkedin', text: 'linkedin.com/in/eng-mohammed-hamdi', href: 'https://www.linkedin.com/in/eng-mohammed-hamdi/', gradient: 'from-blue-600 to-blue-800', is_external: true, order: 3 },
]

// Footer
const footerData = {
  name: 'Mohammed Hamdi',
  description:
    'Software Engineering Student & Full-Stack Developer based in Amman, Jordan. Building practical web applications with clean interfaces.',
  quick_links: ['About', 'Education', 'Skills', 'Experience', 'Projects', 'Contact'],
  social_links: [
    { icon: 'Github', href: 'https://github.com/Mohammed55676/', label: 'GitHub' },
    { icon: 'Linkedin', href: 'https://www.linkedin.com/in/eng-mohammed-hamdi/', label: 'LinkedIn' },
    { icon: 'Mail', href: 'mailto:mohaa34356@gmail.com', label: 'Email' },
  ],
  copyright_text: `© ${new Date().getFullYear()} Mohammed Hamdi. All rights reserved.`,
}

// Navbar
const navbarData = {
  name: 'Mohammed Hamdi',
  nav_items: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],
}

// Helper: insert only if a matching record doesn't already exist
async function insertIfNotExists(table, records, uniqueField = 'title') {
  const results = []
  let inserted = 0
  let skipped = 0

  for (const record of records) {
    const { data: existing } = await supabase
      .from(table)
      .select('id')
      .eq(uniqueField, record[uniqueField])
      .limit(1)

    if (existing && existing.length > 0) {
      skipped++
      continue
    }

    const { data, error } = await supabase
      .from(table)
      .insert(record)
      .select()
      .single()

    if (error) {
      console.error(`Error inserting ${record[uniqueField]}:`, error.message)
    } else {
      results.push(data)
      inserted++
    }
  }

  return { inserted, skipped, results }
}

async function insertSingleton(table, record, label) {
  const { data: existing } = await supabase.from(table).select('id').limit(1)

  if (!existing || existing.length === 0) {
    const { error } = await supabase.from(table).insert(record).select().single()
    if (error) {
      console.error(`❌ Error inserting ${label}:`, error.message)
    } else {
      console.log(`✅ Migrated ${label}`)
    }
  } else {
    console.log(`⏭️  ${label} already exists, skipped`)
  }
}

async function migrateCollection(table, records, label, uniqueField = 'title') {
  if (records.length === 0) {
    console.log(`⏭️  No ${label} to migrate, skipped`)
    return
  }
  const { inserted, skipped } = await insertIfNotExists(table, records, uniqueField)
  if (inserted > 0) {
    console.log(`✅ Migrated ${inserted} ${label}${skipped > 0 ? ` (${skipped} already existed, skipped)` : ''}`)
  } else if (skipped > 0) {
    console.log(`⏭️  All ${skipped} ${label} already exist, skipped`)
  }
}

async function migrateData() {
  console.log('🚀 Starting data migration...\n')

  try {
    // Education is matched on institution to avoid duplicates
    await migrateCollection('education', educationData, 'education entries', 'institution')
    await migrateCollection('publications', publicationsData, 'publications', 'title')
    await migrateCollection('work_experience', workExperienceData, 'work experience entries', 'title')
    await migrateCollection('projects', projectsData, 'projects', 'title')
    await migrateCollection('research_areas', researchAreasData, 'research areas', 'title')
    await migrateCollection('courses', coursesData, 'courses', 'title')
    await migrateCollection('skills', skillsData, 'skills', 'name')

    await insertSingleton('about', aboutData, 'About section')
    await insertSingleton('hero', heroData, 'Hero section')
    await migrateCollection('contact_info', contactInfoData, 'contact info entries', 'text')
    await insertSingleton('footer', footerData, 'Footer section')
    await insertSingleton('navbar', navbarData, 'Navbar section')

    console.log('\n✨ Migration complete!')
    console.log('\n💡 Safe to re-run — duplicates are automatically skipped.')
    console.log('💡 Manage your content from the admin panel at /admin.')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrateData()
