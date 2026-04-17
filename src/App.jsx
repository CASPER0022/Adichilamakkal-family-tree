import { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FamilyTree from './components/FamilyTree';
import About from './components/About';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlightMemberId, setHighlightMemberId] = useState(null);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSearchSelect = useCallback((member) => {
    setHighlightMemberId(member.id);
    // Scroll to tree section
    const treeEl = document.getElementById('tree');
    if (treeEl) {
      treeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const clearHighlight = useCallback(() => {
    setHighlightMemberId(null);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] bg-grid-pattern">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <main>
        <Hero />
        <FamilyTree
          highlightMemberId={highlightMemberId}
          onHighlightClear={clearHighlight}
        />
        <About />
      </main>

      <Footer />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSearchSelect}
      />
    </div>
  );
}
