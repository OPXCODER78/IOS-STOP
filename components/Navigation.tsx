import React from 'react';
import { ActiveView } from '../App'; 
import StopwatchIcon from './icons/StopwatchIcon';
import AlarmIcon from './icons/AlarmIcon';
// Removed: import SettingsIcon from './icons/SettingsIcon';

interface NavigationProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const NavItem: React.FC<{
  icon: React.ReactElement<{ className?: string, alt?: string, style?: React.CSSProperties }>; // Allow alt and style prop
  label: string; 
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeColor = 'text-orange-400'; 
  const inactiveColor = 'text-gray-400'; 

  // const iconStyle = label === 'Settings' ? { border: '2px solid red' } : {}; // Removed temp border
  const mergedIcon = React.cloneElement(icon, { 
    className: `w-7 h-7 sm:w-8 sm:h-8 ${isActive ? 'transform scale-110' : ''} transition-transform duration-200`,
    style: { ...icon.props.style } // Removed merge with iconStyle
  });

  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      className={`flex flex-col items-center justify-center flex-1 py-2 focus:outline-none transition-colors duration-200 ${
        isActive ? activeColor : inactiveColor
      } hover:text-gray-200`}
    >
      {mergedIcon}
      {/* <span className={`mt-1 text-xs ${isActive ? 'font-semibold text-orange-400' : 'text-gray-500'}`}>{label}</span> */}
    </button>
  );
};

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="w-full bg-gray-900/70 backdrop-blur-lg border-t border-gray-700/50 flex-shrink-0 shadow-2xl rounded-t-2xl">
      <div className="max-w-md mx-auto flex justify-around items-center h-14">
        <NavItem
          icon={<StopwatchIcon />}
          label="Stopwatch"
          isActive={activeView === 'stopwatch'}
          onClick={() => setActiveView('stopwatch')}
        />
        <NavItem
          icon={<AlarmIcon />}
          label="History" // Note: Previously "Alarm", consider if "History" is more accurate for AlarmView
          isActive={activeView === 'alarm'}
          onClick={() => setActiveView('alarm')}
        />
        <NavItem
          icon={<img src="/settings.svg" alt="Settings" />}
          label="Settings"
          isActive={activeView === 'settings'}
          onClick={() => setActiveView('settings')}
        />
      </div>
    </nav>
  );
};

export default Navigation;