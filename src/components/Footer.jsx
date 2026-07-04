export default function Footer() {
  return (
    <footer className="relative border-t border-starlight/10 py-10 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-starlight/50">
        <p className="font-display tracking-widest">IGNITO</p>
        <p className="font-mono text-xs">© {new Date().getFullYear()} IGNITO Techfest · Built somewhere between Earth and Neptune</p>
        <div className="flex gap-5 text-xs font-mono uppercase tracking-widest">
          <a href="#home" className="hover:text-nebula-green transition-colors">Home</a>
          <a href="#events" className="hover:text-nebula-green transition-colors">Events</a>
          <a href="#contact" className="hover:text-nebula-green transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}
