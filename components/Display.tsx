import React from 'react';
import { formatTime } from '../utils/timeFormatter';

interface DisplayProps {
  time: number; // in milliseconds
  large?: boolean;
}

const Display: React.FC<DisplayProps> = ({ time, large = false }) => {
  return (
    <div
      className={`font-sf text-white tabular-nums tracking-tight ${
        large ? 'text-7xl sm:text-8xl font-thin' : 'text-2xl sm:text-3xl font-normal' // Adjusted smaller size
      }`}
    >
      {formatTime(time)}
    </div>
  );
};

export default Display;
