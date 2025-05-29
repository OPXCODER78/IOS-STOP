import React from 'react';

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321l5.518.426a.563.563 0 01.31.96l-4.052 3.576a.563.563 0 00-.162.533l1.22 5.247a.563.563 0 01-.828.616l-4.673-2.825a.563.563 0 00-.652 0l-4.673 2.825a.563.563 0 01-.828-.616l1.22-5.247a.563.563 0 00-.162-.533L2.56 10.317a.563.563 0 01.31-.96l5.518-.426a.563.563 0 00.475-.321L11.48 3.5z"
    />
  </svg>
);

export default StarIcon;
