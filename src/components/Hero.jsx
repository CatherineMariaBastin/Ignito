import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Model } from './Model'
import ModelErrorBoundary from './ModelErrorBoundary'

export default function Hero() {
  const parallaxRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function onMove(e) {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      setTilt({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="home"
      ref={parallaxRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-45"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}nebula-veil.jpg)`,
          transform: `translate3d(${tilt.x * -10}px, ${tilt.y * -10}px, 0) scale(1.1)`,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-nebula-radial" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void/40 via-void/70 to-void" />

      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-12">
        <div className="reveal in-view">
          <p className="eyebrow text-nebula-green text-xs sm:text-sm font-mono mb-5">
            04 – 06 · NOV · MISSION CONTROL, EARTH
          </p>
          <h1 className="font-display font-black leading-[0.95] text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
            <span className="block text-starlight">IGNITO</span>
            <span className="block text-gradient">TECHFEST</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-starlight/75">
            A three-day expedition across the solar system of ideas — eight flagship
            events, one for every planet, a constellation of side competitions, and a
            single directive stitched into every mission patch:
          </p>
          <p className="mt-4 font-display text-2xl sm:text-3xl text-star-yellow tracking-wide">
            "Amaze! Amaze! Amaze!"
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#events"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-nebula-blue to-nebula-pink font-body font-medium tracking-wide shadow-[0_0_30px_rgba(255,63,164,0.35)] hover:shadow-[0_0_45px_rgba(255,63,164,0.55)] transition-shadow"
            >
              Chart the Events
            </a>
            <a
              href="#galaxy"
              className="px-7 py-3 rounded-full border border-starlight/25 hover:border-nebula-green hover:text-nebula-green transition-colors"
            >
              Enter the Galaxy
            </a>
          </div>

          <div className="mt-14 flex items-center gap-8 text-starlight/60 text-sm font-mono">
            <div>
              <p className="text-2xl font-display text-starlight">8</p>
              <p>Planetary events</p>
            </div>
            <div className="w-px h-10 bg-starlight/15" />
            <div>
              <p className="text-2xl font-display text-starlight">30+</p>
              <p>Star competitions</p>
            </div>
            <div className="w-px h-10 bg-starlight/15" />
            <div>
              <p className="text-2xl font-display text-starlight">72h</p>
              <p>Non-stop orbit</p>
            </div>
          </div>
        </div>

        

        {/* Rocky, floating in his own interactive 3D space orbit */}
        <div className="relative flex justify-center lg:justify-end">
          <div
            className="relative w-64 sm:w-80 lg:w-96 aspect-square rounded-full cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{ transform: `translate3d(${tilt.x * 12}px, ${tilt.y * 12}px, 0)` }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-nebula-blue/30 via-nebula-pink/20 to-nebula-green/20 blur-2xl animate-pulse-glow" />
            <div className="absolute inset-6 rounded-full border border-dashed border-starlight/20 animate-spin-slow" />

            <ModelErrorBoundary
              fallback={
                <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden border border-starlight/10 bg-slate-950/40 flex items-center justify-center text-starlight/40 text-xs font-mono text-center p-4">
                  Model failed to load
                </div>
              }
            >
              <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden shadow-[0_0_60px_rgba(58,92,255,0.35)] border border-starlight/10 bg-slate-950/40">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.9} />
                  <directionalLight position={[5, 5, 5]} intensity={1.5} />
                  

                  <Suspense fallback={null}>
                    <Stage environment="night" intensity={0.4} adjustCamera={true}>
                    <Model />
                  </Stage>
                  </Suspense>

                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1.2}
                    makeDefault
                  />
                </Canvas>
              </div>
            </ModelErrorBoundary>

            
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-[0.2em] text-nebula-green whitespace-nowrap z-20">
              Rotate Rocky using cursor
            </span>

            <span className="absolute -bottom-20 left-1/2 -translate-x-1/2 glass-panel px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-nebula-green whitespace-nowrap z-20">
              Rocky · Mission Ambassador
        </span>
          </div>
        </div>
      </div>

      
    </section>
  )
}