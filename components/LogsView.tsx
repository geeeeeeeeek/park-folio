
import React from 'react';
import { motion } from 'framer-motion';
import { NationalPark, UserParkHistory, RatingValue } from '../types';
import { Icon } from '../icons';

interface LogsViewProps {
  parks: NationalPark[];
  visits: UserParkHistory[];
  onParkSelect: (id: string) => void;
}

const RATING_TEXT: Record<RatingValue, string> = {
  3: "Top Tier",
  2: "Great",
  1: "Good",
  0: "Learned a Lot"
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const LogsView: React.FC<LogsViewProps> = ({ parks, visits, onParkSelect }) => {
  const flattenedLogs = visits
    .flatMap(history => 
        history.visits.map(visitLog => ({
            ...visitLog,
            parkRating: history.rating, 
            park: parks.find(p => p.id === history.parkId)!
        }))
    )
    .filter(item => item.park) 
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-32">
       
       {/* Header Banner - Matching BadgeView Aesthetic */}
       <div className="relative bg-brand-navBtn rounded-[3rem] p-6 md:p-10 mb-12 shadow-sm border-[6px] border-brand-cream flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
        {/* Decorative dashed line inside */}
        <div className="absolute inset-4 border-2 border-dashed border-brand-brown/10 rounded-[2.5rem] pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-6">
            <div className="bg-brand-orange text-white p-4 rounded-full shadow-soft -rotate-3 border-4 border-white">
                 <Icon name="journal" className="w-8 h-8" />
            </div>
            <div>
                <h2 className="text-3xl md:text-5xl font-bold text-brand-brown">Travel Logs</h2>
                <p className="text-brand-brown/60 font-medium mt-1 pl-1">
                    Notes from the field
                </p>
            </div>
        </div>

        {/* Stats Section */}
         <div className="relative z-10 bg-white/60 backdrop-blur-sm px-8 py-3 rounded-[2rem] border-2 border-white shadow-sm w-full md:w-auto min-w-[200px] flex flex-col items-center">
               <span className="font-bold text-brand-brown/60 text-xs uppercase tracking-wider">Total Entries</span>
               <span className="font-bold text-brand-teal text-3xl">{flattenedLogs.length}</span>
         </div>
      </div>

      {/* Grid Layout for Logs */}
      {flattenedLogs.length === 0 ? (
          <div className="text-center py-16 opacity-60 border-4 border-dashed border-brand-brown/10 rounded-[3rem] bg-brand-cream/30">
                <div className="bg-brand-brown/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon name="pineCone" className="w-10 h-10 text-brand-brown/60" />
                </div>
                <p className="text-2xl font-bold text-brand-brown mb-2">No logs found</p>
                <p className="text-brand-brown/70">Select a park on the map to add your first entry.</p>
            </div>
      ) : (
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {flattenedLogs.map(({ park, date, parkRating, notes }, index) => (
            <motion.div
                key={`${park.id}-${date}-${index}`}
                variants={item}
                onClick={() => onParkSelect(park.id)}
                className="group cursor-pointer h-full"
            >
                {/* Compact Field Note Card */}
                <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border-[4px] border-white ring-4 ring-brand-cream/50 hover:ring-brand-teal/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft h-full flex flex-col relative overflow-hidden">
                    
                    {/* Decorative Background Icon (Subtle) */}
                    <div className="absolute -top-4 -right-4 text-brand-cream opacity-40 group-hover:rotate-12 transition-transform duration-500">
                         <Icon name="pineCone" className="w-24 h-24" />
                    </div>

                    {/* Header: Icon + Name */}
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-16 h-16 bg-brand-navBtn rounded-2xl flex items-center justify-center text-3xl border-2 border-brand-brown/5 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                            {park.emoji}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-lg text-brand-brown leading-tight truncate pr-2 group-hover:text-brand-teal transition-colors">
                                {park.name}
                            </h3>
                            <span className="text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest bg-brand-brown/5 px-2 py-0.5 rounded-full mt-1 inline-block">
                                {park.state}
                            </span>
                        </div>
                    </div>

                    {/* Notes Area - Looks like a text block */}
                    <div className="bg-brand-cream/20 rounded-2xl p-4 mb-4 flex-1 border border-brand-brown/5 relative">
                        <p className={`text-sm font-medium leading-relaxed line-clamp-4 ${notes ? 'text-brand-brown/80' : 'text-brand-brown/40 italic'}`}>
                            {notes || "No notes written..."}
                        </p>
                    </div>

                    {/* Footer: Date & Rating */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t-2 border-dashed border-brand-brown/10 relative z-10">
                        <span className="bg-brand-blue/10 text-brand-blueDark px-3 py-1 rounded-full text-xs font-bold border border-brand-blue/10">
                            {date}
                        </span>
                        
                        {parkRating !== undefined && (
                            <div className="flex items-center gap-0.5 bg-brand-yellow/30 px-2 py-1 rounded-full border border-brand-brown/5">
                                {[1, 2, 3].map((val) => (
                                    <Icon 
                                    key={val} 
                                    name="pineCone" 
                                    className={`w-3.5 h-3.5 ${val <= parkRating ? 'text-brand-orange fill-brand-orange' : 'text-brand-gray'}`} 
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            ))}
        </motion.div>
      )}
    </div>
  );
};

export default LogsView;
