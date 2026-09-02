import React from 'react';

interface SnappyLogoProps {
  size?: number;
  className?: string;
}

export const SnappyLogo: React.FC<SnappyLogoProps> = ({ size = 36, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        {/* Soft Blue-Purple Gradient Background */}
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C9AFF" />
          <stop offset="45%" stopColor="#5D80FF" />
          <stop offset="100%" stopColor="#5073F6" />
        </linearGradient>

        {/* Paper Shadow */}
        <filter id="paper-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#1e3a8a" floodOpacity="0.22" />
        </filter>

        <filter id="card-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1e3a8a" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* Main squircle background with soft blue-purple gradient */}
      <rect width="512" height="512" rx="120" fill="url(#bg-grad)" />

      {/* Group of Stacked Clipboard Sheets */}
      <g filter="url(#paper-shadow)">
        {/* Bottom / Leftmost rotated sheet */}
        <rect
          x="100"
          y="180"
          width="190"
          height="240"
          rx="32"
          fill="#FFFFFF"
          fillOpacity="0.75"
          transform="rotate(-16 100 180)"
        />

        {/* Middle sheet */}
        <rect
          x="132"
          y="136"
          width="200"
          height="250"
          rx="32"
          fill="#FFFFFF"
          fillOpacity="0.88"
          transform="rotate(-8 132 136)"
        />

        {/* Top / Main Clipboard sheet */}
        <g filter="url(#card-shadow)">
          <rect
            x="184"
            y="96"
            width="220"
            height="256"
            rx="36"
            fill="#FFFFFF"
          />

          {/* Top Clipboard Clip */}
          <rect
            x="254"
            y="80"
            width="80"
            height="50"
            rx="14"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="3"
          />
          {/* Top Clip center rivet hole */}
          <circle cx="294" cy="102" r="11" fill="#6366F1" fillOpacity="0.85" />

          {/* Minimal Document Content Lines on the top paper */}
          <rect x="222" y="172" width="144" height="13" rx="6.5" fill="#E2E8F0" />
          <rect x="222" y="208" width="92" height="13" rx="6.5" fill="#E2E8F0" />
          <rect x="332" y="300" width="34" height="12" rx="6" fill="#E2E8F0" />
        </g>
      </g>
    </svg>
  );
};
