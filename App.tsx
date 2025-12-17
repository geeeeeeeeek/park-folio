
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PARKS } from './constants';
import { USER_LOGS } from './userData';
import { ViewState } from './types';
import { Icon } from './icons';

// Component Imports
import MapView from './components/MapView';
import BadgeView from './components/BadgeView';
import LogsView from './components/LogsView';
import ParkDetails from './components/ParkDetails';
import DiscoverView from './components/DiscoverView';

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>('MAP');
  const [selectedParkId, setSelectedParkId] = useState<string | null>(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Mobile Detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchActive && 
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
        setSearchQuery('');
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchActive]);

  const selectedPark = useMemo(() => 
    PARKS.find(p => p.id === selectedParkId) || null, 
  [selectedParkId]);

  const userVisit = useMemo(() => 
    USER_LOGS.find(v => v.parkId === selectedParkId), 
  [selectedParkId]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return PARKS.filter(p => p.name.toLowerCase().includes(q)).slice(0, 5);
  }, [searchQuery]);

  const navItems = [
    { id: 'MAP', icon: 'map', label: 'Map' },
    { id: 'DISCOVER', icon: 'dice', label: 'Discover' },
    { id: 'BADGES', icon: 'medal', label: 'Collections' },
    { id: 'LOGS', icon: 'journal', label: 'Logs' },
  ];

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden font-sans text-brand-brown bg-brand-cream">
      
      {/* Header */}
      <header className="z-30 px-4 md:px-8 pt-6 pb-2 flex items-center justify-between shrink-0 pointer-events-none max-w-7xl mx-auto w-full gap-4 relative">
        
        {/* Merged Logo & Search Chip */}
        <motion.div 
            ref={searchContainerRef}
            layout
            className={`
                pointer-events-auto bg-brand-navBtn rounded-full p-2 shadow-soft border-[4px] border-white 
                flex items-center gap-2 transition-colors duration-300 relative z-50 h-16 box-border overflow-visible cursor-pointer
                ${isSearchActive ? 'ring-4 ring-brand-teal/20 cursor-text' : 'hover:scale-105'}
            `}
            onHoverStart={() => !isSearchActive && setIsHovered(true)}
            onHoverEnd={() => !isSearchActive && setIsHovered(false)}
            onClick={() => {
                if (!isSearchActive) {
                    setIsSearchActive(true);
                    setIsHovered(false);
                }
            }}
            animate={{
                width: isSearchActive ? (isMobile ? '100%' : 360) : 'auto'
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
            }}
        >
           <AnimatePresence mode="wait">
               {/* Icon Section: Swaps between Logo and Search Icon */}
               {(isHovered || isSearchActive) ? (
                    <motion.div
                        key="search-icon"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center shrink-0"
                    >
                        <Icon name="search" className="w-6 h-6 text-brand-brown/60" />
                    </motion.div>
               ) : (
                    <motion.div
                        key="logo-img"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="w-12 h-12 rounded-full bg-brand-orange overflow-hidden shadow-inner border-2 border-white shrink-0"
                    >
                        <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3mVNFOLWoB-Od1SoeZPaPvwhrjccv7Ku_Q_ZUQORtw&s=10" 
                        alt="Logo" 
                        className="w-full h-full object-cover"
                        />
                    </motion.div>
               )}
           </AnimatePresence>

           <AnimatePresence mode="wait">
               {/* Content Section: Swaps between Title, Hover Text, and Input */}
               {isSearchActive ? (
                   <motion.div
                        key="input-field"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex items-center min-w-0 pr-2"
                   >
                        <input 
                            ref={(el) => {
                                searchInputRef.current = el;
                                if (el) {
                                    setTimeout(() => el.focus(), 50);
                                }
                            }}
                            autoFocus
                            type="text"
                            placeholder="Find a park..."
                            className="bg-transparent border-none outline-none text-brand-brown placeholder-brand-brown/40 text-lg font-bold w-full h-full min-w-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsSearchActive(false);
                                setSearchQuery('');
                            }}
                            className="ml-2 w-8 h-8 rounded-full flex items-center justify-center text-brand-brown/40 hover:text-brand-orange hover:bg-brand-brown/5 transition-all shrink-0"
                        >
                            <Icon name="x" className="w-5 h-5" />
                        </button>
                   </motion.div>
               ) : (isHovered && !isMobile) ? (
                    <motion.div
                        key="hover-text"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="pr-4 whitespace-nowrap overflow-hidden"
                    >
                        <span className="font-bold text-lg text-brand-brown/80 tracking-wide">Search Parks</span>
                    </motion.div>
               ) : (
                   <motion.div 
                        key="brand-text"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="hidden md:flex flex-col justify-center pr-4 whitespace-nowrap overflow-hidden"
                   >
                        <h1 className="font-bold text-lg md:text-xl text-brand-brown tracking-wide leading-none">
                        ParkFolio
                        </h1>
                        <span className="text-[10px] font-bold text-brand-brown/50 uppercase tracking-widest leading-none mt-1">
                        Travel Tracker
                        </span>
                   </motion.div>
               )}
           </AnimatePresence>

            {/* Results Dropdown - Attached to this component now */}
            <AnimatePresence>
                {isSearchActive && searchResults.length > 0 && searchQuery && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 20, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 w-full bg-white rounded-3xl shadow-xl border-[4px] border-brand-cream overflow-hidden py-2 z-50 min-w-[280px]"
                     >
                         {searchResults.map(park => (
                             <button
                                key={park.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedParkId(park.id);
                                    setSearchQuery('');
                                    setIsSearchActive(false);
                                }}
                                className="w-full text-left px-5 py-3 hover:bg-brand-cream/30 flex items-center gap-3 transition-colors group/item"
                             >
                                 <div className="w-10 h-10 rounded-full bg-brand-cream/50 flex items-center justify-center text-xl shadow-sm border-2 border-white group-hover/item:scale-110 transition-transform">
                                    {park.emoji}
                                 </div>
                                 <div>
                                     <div className="font-bold text-brand-brown leading-none">{park.name}</div>
                                     <div className="text-[10px] uppercase font-bold text-brand-brown/40 mt-1">{park.state}</div>
                                 </div>
                             </button>
                         ))}
                     </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

        {/* Spacer to push Nav Dock to the right (Hidden on mobile search) */}
        <div className={`flex-1 ${isSearchActive && isMobile ? 'hidden' : 'block'}`} />

        {/* Nav Dock (Hidden on mobile search) */}
        <nav className={`pointer-events-auto bg-brand-navBtn rounded-full p-2 shadow-soft border-[4px] border-white items-center gap-2 shrink-0 h-16 box-border z-40 ${isSearchActive && isMobile ? 'hidden' : 'flex'}`}>
            {navItems.map((item) => {
                const isActive = currentView === item.id;
                
                return (
                    <motion.button
                        key={item.id}
                        layout
                        onClick={() => setCurrentView(item.id as ViewState)}
                        className={`
                        relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                        ${isActive 
                            ? 'bg-brand-orange text-white shadow-md scale-105' 
                            : 'text-brand-brown/40 hover:bg-brand-brown/5 hover:text-brand-brown/70'}
                        `}
                        title={item.label}
                    >
                        <div className="w-12 h-12 flex items-center justify-center shrink-0">
                            <Icon 
                                name={item.icon} 
                                className={`w-6 h-6 stroke-[2.5px]`} 
                            />
                        </div>
                        
                        {isActive && (
                            <motion.div
                                layoutId="active-dot"
                                className="absolute -bottom-1 w-1 h-1 bg-brand-brown/20 rounded-full"
                            />
                        )}
                    </motion.button>
                );
            })}
        </nav>
      </header>

      {/* Main Content Area - Full screen, no frame */}
      <main className="flex-1 relative overflow-hidden w-full">
            <AnimatePresence mode="wait">
            {currentView === 'MAP' && (
                <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full absolute inset-0"
                >
                <MapView 
                    parks={PARKS} 
                    visits={USER_LOGS} 
                    onParkSelect={setSelectedParkId} 
                />
                </motion.div>
            )}

            {currentView === 'DISCOVER' && (
                <motion.div
                key="discover"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full h-full"
                >
                <DiscoverView 
                    parks={PARKS} 
                    visits={USER_LOGS} 
                    onParkSelect={setSelectedParkId} 
                />
                </motion.div>
            )}

            {currentView === 'BADGES' && (
                <motion.div
                key="badges"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full h-full overflow-y-auto"
                >
                <BadgeView 
                    visits={USER_LOGS} 
                    parks={PARKS} 
                    onParkSelect={setSelectedParkId}
                />
                </motion.div>
            )}

            {currentView === 'LOGS' && (
                <motion.div
                key="logs"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="w-full h-full overflow-y-auto"
                >
                <LogsView 
                    parks={PARKS} 
                    visits={USER_LOGS} 
                    onParkSelect={setSelectedParkId} 
                />
                </motion.div>
            )}
            </AnimatePresence>
      </main>

      {/* Park Details Modal Overlay */}
      <AnimatePresence>
        {selectedPark && (
          <ParkDetails 
            park={selectedPark} 
            visit={userVisit} 
            onClose={() => setSelectedParkId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
