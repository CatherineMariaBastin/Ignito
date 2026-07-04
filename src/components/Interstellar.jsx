import useReveal from '../hooks/useReveal'

const TIMELINE = [
  { t: '+00h', label: 'Docking', desc: 'Registration, kit pickup, and crew briefing at Mission Control.' },
  { t: '+01h', label: 'Ignition Day', desc: 'Opening keynote and the grand challenge reveal.' },
  { t: '+06h', label: 'Orbital Insertion', desc: 'All eight planetary events open simultaneously across campus.' },
  { t: '+30h', label: 'Gravity Assist', desc: 'Midpoint mentor rounds — a course-correction check-in for every team.' },
  { t: '+54h', label: 'Event Horizon', desc: 'Final submissions close. No signal gets out after this line.' },
  { t: '+66h', label: 'Eclipse Night', desc: 'Awards, stargazing, and the crew photo under the stars.' },
]

export default function Interstellar() {
  const ref = useReveal()

  return (
    <section id="galaxy" ref={ref} className="relative py-28 px-5 sm:px-8 overflow-hidden">
      {/* Black hole / wormhole visual */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] max-w-[900px] max-h-[900px] opacity-40">
        <div
          className="w-full h-full rounded-full animate-spin-slow"
          style={{
            background:
              'conic-gradient(from 0deg, #3a5cff, #ff3fa4, #ffd23f, #39ffb0, #3a5cff)',
            filter: 'blur(60px)',
          }}
        />
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-void shadow-[0_0_120px_60px_rgba(0,0,0,0.9)]" />

      <div className="relative max-w-5xl mx-auto text-center">
        <p className="reveal eyebrow text-nebula-blue text-xs font-mono mb-3">SECTION 04</p>
        <h2 className="reveal font-display font-extrabold text-4xl sm:text-5xl mb-6">
          Beyond the <span className="text-gradient">Event Horizon</span>
        </h2>
        <p className="reveal max-w-2xl mx-auto text-starlight/75 leading-relaxed mb-4">
          Every techfest bends time a little — an hour of debugging can feel like a day,
          and the final hour before submissions always feels shorter than the first.
          IGNITO leans into that: our schedule is written like a flight plan, each
          checkpoint a gravitational marker on the way to the horizon.
        </p>
        <p className="reveal font-display text-xl text-star-yellow mb-16">
          Bring what you can carry. Leave with more than you brought.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-nebula-blue via-nebula-pink to-nebula-green sm:-translate-x-1/2" />
        <ul className="space-y-10">
          {TIMELINE.map((item, i) => (
            <li
              key={item.t}
              className={`reveal relative flex sm:justify-center ${
                i % 2 === 0 ? 'sm:pr-[52%]' : 'sm:pl-[52%] sm:justify-end'
              }`}
            >
              <div className="pl-12 sm:pl-0 sm:w-full sm:max-w-md relative">
                <span className="absolute -left-[2.05rem] sm:left-auto sm:-translate-x-1/2 sm:right-full sm:mr-0 top-1 w-3 h-3 rounded-full bg-starlight shadow-[0_0_12px_3px_rgba(244,244,255,0.6)]" />
                <p className="font-mono text-xs text-nebula-green mb-1">{item.t}</p>
                <p className="font-display text-lg">{item.label}</p>
                <p className="text-starlight/60 text-sm mt-1">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
