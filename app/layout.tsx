import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export const metadata: Metadata = {
  title: 'Mohammed Hamdi | Software Engineering & Full-Stack Developer',
  description: 'Software Engineering Student & Full-Stack Developer based in Amman, Jordan. Specializing in React applications and practical full-stack platforms.',
  keywords: ['Software Engineering', 'Full-Stack Developer', 'React', 'Node.js', 'Web Development', 'Amman', 'Jordan'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  )
}
