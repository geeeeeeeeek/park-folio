
import React from 'react';
import { motion } from 'framer-motion';
import { NationalPark, UserParkHistory, RatingValue } from '../types';
import { Icon } from '../icons';

interface ParkDetailsProps {
  park: NationalPark;
  visit?: UserParkHistory;
  onClose: () => void;
}

const RATING_LABELS: Record<number, string> = {
    1: "A pleasant stop",
    2: "Worth a detour",
    3: "Worth a dedicated trip"
};

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
                
                {/* LEFT: Park Identity */}
                <div className="flex-1 p-8 md:overflow-y-auto border-b-4 md:border-b-0 md:border-r-4 border-dashed border-brand-brown/10 bg-brand-cream/30">
                     <div className="flex flex-col items-center text-center">
                         
                         {/* Stamp/Sticker Icon */}
                         <div className="relative mb-6 group shrink-0">
                             <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-6xl shadow-soft border-[5px] border-white rotate-[-3deg] group-hover:rotate-0 transition-transform duration-300">
                                {park.emoji}
                             </div>
                             {/* State Tag */}
                             <div className="absolute -bottom-3 -right-3 bg-brand-yellow text-brand-brown font-bold text-sm px-4 py-1.5 rounded-full border-[3px] border-white rotate-6 shadow-sm">
                                {park.state}
                             </div>
                         </div>

                         <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-8 leading-tight shrink-0">
                            {park.name}
                         </h2>

                         {/* Unified Info Area - Trail Guide Layout (No Container) */}
                         <div className="w-full flex flex-col relative text-left pb-4">
                            
                            {/* Trail Connecting Line */}
                            <div className="absolute left-[1.65rem] top-6 bottom-10 w-0 border-l-[3px] border-dashed border-brand-brown/20 z-0"></div>

                            {/* Section 1: Overview */}
                            <div className="flex gap-5 relative z-10 mb-8">
                                <div className="shrink-0 flex flex-col items-center">
                                     {/* Compass Icon */}
                                     <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-brand-brown border-[3px] border-brand-brown/10 shadow-sm">
                                         <Icon name="compass" className="w-7 h-7" />
                                     </div>
                                </div>
                                <div className="pt-1">
                                    <h4 className="font-bold text-brand-brown/40 uppercase tracking-widest text-[11px] mb-2">Park Overview</h4>
                                    <p className="text-brand-brown font-medium leading-relaxed text-[15px] md:text-[16px]">
                                        {park.description}
                                    </p>
                                </div>
                            </div>

                            {/* Section 2: Ranger Fact */}
                            <div className="flex gap-5 relative z-10">
                                <div className="shrink-0 flex flex-col items-center">
                                     {/* Bear Icon - Size reduced to match visual weight of compass */}
                                     <div className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center text-white border-[3px] border-brand-greenDark/20 shadow-sm rotate-[-6deg]">
                                         <Icon name="explorerBear" className="w-6 h-6" />
                                     </div>
                                </div>
                                <div className="flex-1 pt-1 min-w-0">
                                    <h4 className="font-bold text-brand-brown/40 uppercase tracking-widest text-[11px] mb-2">Ranger's Secret</h4>
                                    <div className="bg-brand-yellow p-5 rounded-3xl rounded-tl-none border-[3px] border-white shadow-sm relative inline-block w-full">
                                        <p className="text-brand-brown text-[15px] font-bold leading-relaxed italic">
                                            "{park.funFact}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                         </div>
                         
                     </div>
                </div>

                {/* RIGHT: Visitor Log (Passport Style) */}
                {/* Removed extra top padding, managed overlap with pr-16 in header */}
                <div className="flex-1 p-8 md:overflow-y-auto bg-brand-cream/30 relative">
                     {/* Background Pattern */}
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7c6553 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
                     
                     <div className="relative z-10">
                        {/* Header Section */}
                        <div className="mb-6 pb-4 border-b-2 border-dashed border-brand-brown/10">
                            {/* Title Row - Padding Right to clear Close Button */}
                            <div className="flex items-center gap-3 pr-16 mb-4">
                                <div className="bg-brand-orange/10 p-2 rounded-xl rotate-3">
                                    <Icon name="journal" className="w-6 h-6 text-brand-orange" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-brand-brown leading-none">Passport Entry</h3>
                                    <span className="text-xs font-bold text-brand-brown/40 uppercase tracking-widest">Your Visits</span>
                                </div>
                            </div>

                            {/* Rating Row - Just above divider */}
                             {hasVisits && (
                                <div className="flex items-center gap-4 bg-white/60 p-3 rounded-2xl border border-brand-brown/5">
                                    {/* Rating Text */}
                                    <div className="flex-1">
                                        <span className="text-[10px] font-bold text-brand-brown/40 uppercase tracking-wider block mb-0.5">Your Rating</span>
                                        <span className="font-bold text-brand-teal text-lg leading-none">
                                            {visit?.rating ? RATING_LABELS[visit.rating] : "No Rating"}
                                        </span>
                                    </div>

                                    {/* Thumbs Icons */}
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map(v => (
                                            <div key={v} className="flex flex-col items-center gap-1">
                                                <div className={`p-1.5 rounded-lg transition-colors ${v <= (visit?.rating || 0) ? 'bg-brand-orange text-white shadow-sm' : 'bg-brand-brown/10 text-brand-brown/20'}`}>
                                                    <Icon name="thumbsUp" className="w-4 h-4" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
