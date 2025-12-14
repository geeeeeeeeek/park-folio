
import React from 'react';
import { motion } from 'framer-motion';
import { NationalPark, UserVisit } from '../types';
import { Icon } from '../icons';

interface LogsViewProps {
  parks: NationalPark[];
  visits: UserVisit[];
  onParkSelect: (id: string) => void;
}

const LogsView: React.FC<LogsViewProps> = ({ parks, visits, onParkSelect }) => {
  const logs = visits
    .filter(v => v.visited)
    .map(visit => ({
      visit,
      park: parks.find(p => p.id === visit.parkId)!
    }))
    .filter(item => item.park)
    .sort((a, b) => new Date(b.visit.dateLastVisited || 0).getTime() - new Date(a.visit.dateLastVisited || 0).getTime());

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 pb-32">
       <div className="flex items-end justify-between mb-20 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-2">Journal</span>
          <h2 className="text-5xl font-serif text-stone-900">Travel Logs</h2>
        </div>
        <div className="text-right">
          <span className="text-4xl font-serif text-forest-700 block">{logs.length}</span>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Entries</span>
        </div>
      </div>

      <div className="space-y-12">
        {logs.map(({ park, visit }, index) => (
          <motion.div
            key={park.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => onParkSelect(park.id)}
            className="group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Image Section - Badge Style */}
              <div className="md:w-1/4 aspect-[3/4] overflow-hidden bg-earth-200 relative p-4 rounded-sm border border-stone-200">
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #a39f96 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                 <img 
                  src={park.imageUrl} 
                  alt={park.name}
                  className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 drop-shadow-lg"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 pt-2">
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="text-3xl font-serif text-stone-900 group-hover:text-forest-700 transition-colors">
                     {park.name}
                   </h3>
                   <span className="text-xs font-bold text-stone-400 border border-stone-200 px-2 py-1 uppercase tracking-widest">
                     {park.state}
                   </span>
                 </div>
                 
                 <p className="text-stone-600 leading-relaxed mb-6 max-w-xl">
                   {visit.notes || park.description}
                 </p>

                 <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon 
                            key={i} 
                            name="star" 
                            className={`w-4 h-4 ${i < (visit.rating || 0) ? 'text-stone-900 fill-stone-900' : 'text-stone-200'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-stone-400 font-medium">
                        {visit.dateLastVisited}
                      </span>
                    </div>
                    
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                       <Icon name="arrowRight" className="w-5 h-5 text-stone-300 group-hover:text-forest-700" />
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}

        {logs.length === 0 && (
          <div className="py-24 text-center border border-dashed border-stone-300 bg-earth-50">
            <Icon name="map" className="w-8 h-8 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-medium">Your journal awaits its first entry.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsView;
