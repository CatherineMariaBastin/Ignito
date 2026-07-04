import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#events', label: 'Events' },
  { href: '#competitions', label: 'Competitions' },
  { href: '#specials', label: 'Sun & Moon' },
  { href: '#galaxy', label: 'The Galaxy' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-panel shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="relative w-8 h-8 rounded-full bg-gradient-to-br from-nebula-blue via-nebula-pink to-nebula-green animate-spin-slow" />
          <span className="font-display font-extrabold tracking-widest text-lg sm:text-xl text-starlight group-hover:text-nebula-pink transition-colors">
            IGNITO
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8 font-body text-sm uppercase tracking-[0.2em] text-starlight/80">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative hover:text-nebula-green transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-nebula-green hover:after:w-full after:transition-all">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-nebula-blue/60 text-xs uppercase tracking-[0.25em] hover:bg-nebula-blue/20 hover:border-nebula-pink transition-colors"
        >
          Launch With Us
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-6 bg-starlight transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-starlight transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-starlight transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="glass-panel px-6 py-4 flex flex-col gap-4 text-sm uppercase tracking-[0.2em]">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-1 hover:text-nebula-green transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
