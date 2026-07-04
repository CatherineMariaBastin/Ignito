import { useState } from 'react'

const LINES = [
  'Amaze! Amaze! Amaze!',
  'Good. Rocky good crew.',
  'Forty-two minutes to Event Horizon.',
  'Rocky like this event. Rocky vote yes.',
]

export default function RockyMascot() {
  const [open, setOpen] = useState(false)
  const [line, setLine] = useState(LINES[0])

  function handleClick() {
    setLine(LINES[Math.floor(Math.random() * LINES.length)])
    setOpen(true)
    window.clearTimeout(handleClick._t)
    handleClick._t = window.setTimeout(() => setOpen(false), 3200)
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="glass-panel rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[210px] text-sm font-body text-starlight animate-rise">
          {line}
        </div>
      )}
      <button
        onClick={handleClick}
        aria-label="Tap Rocky for a mission update"
        className="w-16 h-16 rounded-full overflow-hidden border-2 border-nebula-green/60 shadow-[0_0_30px_rgba(57,255,176,0.4)] hover:scale-110 active:scale-95 transition-transform animate-float"
      >
        <img
          src={`${import.meta.env.BASE_URL}rocky.jpg`}
          alt="Rocky mascot"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  )
}
