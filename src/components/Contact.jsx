import { useState } from 'react'
import useReveal from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal()
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} className="relative py-28 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <div className="reveal">
          <p className="eyebrow text-nebula-pink text-xs font-mono mb-3">SECTION 05</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mb-5">
            Send a <span className="text-gradient">Transmission</span>
          </h2>
          <p className="text-starlight/70 mb-8 leading-relaxed">
            Questions about registration, sponsorships, or campus logistics — Mission
            Control reads every message that comes in. Expect a reply within one orbit
            (24 hours).
          </p>

          <div className="flex items-start gap-4">
            <img
              src="/rocky.jpg"
              alt="Rocky"
              className="w-16 h-16 rounded-full object-cover border border-starlight/10 shadow-[0_0_25px_rgba(57,255,176,0.25)]"
            />
            <p className="text-sm text-starlight/60 italic pt-2">
              "Amaze! Amaze! Amaze!" — Rocky, on seeing the sponsor booth's LED wall
              for the first time.
            </p>
          </div>

          <dl className="mt-10 space-y-3 text-sm font-mono text-starlight/60">
            <div className="flex gap-3">
              <dt className="text-starlight/40">Frequency</dt>
              <dd>hello@ignito-fest.example</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-starlight/40">Coordinates</dt>
              <dd>Dept. of Engineering, Main Campus</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-starlight/40">Launch window</dt>
              <dd>Nov 4 – 6</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="reveal glass-panel rounded-3xl p-8 sm:p-10 space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-starlight/50 mb-2">
              Name
            </label>
            <input
              id="name"
              required
              type="text"
              placeholder="Ada Lovelace"
              className="w-full bg-white/5 border border-starlight/15 rounded-xl px-4 py-3 outline-none focus:border-nebula-green transition-colors placeholder:text-starlight/30"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-starlight/50 mb-2">
              Email
            </label>
            <input
              id="email"
              required
              type="email"
              placeholder="you@crew.space"
              className="w-full bg-white/5 border border-starlight/15 rounded-xl px-4 py-3 outline-none focus:border-nebula-green transition-colors placeholder:text-starlight/30"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-starlight/50 mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              placeholder="Tell Mission Control what you need..."
              className="w-full bg-white/5 border border-starlight/15 rounded-xl px-4 py-3 outline-none focus:border-nebula-green transition-colors placeholder:text-starlight/30 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-nebula-blue to-nebula-pink font-medium tracking-wide hover:shadow-[0_0_35px_rgba(255,63,164,0.5)] transition-shadow"
          >
            {sent ? 'Transmission received ✓' : 'Send Transmission'}
          </button>
          {sent && (
            <p className="text-nebula-green text-sm text-center font-mono">
              Rocky received your signal. Expect a reply soon.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
