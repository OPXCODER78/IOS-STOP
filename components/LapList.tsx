import React from 'react';
import { Lap } from '../types';
import { formatTime } from '../utils/timeFormatter';

interface LapListProps {
  laps: Lap[];
  isHistory?: boolean; // To slightly adjust styling for history view if needed
}

const LapList: React.FC<LapListProps> = ({ laps, isHistory = false }) => {
  if (laps.length === 0) {
    return null;
  }

  return (
    <div className={`w-full mt-2 text-sm sm:text-base font-sf ${isHistory ? 'rounded-xl overflow-hidden shadow-lg bg-slate-800/40 backdrop-blur-md border border-slate-700/30' : ''}`}>
      <ul className={`${isHistory ? 'divide-y divide-slate-700/30 rounded-xl' : 'overflow-hidden'}`}> {/* Adjusted divider and rounding for history */}
        {laps.map((lap, index) => (
          <li
            key={lap.id}
            className={`flex justify-between items-center py-3 px-3 sm:px-4 
                        ${!isHistory ? 'border-b border-gray-700/50 last:border-b-0 bg-gray-800/30 backdrop-blur-sm my-1 rounded-xl' : ''}
                        opacity-0 animate-lapEnter`}
            style={{ animationDelay: `${index * (isHistory ? 70 : 50)}ms` }} 
          >
            <span className={`text-gray-300 ${isHistory ? 'text-sm' : ''}`}>Lap {lap.id}</span>
            <span className={`text-white tabular-nums ${isHistory ? 'text-sm' : ''}`}>{formatTime(lap.lapTime)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LapList;