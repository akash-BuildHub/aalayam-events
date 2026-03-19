import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Image with Scale Animation */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0f0f0f]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-[#c6a55c] text-xs md:text-sm uppercase tracking-[0.3em] mb-4 block">
            Premium Photography Services
          </span>
          <h1 className="font-serif text-5xl md:text-9xl text-[#c6a55c] mb-6 tracking-tighter leading-none italic">
            Aalayam Events
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-2xl text-foreground/80 mb-12 tracking-wide font-light max-w-2xl mx-auto"
        >
          Capturing the soul of your most cherished celebrations with artistic precision and heart.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => scrollToSection('portfolio')}
            className="group relative bg-[#c6a55c] text-[#0f0f0f] px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-black overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-[#c6a55c]/20 ring-1 ring-[#c6a55c]/50"
          >
            <span className="relative z-10">Explore Portfolio</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <button
            onClick={() => scrollToSection('booking')}
            className="group relative border-2 border-[#c6a55c]/30 text-[#c6a55c] px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-black overflow-hidden transition-all duration-500 hover:border-[#c6a55c] hover:scale-110 hover:bg-[#c6a55c]/5 hover:shadow-2xl hover:shadow-black/40"
          >
            <span className="relative z-10">Book a Session</span>
            <div className="absolute inset-0 bg-[#c6a55c]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#c6a55c]/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
