import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileDrawer({ member, isOpen, onClose }) {
  if (!member) return null;

  const isDeceased = member.deathYear !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] modal-backdrop"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full sm:w-[400px] bg-[#0f0f16] border-l border-white/[0.06] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl glass-card-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-lime-400/30 transition-all z-10 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </svg>
            </button>

            {/* Header Gradient */}
            <div className="relative h-36 sm:h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 via-emerald-500/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f16] via-transparent to-transparent" />

              {/* Decorative circles */}
              <div className="absolute top-8 right-12 w-40 h-40 rounded-full bg-lime-500/5 blur-2xl" />
              <div className="absolute top-16 right-24 w-24 h-24 rounded-full bg-emerald-500/8 blur-xl" />
            </div>

            {/* Profile Content */}
            <div className="relative -mt-16 sm:-mt-20 px-5 sm:px-8 pb-6 sm:pb-8">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="relative inline-block mb-5"
              >
                <div className={`w-22 h-22 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-3 border-lime-400/30 shadow-[0_0_30px_rgba(163,230,53,0.15)] ${isDeceased ? 'grayscale-[30%]' : ''}`}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover bg-gray-800"
                  />
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border-2 border-[#0f0f16] ${
                    member.gender === 'male'
                      ? 'bg-blue-500 text-white'
                      : 'bg-pink-500 text-white'
                  }`}
                >
                  {member.gender === 'male' ? '♂' : '♀'}
                </div>
              </motion.div>

              {/* Name & Role */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] mb-1">
                  {member.name}
                </h2>
                <div className="flex items-center gap-3 mb-6">
                  <span className="gen-badge">{member.role}</span>
                  {isDeceased && (
                    <span className="text-xs text-gray-500">
                      ✝ Deceased
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6"
              >
                <div className="glass-card-sm p-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Born</p>
                  <p className="text-sm font-semibold text-white">{member.birthYear}</p>
                </div>
                {isDeceased ? (
                  <div className="glass-card-sm p-3">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Passed</p>
                    <p className="text-sm font-semibold text-white">{member.deathYear}</p>
                  </div>
                ) : (
                  <div className="glass-card-sm p-3">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Age</p>
                    <p className="text-sm font-semibold text-white">{new Date().getFullYear() - member.birthYear}</p>
                  </div>
                )}
                <div className="glass-card-sm p-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Generation</p>
                  <p className="text-sm font-semibold text-white">Gen {member.generation}</p>
                </div>
                <div className="glass-card-sm p-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Gender</p>
                  <p className="text-sm font-semibold text-white capitalize">{member.gender}</p>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">About</h3>
                <div className="glass-card-sm p-4">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>

              {/* Timeline marker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="mt-6 pt-6 border-t border-white/[0.06]"
              >
                <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Timeline</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-lime-500 to-emerald-500"
                      style={{
                        width: isDeceased
                          ? '100%'
                          : `${Math.min(((new Date().getFullYear() - member.birthYear) / 100) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    {member.birthYear}–{member.deathYear || 'Present'}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
