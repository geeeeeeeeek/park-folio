
import React from 'react';
import { motion } from 'framer-motion';
import { NationalPark, UserVisit } from '../types';
import { Icon } from '../icons';

interface ParkDetailsProps {
  park: NationalPark;
  visit?: UserVisit;
  onClose: () => void;
}

const ParkDetails: React.FC<ParkDetailsProps> = ({ park, visit, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900 backdrop-blur-sm z-40"
      />
      
      {/* Editorial Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
        className="fixed inset-y-0 right-0 w-full md:w-[600px] z-50 bg-earth-50 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Badge Showcase Section */}
        <div className="relative h-[45vh] shrink-0 bg-earth-200 flex items-center justify-center p-12 overflow-hidden">
          {/* Subtle textured background for the badge */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle, #8c8982 1px, transparent 1px)', 
                 backgroundSize: '24px 24px' 
               }}>
          </div>
          
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            src={park.imageUrl} 
            alt={`${park.name} Badge`} 
            className="h-full w-auto object-contain drop-shadow-2xl z-10"
          />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-stone-900/5 hover:bg-stone-900/10 rounded-full text-stone-600 transition-colors z-20"
          >
            <Icon name="x" className="w-6 h-6" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto px-10 py-12 space-y-10 bg-earth-50">
            {/* Title Block */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                 <span className="text-xs font-bold text-stone-800 bg-earth-200 border border-stone-200 px-3 py-1 uppercase tracking-widest rounded-sm">
                   {park.state}
                 </span>
                 <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                   Est. {new Date(park.established).getFullYear()}
                 </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                {park.name}
              </h2>
            </motion.div>

           {/* Intro */}
           <div className="prose prose-stone prose-lg">
             <p className="text-stone-600 font-sans leading-loose text-lg border-l-2 border-forest-500 pl-6">
               {park.description}
             </p>
           </div>

           {/* Fun Fact Card */}
           <div className="bg-white p-8 border border-stone-100 shadow-sm rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Icon name="compass" className="w-24 h-24 text-stone-900" />
              </div>
              <span className="block text-xs font-bold text-forest-700 uppercase tracking-widest mb-3 relative z-10">Field Note</span>
              <p className="font-serif text-xl text-stone-800 italic relative z-10">
                "{park.funFact}"
              </p>
           </div>

           {/* User Stats / Action */}
           <div className="pt-6 border-t border-stone-200">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-serif text-stone-900">Personal Log</h3>
               {visit?.visited && (
                 <span className="text-xs font-bold text-forest-800 bg-forest-100 px-3 py-1 uppercase tracking-widest rounded-full">
                   Visited {visit.dateLastVisited}
                 </span>
               )}
             </div>

             {visit?.visited ? (
               <div className="bg-earth-100 rounded-lg p-6 space-y-6">
                 {/* Rating */}
                 <div className="flex items-center justify-between">
                   <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">Rating</span>
                   <div className="flex space-x-1">
                     {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="star" 
                          className={`w-5 h-5 ${i < (visit.rating || 0) ? 'text-stone-900 fill-stone-900' : 'text-stone-300'}`} 
                        />
                      ))}
                   </div>
                 </div>

                 {/* Highlight */}
                 {visit.favoriteMoment && (
                   <div>
                     <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block mb-1">Highlight</span>
                     <p className="text-stone-900 font-medium">
                       {visit.favoriteMoment}
                     </p>
                   </div>
                 )}

                 {/* Notes */}
                 {visit.notes && (
                   <div className="pt-4 border-t border-earth-200/50">
                     <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block mb-1">Notes</span>
                     <p className="text-stone-600 text-sm leading-relaxed italic">
                       "{visit.notes}"
                     </p>
                   </div>
                 )}
               </div>
             ) : (
               <div className="text-center py-10 bg-white border border-dashed border-stone-300 rounded-lg">
                  <p className="text-stone-400 mb-4 font-medium text-sm">Not yet visited</p>
                  <button className="bg-stone-900 text-earth-50 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-colors rounded-sm shadow-lg shadow-stone-900/20">
                    Log Visit
                  </button>
               </div>
             )}
           </div>
        </div>
      </motion.div>
    </>
  );
};

export default ParkDetails;
