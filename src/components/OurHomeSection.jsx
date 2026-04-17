import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function OurHomeSection() {
  return (
    <section id="our-home" className="relative pt-12 sm:pt-20 pb-12 sm:pb-20 px-6 sm:px-8">
      <div style={{ maxWidth: '860px', margin: '0 auto' }} className="flex flex-col gap-10 sm:gap-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-bold text-white mb-4">
            Our <span className="gradient-text">Home</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed" style={{ maxWidth: '540px', margin: '0 auto' }}>
            The cornerstone of our legacy and the gathering place for generations of memories.
          </p>
        </motion.div>

        {/* Content Card with Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-strong p-6 sm:p-10 w-full overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/5 relative group">
              <img 
                src="/images/home.jpg" 
                alt="Our Home" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] mb-4">The Ancestral Hearth</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
                Nestled within lush greenery and standing strong for decades, this house has witnessed our family's greatest milestones, joyful celebrations, and endless growth. It remains a symbol of our unity and shared history.
              </p>
              
              <div>
                <Link to="/our-home" className="inline-flex items-center gap-2 px-6 py-3 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 border border-lime-400/30 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(163,230,53,0.3)] font-medium text-sm cursor-pointer">
                  <span>Read More</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
