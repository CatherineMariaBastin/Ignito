import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Events from './components/Events'
import Competitions from './components/Competitions'
import CelestialSpecials from './components/CelestialSpecials'
import Interstellar from './components/Interstellar'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StarfieldCanvas from './components/StarfieldCanvas'
import CustomCursor from './components/CustomCursor'
import RockyMascot from './components/RockyMascot'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Background Starfield effect overlay */}
      <StarfieldCanvas />
      
      {/* Custom operational cursor tracker */}
      <CustomCursor />
      
      {/* Persistent background music + speaker toggle */}
      <MusicPlayer />
      
      <Navbar />
      
      <main className="relative z-10">
        {/* Your 3D Canvas will now render natively right inside the Hero element */}
        <Hero />
        <Events />
        <Competitions />
        <CelestialSpecials />
        <Interstellar />
        <Contact />
      </main>
      
      <Footer />
      <RockyMascot />
    </div>
  )
}