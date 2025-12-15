
import React from 'react';
import { motion } from 'framer-motion';
import { NationalPark, UserParkHistory, RatingValue } from '../types';
import { Icon } from '../icons';

interface ParkDetailsProps {
  park: NationalPark;
  visit?: UserParkHistory;
  onClose: () => void;
}

const RATING_TEXT: Record<RatingValue, string> = {
  3: "Worth a dedicated trip",
  2: "Worth a detour",
  1: "A pleasant stop",
  0: "A learning experience"
};

const ParkDetails: React.FC<ParkDetailsProps> = ({ park, visit, onClose }) => {
  const hasVisits = visit && visit.visits.length > 0;
  // Sort visits newest first
  const sortedVisits = hasVisits ? [...visit.visits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-black z-40"
      />
      
      {/* Sidebar Container */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
        className="fixed inset-y-0 right-0 w-full md:w-[500px] z-50 bg-brand-beige border-l-3 border-brand-black shadow-2xl flex flex-col md:rounded-l-3xl overflow-hidden"
      >
        {/* Compact Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-3 border-brand-black bg-brand-white shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="bg-brand-black text-brand-yellow p-1.5 border border-brand-black shrink-0 rounded-full">
                <Icon name="tree" className="w-4 h-4" />
             </div>
             <h2 className="text-xl font-serif font-bold text-brand-black truncate">
               {park.name}
             </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-brand-yellow border-2 border-transparent hover:border-brand-black transition-all rounded-full"
          >
            <Icon name="x" className="w-6 h-6 text-brand-black" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-brand-beige">
            
            {/* Top Section: ASCII & Meta */}
            <div className="flex flex-row gap-6 items-start">
               {/* Small ASCII Box - Rounded */}
               <div className="hidden sm:flex w-24 h-24 shrink-0 bg-brand-black border-2 border-brand-black items-center justify-center p-1 shadow-hard-sm rounded-2xl">
                  <pre className="font-mono text-[6px] leading-none text-brand-yellow whitespace-pre text-center select-none">
                    {park.asciiArt}
                  </pre>
               </div>

               <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-black text-brand-black bg-brand-yellow border-2 border-brand-black px-3 py-1 uppercase tracking-widest rounded-full">
                      {park.state}
                    </span>
                    <span className="text-xs font-bold text-brand-black border-2 border-brand-black px-3 py-1 uppercase tracking-widest bg-brand-white rounded-full">
                      Est. {new Date(park.established).getFullYear()}
                    </span>
                  </div>
                  
                  {/* Global Rating Display */}
                  {visit && visit.rating !== undefined && (
                     <div className="flex items-center gap-2 mt-1">
                        <div className="flex space-x-0.5" title={RATING_TEXT[visit.rating]}>
                          {[1, 2, 3].map((val) => (
                              <Icon 
                                  key={val} 
                                  name="pineCone" 
                                  className={`w-5 h-5 ${val <= (visit.rating || 0) ? 'text-brand-green fill-brand-green' : 'text-brand-black/20'}`} 
                              />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-brand-black/60 uppercase tracking-wider">
                           {RATING_TEXT[visit.rating]}
                        </span>
                     </div>
                  )}

                  <h1 className="text-4xl font-serif font-bold text-brand-black leading-none tracking-tight">
                    {park.name}
                  </h1>
               </div>
            </div>

           {/* Description & Fun Fact Grid */}
           <div className="grid grid-cols-1 gap-6">
             {/* Description - Rounded */}
             <div className="text-brand-black font-medium text-sm leading-relaxed text-justify border-l-2 border-brand-black pl-4 rounded-l-lg">
               {park.description}
             </div>

             {/* Fun Fact */}
             <div className="bg-brand-white border-2 border-brand-black p-6 shadow-hard-sm relative rounded-3xl">
                <div className="absolute -top-3 left-6 bg-brand-green px-3 py-0.5 border-2 border-brand-black rounded-full">
                   <span className="text-[10px] font-black text-brand-yellow uppercase tracking-widest">Fun Fact</span>
                </div>
                <p className="font-serif text-lg text-brand-black italic pt-2">
                  "{park.funFact}"
                </p>
             </div>
           </div>

           {/* Visits Timeline */}
           <div className="pt-6 border-t-3 border-brand-black/20">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-serif font-bold text-brand-black">Visit History</h3>
               {hasVisits && (
                 <span className="text-[10px] font-bold text-brand-white bg-brand-black px-3 py-1 uppercase tracking-widest rounded-full">
                   {sortedVisits.length} {sortedVisits.length === 1 ? 'Trip' : 'Trips'}
                 </span>
               )}
             </div>

             {hasVisits ? (
               <div className="space-y-4">
                 {sortedVisits.map((log, idx) => (
                    <div key={idx} className="bg-brand-gray/20 border-2 border-brand-black p-5 space-y-4 rounded-3xl relative">
                        {/* Timeline Connector (if multiple) */}
                        {idx !== sortedVisits.length - 1 && (
                            <div className="absolute left-[29px] bottom-[-20px] h-[20px] w-[2px] bg-brand-black/20"></div>
                        )}
                        
                        <div className="flex justify-between items-center border-b-2 border-brand-black/10 pb-3">
                             <div className="flex items-center gap-2">
                                <span className="text-xs font-black bg-brand-white border border-brand-black px-2 py-0.5 rounded-md">
                                    {log.date}
                                </span>
                             </div>
                        </div>

                        {/* Notes */}
                        {log.notes && (
                            <p className="text-brand-black text-xs font-mono leading-relaxed bg-brand-white p-3 border border-brand-black/20 rounded-xl">
                                {log.notes}
                            </p>
                        )}
                    </div>
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-8 bg-brand-white border-2 border-dashed border-brand-black group cursor-pointer hover:bg-brand-yellow/20 transition-colors rounded-3xl">
                  <p className="text-brand-black font-bold text-sm uppercase tracking-wider mb-3">No Visit Logged</p>
                  <button className="bg-brand-black text-brand-yellow px-6 py-2 text-xs font-black uppercase tracking-widest hover:shadow-hard-sm transition-all border-2 border-transparent rounded-full">
                    Add First Entry
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
