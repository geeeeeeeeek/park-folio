
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NationalPark, UserParkHistory, Region, Season, Popularity } from '../types';
import { Icon } from '../icons';

interface DiscoverViewProps {
  parks: NationalPark[];
  visits: UserParkHistory[];
  onParkSelect: (id: string) => void;
}

const REGIONS: Region[] = ['Alaska', 'West Coast', 'Rockies', 'Southwest', 'Midwest', 'East Coast', 'Tropical'];
const SEASONS: Season[] = ['Spring', 'Summer', 'Fall', 'Winter'];
const POPULARITY: Popularity[] = ['High', 'Medium', 'Low'];

type VisitStatus = 'all' | 'unvisited' | 'visited';

const DiscoverView: React.FC<DiscoverViewProps> = ({ parks, visits, onParkSelect }) => {
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);
  const [selectedPopularity, setSelectedPopularity] = useState<Popularity[]>([]);
  const [visitStatus, setVisitStatus] = useState<VisitStatus>('all');
  
  const [recommendationQueue, setRecommendationQueue] = useState<NationalPark[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Filter Logic
  const toggleFilter = <T extends string>(
    item: T, 
    current: T[], 
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    if (current.includes(item)) {
      setter(current.filter(i => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const getFilteredParks = (lucky: boolean = false) => {
    const visitedIds = new Set(visits.filter(v => v.visits.length > 0).map(v => v.parkId));

    return parks.filter(park => {
        // 1. Lucky Mode bypasses filters
        if (lucky) return true;

        // 2. Visit Status Filter
        const isVisited = visitedIds.has(park.id);
        if (visitStatus === 'unvisited' && isVisited) return false;
        if (visitStatus === 'visited' && !isVisited) return false;

        // 3. Apply Attribute Filters
        const regionMatch = selectedRegions.length === 0 || selectedRegions.includes(park.region);
        const seasonMatch = selectedSeasons.length === 0 || park.bestSeasons.some(s => selectedSeasons.includes(s));
        const popMatch = selectedPopularity.length === 0 || selectedPopularity.includes(park.popularity);

        return regionMatch && seasonMatch && popMatch;
    });
  };

  const generateRecommendations = (lucky: boolean = false) => {
    setIsAnimating(true);
    setShowResult(false);
    
    setTimeout(() => {
        const candidates = getFilteredParks(lucky);
        const visitedIds = new Set(visits.filter(v => v.visits.length > 0).map(v => v.parkId));

        // Split into unvisited and visited
        const unvisited = candidates.filter(p => !visitedIds.has(p.id));
        const visited = candidates.filter(p => visitedIds.has(p.id));
        
        // Shuffle function
        const shuffle = (array: NationalPark[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        
        // Queue logic:
        // If specific visit status is selected, the list is already filtered, just shuffle.
        // If 'all' or lucky, prioritize unvisited first.
        let finalQueue: NationalPark[] = [];
        
        if (lucky || visitStatus === 'all') {
            finalQueue = [...shuffle(unvisited), ...shuffle(visited)];
        } else {
            // Already filtered to only one type
            finalQueue = shuffle(candidates);
        }

        setRecommendationQueue(finalQueue);
        setCurrentIndex(0);
        setIsAnimating(false);
        if (candidates.length > 0) {
            setShowResult(true);
        }
    }, 800); // Fake processing delay for fun
  };

  const nextRecommendation = () => {
      if (currentIndex < recommendationQueue.length - 1) {
          setCurrentIndex(prev => prev + 1);
      }
  };

  const prevRecommendation = () => {
      if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
      }
  };

  const currentPark = recommendationQueue[currentIndex];
  const isVisited = currentPark ? visits.some(v => v.parkId === currentPark.id && v.visits.length > 0) : false;

  return (
    <div className="w-full h-full flex flex-col items-center overflow-y-auto md:overflow-hidden">
       
       <div className="w-full max-w-7xl p-4 md:p-8 flex flex-col md:flex-row gap-6 md:flex-1 md:overflow-hidden md:min-h-0">
           
           {/* LEFT: Control Panel */}
           <div className="w-full md:w-1/3 flex flex-col gap-4 md:overflow-y-auto pr-2 pb-4 shrink-0">
               
               {/* Unified Filters Container */}
               <div className="bg-white p-5 rounded-[2.5rem] border-[4px] border-brand-cream/50 shadow-sm flex flex-col gap-6">
                   
                   {/* 1. Exploration Status (New) */}
                   <div>
                       <h3 className="font-bold text-brand-brown text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                           <Icon name="compass" className="w-4 h-4" />
                           Status
                       </h3>
                       <div className="bg-brand-gray/30 p-1 rounded-xl flex">
                           {(['all', 'unvisited', 'visited'] as const).map((status) => (
                               <button
                                   key={status}
                                   onClick={() => setVisitStatus(status)}
                                   className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all
                                       ${visitStatus === status 
                                            ? 'bg-white text-brand-teal shadow-sm' 
                                            : 'text-brand-brown/50 hover:text-brand-brown'}
                                   `}
                               >
                                   {status === 'all' ? 'All' : status === 'unvisited' ? 'Not Visited' : 'Visited'}
                               </button>
                           ))}
                       </div>
                   </div>

                   {/* 2. Vibe Check */}
                   <div>
                       <h3 className="font-bold text-brand-brown text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                           <Icon name="star" className="w-4 h-4" />
                           Vibe Check
                       </h3>
                       <div className="flex gap-2">
                           {POPULARITY.map(pop => (
                               <button
                                   key={pop}
                                   onClick={() => toggleFilter(pop, selectedPopularity, setSelectedPopularity)}
                                   className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all border-2
                                       ${selectedPopularity.includes(pop) 
                                           ? 'bg-brand-teal text-white border-brand-teal shadow-md' 
                                           : 'bg-brand-gray/30 text-brand-brown/60 border-transparent hover:bg-brand-gray/50'}
                                   `}
                               >
                                   {pop}
                               </button>
                           ))}
                       </div>
                   </div>

                   {/* 3. Season */}
                   <div>
                       <h3 className="font-bold text-brand-brown text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                           <Icon name="sun" className="w-4 h-4" />
                           Best Season
                       </h3>
                       <div className="grid grid-cols-2 gap-2">
                           {SEASONS.map(season => (
                               <button
                                   key={season}
                                   onClick={() => toggleFilter(season, selectedSeasons, setSelectedSeasons)}
                                   className={`py-2 rounded-xl font-bold text-xs transition-all border-2
                                       ${selectedSeasons.includes(season) 
                                           ? 'bg-brand-orange text-white border-brand-orange shadow-sm' 
                                           : 'bg-brand-gray/30 text-brand-brown/60 border-transparent hover:bg-brand-gray/50'}
                                   `}
                               >
                                   {season}
                               </button>
                           ))}
                       </div>
                   </div>

                   {/* 4. Region */}
                   <div>
                       <h3 className="font-bold text-brand-brown text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                           <Icon name="map" className="w-4 h-4" />
                           Region
                       </h3>
                       <div className="flex flex-wrap gap-2">
                           {REGIONS.map(region => (
                               <button
                                   key={region}
                                   onClick={() => toggleFilter(region, selectedRegions, setSelectedRegions)}
                                   className={`px-3 py-1.5 rounded-lg font-bold text-[10px] md:text-xs transition-all border-2
                                       ${selectedRegions.includes(region) 
                                           ? 'bg-brand-blue text-white border-brand-blue shadow-sm' 
                                           : 'bg-brand-gray/30 text-brand-brown/60 border-transparent hover:bg-brand-gray/50'}
                                   `}
                               >
                                   {region}
                               </button>
                           ))}
                       </div>
                   </div>
               </div>

               {/* Actions */}
               <div className="flex flex-col gap-3 mt-auto pt-2">
                    <button 
                        onClick={() => generateRecommendations(false)}
                        className="w-full py-4 bg-brand-teal text-white rounded-[1.5rem] font-bold text-lg shadow-soft hover:bg-brand-tealDark active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Icon name="search" className="w-5 h-5 stroke-[3]" />
                        Find Adventure
                    </button>
                    <button 
                        onClick={() => generateRecommendations(true)}
                        className="w-full py-3 bg-brand-yellow text-brand-brown rounded-[1.5rem] font-bold shadow-sm hover:bg-brand-yellowDark active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Icon name="shuffle" className="w-5 h-5" />
                        I'm Feeling Lucky
                    </button>
               </div>
           </div>

           {/* RIGHT: Results Area */}
           <div className="w-full md:w-2/3 min-h-[500px] md:h-full relative flex items-center justify-center bg-brand-brown/5 rounded-[3rem] border-4 border-dashed border-brand-brown/10 p-6 overflow-hidden shrink-0">
                
                <AnimatePresence mode="wait">
                    {isAnimating ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="w-16 h-16 border-4 border-brand-teal border-t-transparent rounded-full"
                            />
                            <p className="font-bold text-brand-brown/50 animate-pulse">Scouting locations...</p>
                        </motion.div>
                    ) : showResult && currentPark ? (
                        <motion.div
                            key={currentPark.id}
                            initial={{ opacity: 0, y: 50, rotate: 5 }}
                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                            exit={{ opacity: 0, y: -50, rotate: -5 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-white overflow-hidden flex flex-col h-full max-h-[520px]"
                        >
                             {/* Stamp Header */}
                             <div className="bg-brand-cream/50 p-6 flex justify-center items-center relative overflow-hidden h-32 shrink-0">
                                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#7c6553 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
                                  <div className="text-7xl filter drop-shadow-md transform hover:scale-110 transition-transform duration-500 cursor-default">
                                      {currentPark.emoji}
                                  </div>
                                  <div className="absolute top-4 right-4 flex gap-2">
                                      {isVisited && (
                                          <div className="bg-brand-green text-white px-2 py-1 rounded-full text-[10px] font-bold border border-white shadow-sm flex items-center gap-1">
                                              <Icon name="check" className="w-3 h-3 stroke-[3]" />
                                              Visited
                                          </div>
                                      )}
                                      <div className="bg-white/80 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-bold text-brand-brown border border-brand-brown/10">
                                          {currentPark.region}
                                      </div>
                                  </div>
                             </div>

                             {/* Content */}
                             <div className="p-6 text-center flex-1 flex flex-col overflow-y-auto">
                                 <h2 className="text-2xl font-bold text-brand-brown mb-1 leading-none">{currentPark.name}</h2>
                                 <div className="text-brand-brown/40 font-bold uppercase tracking-widest text-xs mb-4">{currentPark.state}</div>
                                 
                                 <p className="text-brand-brown/80 mb-4 leading-relaxed text-sm">
                                     {currentPark.description}
                                 </p>

                                 <div className="flex justify-center gap-2 mb-6 flex-wrap">
                                     {currentPark.bestSeasons.map(s => (
                                         <span key={s} className="px-2 py-1 bg-brand-green/10 text-brand-greenDark rounded-full text-[10px] font-bold">
                                             {s}
                                         </span>
                                     ))}
                                 </div>
                                
                                 <button 
                                    onClick={() => onParkSelect(currentPark.id)}
                                    className="mt-auto w-full py-3 bg-brand-brown text-white rounded-2xl font-bold shadow-md hover:bg-brand-brown/90 transition-colors shrink-0 text-sm"
                                 >
                                     View Details
                                 </button>
                             </div>

                             {/* Navigation Controls Overlay */}
                             <div className="absolute top-[30%] -translate-y-1/2 w-full flex justify-between px-2 pointer-events-none z-10">
                                  <button 
                                    onClick={prevRecommendation}
                                    disabled={currentIndex === 0}
                                    className="pointer-events-auto w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-brand-brown disabled:opacity-0 transition-opacity hover:bg-brand-gray transform hover:scale-110 active:scale-90"
                                  >
                                      <Icon name="arrowLeft" className="w-4 h-4" />
                                  </button>

                                  <button 
                                    onClick={nextRecommendation}
                                    disabled={currentIndex === recommendationQueue.length - 1}
                                    className="pointer-events-auto w-10 h-10 bg-brand-teal text-white rounded-xl shadow-md flex items-center justify-center disabled:opacity-0 transition-opacity hover:bg-brand-tealDark transform hover:scale-110 active:scale-90"
                                  >
                                      <Icon name="arrowRight" className="w-4 h-4" />
                                  </button>
                             </div>
                        </motion.div>
                    ) : (
                        /* Empty State */
                        <div className="text-center opacity-50 max-w-xs">
                             <Icon name="map" className="w-16 h-16 mx-auto mb-4 text-brand-brown" />
                             <h3 className="text-xl font-bold text-brand-brown mb-2">Ready to Explore?</h3>
                             <p className="text-brand-brown/80">Adjust the filters and hit "Find Adventure" to discover your next destination.</p>
                             {recommendationQueue.length === 0 && showResult && (
                                 <p className="text-brand-orange font-bold mt-4">No parks found matching these filters!</p>
                             )}
                        </div>
                    )}
                </AnimatePresence>

           </div>
       </div>
    </div>
  );
};

export default DiscoverView;
