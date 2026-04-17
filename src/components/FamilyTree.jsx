import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import familyData, { getCouples, generationLabels, getGenerations } from '../data/familyData';
import MemberCard from './MemberCard';
import ProfileDrawer from './ProfileDrawer';

// ===== SVG Connection Lines (T-junction bracket pattern) =====
function ConnectionLines({ positions, familyData: data }) {
  if (!positions || Object.keys(positions).length === 0) return null;

  const elements = [];

  // Group children by their parent couple
  const coupleChildren = {};
  data.forEach((member) => {
    if (!member.parentId) return;
    const parent = data.find((m) => m.id === member.parentId);
    if (!parent) return;

    // Build a couple key (parent + spouse)
    const coupleKey = parent.spouseId
      ? [parent.id, parent.spouseId].sort().join('-')
      : parent.id;

    if (!coupleChildren[coupleKey]) {
      coupleChildren[coupleKey] = {
        parentId: parent.id,
        spouseId: parent.spouseId,
        children: [],
      };
    }
    coupleChildren[coupleKey].children.push(member.id);
  });

  // Draw connections for each couple → children group
  Object.entries(coupleChildren).forEach(([coupleKey, group]) => {
    const parentPos = positions[group.parentId];
    if (!parentPos) return;

    // Find the drop-point X (center between parent & spouse)
    let dropX, dropY;
    if (group.spouseId && positions[group.spouseId]) {
      const spousePos = positions[group.spouseId];
      dropX = (parentPos.cx + spousePos.cx) / 2;
      dropY = Math.max(parentPos.bottom, spousePos.bottom);
    } else {
      dropX = parentPos.cx;
      dropY = parentPos.bottom;
    }

    // Get children positions
    const childPositions = group.children
      .map((cid) => {
        const childPos = positions[cid];
        if (!childPos) return null;
        return { cx: childPos.cx, top: childPos.top, id: cid };
      })
      .filter(Boolean);

    if (childPositions.length === 0) return;

    // Find the horizontal bar Y position (midway between parent bottom and first child top)
    const firstChildTop = Math.min(...childPositions.map((p) => p.top));
    const barY = dropY + (firstChildTop - dropY) * 0.5;

    // 1. Vertical line: from parent couple center DOWN to the horizontal bar
    elements.push(
      <line
        key={`vdown-${coupleKey}`}
        x1={dropX}
        y1={dropY + 4}
        x2={dropX}
        y2={barY}
        stroke="#a3e635"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    );

    // Small dot at the junction point
    elements.push(
      <circle
        key={`junction-${coupleKey}`}
        cx={dropX}
        cy={barY}
        r="3"
        fill="#a3e635"
        opacity="0.7"
      />
    );

    // 2. Horizontal bar spanning across parent drop line AND all children
    const allX = [dropX, ...childPositions.map((p) => p.cx)];
    const leftX = Math.min(...allX);
    const rightX = Math.max(...allX);

    if (leftX !== rightX) {
      elements.push(
        <line
          key={`hbar-${coupleKey}`}
          x1={leftX}
          y1={barY}
          x2={rightX}
          y2={barY}
          stroke="#a3e635"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    }

    // 3. Vertical lines from horizontal bar DOWN to each child
    childPositions.forEach((childPos, idx) => {
      elements.push(
        <line
          key={`vchild-${coupleKey}-${idx}`}
          x1={childPos.cx}
          y1={barY}
          x2={childPos.cx}
          y2={childPos.top - 4}
          stroke="#a3e635"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      );

      // Small dot at child connection
      elements.push(
        <circle
          key={`cdot-${coupleKey}-${idx}`}
          cx={childPos.cx}
          cy={childPos.top - 4}
          r="2.5"
          fill="#a3e635"
          opacity="0.6"
        />
      );
    });
  });

  // Draw spouse connectors (dashed line between spouses, no duplicates)
  const visitedSpouses = new Set();
  data.forEach((member) => {
    if (member.spouseId && !visitedSpouses.has(member.id)) {
      visitedSpouses.add(member.id);
      visitedSpouses.add(member.spouseId);
      const p1 = positions[member.id];
      const p2 = positions[member.spouseId];
      if (p1 && p2) {
        const midX = (p1.cx + p2.cx) / 2;
        const midY = (p1.cy + p2.cy) / 2;

        elements.push(
          <line
            key={`spouse-${member.id}`}
            x1={p1.cx + 10}
            y1={midY}
            x2={p2.cx - 10}
            y2={midY}
            stroke="#a3e635"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.35"
          />
        );

        // Heart between spouses
        elements.push(
          <text
            key={`heart-${member.id}`}
            x={midX}
            y={midY + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="8"
            fill="#a3e635"
            opacity="0.5"
          >
            ♥
          </text>
        );
      }
    }
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <filter id="lineGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#lineGlow)">
        {elements}
      </g>
    </svg>
  );
}

// ===== Generation Row =====
function GenerationRow({ generation, couples, selectedId, onSelect, registerPosition }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Generation label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <div className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-lime-400/30" />
        <span className="gen-badge">
          {generationLabels[generation] || `Generation ${generation}`}
        </span>
        <div className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-lime-400/30" />
      </motion.div>

      {/* Members — always centered */}
      <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-12 md:gap-16 w-full">
        {couples.map((couple, ci) => (
          <div key={ci} className="flex items-start gap-4 sm:gap-8 md:gap-10 relative isolate">
            {/* Horizontal Spouse Line */}
            {couple.length === 2 && (
              <div className="absolute top-[35px] sm:top-[45px] left-1/2 -translate-x-1/2 w-8 sm:w-16 h-px border-b-2 border-dashed border-gray-600/50 -z-10" />
            )}
            {couple.map((member, mi) => (
              <div
                key={member.id}
                ref={(el) => {
                  if (el) registerPosition(member.id, el);
                }}
              >
                <MemberCard
                  member={member}
                  index={ci * 2 + mi}
                  isSelected={selectedId === member.id}
                  onClick={() => onSelect(member)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


// ===== Main FamilyTree Component =====
export default function FamilyTree({ highlightMemberId, onHighlightClear }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [positions, setPositions] = useState({});
  const [activeGen, setActiveGen] = useState(null);
  const containerRef = useRef(null);
  const positionRefs = useRef({});

  const generations = getGenerations();

  const generationCouples = useMemo(() => {
    const result = {};
    generations.forEach((gen) => {
      result[gen] = getCouples(gen);
    });
    return result;
  }, []);

  const registerPosition = useCallback((id, el) => {
    positionRefs.current[id] = el;
  }, []);

  const recalcPositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    const newPositions = {};
    Object.entries(positionRefs.current).forEach(([id, el]) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      newPositions[id] = {
        cx: rect.left + rect.width / 2 - containerRect.left,
        cy: rect.top + rect.height / 2 - containerRect.top,
        top: rect.top - containerRect.top,
        bottom: rect.bottom - containerRect.top,
        left: rect.left - containerRect.left,
        right: rect.right - containerRect.left,
      };
    });
    setPositions(newPositions);
  }, []);

  useEffect(() => {
    // Initial calc
    recalcPositions();

    // Recalc again after Framer Motion intro animations finish
    const timer = setTimeout(() => {
      recalcPositions();
    }, 800);

    // Recalc on window resize
    window.addEventListener('resize', recalcPositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', recalcPositions);
    };
  }, [recalcPositions, activeGen]);

  useEffect(() => {
    if (highlightMemberId) {
      const member = familyData.find((m) => m.id === highlightMemberId);
      if (member) {
        setSelectedMember(member);
        setDrawerOpen(true);
        if (onHighlightClear) onHighlightClear();
      }
    }
  }, [highlightMemberId, onHighlightClear]);

  const handleSelect = (member) => {
    setSelectedMember(member);
    setDrawerOpen(true);
  };

  const filteredGenerations = activeGen
    ? generations.filter((g) => g === activeGen)
    : generations;

  return (
    <section id="tree" className="relative pt-24 sm:pt-40 pb-10 sm:pb-16 px-3 sm:px-6">
      {/* Section Header */}
      <div className="w-full mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-bold text-white mb-3 text-center">
            The Family <span className="gradient-text">Lineage</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-md text-center">
            Click on any member to explore their story
          </p>
        </motion.div>

        {/* Generation Filter */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          <button
            onClick={() => setActiveGen(null)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all cursor-pointer ${
              !activeGen
                ? 'bg-lime-400/15 text-lime-400 border border-lime-400/30'
                : 'text-gray-500 hover:text-gray-300 border border-transparent hover:border-white/10'
            }`}
          >
            All
          </button>
          {generations.map((gen) => (
            <button
              key={gen}
              onClick={() => setActiveGen(activeGen === gen ? null : gen)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all cursor-pointer ${
                activeGen === gen
                  ? 'bg-lime-400/15 text-lime-400 border border-lime-400/30'
                  : 'text-gray-500 hover:text-gray-300 border border-transparent hover:border-white/10'
              }`}
            >
              Gen {gen}
            </button>
          ))}
        </div>
      </div>

      {/* Tree Visualization — Responsive & Scrollable */}
      <div 
        className="w-full overflow-x-auto overflow-y-hidden pb-10 hide-scrollbar scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div
          ref={containerRef}
          className="relative flex flex-col items-center gap-10 sm:gap-14 md:gap-16 py-4 sm:py-6 px-4 md:px-12 min-w-fit mx-auto"
        >
          {/* Connection Lines */}
          {!activeGen && (
            <ConnectionLines positions={positions} familyData={familyData} />
          )}

          {/* Generation Rows */}
          {filteredGenerations.map((gen) => (
            <GenerationRow
              key={gen}
              generation={gen}
              couples={generationCouples[gen]}
              selectedId={selectedMember?.id}
              onSelect={handleSelect}
              registerPosition={registerPosition}
            />
          ))}
        </div>
      </div>

      {/* Profile Drawer */}
      <ProfileDrawer
        member={selectedMember}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Decorative Divider */}
      <div className="relative mt-20 md:mt-28 flex flex-col items-center justify-center pointer-events-none">
        <div className="w-px h-24 bg-gradient-to-b from-lime-400/50 to-transparent"></div>
        <div className="w-3 h-3 border-2 border-lime-400 rounded-full mt-2 shadow-[0_0_15px_rgba(163,230,53,0.5)]"></div>
        <div className="w-px h-16 bg-gradient-to-t from-lime-400/30 to-transparent mt-2"></div>
      </div>
    </section>
  );
}
