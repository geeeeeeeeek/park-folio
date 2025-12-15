
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BADGES } from '../constants';
import { UserParkHistory, NationalPark } from '../types';
import { Icon } from '../icons';

interface BadgeViewProps {
  visits: UserParkHistory[];
  parks: NationalPark[];
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

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { ease: "easeOut", duration: 0.3 }
  }
};

const BadgeView: React.FC<BadgeViewProps> = ({ visits, parks }) => {
  const visitedCount = visits.filter(v => v.visits.length > 0).length;
  const totalParks = parks.length;
  const percentage = Math.round((visitedCount / totalParks) * 100);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="border-l-4 border-brand-green pl-6 py-2 rounded-l-md">
          <span className="text-sm font-bold text-brand-green uppercase tracking-widest block mb-2">Achievements</span>
          <h2 className="text-6xl font-serif font-bold text-brand-black">Collection</h2>
        </div>

        {/* Stats Counter */}
        <div className="bg-brand-white border-3 border-brand-black p-6 rounded-2xl shadow-hard flex items-center gap-6 min-w-[300px]">
           <div className="bg-brand-green p-3 rounded-full border-2 border-brand-black text-brand-yellow">
              <Icon name="tree" className="w-8 h-8" />
           </div>
           <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                 <span className="text-sm font-bold uppercase tracking-widest text-brand-black/60">Progress</span>
                 <span className="text-2xl font-mono font-bold text-brand-black">
                   {visitedCount}<span className="text-brand-black/40 text-lg">/{totalParks}</span>
                 </span>
              </div>
              <div className="w-full bg-brand-gray h-3 border-2 border-brand-black rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${percentage}%` }}
                   transition={{ duration: 1, ease: "circOut" }}
                   className="h-full bg-brand-green"
                 />
              </div>
           </div>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {BADGES.map((badge) => {
          const isUnlocked = badge.condition(visits, parks);
          
          return (
            <motion.div
              key={badge.id}
              variants={item}
              className={`
                relative p-6 border-3 border-brand-black transition-all duration-300 group rounded-3xl
                ${isUnlocked 
                  ? 'bg-brand-white shadow-hard hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard-hover' 
                  : 'bg-brand-gray border-dashed opacity-70'}
              `}
            >
              {isUnlocked && (
                  <div className="absolute top-0 right-0 bg-brand-yellow border-2 border-brand-black p-2 rounded-full -mt-3 -mr-3 shadow-hard-sm z-10">
                     <Icon name="check" className="w-5 h-5 text-brand-black" />
                  </div>
              )}

              <div className="flex flex-col h-full justify-between">
                <div className="mb-6 mt-2">
                  <div className={`w-16 h-16 flex items-center justify-center border-2 border-brand-black rounded-2xl mb-6 shadow-sm ${
                    isUnlocked ? 'bg-brand-green text-brand-yellow' : 'bg-brand-white text-brand-black'
                  }`}>
                    <Icon name={badge.icon} className="w-8 h-8" />
                  </div>
                  
                  <h3 className="font-serif font-bold text-2xl text-brand-black mb-3">
                    {badge.name}
                  </h3>
                  <p className="text-sm font-medium text-brand-black leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-brand-black/20 mt-auto">
                   <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-brand-black ${isUnlocked ? 'bg-brand-green text-brand-white' : 'bg-brand-white text-brand-black'}`}>
                     {isUnlocked ? 'Unlocked' : 'Locked'}
                   </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default BadgeView;
