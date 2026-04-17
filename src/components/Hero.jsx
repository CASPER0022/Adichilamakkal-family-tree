import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="floating-orb w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-lime-500 top-[-60px] sm:top-[-100px] left-[-60px] sm:left-[-100px]" style={{ animationDelay: '0s' }} />
      <div className="floating-orb w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] bg-emerald-500 top-[30px] sm:top-[50px] right-[-40px] sm:right-[-80px]" style={{ animationDelay: '3s' }} />
      <div className="floating-orb w-[200px] h-[200px] sm:w-[500px] sm:h-[500px] bg-lime-400 bottom-[-50px] sm:bottom-[-100px] left-1/2 -translate-x-1/2" style={{ animationDelay: '5s', opacity: 0.25, filter: 'blur(100px)' }} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full glass-card-sm mb-4 sm:mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-medium text-gray-400 tracking-wider uppercase">
            Explore Our Heritage
          </span>
        </motion.div>

        {/* Title */}
        <h1 className="font-['Outfit'] text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-3 sm:mb-4">
          <span className="text-white">Our </span>
          <span className="gradient-text text-glow">Family Tree</span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed mb-4 sm:mb-6 px-2"
        >
          Five generations of love, legacy, and memories — connected through the
          roots of our shared story.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#tree"
            className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-lime-400 hover:bg-lime-300 text-gray-900 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40"
          >
            Explore the Tree
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-y-1 transition-transform"
            >
              <path d="M12 5v14" />
              <path d="M19 12l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        onClick={() => document.getElementById('tree')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-lime-500 flex items-start justify-center p-1 bg-black/20 backdrop-blur-md"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-lime-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
