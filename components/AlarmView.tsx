import React, { useState, useEffect } from 'react';
import { Lap } from '../types';
import { formatTime } from '../utils/timeFormatter';
import LapList from './LapList'; // Import the LapList component

const STOPWATCH_HISTORY_KEY = 'stopwatchHistory';

interface StopwatchHistory {
  totalTime: number;
  laps: Lap[];
}

const AlarmView: React.FC = () => {
  const [history, setHistory] = useState<StopwatchHistory | null>(null);
  const [showLapsList, setShowLapsList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedHistory = localStorage.getItem(STOPWATCH_HISTORY_KEY);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory) as StopwatchHistory;
        setHistory(parsedHistory);
      } else {
        setHistory(null);
      }
    } catch (error) {
      console.error("Failed to load or parse stopwatch history:", error);
      setHistory(null);
    }
    setIsLoading(false);
  }, []);

  const toggleShowLaps = () => {
    setShowLapsList(prev => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <p className="text-gray-400">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col items-center p-4 sm:p-6 text-center">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-8">Stopwatch History</h1>

      {!history ? (
        <div className="flex flex-col items-center justify-center text-center p-4 mt-8 bg-slate-800/40 backdrop-blur-md border border-slate-700/30 rounded-2xl shadow-xl">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-20 h-20 text-gray-500 mb-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3V1.5M16.5 4.5L17.6 3.4M21 12h1.5M16.5 19.5l1.1 1.1M12 21v1.5M7.5 19.5l-1.1 1.1M3 12H1.5M7.5 4.5L6.4 3.4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 9.879L14.12 14.12M14.12 9.879L9.879 14.12" transform="scale(0.5) translate(12 12)"/>
          </svg>
          <p className="text-gray-300 text-xl">No stopwatch history found.</p>
          <p className="mt-2 text-sm text-gray-400">Run the stopwatch and press Reset to save a session.</p>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/40 p-5 rounded-2xl shadow-2xl mb-8">
            <p className="text-sm text-gray-300">Last Run Duration:</p>
            <p className="text-4xl sm:text-5xl font-medium text-orange-400 tabular-nums tracking-tight mt-1">
              {formatTime(history.totalTime)}
            </p>
          </div>

          {history.laps && history.laps.length > 0 && (
            <>
              <button
                onClick={toggleShowLaps}
                className="w-full bg-gray-700/60 hover:bg-gray-600/70 backdrop-blur-md border border-gray-500/50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-60 mb-4 shadow-lg"
                aria-expanded={showLapsList}
              >
                {showLapsList ? 'Hide Laps' : `Show Laps (${history.laps.length})`}
                <span className={`inline-block ml-2 transform transition-transform duration-300 ${showLapsList ? 'rotate-180' : 'rotate-0'}`}>▼</span>
              </button>

              <div 
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${showLapsList ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <LapList laps={history.laps} isHistory={true} />
              </div>
            </>
          )}
           {history.laps && history.laps.length === 0 && (
             <p className="text-gray-400 mt-6 bg-slate-800/40 backdrop-blur-md border border-slate-700/30 p-4 rounded-xl shadow-md">No laps were recorded in this session.</p>
           )}
        </div>
      )}
    </div>
  );
};

export default AlarmView;