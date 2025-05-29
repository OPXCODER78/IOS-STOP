import React from 'react';

const AlarmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    {/* Main clock body */}
    <circle cx="12" cy="13.5" r="6.5" /> {/* Adjusted cy and r for balance */}
    
    {/* Hands (approx 10 and 2/3 o'clock position) */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5L9.5 11.5" /> {/* Hand towards ~10 */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5L14.5 12" /> {/* Hand towards ~2:30 */}
    
    {/* Bells on top - simplified */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 6.5C7.5 5.11929 8.61929 4 10 4C11.3807 4 12.5 5.11929 12.5 6.5" transform="rotate(-15 10 5.25)" /> {/* Left bell */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.5C16.5 5.11929 15.3807 4 14 4C12.6193 4 11.5 5.11929 11.5 6.5" transform="rotate(15 14 5.25)" /> {/* Right bell */}

    {/* Top stems for bells connecting to body more visually */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 7L10.5 6.5" /> 
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 7L13.5 6.5" />

    {/* Feet at bottom */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 19.5L6.5 21.5" /> {/* Left foot */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 19.5L17.5 21.5" /> {/* Right foot */}
  </svg>
);

export default AlarmIcon;