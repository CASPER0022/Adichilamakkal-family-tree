import { motion } from 'framer-motion';

export default function MemberCard({ member, index, isSelected, onClick }) {
  const isDeceased = member.deathYear !== null;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -5, scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-300 group
        w-[72px] sm:w-[110px] md:w-[130px]
        p-2 sm:p-3 rounded-xl sm:rounded-2xl
        backdrop-blur-xl
        ${isSelected
          ? 'bg-lime-400/10 border border-lime-400/40 shadow-[0_0_24px_rgba(163,230,53,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]'
          : 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-white/[0.08] hover:border-lime-400/25'
        }
        ${isDeceased ? 'opacity-75' : ''}
      `}
    >
      {/* Avatar */}
      <div className="relative">
        {/* Outer ring glow */}
        <div
          className={`absolute -inset-1 rounded-full transition-all duration-500 ${
            isSelected
              ? 'bg-lime-400/20 blur-md'
              : 'bg-transparent group-hover:bg-lime-400/10 group-hover:blur-md'
          }`}
        />

        <div
          className={`relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
            isSelected
              ? 'border-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.3)]'
              : 'border-white/10 group-hover:border-lime-400/50'
          } ${isDeceased ? 'grayscale-[40%]' : ''}`}
        >
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover bg-gray-800/80"
            loading="lazy"
          />
        </div>

        {/* Gender dot */}
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0f] transition-all text-[8px] sm:text-[10px] ${
            member.gender === 'male'
              ? 'bg-blue-500/90 text-blue-100'
              : 'bg-pink-500/90 text-pink-100'
          }`}
        >
          {member.gender === 'male' ? '♂' : '♀'}
        </div>

        {/* Selected pulse */}
        {isSelected && (
          <div className="absolute inset-0 rounded-full pulse-ring" />
        )}
      </div>

      {/* Name */}
      <div className="text-center mt-0.5 w-full">
        <p
          className={`text-[10px] sm:text-xs md:text-sm font-semibold leading-tight truncate ${
            isSelected ? 'text-lime-300' : 'text-white/90 group-hover:text-white'
          }`}
        >
          {member.name.split(' ')[0]}
        </p>
        <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5 truncate leading-tight">
          {member.role}
        </p>
      </div>

      {/* Deceased indicator */}
      {isDeceased && (
        <div className="absolute top-1 right-1 text-[7px] sm:text-[8px] text-gray-500 opacity-60">
          ✝
        </div>
      )}

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
          isSelected
            ? 'w-2/3 bg-lime-400'
            : 'w-0 group-hover:w-1/2 bg-lime-400/50'
        }`}
      />
    </motion.button>
  );
}
