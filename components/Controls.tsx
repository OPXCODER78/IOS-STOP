import React from 'react';

interface ControlsProps {
  isRunning: boolean;
  timeElapsed: number;
  onStartStop: () => void;
  onLapReset: () => void;
}

const ControlButton: React.FC<{
  onClick: () => void;
  label: string;
  baseBgColorClass: string; // e.g., bg-gray-700
  textColorClass: string;
  activeBgColorClass: string; // e.g., active:bg-gray-600
  disabled?: boolean;
}> = ({ onClick, label, baseBgColorClass, textColorClass, activeBgColorClass, disabled }) => {
  const glassEffectClasses = `bg-opacity-40 backdrop-blur-md border border-white/10 shadow-lg`;
  const disabledClasses = `bg-opacity-30 backdrop-blur-sm border-white/5 text-gray-500 cursor-not-allowed`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-sf w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-base sm:text-lg font-medium focus:outline-none transition-all duration-200
                  ${disabled ? `${baseBgColorClass} ${disabledClasses}` : `${baseBgColorClass} ${textColorClass} ${activeBgColorClass} ${glassEffectClasses} hover:bg-opacity-60`}
                  `}
    >
      {label}
    </button>
  );
};

const Controls: React.FC<ControlsProps> = ({ isRunning, timeElapsed, onStartStop, onLapReset }) => {
  const lapResetButtonDisabled = !isRunning && timeElapsed === 0;

  let lapResetBaseBgColor = 'bg-gray-700'; 
  let lapResetTextColor = 'text-white';
  let lapResetActiveBg = 'active:bg-gray-600';

  if (isRunning) { // Lap button
    // Standard active lap button style
  } else if (timeElapsed > 0) { // Reset button
    // Standard reset button style
  } else { // Initial, disabled-like Lap button
    lapResetBaseBgColor = 'bg-gray-800'; 
    lapResetTextColor = 'text-gray-500'; // Will be overridden by disabled style if button is truly disabled
  }
  
  const startStopBaseBgColor = isRunning ? 'bg-red-800' : 'bg-green-700'; 
  const startStopTextColor = isRunning ? 'text-red-300' : 'text-green-300'; 
  const startStopActiveBg = isRunning ? 'active:bg-red-700' : 'active:bg-green-600';


  return (
    <div className="w-full flex justify-between items-center px-1 sm:px-2">
      <ControlButton
        onClick={onLapReset}
        label={isRunning || timeElapsed === 0 ? 'Lap' : 'Reset'}
        baseBgColorClass={lapResetBaseBgColor}
        textColorClass={lapResetTextColor}
        activeBgColorClass={lapResetActiveBg}
        disabled={lapResetButtonDisabled}
      />
      <ControlButton
        onClick={onStartStop}
        label={isRunning ? 'Stop' : 'Start'}
        baseBgColorClass={startStopBaseBgColor}
        textColorClass={startStopTextColor}
        activeBgColorClass={startStopActiveBg}
      />
    </div>
  );
};

export default Controls;