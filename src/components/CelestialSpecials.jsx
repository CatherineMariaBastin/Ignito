import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Navigation, Volume2, VolumeX, Orbit, RefreshCw } from "lucide-react";
import useReveal from "../hooks/useReveal";

export default function CelestialSpecials() {
  const ref = useReveal();

  // State: 'sun' (Solar Meridian), 'night' (Lunar Alignment)
  const [celestialMode, setCelestialMode] = useState("sun");

  // Orbit slider state: 0 (Sunrise) -> 50 (High Solar Noon) -> 75 (Sunset/Twilight) -> 100 (Deep Obsidian Night)
  const [orbitProgress, setOrbitProgress] = useState(25);
  const [isAutoOrbit, setIsAutoOrbit] = useState(false);

  // Extra interactive states
  const [stars, setStars] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const autoOrbitRef = useRef(null);

  // Generate background star particles for Night/Twilight modes
  useEffect(() => {
    const starList = [];
    for (let i = 0; i < 70; i++) {
      starList.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.8,
        delay: `${(Math.random() * 5).toFixed(1)}s`,
      });
    }
    setStars(starList);
  }, []);

  // Sync celestialMode with orbitProgress slider to keep standard features unified
  useEffect(() => {
    if (orbitProgress <= 75) {
      setCelestialMode("sun");
    } else {
      setCelestialMode("night");
    }
  }, [orbitProgress]);

  // Automated Orbit Sweep Loop
  useEffect(() => {
    if (isAutoOrbit) {
      autoOrbitRef.current = setInterval(() => {
        setOrbitProgress((prev) => {
          const next = prev + 1;
          if (next > 100) {
            playBeep(261.63, 0.4, "sine"); // Dawn transition beep
            return 0; // Reset to Sunrise
          }
          // Soft ticking feedback at significant cosmic alignments
          if (next === 25) playBeep(293.66, 0.1, "sine"); // Midmorning
          if (next === 50) playBeep(392.00, 0.15, "triangle"); // Solar Noon
          if (next === 75) playBeep(329.63, 0.15, "sine"); // Twilight
          if (next === 100) playBeep(196.00, 0.25, "triangle"); // Obsidian Night
          return next;
        });
      }, 150); // Fluid animation speed
    } else {
      if (autoOrbitRef.current) {
        clearInterval(autoOrbitRef.current);
      }
    }
    return () => {
      if (autoOrbitRef.current) {
        clearInterval(autoOrbitRef.current);
      }
    };
  }, [isAutoOrbit]);

  // Simple feedback sounds using standard Web Audio API (completely client-side, reliable)
  const playBeep = (freq, duration, type = "sine") => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.value = freq;
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context block:", e);
    }
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    if (newState) {
      setTimeout(() => playBeep(523.25, 0.4, "sine"), 50); // Sound feedback
    }
  };

  // Quick switch presets
  const handlePresetSelect = (val) => {
    setOrbitProgress(val);
    if (val === 0) playBeep(261.63, 0.35, "sine"); // Sunrise
    if (val === 25) playBeep(293.66, 0.35, "sine"); // Midday
    if (val === 50) playBeep(329.63, 0.35, "sine"); // Zenith
    if (val === 75) playBeep(392.00, 0.35, "sine"); // Sunset
    if (val === 100) playBeep(440.00, 0.35, "sine"); // Deep Night
  };

  // Dynamic Background style based on real-time orbit progress slider
  const getSkyBackgroundStyle = () => {
    if (orbitProgress <= 15) {
      // 0 - 15: Soft Dawn / Sunrise (Rose fading to amber/lavender)
      return {
        background: "linear-gradient(to bottom, #1e0e24 0%, #3e1b34 40%, #5d2537 70%, #90413e 100%)"
      };
    } else if (orbitProgress > 15 && orbitProgress <= 45) {
      // 16 - 45: High Energy Morning to High Noon (Deep warm blue to solar aura)
      const ratio = (orbitProgress - 16) / 29;
      return {
        background: `linear-gradient(to bottom, #050b1a 0%, #0c1833 30%, #152b57 65%, #254b8a ${70 + ratio * 30}%)`
      };
    } else if (orbitProgress > 45 && orbitProgress <= 75) {
      // 46 - 75: Sunset & Golden Hour (Amber red to gold corona)
      return {
        background: "linear-gradient(to bottom, #090614 0%, #1c0e18 35%, #42151d 70%, #7d2a1e 100%)"
      };
    } else if (orbitProgress > 75 && orbitProgress <= 88) {
      // 76 - 88: Deep Twilight (Violet fading to deep navy)
      return {
        background: "linear-gradient(to bottom, #020208 0%, #0c0924 45%, #1d0f3c 80%, #3d1c5a 100%)"
      };
    } else {
      // 89 - 100: Obsidian Deep Space (Ebony to nebula tint)
      return {
        background: "linear-gradient(to bottom, #010103 0%, #030308 40%, #060614 75%, #0d0821 100%)"
      };
    }
  };

  // Calculate Sun and Moon coordinate orbits based on 0 - 100 progress
  // Represents a parabolic dome trajectory
  const getSunPosition = () => {
    // Sun reaches peak height at progress = 37, then sets below horizon (y = 120%) beyond progress 75
    const progressFactor = orbitProgress / 75; // Map 0-75 to 0-1
    if (orbitProgress > 75) {
      return { x: 95, y: 130, opacity: 0 }; // Sunset below view
    }
    const x = progressFactor * 85 + 5; // Left margin to right
    const y = 80 - Math.sin(progressFactor * Math.PI) * 65; // High parabolic arc
    const opacity = orbitProgress < 10 ? orbitProgress / 10 : (orbitProgress > 70 ? (75 - orbitProgress) / 5 : 1);
    return { x, y, opacity };
  };

  const getMoonPosition = () => {
    // Moon rises when progress is > 75, peaks around progress = 90
    if (orbitProgress < 75) {
      return { x: 5, y: 130, opacity: 0 }; // Hidden below horizon
    }
    const progressFactor = (orbitProgress - 75) / 25; // Map 75-100 to 0-1
    const x = progressFactor * 80 + 15;
    const y = 80 - Math.sin(progressFactor * Math.PI) * 60;
    const opacity = orbitProgress < 77 ? (orbitProgress - 75) / 2 : 1;
    return { x, y, opacity };
  };

  // Determine star visibility (Fully visible in Deep Night, partially in Twilight, gone in Noon)
  const getStarsOpacity = () => {
    if (orbitProgress <= 15) return 0.2; // Dawn stars
    if (orbitProgress > 15 && orbitProgress < 65) return 0.02; // No stars during solar zenith
    if (orbitProgress >= 65 && orbitProgress < 85) {
      return ((orbitProgress - 65) / 20) * 0.7; // Twilight rising stars
    }
    return 1.0; // Obsidian Deep Night
  };

  // Get current Celestial label for the station dashboard
  const getCelestialLabel = () => {
    if (orbitProgress <= 10) return "Dawn Eclipse Ignition";
    if (orbitProgress > 10 && orbitProgress <= 35) return "Solar Ascent Meridian";
    if (orbitProgress > 35 && orbitProgress <= 55) return "High Solar Zenith";
    if (orbitProgress > 55 && orbitProgress <= 70) return "Golden Hour Descent";
    if (orbitProgress > 70 && orbitProgress <= 85) return "Cosmic Twilight Corona";
    return "Obsidian Alignment Phase";
  };

  return (
    <section 
      id="specials" 
      ref={ref} 
      style={getSkyBackgroundStyle()}
      className="relative py-28 px-5 sm:px-8 transition-all duration-1000 overflow-hidden"
    >
      {/* CELESTIAL SKY LIGHT LEAKS & AURORAS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Dynamic Sun Ray Glow Leak */}
        <div 
          className="absolute rounded-full transition-all duration-1000 blur-[100px] pointer-events-none"
          style={{
            left: `${getSunPosition().x - 15}%`,
            top: `${getSunPosition().y - 15}%`,
            width: "277.5px",
            height: "277.5px",
            opacity: getSunPosition().opacity * 0.45,
            background: "radial-gradient(circle, rgba(251,191,36,0.5) 0%, rgba(245,158,11,0.2) 50%, rgba(234,88,12,0) 100%)"
          }}
        />

        {/* Dynamic Moon Ice Aura Glow Leak */}
        <div 
          className="absolute rounded-full transition-all duration-1000 blur-[90px] pointer-events-none"
          style={{
            left: `${getMoonPosition().x - 12}%`,
            top: `${getMoonPosition().y - 12}%`,
            width: "250px",
            height: "250px",
            opacity: getMoonPosition().opacity * 0.35,
            background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(99,102,241,0.15) 60%, rgba(0,0,0,0) 100%)"
          }}
        />

        {/* Cosmic Aurora Wave Overlays (Always flowing gently at bottom/margins) */}
        <div 
          className="absolute -bottom-48 left-10 w-[70%] h-[400px] rounded-full bg-gradient-to-tr from-nebula-blue/5 via-nebula-purple/5 to-transparent blur-[120px] aurora-leak transition-opacity duration-1000"
          style={{
            opacity: orbitProgress > 65 ? 0.85 : 0.15
          }}
        />
        <div 
          className="absolute -top-48 right-10 w-[50%] h-[350px] rounded-full bg-gradient-to-bl from-star-orange/5 via-nebula-indigo/5 to-transparent blur-[110px] aurora-leak [animation-delay:4s] transition-opacity duration-1000"
          style={{
            opacity: orbitProgress <= 55 ? 0.6 : 0.1
          }}
        />

        {/* Twinkling Star Clusters with relative opacities */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: getStarsOpacity() }}
        >
          {stars.map((star) => (
            <div
              key={star.id}
              className="star-particle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.id % 7 === 0 ? "#38bdf8" : (star.id % 9 === 0 ? "#fbcfe8" : "#ffffff"),
                animation: `twinkle ${2.5 + (star.id % 5)}s ease-in-out infinite ${star.delay}`,
              }}
            />
          ))}
        </div>

        {/* Cosmic Dust / Shooting Star streaks */}
        {orbitProgress > 60 && (
          <>
            <div className="absolute top-[12%] left-[18%] w-[120px] h-[1px] bg-gradient-to-r from-transparent via-starlight to-transparent -rotate-[35deg] opacity-30 animate-[pulse-glow_7s_infinite]" />
            <div className="absolute top-[48%] right-[10%] w-[180px] h-[1px] bg-gradient-to-r from-transparent via-nebula-blue to-transparent -rotate-[35deg] opacity-25 animate-[pulse-glow_9s_infinite_3.5s]" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* INTERACTIVE SKY DOME HORIZON TRACKER */}
        <div className="reveal flex flex-col items-center justify-center mb-16 px-4">
          <div className="flex items-center gap-3 mb-4 text-xs font-mono uppercase tracking-widest text-starlight/40 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span>Cosmic Orbit Alignment Sync</span>
            <button 
              onClick={toggleSound}
              className="hover:text-star-yellow transition-colors cursor-pointer flex items-center justify-center"
              title={soundEnabled ? "Mute interface feedback" : "Unmute interface feedback"}
              id="sound-toggle"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* DYNAMIC SKY DOME CANVAS-STYLE DISPLAY */}
          <div className="w-full max-w-2xl h-36 bg-black/50 border border-white/5 rounded-3xl mb-6 relative overflow-hidden flex flex-col items-center justify-end p-4 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-950/40 via-black/80 to-[#020205] pointer-events-none" />
            
            {/* Horizon Guideline arc */}
            <svg className="absolute inset-x-0 bottom-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 5 100 A 45 45 0 0 1 95 100" fill="none" stroke="#f8fafc" strokeWidth="0.5" strokeDasharray="2,2" />
            </svg>

            {/* Rising/Setting Sun inside the arc */}
            {getSunPosition().opacity > 0 && (
              <div 
                className="absolute transition-all duration-300 ease-out flex flex-col items-center pointer-events-none"
                style={{
                  left: `${getSunPosition().x}%`,
                  top: `${getSunPosition().y}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="relative">
                  <span className="absolute -inset-4 bg-gradient-to-r from-star-yellow to-star-orange rounded-full blur-lg opacity-80 animate-pulse" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-star-yellow via-star-amber to-star-orange flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.8)]">
                    <Sun className="w-5 h-5 animate-[spin_16s_linear_infinite]" />
                  </div>
                </div>
                <span className="text-[8px] font-mono text-star-yellow mt-1.5 uppercase tracking-widest bg-black/60 border border-star-yellow/20 px-1 rounded">Sun</span>
              </div>
            )}

            {/* Rising/Setting Moon inside the arc */}
            {getMoonPosition().opacity > 0 && (
              <div 
                className="absolute transition-all duration-300 ease-out flex flex-col items-center pointer-events-none"
                style={{
                  left: `${getMoonPosition().x}%`,
                  top: `${getMoonPosition().y}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="relative">
                  <span className="absolute -inset-4 bg-gradient-to-r from-nebula-blue to-nebula-indigo rounded-full blur-lg opacity-60 animate-pulse" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-slate-800 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                    <Moon className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-[8px] font-mono text-nebula-blue mt-1.5 uppercase tracking-widest bg-black/60 border border-nebula-blue/20 px-1 rounded">Moon</span>
              </div>
            )}

            {/* Horizon Line Ground bar */}
            <div className="w-full h-[1px] bg-white/10 relative z-10 flex items-center justify-between text-[8px] font-mono text-starlight/30 px-6">
              <span>EAST (RISE)</span>
              <span>HORIZON MERIDIAN</span>
              <span>WEST (SET)</span>
            </div>

            {/* Live coordinates display */}
            <div className="absolute top-3 left-4 flex gap-4 text-[9px] font-mono text-starlight/40">
              <div className="flex items-center gap-1">
                <Orbit className="w-3.5 h-3.5 text-star-yellow" />
                <span>ORBIT SPEED: {isAutoOrbit ? "1.5x COMPRESSION" : "STATIONARY"}</span>
              </div>
              <div>
                <span>AZIMUTH: {Math.round((orbitProgress / 100) * 360)}°</span>
              </div>
            </div>

            {/* Live badge of the current hour */}
            <div className="absolute top-3 right-4">
              <span className="text-[9px] font-mono text-star-yellow bg-star-yellow/10 border border-star-yellow/20 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                {getCelestialLabel()}
              </span>
            </div>
          </div>

          {/* DYNAMIC ORBIT MASTER CONTROLLER UNIT */}
          <div className="w-full max-w-md bg-black/60 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-starlight/60">Orbital Position Control</span>
              
              {/* Auto Orbit Switcher */}
              <button
                id="btn-auto-orbit"
                onClick={() => {
                  setIsAutoOrbit(!isAutoOrbit);
                  playBeep(isAutoOrbit ? 150 : 350, 0.25, "triangle");
                }}
                className={`text-[10px] font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                  isAutoOrbit
                    ? "bg-star-yellow text-slate-950 border-star-yellow font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                    : "bg-white/5 text-starlight/60 border-white/10 hover:text-starlight"
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${isAutoOrbit ? "animate-spin" : ""}`} />
                {isAutoOrbit ? "DRIVE ACTIVE" : "ENGAGE AUTO-ORBIT"}
              </button>
            </div>

            {/* Interactive Slider */}
            <div className="space-y-1">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={orbitProgress}
                onChange={(e) => {
                  setOrbitProgress(Number(e.target.value));
                  if (Number(e.target.value) % 10 === 0) {
                    playBeep(200 + Number(e.target.value) * 4, 0.08, "sine");
                  }
                }}
                disabled={isAutoOrbit}
                className="w-full cursor-pointer accent-star-yellow opacity-90 hover:opacity-100 disabled:opacity-50"
                id="orbit-master-slider"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-starlight/40">
                <span>0% Sunrise</span>
                <span>50% High Noon</span>
                <span>75% Sunset</span>
                <span>100% Obsidian Night</span>
              </div>
            </div>

            {/* Speed Presets Buttons */}
            <div className="grid grid-cols-5 gap-2 pt-1 border-t border-white/5">
              <button
                id="preset-sunrise"
                onClick={() => handlePresetSelect(0)}
                className={`py-1 rounded text-[9px] font-mono transition-all duration-300 cursor-pointer ${
                  orbitProgress === 0 ? "bg-white/10 text-star-yellow font-bold" : "text-starlight/40 hover:text-starlight/80"
                }`}
              >
                Sunrise
              </button>
              <button
                id="preset-noon"
                onClick={() => handlePresetSelect(25)}
                className={`py-1 rounded text-[9px] font-mono transition-all duration-300 cursor-pointer ${
                  orbitProgress === 25 ? "bg-white/10 text-star-yellow font-bold" : "text-starlight/40 hover:text-starlight/80"
                }`}
              >
                Morning
              </button>
              <button
                id="preset-zenith"
                onClick={() => handlePresetSelect(50)}
                className={`py-1 rounded text-[9px] font-mono transition-all duration-300 cursor-pointer ${
                  orbitProgress === 50 ? "bg-white/10 text-star-yellow font-bold" : "text-starlight/40 hover:text-starlight/80"
                }`}
              >
                Zenith
              </button>
              <button
                id="preset-sunset"
                onClick={() => handlePresetSelect(75)}
                className={`py-1 rounded text-[9px] font-mono transition-all duration-300 cursor-pointer ${
                  orbitProgress === 75 ? "bg-white/10 text-star-yellow font-bold" : "text-starlight/40 hover:text-starlight/80"
                }`}
              >
                Sunset
              </button>
              <button
                id="preset-night"
                onClick={() => handlePresetSelect(100)}
                className={`py-1 rounded text-[9px] font-mono transition-all duration-300 cursor-pointer ${
                  orbitProgress === 100 ? "bg-white/10 text-star-yellow font-bold" : "text-starlight/40 hover:text-starlight/80"
                }`}
              >
                Obsidian
              </button>
            </div>

          </div>
        </div>

        {/* MAIN SECTION TITLE */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-star-yellow text-xs font-mono mb-3 tracking-[0.25em]">
            SECTION 03 · THE CELESTIAL AXIS
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight transition-colors duration-1000">
            {orbitProgress < 75 ? (
              <>
                The Sun <span className="text-gradient-sun drop-shadow-[0_0_15px_rgba(251,191,36,0.25)]">Opens It.</span>
              </>
            ) : (
              <>
                The Moon <span className="text-gradient-moon drop-shadow-[0_0_15px_rgba(56,189,248,0.25)]">Closes It.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm font-mono text-starlight/50 max-w-md mx-auto">
            {orbitProgress < 75 
              ? "The high-energy ignition, fireside talks, and challenges of the first orbit."
              : "Telescope-assisted stargazing, award sets, and rooftop observatory winds."}
          </p>
        </div>

        {/* CELESTIAL CORES (CARDS) CONTAINER */}
        <div className="flex justify-center items-stretch max-w-xl mx-auto w-full transition-all duration-500">
          
          {/* SUN CARD (IGNITION DAY) */}
          <article 
            id="sun-card"
            style={{ display: orbitProgress < 75 ? "block" : "none" }}
            className="w-full relative overflow-hidden rounded-[32px] p-9 sm:p-12 transition-all duration-750 glass-panel shine-effect sun-card-hover border-star-amber/60 shadow-[0_0_50px_rgba(245,158,11,0.25)] ring-1 ring-star-yellow/30"
          >
            {/* Spinning sun rays background visual element, highly dynamic */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-star-yellow to-star-orange blur-3xl opacity-40 animate-pulse-glow" />
            
            {/* Interactive Sun Ring Aura */}
            <div className="relative">
              <div className="relative inline-flex mb-6 group">
                <span className="absolute -inset-2 bg-gradient-to-r from-star-yellow to-star-amber rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />
                <span className="relative inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-star-yellow via-star-amber to-star-orange items-center justify-center shadow-[0_0_50px_rgba(255,157,63,0.6)] text-slate-950 transition-transform duration-500 hover:rotate-45 scale-110">
                  <Sun className="w-8 h-8 animate-[spin_12s_linear_infinite]" />
                </span>
              </div>

              <p className="text-xs font-mono uppercase tracking-[0.3em] text-star-yellow mb-2 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-star-yellow animate-ping" />
                FIRST LIGHT . OPENING CEREMONY
              </p>
              
              <h3 className="font-display text-3xl sm:text-4xl mb-4 font-bold tracking-tight text-starlight">
                Ignition Day
              </h3>
              
              <p className="text-starlight/75 leading-relaxed mb-8">
                Every mission needs a sunrise. Ignition Day is the keynote and lighting ceremony that starts the 72-hour orbit - a fireside talk from a working aerospace engineer, the reveal of this year's grand challenge, and the symbolic "ignition" of the main stage rig.
              </p>

              {/* Floating Sun Items */}
              <ul className="space-y-4 text-sm font-mono text-starlight/60 mb-8 border-t border-white/5 pt-6">
                <li className="flex items-start gap-3 hover:text-star-yellow transition-all duration-300 celestial-float-1">
                  <span className="text-star-yellow font-bold text-base leading-none">O</span>
                  <span className="text-starlight/80">Day 1 . 09:00 . Main Auditorium</span>
                </li>
                <li className="flex items-start gap-3 hover:text-star-yellow transition-all duration-300 celestial-float-2 pl-6">
                  <span className="text-starlight/80">Keynote + grand challenge reveal</span>
                </li>
                <li className="flex items-start gap-3 hover:text-star-yellow transition-all duration-300 celestial-float-3">
                  <span className="text-star-yellow font-bold text-base leading-none">O</span>
                  <span className="text-starlight/80">Open to all registered crews</span>
                </li>
              </ul>

            </div>
          </article>

          {/* MOON CARD (ECLIPSE NIGHT) */}
          <article 
            id="moon-card"
            style={{ display: orbitProgress >= 75 ? "block" : "none" }}
            className="w-full relative overflow-hidden rounded-[32px] p-9 sm:p-12 transition-all duration-750 glass-panel shine-effect moon-card-hover border-nebula-blue/60 shadow-[0_0_50px_rgba(56,189,248,0.25)] ring-1 ring-nebula-blue/30"
          >
            {/* Spinning nebula blue/purple background visual element */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-nebula-blue via-nebula-indigo to-nebula-purple blur-3xl opacity-40 animate-pulse-glow" />

            {/* Interactive Moon Ring Aura */}
            <div className="relative">
              <div className="relative inline-flex mb-6 group">
                <span className="absolute -inset-2 bg-gradient-to-r from-nebula-blue to-nebula-purple rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />
                <span className="relative inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 shadow-[0_0_50px_rgba(148,163,184,0.5)] items-center justify-center overflow-hidden transition-transform duration-500 hover:rotate-12 scale-110">
                  {/* Moon Crater Details */}
                  <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-slate-500/25" />
                  <span className="absolute bottom-2 left-3 w-3 h-3 rounded-full bg-slate-500/20" />
                  <span className="absolute top-8 left-8 w-2 h-2 rounded-full bg-slate-500/20" />
                  <Moon className="w-7 h-7 text-slate-800 relative z-10" />
                </span>
              </div>

              <p className="text-xs font-mono uppercase tracking-[0.3em] text-nebula-blue mb-2 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-nebula-blue" />
                ECLIPSE NIGHT . CLOSING CEREMONY
              </p>

              <h3 className="font-display text-3xl sm:text-4xl mb-4 font-bold tracking-tight text-starlight">
                Eclipse Night
              </h3>

              <p className="text-starlight/75 leading-relaxed mb-8">
                The tide goes out on the final night. Eclipse Night is the awards ceremony held under an actual telescope-assisted stargazing session - trophies handed out between constellations, followed by an open-mic set from the campus astronomy club.
              </p>

              {/* Floating Moon Items (Stargazing Items) with smooth staggered CSS floating animations */}
              <ul className="space-y-4 text-sm font-mono text-starlight/60 mb-8 border-t border-white/5 pt-6">
                <li className="flex items-start gap-3 hover:text-nebula-blue transition-all duration-300 celestial-float-1">
                  <span className="text-nebula-blue font-bold text-base leading-none">0</span>
                  <span className="text-starlight/80">Day 3 . 20:00 . Rooftop Observatory Deck</span>
                </li>
                <li className="flex items-start gap-3 hover:text-nebula-blue transition-all duration-300 celestial-float-2">
                  <span className="text-nebula-blue font-bold text-base leading-none">O</span>
                  <span className="text-starlight/80">Awards + telescope stargazing</span>
                </li>
                <li className="flex items-start gap-3 hover:text-nebula-blue transition-all duration-300 celestial-float-3">
                  <span className="text-nebula-blue font-bold text-base leading-none">O</span>
                  <span className="text-starlight/80">Closes with the crew photo under the stars</span>
                </li>
              </ul>

            </div>
          </article>

        </div>

        {/* REVEAL TIMELINE HIGHLIGHT FOOTER */}
        <div className="reveal mt-16 text-center max-w-xl mx-auto">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md text-xs font-mono text-starlight/40 flex items-center justify-center gap-3">
            <Navigation className="w-4 h-4 text-star-yellow animate-pulse" />
            <span>
              {orbitProgress < 38 
                ? "Active Orbit: Sunrise Ignition is prime." 
                : orbitProgress < 75
                ? "Active Orbit: Solar Zenith/Golden Hour." 
                : "Active Orbit: Moon is aligned for Eclipse Night."}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}