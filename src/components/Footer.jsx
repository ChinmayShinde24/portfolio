// Footer.jsx
import React from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Demo', href: '/demo' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/ChinmayShinde24', icon: 'ri-github-fill' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chinmay-shinde-143157239', icon: 'ri-linkedin-fill' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-white/10 bg-black px-5 py-8 sm:px-10 sm:py-10 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="font-logo text-base font-semibold text-white sm:text-lg">
          Chinmay Shinde
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/60 sm:gap-x-6 sm:text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/30 hover:text-white sm:h-9 sm:w-9"
            >
              <i className={`${s.icon} text-sm sm:text-base`} />
            </a>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-white/40 sm:mt-8 sm:text-xs">
        © {year} Chinmay Shinde · CodeWithChinmay. Built with React js & a lot of Chai.
      </p>
    </footer>
  )
}

export default Footer