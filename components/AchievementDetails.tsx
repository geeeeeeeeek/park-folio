
import React from 'react';
import { motion } from 'framer-motion';
import { Badge, NationalPark, UserParkHistory } from '../types';
import { Icon } from '../icons';

interface AchievementDetailsProps {
  badge: Badge & { isUnlocked: boolean };
  parks: NationalPark[];
  visits: UserParkHistory[];
  onClose: () => void;
}

const AchievementDetails: React.FC<AchievementDetailsProps> = ({ badge, parks, visits, onClose }) => {
  // Determine progress logic
  let checklist: { park: NationalPark; visited: boolean }[] = [];
  let progressText = "";
  
  // 1. If relevant parks are defined, use them for the checklist
  if (badge.relevantParkIds && badge.relevantParkIds.length > 0) {
      checklist = badge.relevantParkIds.map(id => {
          const park = parks.find(p => p.id === id);
          if (!park) return null;
          const visited = visits.some(v => v.parkId === id && v.visits.length > 0);
          return { park, visited };
      }).filter((item): item is { park: NationalPark; visited: boolean } => item !== null);
      
      const visitedCount = checklist.filter(c => c.visited).length;
      progressText = `${visitedCount} / ${checklist.length} Parks`;
  } else {
     // 2. Generic Quantity Badges (e.g. Visit 20 parks)
     const totalVisited = visits.filter(v => v.visits.length > 0).length;
     // Rough heuristic for display based on description numbers, though logic is in condition function
     const target = parseInt(badge.description.match(/\d+/)?.[0] || "0"); 
     progressText = target > 0 ? `${Math.min(totalVisited, target)} / ${target} Parks` : `${totalVisited} Visited`;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#2c2c2c] z-40 backdrop-blur-sm"
      />
      
      {/* Dialog Box Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-[#fcfbf7] w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[3.5rem] shadow-2xl border-[6px] border-brand-cream/30 pointer-events-auto flex flex-col relative">
            
            {/* Absolute Close Button - Light & Floating with Thick Border */}
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-50 bg-white/80 backdrop-blur-md text-brand-brown hover:bg-brand-orange hover:text-white transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm border-[4px] border-white"
            >
                <Icon name="x" className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Split Content Body */}
            {/* Updated Layout: Standard padding for desktop as text is protected by pr-16 */}
            <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden pt-12 md:pt-0">
                
                {/* LEFT: Identity */}
                <div className="flex-1 p-8 md:overflow-y-auto border-b-4 md:border-b-0 md:border-r-4 border-dashed border-brand-brown/10 bg-brand-cream/30 flex flex-col items-center text-center">
                     
                     {/* Badge Stamp */}
                     <div className="relative mb-6 group mt-4">
                         <div className={`w-40 h-40 rounded-[2.5rem] flex items-center justify-center border-[5px] border-white rotate-[-3deg] shadow-soft transition-transform duration-300
                            ${badge.isUnlocked ? 'bg-white' : 'bg-brand-gray/50'}
                         `}>
                            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${badge.isUnlocked ? badge.color : 'text-brand-brown/20 bg-brand-brown/5'}`}>
                                 <Icon name={badge.icon} className="w-20 h-20 stroke-[2]" />
                            </div>
                         </div>
                         {badge.isUnlocked && (
                            <div className="absolute -bottom-2 -right-2 bg-brand-yellow text-brand-brown font-bold text-sm px-4 py-1.5 rounded-full border-[3px] border-white rotate-6 shadow-sm">
                                Unlocked!
                            </div>
                         )}
                     </div>

                     <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4 leading-tight">
                        {badge.name}
                     </h2>

                     {/* Description Bubble */}
                     <div className="relative z-10 w-full">
                         <div className="bg-white p-5 rounded-3xl border-[3px] border-brand-brown/5 shadow-sm mb-8 w-full relative">
                            <p className="text-brand-brown/80 font-medium leading-relaxed">
                                {badge.description}
                            </p>
                         </div>
                     </div>
                </div>

                {/* RIGHT: Requirements Checklist */}
                {/* Removed extra top padding, managed overlap with pr-16 in header */}
                <div className="flex-1 p-8 md:overflow-y-auto bg-brand-cream/30 relative">
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7c6553 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
                     
                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed border-brand-brown/10 pr-16">
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-orange/10 p-2 rounded-xl rotate-3">
                                    <Icon name="check" className="w-6 h-6 text-brand-orange" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-brand-brown leading-none">Requirements</h3>
                                    <span className="text-xs font-bold text-brand-brown/40 uppercase tracking-widest">
                                        {progressText}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {checklist.length > 0 ? (
                             <div className="space-y-3">
                                {checklist.map((item) => (
                                    <div key={item.park.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all
                                        ${item.visited ? 'bg-white border-brand-green/20' : 'bg-brand-brown/5 border-transparent opacity-60'}
                                    `}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2
                                            ${item.visited ? 'bg-brand-green text-white border-brand-green' : 'bg-transparent border-brand-brown/20 text-transparent'}
                                        `}>
                                            <Icon name="check" className="w-5 h-5 stroke-[3]" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-bold text-brand-brown truncate">{item.park.name}</div>
                                            <div className="text-xs text-brand-brown/50 uppercase tracking-wider">{item.park.state}</div>
                                        </div>
                                        <div className="ml-auto text-2xl">{item.park.emoji}</div>
                                    </div>
                                ))}
                             </div>
                        ) : (
                             <div className="h-64 flex flex-col items-center justify-center text-center opacity-60 border-4 border-dashed border-brand-brown/10 rounded-[2.5rem] bg-brand-brown/5">
                                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 text-brand-teal shadow-sm">
                                     <Icon name="trophy" className="w-10 h-10" />
                                 </div>
                                 <h4 className="font-bold text-brand-brown text-lg">Quantity Challenge</h4>
                                 <p className="text-sm text-brand-brown/60 max-w-[200px] mt-1">Keep visiting parks to unlock this badge!</p>
                             </div>
                        )}
                     </div>
                </div>

            </div>
        </div>
      </motion.div>
    </>
  );
};

export default AchievementDetails;
