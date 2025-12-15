
import React from 'react';
import { motion } from 'framer-motion';
import { NationalPark, UserParkHistory, RatingValue } from '../types';
import { Icon } from '../icons';

interface ParkDetailsProps {
  park: NationalPark;
  visit?: UserParkHistory;
  onClose: () => void;
}

const ParkDetails: React.FC<ParkDetailsProps> = ({ park, visit, onClose }) => {
  const hasVisits = visit && visit.visits.length > 0;
  const sortedVisits = hasVisits ? [...visit.visits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];

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
            
            {/* Header Bar - NookPhone Style */}
            <div className="bg-brand-teal w-full px-8 py-5 flex items-center justify-between border-b-4 border-white/50 relative overflow-hidden shrink-0">
                 {/* Subtle Striped Pattern Overlay */}
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, #fff 10px, #fff 20px)' }}></div>
                 
                 <div className="z-10 flex items-center gap-3">
                     <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                         <Icon name="map" className="w-5 h-5 text-white" />
                     </div>
                     <span className="font-bold text-white text-lg tracking-widest uppercase drop-shadow-sm">Park Info</span>
                 </div>

                 <button 
                    onClick={onClose}
                    className="z-10 bg-white text-brand-orange hover:bg-brand-orange hover:text-white transition-colors w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                 >
                    <Icon name="x" className="w-6 h-6 stroke-[3]" />
                </button>
            </div>

            {/* Split Content Body */}
            {/* Updated Layout: Single scroll on mobile, split scroll on desktop */}
            <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
                
                {/* LEFT: Park Identity */}
                <div className="flex-1 p-8 md:overflow-y-auto border-b-4 md:border-b-0 md:border-r-4 border-dashed border-brand-brown/10 bg-brand-cream/30">
                     <div className="flex flex-col items-center text-center">
                         
                         {/* Stamp/Sticker Icon */}
                         <div className="relative mb-6 group">
                             <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-6xl shadow-soft border-[5px] border-white rotate-[-3deg] group-hover:rotate-0 transition-transform duration-300">
                                {park.emoji}
                             </div>
                             {/* State Tag */}
                             <div className="absolute -bottom-3 -right-3 bg-brand-yellow text-brand-brown font-bold text-sm px-4 py-1.5 rounded-full border-[3px] border-white rotate-6 shadow-sm">
                                {park.state}
                             </div>
                         </div>

                         <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4 leading-tight">
                            {park.name}
                         </h2>

                         <div className="bg-white p-5 rounded-3xl border-2 border-brand-brown/5 shadow-sm mb-8 w-full">
                            <p className="text-brand-brown/80 font-medium leading-relaxed text-sm">
                                {park.description}
                            </p>
                         </div>

                         {/* Fun Fact Bubble */}
                         <div className="w-full flex gap-4 items-start bg-brand-green/20 p-5 rounded-[2.5rem] border-2 border-brand-green/30 relative mt-auto">
                             <div className="absolute -top-3 left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-brand-green/30"></div>
                             <div className="bg-brand-green w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white border-[3px] border-white shadow-sm">
                                <Icon name="explorerBear" className="w-7 h-7" />
                             </div>
                             <div className="flex-1 text-left">
                                 <div className="text-xs font-bold text-brand-greenDark mb-1 uppercase tracking-wide opacity-80">Ranger Fact</div>
                                 <p className="text-brand-brown/90 text-sm italic font-medium leading-snug">"{park.funFact}"</p>
                             </div>
                         </div>
                     </div>
                </div>

                {/* RIGHT: Visitor Log (Passport Style) */}
                <div className="flex-1 p-8 md:overflow-y-auto bg-brand-cream/30 relative">
                     {/* Background Pattern */}
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7c6553 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
                     
                     <div className="relative z-10">
                        {/* Header Section with Rating moved here */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed border-brand-brown/10">
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-orange/10 p-2 rounded-xl rotate-3">
                                    <Icon name="journal" className="w-6 h-6 text-brand-orange" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-brand-brown leading-none">Passport Entry</h3>
                                    <span className="text-xs font-bold text-brand-brown/40 uppercase tracking-widest">Your Visits</span>
                                </div>
                            </div>

                            {/* Moved Rating Pinecones Here - As rating applies to the park/history, not just a single visit */}
                             {hasVisits && (
                                <div className="flex gap-1 bg-white/50 px-3 py-1.5 rounded-full border border-brand-brown/5 shadow-sm">
                                     {[1, 2, 3].map(v => (
                                         <Icon key={v} name="pineCone" className={`w-4 h-4 ${v <= (visit?.rating || 0) ? 'text-brand-orange fill-brand-orange' : 'text-gray-300'}`} />
                                     ))}
                                </div>
                             )}
                        </div>

                        {hasVisits ? (
                             <div className="space-y-4">
                                {sortedVisits.map((log, idx) => (
                                    <div key={idx} className="bg-brand-cream/20 p-5 rounded-[2rem] border-2 border-brand-brown/10 flex flex-col gap-3 group hover:bg-brand-cream/40 transition-colors">
                                         
                                         {/* Header of Card */}
                                         <div className="flex justify-between items-center">
                                             {/* Updated Date Chip Style to match LogsView */}
                                             <span className="bg-brand-blue/10 text-brand-blueDark px-3 py-1 rounded-full text-xs font-bold border border-brand-blue/10">
                                                {log.date}
                                             </span>
                                         </div>

                                         {/* Notes Area */}
                                         <div className="relative">
                                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-brown/10 rounded-full"></div>
                                             <p className={`pl-4 text-sm leading-relaxed ${log.notes ? 'text-brand-brown' : 'text-brand-brown/40 italic'}`}>
                                                 {log.notes || "No notes recorded for this expedition."}
                                             </p>
                                         </div>
                                    </div>
                                ))}
                             </div>
                        ) : (
                             <div className="h-64 flex flex-col items-center justify-center text-center opacity-60 border-4 border-dashed border-brand-brown/10 rounded-[2.5rem] bg-brand-brown/5">
                                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 text-brand-teal shadow-sm">
                                     <Icon name="hikingBoot" className="w-10 h-10" />
                                 </div>
                                 <h4 className="font-bold text-brand-brown text-lg">Untouched Territory</h4>
                                 <p className="text-sm text-brand-brown/60 max-w-[200px] mt-1">This park hasn't been stamped in your passport yet.</p>
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

export default ParkDetails;
