
import React from 'react';

const MpesaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="80" height="40" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="120" height="60" rx="8" fill="#E20000"/>
        <text x="60" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">
            M-Pesa
        </text>
    </svg>
);

export default MpesaIcon;
