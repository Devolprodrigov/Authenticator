import React from 'react';

interface RRVLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'emblem' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightText?: boolean;
}

export default function RRVLogo({ 
  className = '', 
  variant = 'horizontal', 
  size = 'md',
  lightText = false 
}: RRVLogoProps) {
  
  // Size mapping
  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const navyColor = '#162e5b';
  const limeColor = '#80b833';

  // SVG Emblem of the Gear + RRV + Green Checkmark
  const Emblem = ({ customSize }: { customSize?: string }) => (
    <svg
      viewBox="0 0 200 200"
      className={`${customSize || emblemSizes[size]} shrink-0 transition-transform duration-200`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Industrial Gear Outer Contour */}
      <g>
        {/* Gear Outer Teeth (8 symmetrical industrial cogs) */}
        <path
          d="
            M 85,25 L 115,25 L 117,45 A 60 60 0 0 1 142,55 L 158,41 L 179,62 L 165,78 A 60 60 0 0 1 175,103 L 195,105 L 195,135 L 175,137 A 60 60 0 0 1 165,162 L 179,178 L 158,199 L 142,185 A 60 60 0 0 1 117,195 L 115,215 L 85,215 L 83,195 A 60 60 0 0 1 58,185 L 42,199 L 21,178 L 35,162 A 60 60 0 0 1 25,137 L 5,135 L 5,105 L 25,103 A 60 60 0 0 1 35,78 L 21,62 L 42,41 L 58,55 A 60 60 0 0 1 83,45 Z
          "
          transform="translate(0, -20) scale(0.9) translate(11, 20)"
          fill={navyColor}
        />
        
        {/* Inner Gear Circle Cutout */}
        <circle cx="100" cy="98" r="48" fill="#ffffff" />

        {/* Stylized RR Letters in Navy */}
        {/* First R */}
        <path
          d="M 52,78 L 76,78 C 84,78 89,82 89,89 C 89,95 85,99 78,100 L 90,118 L 78,118 L 67,102 L 62,102 L 62,118 L 52,118 Z M 62,86 L 62,94 L 74,94 C 77,94 80,92 80,89 C 80,87 77,86 74,86 Z"
          fill={navyColor}
        />

        {/* Second R */}
        <path
          d="M 83,78 L 107,78 C 115,78 120,82 120,89 C 120,95 116,99 109,100 L 121,118 L 109,118 L 98,102 L 93,102 L 93,118 L 83,118 Z M 93,86 L 93,94 L 105,94 C 108,94 111,92 111,89 C 111,87 108,86 105,86 Z"
          fill={navyColor}
        />

        {/* Navy Left Stem of V */}
        <path
          d="M 122,78 L 132,78 L 144,106 L 138,116 Z"
          fill={navyColor}
        />

        {/* Dynamic Vibrant Green Checkmark (Visto de Segurança) */}
        <path
          d="M 112,107 L 137,137 L 182,46 L 170,38 L 135,116 L 124,97 Z"
          fill={limeColor}
        />
      </g>
    </svg>
  );

  if (variant === 'emblem') {
    return <Emblem customSize={className} />;
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <Emblem customSize={size === 'xl' ? 'w-32 h-32' : 'w-24 h-24'} />
        <div className="mt-3">
          <h2 className={`font-bold tracking-tight leading-tight ${lightText ? 'text-white' : 'text-[#162e5b]'} ${
            size === 'xl' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}>
            RRV Consultoria em
          </h2>
          <p className={`font-extrabold tracking-tight ${lightText ? 'text-lime-300' : 'text-[#162e5b]'} ${
            size === 'xl' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}>
            Segurança do Trabalho
          </p>
        </div>
      </div>
    );
  }

  // Horizontal Header Variant (most common in headers and toolbars)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Emblem />
      <div className="leading-tight">
        <span className={`block text-xs sm:text-sm font-bold tracking-tight ${lightText ? 'text-slate-100' : 'text-[#162e5b]'}`}>
          RRV Consultoria em
        </span>
        <span className={`block text-xs sm:text-sm font-black tracking-tight ${lightText ? 'text-lime-400' : 'text-[#162e5b]'}`}>
          Segurança do Trabalho
        </span>
      </div>
    </div>
  );
}
