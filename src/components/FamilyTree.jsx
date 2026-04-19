import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Link } from 'react-router-dom';
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

    const parentMember = data.find(m => m.id === group.parentId);
    const isExtendedLine = parentMember?.isExtended;
    const lineColor = isExtendedLine ? "#a855f7" : "#a3e635";

    // Find the horizontal bar Y position (midway between parent bottom and first child top)
    const firstChildTop = Math.min(...childPositions.map((p) => p.top));
    let barY = dropY + (firstChildTop - dropY) * 0.5;

    // Offset the horizontal bar for extended family lineages to prevent overlapping
    if (isExtendedLine) {
      barY += 16;
    }

    // 1. Vertical line: from parent couple center DOWN to the horizontal bar
    elements.push(
      <line
        key={`vdown-${coupleKey}`}
        x1={dropX}
        y1={dropY + 4}
        x2={dropX}
        y2={barY}
        stroke={lineColor}
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
        fill={lineColor}
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
          stroke={lineColor}
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
          stroke={lineColor}
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
          fill={lineColor}
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
function GenerationRow({ generation, couples, parentCouples, allData, selectedId, onSelect, registerPosition, isFullView }) {
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
      <div className="flex flex-nowrap items-start justify-center gap-8 sm:gap-12 md:gap-16 w-full">

        {generation === 5 && parentCouples ? (
          /* Mirror Gen 4: each parent couple becomes exactly one flex item of matching width */
          parentCouples.map((parentCouple, pci) => {
            const parentIds = parentCouple.map(m => m.id);
            const childMembers = allData.filter(m =>
              m.generation === 5 && parentIds.includes(m.parentId)
            );
            const isCoupleSlot = parentCouple.length === 2;

            if (childMembers.length > 0) {
              /* Slot WITH children */
              if (isCoupleSlot) {
                /* Couple-width wrapper: invisible padding cards force correct width, child centered between */
                return (
                  <div key={`gen5-slot-${pci}`} className="flex items-start gap-4 sm:gap-8 md:gap-10 justify-center relative">
                    <div className="w-28 sm:w-36 md:w-40 flex-shrink-0 invisible" />
                    {childMembers.map((child) => (
                      <div
                        key={child.id}
                        ref={(el) => { if (el) registerPosition(child.id, el); }}
                        className="absolute left-1/2 -translate-x-1/2 top-0"
                      >
                        <MemberCard
                          member={child}
                          index={pci}
                          isSelected={selectedId === child.id}
                          onClick={() => onSelect(child)}
                        />
                      </div>
                    ))}
                    <div className="w-28 sm:w-36 md:w-40 flex-shrink-0 invisible" />
                  </div>
                );
              } else {
                /* Single-width slot, just the child */
                return childMembers.map((child) => (
                  <div
                    key={child.id}
                    ref={(el) => { if (el) registerPosition(child.id, el); }}
                  >
                    <MemberCard
                      member={child}
                      index={pci}
                      isSelected={selectedId === child.id}
                      onClick={() => onSelect(child)}
                    />
                  </div>
                ));
              }
            } else {
              /* Empty slot — invisible placeholder matching parent width */
              return (
                <div key={`gen5-empty-${pci}`} className="flex items-start gap-4 sm:gap-8 md:gap-10 relative">
                  {parentCouple.map(m => (
                    <div key={`ph-${m.id}`} className="w-28 sm:w-36 md:w-40 flex-shrink-0 invisible" />
                  ))}
                </div>
              );
            }
          })
        ) : (
          /* Standard rendering for all other generations */
          couples.map((couple, ci) => (
            <div key={ci} style={{ display: 'contents' }}>

              {/* Gen 3 Spacers */}
              {isFullView && generation === 3 && ci === 4 && (
                Array.from({ length: 1 }).map((_, i) => (
                  <div key={`spacer-gen3-${i}`} className="w-28 sm:w-36 md:w-40 flex-shrink-0 pointer-events-none opacity-0" />
                ))
              )}

              <div className="flex items-start gap-4 sm:gap-8 md:gap-10 relative isolate">
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}


// ===== Main FamilyTree Component =====
export default function FamilyTree({ highlightMemberId, onHighlightClear, isFullView = false }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [positions, setPositions] = useState({});
  const [activeGen, setActiveGen] = useState(null);
  const containerRef = useRef(null);
  const positionRefs = useRef({});

  const displayData = useMemo(() => isFullView ? familyData : familyData.filter(m => !m.isExtended), [isFullView]);

  const generations = useMemo(() => getGenerations(displayData), [displayData]);

  const generationCouples = useMemo(() => {
    const result = {};
    generations.forEach((gen) => {
      result[gen] = getCouples(gen, displayData);
    });
    return result;
  }, [generations, displayData]);

  const registerPosition = useCallback((id, el) => {
    positionRefs.current[id] = el;
  }, []);

  const recalcPositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    // Compute exact active scale factor applied by any parent CSS transforms
    let activeScale = containerRect.width / container.offsetWidth;
    if (!activeScale || !isFinite(activeScale) || activeScale <= 0.0001) {
      activeScale = 1;
    }

    const newPositions = {};
    Object.entries(positionRefs.current).forEach(([id, el]) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const cx = (rect.left + rect.width / 2 - containerRect.left) / activeScale;
      const cy = (rect.top + rect.height / 2 - containerRect.top) / activeScale;
      const top = (rect.top - containerRect.top) / activeScale;
      const bottom = (rect.bottom - containerRect.top) / activeScale;
      const left = (rect.left - containerRect.left) / activeScale;
      const right = (rect.right - containerRect.left) / activeScale;

      if (!isFinite(cx) || !isFinite(cy) || !isFinite(top) || !isFinite(bottom)) return;

      newPositions[id] = { cx, cy, top, bottom, left, right };
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
    <section id="tree" className={`relative pb-10 sm:pb-16 px-3 sm:px-6 ${isFullView ? 'pt-0' : 'pt-24 sm:pt-40'}`}>
      {/* Section Header */}
      {!isFullView && (
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
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all cursor-pointer ${!activeGen
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
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all cursor-pointer ${activeGen === gen
                  ? 'bg-lime-400/15 text-lime-400 border border-lime-400/30'
                  : 'text-gray-500 hover:text-gray-300 border border-transparent hover:border-white/10'
                  }`}
              >
                Gen {gen}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tree Visualization */}
      <div className={`w-full pb-10 select-none ${isFullView ? 'overflow-hidden h-[calc(100vh-100px)]' : 'overflow-x-auto overflow-y-hidden'}`}
        style={!isFullView ? { WebkitOverflowScrolling: 'touch' } : {}}
      >
        {isFullView ? (
          <TransformWrapper
            initialScale={0.35}
            minScale={0.1}
            maxScale={2}
            centerOnInit={true}
            wheel={{ step: 0.005, smooth: false }}
            pinch={{ step: 2 }}
            doubleClick={{ disabled: true }}
            panning={{ velocityDisabled: true }}
          >
            <TransformComponent wrapperClass="!w-full !h-full pointer-events-none" contentClass="!min-w-fit align-top">
              <div
                ref={containerRef}
                className="relative flex flex-col items-center gap-10 sm:gap-14 md:gap-16 py-8 sm:py-12 px-6 md:px-16 mx-auto pointer-events-auto cursor-grab active:cursor-grabbing pb-24 md:pb-32"
              >
                {/* Connection Lines */}
                {!activeGen && (
                  <ConnectionLines positions={positions} familyData={displayData} />
                )}

                {/* Generation Rows */}
                {filteredGenerations.map((gen) => (
                  <GenerationRow
                    key={gen}
                    generation={gen}
                    couples={generationCouples[gen]}
                    parentCouples={gen > 1 ? generationCouples[gen - 1] : null}
                    allData={displayData}
                    selectedId={selectedMember?.id}
                    onSelect={handleSelect}
                    registerPosition={registerPosition}
                    isFullView={isFullView}
                  />
                ))}
              </div>
            </TransformComponent>
          </TransformWrapper>
        ) : (
          <div
            ref={containerRef}
            className="relative flex flex-col items-center gap-10 sm:gap-14 md:gap-16 py-4 sm:py-6 px-4 md:px-12 mx-auto min-w-fit"
          >
            {/* Connection Lines */}
            {!activeGen && (
              <ConnectionLines positions={positions} familyData={displayData} />
            )}

            {/* Generation Rows */}
            {filteredGenerations.map((gen) => (
              <GenerationRow
                key={gen}
                generation={gen}
                couples={generationCouples[gen]}
                parentCouples={gen > 1 ? generationCouples[gen - 1] : null}
                allData={displayData}
                selectedId={selectedMember?.id}
                onSelect={handleSelect}
                registerPosition={registerPosition}
                isFullView={isFullView}
              />
            ))}
          </div>
        )}
      </div>

      {!isFullView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 mb-4 flex justify-center w-full"
        >
          <Link
            to="/full-tree"
            className="inline-flex items-center gap-2 px-6 py-3 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 border border-lime-400/30 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(163,230,53,0.3)] font-medium text-sm cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6"></path>
              <path d="M9 21H3v-6"></path>
              <path d="M21 3l-7 7"></path>
              <path d="M3 21l7-7"></path>
            </svg>
            <span>View Full Family Tree</span>
          </Link>
        </motion.div>
      )}

      {/* Profile Drawer */}
      <ProfileDrawer
        member={selectedMember}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />


    </section>
  );
}
