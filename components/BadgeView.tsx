
import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { BADGES } from '../constants';
import { UserParkHistory, NationalPark, Badge } from '../types';
import { Icon } from '../icons';
import AchievementDetails from './AchievementDetails';

interface BadgeViewProps {
  visits: UserParkHistory[];
  parks: NationalPark[];
  onParkSelect: (id: string) => void;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", bounce: 0.4 }
  }
};

const BadgeView: React.FC<BadgeViewProps> = ({ visits, parks, onParkSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<(Badge & { isUnlocked: boolean }) | null>(null);

  // 1. Process Visited Parks
  const visitedParkIds = new Set(visits.filter(v => v.visits.length > 0).map(v => v.parkId));
  const visitedParksList = parks.filter(p => visitedParkIds.has(p.id));
  
  // Sort by name for the collection
  visitedParksList.sort((a, b) => a.name.localeCompare(b.name));

  const INITIAL_LIMIT = 8; // Limit initially displayed
  const visibleParks = isExpanded ? visitedParksList : visitedParksList.slice(0, INITIAL_LIMIT);

  // 2. Process Achievements
  const achievementsList = BADGES.map(badge => ({
    ...badge,
    isUnlocked: badge.condition(visits, parks)
  })).sort((a, b) => {
    // Sort unlocked first
    if (a.isUnlocked === b.isUnlocked) return 0;
    return a.isUnlocked ? -1 : 1;
  });

  const visitedCount = visitedParksList.length;
  const totalParks = parks.length;
  const percentage = Math.round((visitedCount / totalParks) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-32">
      
      {/* Header Banner - Lighter Redesign */}
      <div className="relative bg-white/60 backdrop-blur-md rounded-[3rem] p-6 md:p-8 mb-12 shadow-sm border-[4px] border-white flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none rounded-[2.8rem]" style={{ backgroundImage: 'radial-gradient(#7c6553 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        
        {/* Left: Title & Icon */}
        <div className="relative z-10 flex items-center gap-6 w-full md:w-auto">
            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-brand-brown/5 shrink-0">
                 <div className="bg-brand-teal/10 p-3 rounded-2xl">
                    <Icon name="medal" className="w-8 h-8 text-brand-teal" />
                 </div>
            </div>
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-brown leading-none">Collections</h2>
                <p className="text-brand-brown/50 font-medium mt-1">Your journey in stamps & badges</p>
            </div>
        </div>

        {/* Right: Progress Pill */}
         <div className="relative z-10 bg-white px-6 py-4 rounded-[2rem] border border-brand-brown/5 shadow-sm min-w-[240px] w-full md:w-auto">
               <div className="flex justify-between items-center mb-2">
                   <span className="font-bold text-brand-brown/40 text-[10px] uppercase tracking-widest">Total Progress</span>
                   <span className="font-bold text-brand-teal text-lg">{visitedCount} / {totalParks}</span>
               </div>
               <div className="h-3 bg-brand-brown/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${percentage}%` }}
                     transition={{ duration: 1.5, type: "spring" }}
                     className="h-full bg-brand-teal rounded-full relative"
                   />
               </div>
         </div>
      </div>

      {/* SECTION 1: VISITED PARKS (STAMPS) */}
      <div className="mb-16">
          <div className="flex items-center justify-between mb-8 px-2 md:px-4">
               <div className="flex items-center gap-3">
                   <div className="bg-brand-orange/20 p-2 rounded-xl -rotate-3">
                       <Icon name="map" className="w-6 h-6 text-brand-orange" />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-brand-brown">Passport Stamps</h3>
               </div>
               
               {visitedParksList.length > INITIAL_LIMIT && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-brand-tealDark font-bold text-sm bg-white px-5 py-2.5 rounded-full border-2 border-brand-teal/20 hover:bg-brand-teal hover:text-white hover:border-transparent transition-all shadow-sm"
                    >
                        {isExpanded ? 'Show Less' : `Show All (${visitedParksList.length})`}
                    </button>
               )}
          </div>

          {visitedParksList.length === 0 ? (
               <div className="text-center py-16 opacity-60 border-4 border-dashed border-brand-brown/10 rounded-[3rem] bg-brand-cream/30">
                    <div className="bg-brand-brown/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                         <Icon name="hikingBoot" className="w-10 h-10 text-brand-brown/60" />
                    </div>
                    <p className="text-2xl font-bold text-brand-brown mb-2">No stamps yet!</p>
                    <p className="text-brand-brown/70">Visit a park to start your collection.</p>
               </div>
          ) : (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6 justify-items-center"
              >
                 <AnimatePresence mode="popLayout">
                    {visibleParks.map((park) => (
                        <motion.div
                            key={park.id}
                            layout
                            variants={itemVariants}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => onParkSelect(park.id)}
                            className="flex flex-col items-center gap-4 w-full max-w-[200px] cursor-pointer group"
                        >
                             <div className="group-hover:scale-105 transition-transform duration-300 relative">
                                  {/* Stamp Body */}
                                  <div className="w-32 h-32 md:w-36 md:h-36 bg-white rounded-[2rem] flex items-center justify-center text-5xl md:text-6xl shadow-soft border-[5px] border-white rotate-[-3deg] group-hover:rotate-0 transition-transform duration-300">
                                     {park.emoji}
                                  </div>
                                  
                                  {/* Verified Check */}
                                  <div className="absolute -bottom-2 -right-2 bg-brand-green text-white rounded-full p-1.5 border-4 border-brand-cream shadow-sm z-10">
                                      <Icon name="check" className="w-4 h-4 stroke-[3]" />
                                  </div>
                             </div>
                             
                             <div className="text-center px-2">
                                 <h4 className="font-bold text-brand-brown leading-tight text-lg mb-1 group-hover:text-brand-orange transition-colors">{park.name}</h4>
                                 <span className="text-xs font-bold text-brand-brown/40 uppercase tracking-widest">{park.state}</span>
                             </div>
                        </motion.div>
                    ))}
                 </AnimatePresence>
              </motion.div>
          )}
      </div>

      {/* SECTION 2: ACHIEVEMENTS - STAMP STYLE */}
      <div>
          <div className="flex items-center gap-3 mb-8 px-2 md:px-4 border-t-4 border-dashed border-brand-brown/10 pt-12">
                <div className="bg-brand-blue/20 p-2 rounded-xl rotate-3">
                    <Icon name="medal" className="w-6 h-6 text-brand-blueDark" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-brown">Achievements</h3>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6 justify-items-center"
          >
            {achievementsList.map((badge) => (
              <motion.div
                key={badge.id}
                variants={itemVariants}
                onClick={() => setSelectedBadge(badge)}
                className={`flex flex-col items-center gap-4 w-full max-w-[200px] cursor-pointer group
                   ${badge.isUnlocked ? '' : 'opacity-60 grayscale'}
                `}
              >
                   <div className="relative">
                        {/* Stamp Body */}
                        <div className={`
                           w-32 h-32 md:w-36 md:h-36 rounded-[2rem] flex items-center justify-center shadow-soft border-[5px] border-white rotate-[-3deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-300
                           ${badge.isUnlocked ? 'bg-white' : 'bg-brand-gray/50'}
                        `}>
                             {/* Badge Icon circle - Larger and using direct colors without swap/opacity */}
                             <div className={`w-28 h-28 rounded-full flex items-center justify-center
                                ${badge.isUnlocked 
                                   ? badge.color // Direct application: e.g. "bg-green-100 text-green-800"
                                   : 'text-brand-brown/20 bg-brand-brown/5'}
                             `}>
                                 <Icon name={badge.icon} className="w-16 h-16 stroke-[2]" />
                             </div>
                        </div>

                        {/* Status Check / Lock */}
                        <div className={`absolute -bottom-2 -right-2 text-white rounded-full p-1.5 border-4 border-brand-cream shadow-sm z-10
                            ${badge.isUnlocked ? 'bg-brand-yellow' : 'bg-brand-gray'}
                        `}>
                             {badge.isUnlocked 
                                ? <Icon name="star" className="w-4 h-4 text-brand-brown fill-brand-brown" />
                                : <div className="w-4 h-4 bg-brand-brown/20 rounded-full" />
                             }
                        </div>
                   </div>
                  
                   {/* Name Line */}
                   <div className="text-center px-2">
                         <h4 className="font-bold text-brand-brown leading-tight text-lg mb-1">{badge.name}</h4>
                         {!badge.isUnlocked && (
                             <span className="text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest bg-brand-brown/5 px-2 py-0.5 rounded-md">Locked</span>
                         )}
                   </div>
              </motion.div>
            ))}
          </motion.div>
      </div>

      {/* Achievement Details Modal */}
      <AnimatePresence>
        {selectedBadge && (
            <AchievementDetails 
                badge={selectedBadge}
                visits={visits}
                parks={parks}
                onClose={() => setSelectedBadge(null)}
            />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BadgeView;
