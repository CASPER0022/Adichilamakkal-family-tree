import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FamilyTree from '../components/FamilyTree';

export default function FullFamilyTree() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-36 sm:pt-48 pb-20 min-h-screen">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="px-6 sm:px-8 mb-12 sm:mb-16">
        
        {/* Header & Back Button */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-8 text-sm font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Home</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Outfit'] font-bold text-white mb-6">
              Full Family <span className="gradient-text">Tree</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              Explore the complete, expansive view of our family's lineage through generations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tree Render - Edge to Edge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full min-h-[60vh] flex flex-col"
      >
        <FamilyTree isFullView={true} />
      </motion.div>

    </div>
  );
}
