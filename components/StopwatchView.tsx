import React, { useState, useEffect, useCallback, useRef } from 'react';
import Display from './Display';
import AnalogClock from './AnalogClock';
import Controls from './Controls';
import LapList from './LapList';
import { Lap } from '../types';

const STOPWATCH_HISTORY_KEY = 'stopwatchHistory';

const StopwatchView: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0); // in milliseconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [timeAtLastLapEvent, setTimeAtLastLapEvent] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - timeElapsed;
      timerRef.current = window.setInterval(() => {
        setTimeElapsed(Date.now() - startTimeRef.current);
      }, 10); // Update UI frequently for smoothness
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeElapsed]);

  const handleStartStop = useCallback(() => {
    setIsRunning(prevIsRunning => {
      if (!prevIsRunning && timeElapsed === 0) {
        setTimeAtLastLapEvent(0); 
      }
      return !prevIsRunning;
    });
  }, [timeElapsed]);

  const handleLapReset = useCallback(() => {
    if (isRunning) { // Lap
      const currentLapTime = timeElapsed - timeAtLastLapEvent;
      const newLap: Lap = {
        id: laps.length + 1,
        lapTime: currentLapTime,
        totalTime: timeElapsed,
      };
      setLaps(prevLaps => [newLap, ...prevLaps]);
      setTimeAtLastLapEvent(timeElapsed);
    } else { // Reset
      if (timeElapsed > 0) {
        try {
          const historyToSave = {
            totalTime: timeElapsed,
            laps: [...laps].reverse(), 
          };
          localStorage.setItem(STOPWATCH_HISTORY_KEY, JSON.stringify(historyToSave));
        } catch (error) {
          console.error("Failed to save stopwatch history:", error);
        }

        setTimeElapsed(0);
        setLaps([]);
        setTimeAtLastLapEvent(0);
      }
    }
  }, [isRunning, timeElapsed, laps, timeAtLastLapEvent]);

  return (
    <div className="flex flex-col items-center flex-grow pt-8 sm:pt-12">
      <div className="flex-shrink-0 w-full h-auto min-h-[220px] sm:min-h-[280px] md:min-h-[320px] flex items-center justify-center relative mb-6 sm:mb-8 px-4">
        {isRunning || timeElapsed > 0 ? (
          <AnalogClock time={timeElapsed}>
            <Display time={timeElapsed} large={false} />
          </AnalogClock>
        ) : (
          <Display time={timeElapsed} large={true} />
        )}
      </div>

      <div className="flex-shrink-0 w-full max-w-xs sm:max-w-sm px-4 py-4 sm:py-6">
        <Controls
          isRunning={isRunning}
          timeElapsed={timeElapsed}
          onStartStop={handleStartStop}
          onLapReset={handleLapReset}
        />
      </div>

      <div className="w-full max-w-xs sm:max-w-sm px-1 sm:px-2 pb-4">
        {laps.length > 0 && <div className="w-full border-t border-gray-700/50 mb-1 mx-2"></div>}
        <LapList laps={laps} />
      </div>
    </div>
  );
};

export default StopwatchView;