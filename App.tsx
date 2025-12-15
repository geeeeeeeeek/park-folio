
import React, { useState, useMemo } from 'react';
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

  const selectedPark = useMemo(() => 
    PARKS.find(p => p.id === selectedParkId) || null, 
  [selectedParkId]);

  const userVisit = useMemo(() => 
    USER_LOGS.find(v => v.parkId === selectedParkId), 
  [selectedParkId]);

  const navItems = [
    { id: 'MAP', icon: 'map', label: 'Map' },
    { id: 'DISCOVER', icon: 'dice', label: 'Discover' },
    { id: 'BADGES', icon: 'medal', label: 'Collections' },
    { id: 'LOGS', icon: 'journal', label: 'Logs' },
  ];

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden font-sans text-brand-brown bg-brand-cream">
      
      {/* Header */}
      <header className="z-30 px-4 md:px-8 pt-6 pb-2 flex items-center justify-between shrink-0 pointer-events-none max-w-7xl mx-auto w-full">
        
        {/* Logo Chip */}
        <div className="pointer-events-auto bg-brand-navBtn rounded-full p-2 pr-2 md:pr-6 shadow-soft border-[4px] border-white flex items-center gap-4 transition-transform hover:scale-105 select-none">
           <div className="w-12 h-12 rounded-full bg-brand-orange overflow-hidden shadow-inner border-2 border-white shrink-0">
             <img 
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3mVNFOLWoB-Od1SoeZPaPvwhrjccv7Ku_Q_ZUQORtw&s=10" 
               alt="Logo" 
               className="w-full h-full object-cover"
             />
           </div>
           <div className="hidden md:flex flex-col justify-center">
             <h1 className="font-bold text-lg md:text-xl text-brand-brown tracking-wide leading-none">
               ParkFolio
             </h1>
             <span className="text-[10px] font-bold text-brand-brown/50 uppercase tracking-widest leading-none mt-1">
               Travel Tracker
             </span>
           </div>
        </div>

        {/* Nav Dock */}
        <nav className="pointer-events-auto bg-brand-navBtn rounded-full p-2 shadow-soft border-[4px] border-white flex items-center gap-2">
            {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id as ViewState)}
                        className={`
                        relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                        ${isActive 
                            ? 'bg-brand-orange text-white shadow-md scale-105' 
                            : 'text-brand-brown/40 hover:bg-brand-brown/5 hover:text-brand-brown/70'}
                        `}
                        title={item.label}
                    >
                        <Icon 
                            name={item.icon} 
                            className={`w-6 h-6 stroke-[2.5px]`} 
                        />
                        {isActive && (
                            <motion.div
                                layoutId="active-dot"
                                className="absolute -bottom-1 w-1 h-1 bg-brand-brown/20 rounded-full"
                            />
                        )}
                    </button>
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
                <BadgeView visits={USER_LOGS} parks={PARKS} />
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
