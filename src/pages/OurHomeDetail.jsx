import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const homeImages = [
  "/images/home.jpg",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
];

export default function OurHomeDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-36 sm:pt-48 pb-20 px-6 sm:px-8 min-h-screen">
      <div style={{ maxWidth: '860px', margin: '0 auto' }} className="flex flex-col gap-12 sm:gap-16">
        
        {/* Header & Back Button */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-8 text-sm font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Family Tree</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Outfit'] font-bold text-white mb-6">
              The Adichilamakkal <span className="gradient-text">Home</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              Discover the history, architecture, and enduring legacy of our ancestral home where thousands of memories have been made.
            </p>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        >
          <img src={homeImages[0]} alt="Ancestral Home Exterior" className="w-full h-full object-cover" />
        </motion.div>

        {/* History Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base glass-card-strong p-8 sm:p-10"
          >
            <h2 className="text-2xl font-bold text-white font-['Outfit'] mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-lime-400">
                  <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14 2H6a2 2 0 0 0-2 2v16z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              The History
            </h2>
            <p>
              Built over a century ago, the Adichilamakkal home stands as a proud testament to the vision and hard work of our ancestors. The house was carefully constructed using traditional architectural styles, utilizing locally sourced timber and solid stone foundations designed to weather generations of change.
            </p>
            <p>
              Over the decades, the house has seen multiple expansions and renovations to accommodate the growing family. What began as a humble dwelling slowly transformed into a sprawling estate, yet it never lost its original charm. The grand wooden doors and the expansive front patio remain virtually untouched, offering a physical connection to the past.
            </p>
            <p>
              For every birth, marriage, and major festival, this house has served as the central gathering point. It is more than just walls and a roof; it is the physical embodiment of our family's shared history and unconditional love.
            </p>
          </motion.div>

          {/* Key Facts Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="glass-card p-6 h-full border border-lime-400/10">
              <h3 className="text-xl font-bold text-white font-['Outfit'] mb-6">Key Facts</h3>
              <ul className="space-y-5">
                <li className="flex flex-col gap-1">
                  <span className="text-xs text-lime-400 uppercase tracking-widest font-bold">Established</span>
                  <span className="text-white text-lg">Late 1800s</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-xs text-lime-400 uppercase tracking-widest font-bold">Location</span>
                  <span className="text-white text-lg">Kerala</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-xs text-lime-400 uppercase tracking-widest font-bold">Generations</span>
                  <span className="text-white text-lg">5 Hosted</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white font-['Outfit'] mb-8 text-center">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {homeImages.slice(1).map((src, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden glass-card group cursor-pointer border border-white/5 relative">
                <img 
                  src={src} 
                  alt={`Home Gallery Image ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-lime-400/0 group-hover:bg-lime-400/10 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
