import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FamilyTree from './components/FamilyTree';
import OurHomeSection from './components/OurHomeSection';
import About from './components/About';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import OurHomeDetail from './pages/OurHomeDetail';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlightMemberId, setHighlightMemberId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const treeEl = document.getElementById('tree');
        if (treeEl) {
          treeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const treeEl = document.getElementById('tree');
      if (treeEl) {
        treeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.pathname, navigate]);

  const clearHighlight = useCallback(() => {
    setHighlightMemberId(null);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] bg-grid-pattern">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <FamilyTree
              highlightMemberId={highlightMemberId}
              onHighlightClear={clearHighlight}
            />
            <OurHomeSection />
            <About />
          </main>
        } />
        <Route path="/our-home" element={<OurHomeDetail />} />
      </Routes>

      <Footer />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSearchSelect}
      />
    </div>
  );
}
