
import React from 'react';

const CardChipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="38"
    viewBox="0 0 48 38"
    fill="none"
    {...props}
  >
    <rect width="48" height="38" rx="6" fill="#D1D5DB" />
    <path
      d="M24 0V38"
      stroke="#9CA3AF"
      strokeWidth="2"
    />
    <path
      d="M12 10V28"
      stroke="#9CA3AF"
      strokeWidth="2"
    />
     <path
      d="M36 10V28"
      stroke="#9CA3AF"
      strokeWidth="2"
    />
    <path
      d="M0 19H48"
      stroke="#9CA3AF"
      strokeWidth="2"
    />
    <path
      d="M12 10H36"
      stroke="#9CA3AF"
      strokeWidth="2"
    />
     <path
      d="M12 28H36"
      stroke="#9CA3AF"
      strokeWidth="2"
    />
  </svg>
);

export default CardChipIcon;
