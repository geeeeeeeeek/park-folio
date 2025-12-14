
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BADGES } from '../constants';
import { UserVisit, NationalPark } from '../types';
import { Icon } from '../icons';

interface BadgeViewProps {
  visits: UserVisit[];
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
    transition: { ease: "easeOut", duration: 0.4 }
  }
};

const BadgeView: React.FC<BadgeViewProps> = ({ visits, parks }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-3">Achievements</span>
        <h2 className="text-5xl font-serif text-stone-900 mb-6">Collection</h2>
        <div className="h-1 w-24 bg-forest-700"></div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {BADGES.map((badge) => {
          const isUnlocked = badge.condition(visits, parks);
          
          return (
            <motion.div
              key={badge.id}
              variants={item}
              className={`relative p-8 border transition-all duration-300 group ${
                isUnlocked 
                  ? 'bg-earth-50 border-stone-200 hover:border-forest-300 hover:shadow-lg hover:shadow-stone-200/50' 
                  : 'bg-transparent border-stone-100 opacity-60'
              }`}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-6 transition-colors ${
                    isUnlocked ? 'bg-forest-100 text-forest-900' : 'bg-stone-100 text-stone-300'
                  }`}>
                    <Icon name={badge.icon} className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-sans font-medium text-lg text-stone-900 mb-2">
                    {badge.name}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-auto">
                   <span className={`text-xs font-bold uppercase tracking-widest ${isUnlocked ? 'text-forest-700' : 'text-stone-300'}`}>
                     {isUnlocked ? 'Collected' : 'Locked'}
                   </span>
                   {isUnlocked && <Icon name="check" className="w-4 h-4 text-forest-700" />}
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
