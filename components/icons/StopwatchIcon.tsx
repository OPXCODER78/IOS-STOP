import React from 'react';

const StopwatchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3V1.5M16.5 4.5L17.6 3.4M21 12h1.5M16.5 19.5l1.1 1.1M12 21v1.5M7.5 19.5l-1.1 1.1M3 12H1.5M7.5 4.5L6.4 3.4"
    />
  </svg>
);

export default StopwatchIcon;
