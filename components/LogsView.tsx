
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
  3: "Worth a dedicated trip",
  2: "Worth a detour",
  1: "A pleasant stop",
  0: "A learning experience"
};

const LogsView: React.FC<LogsViewProps> = ({ parks, visits, onParkSelect }) => {
  // Flatten visits: Create an entry for every single visit log
  const flattenedLogs = visits
    .flatMap(history => 
        history.visits.map(visitLog => ({
            ...visitLog,
            parkRating: history.rating, // Pass down the park-level rating
            park: parks.find(p => p.id === history.parkId)!
        }))
    )
    .filter(item => item.park) // Safety check
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 pb-32">
       <div className="flex items-end justify-between mb-16 border-b-4 border-brand-black pb-6 rounded-b-xl">
        <div>
          <span className="text-sm font-bold bg-brand-yellow border-2 border-brand-black px-3 py-1 inline-block mb-3 uppercase tracking-widest text-brand-black rounded-full">Journal</span>
          <h2 className="text-6xl font-serif font-bold text-brand-black">Travel Logs</h2>
        </div>
        <div className="text-right">
          <div className="bg-brand-green text-brand-white border-2 border-brand-black px-6 py-2 shadow-hard-sm rounded-2xl">
             <span className="text-4xl font-mono font-bold block">{flattenedLogs.length}</span>
             <span className="text-xs font-bold uppercase tracking-widest">Trips</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {flattenedLogs.map(({ park, date, parkRating, notes }, index) => (
          <motion.div
            key={`${park.id}-${date}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            onClick={() => onParkSelect(park.id)}
            className="group cursor-pointer relative"
          >
            {/* Card Container */}
            <div className="flex flex-col md:flex-row gap-0 border-3 border-brand-black bg-brand-white shadow-hard transition-all duration-200 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-hard-hover rounded-3xl overflow-hidden">
              
              {/* ASCII Art Box */}
              <div className="md:w-1/4 aspect-square md:aspect-auto bg-brand-black flex items-center justify-center p-4 border-b-3 md:border-b-0 md:border-r-3 border-brand-black group-hover:bg-brand-green transition-colors duration-300">
                 <pre className="font-mono text-[8px] leading-none text-brand-yellow whitespace-pre text-center select-none">
                   {park.asciiArt}
                 </pre>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                             <h3 className="text-3xl font-serif font-bold text-brand-black group-hover:text-brand-green transition-colors">
                                {park.name}
                            </h3>
                            <span className="text-xs font-black text-brand-black/50 uppercase tracking-widest mt-1">
                                {date}
                            </span>
                        </div>
                        <span className="text-xs font-black bg-brand-gray border-2 border-brand-black px-3 py-1 uppercase tracking-widest text-brand-black rounded-full">
                            {park.state}
                        </span>
                    </div>
                    
                    <p className="text-brand-black font-medium leading-relaxed mb-6 max-w-xl border-l-4 border-brand-yellow pl-4 rounded-l-sm">
                        {notes || "No notes for this trip."}
                    </p>
                 </div>

                 {parkRating !== undefined && (
                   <div className="flex items-center justify-between border-t-2 border-brand-black/20 pt-4">
                      <div className="flex items-center gap-4">
                        {/* Rating Display */}
                        <div className="flex space-x-1 items-center bg-brand-beige border border-brand-black/10 px-3 py-1 rounded-full">
                          <span className="text-[10px] font-black uppercase mr-2 opacity-50">Verdict</span>
                          {[1, 2, 3].map((val) => (
                            <Icon 
                              key={val} 
                              name="pineCone" 
                              className={`w-4 h-4 ${val <= parkRating ? 'text-brand-green fill-brand-green' : 'text-brand-black/10'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-brand-black hidden sm:inline-block">
                          {RATING_TEXT[parkRating]}
                        </span>
                      </div>
                      
                      <div className="bg-brand-yellow border-2 border-brand-black p-2 group-hover:bg-brand-black group-hover:text-brand-yellow transition-colors rounded-full">
                         <Icon name="arrowRight" className="w-5 h-5" />
                      </div>
                   </div>
                 )}
              </div>
            </div>
          </motion.div>
        ))}

        {flattenedLogs.length === 0 && (
          <div className="py-24 text-center border-3 border-dashed border-brand-black bg-brand-white rounded-3xl">
            <Icon name="map" className="w-12 h-12 text-brand-black mx-auto mb-4" />
            <p className="text-brand-black font-bold text-xl uppercase tracking-wider">Log your first adventure</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsView;
