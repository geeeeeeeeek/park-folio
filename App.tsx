
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
    { id: 'BADGES', icon: 'medal', label: 'Collection' },
    { id: 'LOGS', icon: 'journal', label: 'Logs' },
  ];

  return (
    <div className="relative flex flex-col h-screen w-full bg-brand-beige overflow-hidden font-sans text-brand-black selection:bg-brand-yellow selection:text-brand-black">
      
      {/* Header - Seamless Design */}
      <header className="z-30 px-6 py-4 flex items-center justify-between shrink-0">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-full border-3 border-brand-black overflow-hidden shadow-hard-sm bg-brand-white group hover:scale-105 transition-transform duration-300">
             <img 
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3mVNFOLWoB-Od1SoeZPaPvwhrjccv7Ku_Q_ZUQORtw&s=10" 
               alt="ParkFolio Logo" 
               className="w-full h-full object-cover"
             />
           </div>
           <h1 className="hidden md:block font-serif font-bold text-3xl tracking-tight text-brand-black">
             ParkFolio
           </h1>
        </div>

        {/* Navigation - Floating Dock Style */}
        <nav className="bg-brand-white/50 backdrop-blur-md border-2 border-brand-black rounded-full p-1.5 shadow-hard-sm flex gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ViewState)}
                className={`
                  relative flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300
                  ${isActive 
                    ? 'bg-brand-black text-brand-yellow shadow-sm translate-y-0' 
                    : 'text-brand-black hover:bg-brand-black/5 hover:text-brand-green bg-transparent'}
                `}
              >
                <Icon name={item.icon} className={`w-4 h-4 ${isActive ? 'text-brand-yellow' : 'currentColor'}`} />
                <span className="hidden sm:block">{item.label}</span>
              </button>
            );
          })}
        </nav>

         {/* Spacer to balance the layout on desktop */}
         <div className="w-12 hidden md:block" />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
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

          {currentView === 'BADGES' && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full overflow-y-auto"
            >
              <BadgeView visits={USER_LOGS} parks={PARKS} />
            </motion.div>
          )}

          {currentView === 'LOGS' && (
            <motion.div
               key="logs"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
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
