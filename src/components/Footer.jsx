import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
        >
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-gray-900">
              <path d="M12 2L12 8" />
              <path d="M12 8C12 8 8 8 6 12" />
              <path d="M12 8C12 8 16 8 18 12" />
            </svg>
          </div>
          <span className="text-sm font-semibold">
            Family<span className="text-lime-400">Tree</span>
          </span>
        </motion.div>

        {/* Copyright */}
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Adichilamakkal Family. Crafted with love.
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a href="#home" className="text-xs text-gray-500 hover:text-lime-400 transition-colors">
            Home
          </a>
          <a href="#tree" className="text-xs text-gray-500 hover:text-lime-400 transition-colors">
            Tree
          </a>
          <a href="#about" className="text-xs text-gray-500 hover:text-lime-400 transition-colors">
            About
          </a>
        </div>
      </div>
    </footer>
  );
}
