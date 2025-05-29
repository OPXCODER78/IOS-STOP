import React from 'react';

interface AnalogClockProps {
  time: number; // in milliseconds
  children: React.ReactNode; // To render digital display in the center
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time, children }) => {
  const totalSecondsWithFraction = time / 1000;
  const secondHandRotation = (totalSecondsWithFraction / 60) * 360;

  return (
    <div className="relative w-56 h-56 sm:w-60 sm:h-60 md:w-64 md:h-64"> {/* Slightly smaller base, adjust as needed */}
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Clock Face with Glassmorphism */}
        <circle 
          cx="100" 
          cy="100" 
          r="98" 
          className="fill-gray-800/60 backdrop-blur-md stroke-gray-700/50" // Glass effect
          strokeWidth="1" 
        />

        {/* Tick Marks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const isMajorTick = i % 5 === 0;
          const angle = i * 6;
          const tickLengthInner = isMajorTick ? 90 : 93;
          const tickWidth = isMajorTick ? 1.25 : 0.75;
          const color = isMajorTick ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)";
          
          const x1 = 100 + tickLengthInner * Math.cos((angle - 90) * Math.PI / 180);
          const y1 = 100 + tickLengthInner * Math.sin((angle - 90) * Math.PI / 180);
          
          if(isMajorTick){
             return (
                <line
                  key={`tick-${i}`}
                  x1={100 + 85 * Math.cos((angle - 90) * Math.PI / 180)}
                  y1={100 + 85 * Math.sin((angle - 90) * Math.PI / 180)}
                  x2={100 + 95 * Math.cos((angle - 90) * Math.PI / 180)} 
                  y2={100 + 95 * Math.sin((angle - 90) * Math.PI / 180)}
                  stroke={color}
                  strokeWidth={tickWidth}
                />
              );
          }
          return ( // Minor ticks as small circles
            <circle key={`tick-${i}`} cx={x1} cy={y1} r={tickWidth/1.5} fill={color} />
          );
        })}
        
        {/* Major Tick Numbers (60, 15, 30, 45) */}
        {[0, 15, 30, 45].map((numValue) => {
            const angle = numValue * 6; 
            const displayedNum = numValue === 0 ? 60 : numValue;
            const x = 100 + 78 * Math.cos((angle - 90) * Math.PI / 180);
            const y = 100 + 78 * Math.sin((angle - 90) * Math.PI / 180) + 1; 
            return (
                <text key={`num-${numValue}`} x={x} y={y} fontSize="9" fill="rgba(255,255,255,0.7)" textAnchor="middle" dominantBaseline="middle" className="font-sf font-semibold">
                    {displayedNum}
                </text>
            );
        })}

        {/* Static Red Hand (tip) - always points to 12 */}
         <line
            x1="100"
            y1="18" 
            x2="100"
            y2="25" 
            stroke="#FF453A" 
            strokeWidth="2"
            strokeLinecap="round"
        />

        {/* Second Hand (Yellow) */}
        <g transform={`rotate(${secondHandRotation} 100 100)`}>
          <line
            x1="100"
            y1="100" 
            x2="100"
            y2="22" 
            stroke="#FFD60A" 
            strokeWidth="2"
            strokeLinecap="round"
          />
           <circle cx="100" cy="100" r="4.5" className="fill-gray-800/60 stroke-yellow-400" strokeWidth="1" /> {/* Adjusted center pivot with glass effect */}
        </g>
        
        {/* Center dot - like iOS */}
        <circle cx="100" cy="100" r="2.5" fill="#FFD60A" />

      </svg>
      {/* Digital display overlaid */}
      <div className="absolute inset-0 flex items-center justify-center pt-10">
        {children}
      </div>
    </div>
  );
};

export default AnalogClock;