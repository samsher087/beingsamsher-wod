import React from 'react';

/**
 * DirtyTitle Component
 * Matches the uploaded reference style:
 * - Heavy, condensed sans-serif typography (Anton / Impact)
 * - Weathered, chalky distressed white color (#ffffff / #f8fafc)
 * - Peeling paint, stone cracks, black erosion fissures, and surface pitting
 * - Sharp vector SVG rendering with deep ambient drop-shadow
 */
export const DirtyTitle = ({ text = 'WELL OF DEATH' }) => {
  const displayText = (text || 'WELL OF DEATH').toUpperCase();

  return (
    <div className="relative w-full max-w-5xl mx-auto px-2 sm:px-4 select-none flex justify-center items-center py-2">
      {/* Hidden for accessibility / SEO */}
      <h1 className="sr-only">{displayText}</h1>

      <svg
        viewBox="0 0 1120 180"
        className="w-full h-auto overflow-visible filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        aria-hidden="true"
      >
        <defs>
          {/* Authentic Peeling Paint & Cracked White Texture Pattern */}
          <pattern id="chalkGrungePattern" width="220" height="180" patternUnits="userSpaceOnUse">
            {/* Crisp Chalk / Weathered White Base */}
            <rect width="220" height="180" fill="#ffffff" />

            {/* Subtle stone/chalk variations */}
            <circle cx="35" cy="45" r="30" fill="#f1f5f9" opacity="0.8" />
            <circle cx="150" cy="115" r="45" fill="#e2e8f0" opacity="0.75" />
            <circle cx="85" cy="140" r="28" fill="#f8fafc" opacity="0.9" />

            {/* Large weathered peeled-paint scars (matching reference D & R) */}
            <path
              d="M 15,25 Q 28,15 42,32 Q 55,20 62,45 Q 48,58 35,50 Q 18,65 15,25 Z"
              fill="#090d16"
              opacity="0.85"
            />
            <path
              d="M 125,75 Q 145,60 168,78 Q 180,95 162,118 Q 140,125 128,105 Q 115,90 125,75 Z"
              fill="#0d131f"
              opacity="0.9"
            />
            <path
              d="M 80,15 Q 98,28 85,52 Q 68,45 72,28 Z"
              fill="#182030"
              opacity="0.8"
            />
            <path
              d="M 180,25 Q 195,15 208,35 Q 200,55 185,48 Z"
              fill="#090d16"
              opacity="0.85"
            />
            <path
              d="M 25,120 Q 42,105 58,125 Q 50,150 30,142 Z"
              fill="#111827"
              opacity="0.85"
            />

            {/* Vertical fissure cracks (running through letters like in the image) */}
            <path
              d="M 45,5 Q 48,35 42,70 T 50,125 T 46,175"
              stroke="#080c14"
              strokeWidth="3.5"
              fill="none"
              opacity="0.85"
              strokeLinecap="round"
            />
            <path
              d="M 110,8 Q 105,42 114,85 T 108,145 T 112,178"
              stroke="#0b0f19"
              strokeWidth="3"
              fill="none"
              opacity="0.8"
              strokeLinecap="round"
            />
            <path
              d="M 175,12 Q 170,48 178,92 T 172,165"
              stroke="#070a10"
              strokeWidth="2.8"
              fill="none"
              opacity="0.85"
              strokeLinecap="round"
            />

            {/* Branching hairline cracks */}
            <path d="M 44,48 Q 62,55 75,45" stroke="#080c14" strokeWidth="1.8" fill="none" opacity="0.8" />
            <path d="M 112,65 Q 128,75 138,68" stroke="#0b0f19" strokeWidth="1.6" fill="none" opacity="0.75" />
            <path d="M 174,105 Q 158,118 145,112" stroke="#070a10" strokeWidth="1.8" fill="none" opacity="0.8" />
            <path d="M 43,108 Q 30,118 20,112" stroke="#080c14" strokeWidth="1.5" fill="none" opacity="0.75" />

            {/* Scattered black erosion pitting & micro-specks */}
            <circle cx="28" cy="18" r="3.5" fill="#04060a" />
            <circle cx="65" cy="85" r="4" fill="#090d16" />
            <circle cx="92" cy="115" r="3" fill="#04060a" />
            <circle cx="138" cy="35" r="4.5" fill="#080c14" />
            <circle cx="160" cy="15" r="3" fill="#04060a" />
            <circle cx="195" cy="95" r="3.5" fill="#090d16" />
            <circle cx="205" cy="145" r="4" fill="#04060a" />
            <circle cx="15" cy="160" r="3" fill="#090d16" />
            <circle cx="75" cy="165" r="3.5" fill="#04060a" />
            <circle cx="152" cy="55" r="2.5" fill="#04060a" />

            {/* Dense fine speckle dust */}
            <circle cx="12" cy="88" r="1.5" fill="#04060a" />
            <circle cx="38" cy="142" r="1.8" fill="#04060a" />
            <circle cx="58" cy="18" r="1.5" fill="#04060a" />
            <circle cx="82" cy="72" r="2" fill="#04060a" />
            <circle cx="102" cy="135" r="1.5" fill="#04060a" />
            <circle cx="122" cy="22" r="1.8" fill="#04060a" />
            <circle cx="145" cy="148" r="2" fill="#04060a" />
            <circle cx="170" cy="65" r="1.5" fill="#04060a" />
            <circle cx="188" cy="128" r="1.8" fill="#04060a" />
            <circle cx="212" cy="58" r="1.5" fill="#04060a" />
          </pattern>
        </defs>

        {/* 1. Deep Black Outer Base (Gives stark contrast & edge definition) */}
        <text
          x="560"
          y="136"
          textAnchor="middle"
          fontFamily="'Anton', 'Impact', 'Arial Black', sans-serif"
          fontSize="118"
          fontWeight="900"
          letterSpacing="5"
          stroke="#020617"
          strokeWidth="14"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="#020617"
          opacity="0.95"
        >
          {displayText}
        </text>

        {/* 2. Main Distressed Weathered Chalky White Letters */}
        <text
          x="560"
          y="136"
          textAnchor="middle"
          fontFamily="'Anton', 'Impact', 'Arial Black', sans-serif"
          fontSize="118"
          fontWeight="900"
          letterSpacing="5"
          fill="url(#chalkGrungePattern)"
          stroke="#f8fafc"
          strokeWidth="1.2"
          strokeLinejoin="round"
        >
          {displayText}
        </text>

        {/* 3. Surface Wear Overlay for authentic depth */}
        <text
          x="560"
          y="136"
          textAnchor="middle"
          fontFamily="'Anton', 'Impact', 'Arial Black', sans-serif"
          fontSize="118"
          fontWeight="900"
          letterSpacing="5"
          fill="none"
          stroke="#020617"
          strokeWidth="0.8"
          strokeDasharray="4 8 1 6 3 10"
          opacity="0.75"
        >
          {displayText}
        </text>
      </svg>
    </div>
  );
};
