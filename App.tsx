import React, { useState, useCallback } from 'react';
import StopwatchView from './components/StopwatchView';
import SettingsView from './components/SettingsView';
import AlarmView from './components/AlarmView'; // Import new view
import Navigation from './components/Navigation';

export type ActiveView = 'stopwatch' | 'alarm' | 'settings'; // Added 'alarm'

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('stopwatch');

  const renderView = () => {
    switch (activeView) {
      case 'stopwatch':
        return <StopwatchView />;
      case 'alarm': 
        return <AlarmView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <StopwatchView />;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sf select-none h-screen overflow-hidden">
      {/* Scrollable content area for the current view */}
      {/* Apply animation to views. key prop ensures animation runs on view change. */}
      <div className="flex-grow flex flex-col overflow-y-auto smooth-scroll relative">
        <div key={activeView} className="animate-fadeInView flex-grow flex flex-col">
          {renderView()}
        </div>
      </div>
      
      {/* Navigation Bar */}
      <Navigation activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default App;