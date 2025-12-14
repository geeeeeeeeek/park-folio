
import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PARKS, USER_LOGS } from './constants';
import { NationalPark, ViewState } from './types';
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

  return (
    <div className="relative flex flex-col h-screen w-full bg-earth-100 overflow-hidden text-stone-900 font-sans">
      
      {/* Minimal Header */}
      <header className="z-20 px-8 py-6 flex items-center justify-between border-b border-earth-300/50 bg-earth-100/95 backdrop-blur-sm">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setCurrentView('MAP')}>
          <div className="text-forest-700">
             <Icon name="tree" className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif text-stone-900 tracking-tight group-hover:text-forest-700 transition-colors">ParkFolio.</h1>
        </div>
        
        <nav className="flex items-center space-x-8">
          {(['MAP', 'BADGES', 'LOGS'] as ViewState[]).map((view) => (
            <button
              key={view}
              onClick={() => {
                setCurrentView(view);
                setSelectedParkId(null);
              }}
              className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 relative ${
                currentView === view
                  ? 'text-forest-700'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              {view}
              {currentView === view && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-forest-700"
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-earth-50">
        <AnimatePresence mode="wait">
          {currentView === 'MAP' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
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
              transition={{ duration: 0.4, ease: "easeOut" }}
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
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full overflow-y-auto"
            >
              <LogsView 
                parks={PARKS} 
                visits={USER_LOGS} 
                onParkSelect={(id) => {
                  setSelectedParkId(id);
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sidebar Overlay */}
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
