import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import eventsData from '../data/eventsData'

export default function Events() {
  const ref = useReveal()
  const [activeId, setActiveId] = useState(eventsData[2].id) // default: Earth
  const active = eventsData.find((e) => e.id === activeId)

  return (
    <section id="events" ref={ref} className="relative py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-nebula-green text-xs font-mono mb-3">SECTION 01</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl">
            Eight Worlds, <span className="text-gradient">Eight Missions</span>
          </h2>
          <p className="mt-4 text-starlight/70">
            Every flagship event is anchored to a planet in the order it orbits the sun.
            Tap a world to read its mission brief.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Orbit diagram */}
          <div className="reveal relative aspect-square max-w-xl mx-auto w-full">
            {/* Sun at the centre */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-star-yellow to-star-amber shadow-[0_0_50px_rgba(255,210,63,0.7)] z-10" />

            {eventsData.map((ev, i) => {
              const size = 340 - i * 4 // orbit ring sizes, nested
              const orbitSize = 60 + i * 34
              const duration = 18 + i * 6
              const isActive = ev.id === activeId
              return (
                <div
                  key={ev.id}
                  className="absolute top-1/2 left-1/2 rounded-full border border-starlight/10"
                  style={{
                    width: `${orbitSize}%`,
                    height: `${orbitSize}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      animation: `orbit ${duration}s linear infinite`,
                      animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                    }}
                  >
                    <button
                      onClick={() => setActiveId(ev.id)}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full transition-transform hover:scale-125 focus:scale-125 focus:outline-none"
                      style={{
                        width: ev.size * 0.5,
                        height: ev.size * 0.5,
                      }}
                      aria-label={`${ev.planet}: ${ev.name}`}
                    >
                      <span
                        className={`block w-full h-full rounded-full transition-shadow ${
                          isActive ? 'ring-2 ring-offset-2 ring-offset-void ring-nebula-green' : ''
                        }`}
                        style={{
                          background: ev.color,
                          boxShadow: `0 0 16px 2px ${ev.glow}`,
                        }}
                      />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Detail card */}
          <div className="reveal glass-panel rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-5">
              <span
                className="w-12 h-12 rounded-full shrink-0"
                style={{ background: active.color, boxShadow: `0 0 20px 4px ${active.glow}` }}
              />
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-nebula-green">{active.planet}</p>
                <h3 className="font-display text-2xl sm:text-3xl">{active.name}</h3>
              </div>
            </div>
            <p className="text-starlight/60 italic mb-4">{active.tagline}</p>
            <p className="text-starlight/80 leading-relaxed mb-6">{active.description}</p>
            <div className="flex flex-wrap gap-6 text-sm font-mono text-starlight/60">
              <div>
                <p className="text-starlight/40 uppercase tracking-widest text-[10px] mb-1">Orbital period</p>
                <p>{active.duration}</p>
              </div>
              <div>
                <p className="text-starlight/40 uppercase tracking-widest text-[10px] mb-1">Mission profile</p>
                <p className="capitalize">{active.speedClass.replace('-', ' ')}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {eventsData.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => setActiveId(ev.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border transition-colors ${
                    ev.id === activeId
                      ? 'border-nebula-green text-nebula-green'
                      : 'border-starlight/15 text-starlight/50 hover:border-starlight/40'
                  }`}
                >
                  {ev.planet}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
