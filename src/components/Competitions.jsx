import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import competitionsData from '../data/competitionsData'

export default function Competitions() {
  const ref = useReveal()
  const [flippedId, setFlippedId] = useState(null)

  return (
    <section id="competitions" ref={ref} className="relative py-28 px-5 sm:px-8 bg-horizon-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-nebula-pink text-xs font-mono mb-3">SECTION 02</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl">
            A Sky Full of <span className="text-gradient">Competitions</span>
          </h2>
          <p className="mt-4 text-starlight/70">
            Every side-competition is a star of its own class. Tap a star to reveal its
            transmission.
          </p>
        </div>

        <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {competitionsData.map((c, i) => {
            const flipped = flippedId === c.id
            return (
              <button
                key={c.id}
                onClick={() => setFlippedId(flipped ? null : c.id)}
                className="group relative aspect-[4/5] [perspective:1000px] text-left focus:outline-none"
              >
                <div
                  className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${
                    flipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* Front */}
                  <div className="absolute inset-0 [backface-visibility:hidden] glass-panel rounded-2xl flex flex-col items-center justify-center gap-4 p-4">
                    <span
                      className="rounded-full animate-twinkle"
                      style={{
                        width: c.size * 2.2,
                        height: c.size * 2.2,
                        background: c.color,
                        boxShadow: `0 0 ${c.size}px ${c.size / 2}px ${c.color}55`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                    <div className="text-center">
                      <p className="font-display text-sm sm:text-base">{c.name}</p>
                      <p className="text-[10px] sm:text-xs font-mono text-starlight/50 mt-1">{c.type}</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] glass-panel rounded-2xl flex flex-col items-center justify-center gap-3 p-4 text-center border-nebula-green/40">
                    <p className="text-xs sm:text-sm text-starlight/80 leading-relaxed">{c.format}</p>
                    <p className="font-display text-star-yellow text-sm sm:text-base">{c.prize}</p>
                    <span className="text-[10px] font-mono text-starlight/40 uppercase tracking-widest">Tap to close</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
