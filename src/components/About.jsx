import { motion } from 'framer-motion';

const stats = [
  { value: '5', label: 'Generations' },
  { value: '13', label: 'Members' },
  { value: '100+', label: 'Years of Legacy' },
  { value: '∞', label: 'Memories' },
];

export default function About() {
  return (
    <section id="about" className="relative pt-12 sm:pt-20 pb-32 sm:pb-40 px-6 sm:px-8">
      <div style={{ maxWidth: '860px', margin: '0 auto' }} className="flex flex-col gap-16 sm:gap-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-bold text-white mb-4">
            About <span className="gradient-text">Our Family</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed" style={{ maxWidth: '540px', margin: '0 auto' }}>
            From humble beginnings to a thriving family spanning five generations, 
            our story is one of resilience, love, and unwavering commitment to each other.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card-strong p-5 sm:p-7 text-center group hover:border-lime-400/25 transition-all duration-300"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-bold text-lime-400 mb-2 group-hover:text-glow transition-all">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-strong p-8 sm:p-12 md:p-14 w-full"
        >
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-lime-400/10 border border-lime-400/15 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-lime-400">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">Our Story</h3>
          </div>
          <div className="space-y-6 sm:space-y-8 text-sm sm:text-base text-gray-400 leading-relaxed sm:leading-loose">
            <p>
              The Adichilamakkal family story begins in the late 1800s, when John, a man 
              with strong values and an incredible work ethic, married Rosamma. Their bond 
              became the cornerstone of a legacy that would span over a century.
            </p>
            <p>
              Through times of immense change, the family only grew stronger 
              with each passing generation. Under the loving guidance of John Ulahannan 
              and Annamma, the family expanded, always staying true to the traditions, 
              dedication, and dreams of those who came before them.
            </p>
            <p>
              Today, the newest generations carry forward this rich heritage while forging their own 
              paths into the future. The family tree continues to grow, 
              branching out in exciting new directions while remaining deeply rooted in the love and 
              faith that have always defined the Adichilamakkal name.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
