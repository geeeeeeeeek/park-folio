
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
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
    
    // Reset filters if lucky is clicked from result view to ensure full pool
    if (lucky) {
        // Optional: clear filters visually? For now, we just bypass them in logic.
    }

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
        
        let finalQueue: NationalPark[] = [];
        
        if (lucky || visitStatus === 'all') {
            finalQueue = [...shuffle(unvisited), ...shuffle(visited)];
        } else {
            finalQueue = shuffle(candidates);
        }

        setRecommendationQueue(finalQueue);
        setCurrentIndex(0);
        setIsAnimating(false);
        setShowResult(true);
    }, 800); 
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

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!showResult) return;
        
        if (e.key === 'ArrowRight') {
            setCurrentIndex(prev => Math.min(prev + 1, recommendationQueue.length - 1));
        } else if (e.key === 'ArrowLeft') {
            setCurrentIndex(prev => Math.max(prev - 1, 0));
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showResult, recommendationQueue.length]);

  // Swipe Handling
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    // Swipe Left -> Next
    if (offset < -100 || velocity < -500) {
        if (currentIndex < recommendationQueue.length - 1) {
            nextRecommendation();
        }
    } 
    // Swipe Right -> Prev
    else if (offset > 100 || velocity > 500) {
        if (currentIndex > 0) {
            prevRecommendation();
        }
    }
  };

  const currentPark = recommendationQueue[currentIndex];
  const isVisited = currentPark ? visits.some(v => v.parkId === currentPark.id && v.visits.length > 0) : false;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
             {/* Floating Elements */}
             {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: Math.random() * 1000 - 500, y: Math.random() * 1000 - 500, opacity: 0 }}
                    animate={{ 
                        y: [0, -20, 0], 
                        opacity: [0.05, 0.15, 0.05],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                        duration: 10 + Math.random() * 20, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 2
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    className="absolute text-brand-tealDark"
                >
                    <Icon name={i % 2 === 0 ? "tree" : "mountain"} className={`w-${16 + Math.random() * 32} h-${16 + Math.random() * 32}`} />
                </motion.div>
             ))}
        </div>

        <AnimatePresence mode="wait">
            {!showResult && !isAnimating ? (
                <motion.div
                    key="filters"
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    transition={{ type: "spring", bounce: 0.3 }}
                    className="flex flex-col items-center gap-6 w-full h-full justify-center max-w-md z-10"
                >
                    {/* Filter Card */}
                    <div className="w-full bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-white overflow-hidden flex flex-col h-full max-h-[520px]">
                        {/* Filter Card Header */}
                        <div className="bg-brand-cream/50 p-6 flex justify-center items-center relative overflow-hidden shrink-0 h-32">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#7c6553 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
                            <div className="text-7xl drop-shadow-sm transform -rotate-6 select-none cursor-default">
                                🏞️
                            </div>
                        </div>

                        {/* Filter Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Status */}
                            <div>
                            <label className="block text-xs font-bold text-brand-brown/50 uppercase tracking-wider mb-2">Exploration Status</label>
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
                                        {status === 'all' ? 'All' : status === 'unvisited' ? 'New' : 'Visited'}
                                    </button>
                                ))}
                            </div>
                            </div>

                            {/* Vibe */}
                            <div>
                            <label className="block text-xs font-bold text-brand-brown/50 uppercase tracking-wider mb-2">Crowd Levels</label>
                            <div className="flex gap-2">
                                {POPULARITY.map(pop => (
                                    <button
                                        key={pop}
                                        onClick={() => toggleFilter(pop, selectedPopularity, setSelectedPopularity)}
                                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all border-2
                                            ${selectedPopularity.includes(pop) 
                                                ? 'bg-brand-teal text-white border-brand-teal shadow-sm' 
                                                : 'bg-brand-gray/30 text-brand-brown/60 border-transparent hover:bg-brand-gray/50'}
                                        `}
                                    >
                                        {pop}
                                    </button>
                                ))}
                            </div>
                            </div>

                            {/* Season */}
                            <div>
                            <label className="block text-xs font-bold text-brand-brown/50 uppercase tracking-wider mb-2">Best Season</label>
                            <div className="grid grid-cols-4 gap-2">
                                {SEASONS.map(season => (
                                    <button
                                        key={season}
                                        onClick={() => toggleFilter(season, selectedSeasons, setSelectedSeasons)}
                                        className={`py-2 rounded-xl font-bold text-[10px] transition-all border-2 flex items-center justify-center
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
                            
                            {/* Region */}
                            <div>
                                <label className="block text-xs font-bold text-brand-brown/50 uppercase tracking-wider mb-2">Region</label>
                                <div className="flex flex-wrap gap-2">
                                    {REGIONS.map(region => (
                                        <button
                                            key={region}
                                            onClick={() => toggleFilter(region, selectedRegions, setSelectedRegions)}
                                            className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all border-2
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

                        {/* Footer Button */}
                        <div className="p-6 pt-0 mt-auto shrink-0">
                            <button 
                                onClick={() => generateRecommendations(false)}
                                className="w-full py-4 bg-brand-brown text-white rounded-2xl font-bold text-lg shadow-md hover:bg-brand-brown/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Icon name="search" className="w-5 h-5 stroke-[3]" />
                                Find Adventure
                            </button>
                        </div>
                    </div>

                    {/* Lucky Button */}
                    <button 
                        onClick={() => generateRecommendations(true)}
                        className="px-6 h-14 bg-brand-yellow text-brand-brown rounded-full shadow-lg border-4 border-white font-bold flex items-center gap-2 hover:bg-brand-yellowDark active:scale-95 transition-all shrink-0"
                    >
                        <Icon name="dice" className="w-6 h-6" />
                        <span>I'm Feeling Lucky</span>
                    </button>
                </motion.div>
            ) : (
                /* RESULT VIEW */
                <motion.div 
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-6 w-full h-full justify-center max-w-md z-10"
                >
                     {isAnimating ? (
                         <div className="flex flex-col items-center gap-4">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="w-16 h-16 border-4 border-brand-teal border-t-transparent rounded-full"
                            />
                            <p className="font-bold text-brand-brown/50 animate-pulse">Scouting locations...</p>
                         </div>
                     ) : currentPark ? (
                        <>
                             {/* Park Card (Swipeable) */}
                             <motion.div
                                key={currentPark.id}
                                initial={{ x: 50, opacity: 0, rotate: 5 }}
                                animate={{ x: 0, opacity: 1, rotate: 0 }}
                                exit={{ x: -50, opacity: 0, rotate: -5 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                className="relative w-full bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-white overflow-hidden flex flex-col h-full max-h-[520px] touch-pan-y cursor-grab active:cursor-grabbing"
                             >
                                 {/* Card Header */}
                                  <div className="bg-brand-cream/50 p-6 flex justify-center items-center relative overflow-hidden h-32 shrink-0">
                                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#7c6553 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
                                      <div className="text-7xl filter drop-shadow-md transform hover:scale-110 transition-transform duration-500 cursor-default select-none">
                                          {currentPark.emoji}
                                      </div>
                                      {/* Tags */}
                                      <div className="absolute top-4 right-4 flex gap-2">
                                          {isVisited && (
                                              <div className="bg-brand-green text-white px-2 py-1 rounded-full text-[10px] font-bold border border-white shadow-sm flex items-center gap-1">
                                                  <Icon name="check" className="w-3 h-3 stroke-[3]" />
                                              </div>
                                          )}
                                          <div className="bg-white/80 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-bold text-brand-brown border border-brand-brown/10">
                                              {currentPark.region}
                                          </div>
                                      </div>
                                 </div>

                                 <div className="p-6 text-center flex-1 flex flex-col overflow-y-auto pointer-events-auto">
                                     <h2 className="text-2xl font-bold text-brand-brown mb-1 leading-none">{currentPark.name}</h2>
                                     <div className="text-brand-brown/40 font-bold uppercase tracking-widest text-xs mb-4">{currentPark.state}</div>
                                     <p className="text-brand-brown/80 mb-4 leading-relaxed text-sm select-none">{currentPark.description}</p>
                                     <div className="flex justify-center gap-2 mb-6 flex-wrap">
                                         {currentPark.bestSeasons.map(s => (
                                             <span key={s} className="px-2 py-1 bg-brand-green/10 text-brand-greenDark rounded-full text-[10px] font-bold">{s}</span>
                                         ))}
                                     </div>
                                     <button 
                                        onClick={() => onParkSelect(currentPark.id)}
                                        className="mt-auto w-full py-4 bg-brand-brown text-white rounded-2xl font-bold text-lg shadow-md hover:bg-brand-brown/90 transition-colors shrink-0 flex items-center justify-center gap-2 active:scale-95 transition-all"
                                        onPointerDown={(e) => e.stopPropagation()} // Prevent drag starting on button
                                     >
                                         View Details
                                     </button>
                                 </div>

                                 {/* Internal Queue Nav (Arrows) - Adjusted Alignment */}
                                 {/* Top: 132px to align with park name text area */}
                                 <div className="absolute top-[132px] w-full flex justify-between px-2 pointer-events-none z-10">
                                      <button onClick={prevRecommendation} disabled={currentIndex === 0} className="pointer-events-auto w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-brand-brown disabled:opacity-0 transition-opacity hover:bg-brand-gray transform hover:scale-110 active:scale-90" onPointerDown={(e) => e.stopPropagation()}><Icon name="arrowLeft" className="w-4 h-4" /></button>
                                      <button onClick={nextRecommendation} disabled={currentIndex === recommendationQueue.length - 1} className="pointer-events-auto w-10 h-10 bg-brand-teal text-white rounded-xl shadow-md flex items-center justify-center disabled:opacity-0 transition-opacity hover:bg-brand-tealDark transform hover:scale-110 active:scale-90" onPointerDown={(e) => e.stopPropagation()}><Icon name="arrowRight" className="w-4 h-4" /></button>
                                 </div>
                             </motion.div>

                             {/* Bottom Controls */}
                             <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setShowResult(false)}
                                    className="w-14 h-14 bg-white rounded-full shadow-lg border-4 border-white text-brand-brown flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                                    title="Back to Filters"
                                >
                                    <Icon name="search" className="w-6 h-6 stroke-[3]" />
                                </button>
                                
                                <button 
                                    onClick={() => generateRecommendations(true)}
                                    className="px-6 h-14 bg-brand-yellow text-brand-brown rounded-full shadow-lg border-4 border-white font-bold flex items-center gap-2 hover:bg-brand-yellowDark active:scale-95 transition-all"
                                >
                                    <Icon name="dice" className="w-6 h-6" />
                                    <span>I'm Feeling Lucky</span>
                                </button>
                             </div>
                        </>
                     ) : (
                         <div className="text-center w-full max-w-sm">
                            <div className="bg-white/50 p-8 rounded-[2.5rem] border-4 border-white/50 shadow-sm backdrop-blur-sm">
                                <Icon name="map" className="w-16 h-16 mx-auto mb-4 text-brand-brown/60" />
                                <h3 className="text-xl font-bold text-brand-brown mb-2">No Matches</h3>
                                <p className="text-brand-brown/80 mb-6">No parks matched your specific criteria.</p>
                                <button onClick={() => setShowResult(false)} className="px-6 py-3 bg-brand-teal text-white rounded-full font-bold shadow-sm hover:bg-brand-tealDark transition-colors">Adjust Filters</button>
                            </div>
                         </div>
                     )}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default DiscoverView;
