import React from 'react';

/**
 * DirtyTitle Component
 * Renders "WELL OF DEATH" in the authentic dirty/mud-splattered graphic style:
 * - Bold slab-serif typography (Alfa Slab One)
 * - Triple-layer contour with crisp white/ivory inline border
 * - Explosive mud splatters, dirt spray particles, and baseline tire-skid mud smears
 * - High-detail SVG vector scaling for 100% crispness across all screen sizes
 */
export const DirtyTitle = ({ text = 'WELL OF DEATH' }) => {
  const displayText = (text || 'WELL OF DEATH').toUpperCase();

  return (
    <div className="relative w-full max-w-5xl mx-auto px-2 sm:px-4 select-none flex justify-center items-center py-2">
      {/* Hidden for accessibility / SEO */}
      <h1 className="sr-only">{displayText}</h1>

      <svg
        viewBox="0 0 1120 270"
        className="w-full h-auto overflow-visible filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]"
        aria-hidden="true"
      >
        <defs>
          {/* Detailed Mud Texture Pattern */}
          <pattern id="dirtyMudPattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="#382110" />
            {/* Dark mud patches */}
            <circle cx="15" cy="18" r="14" fill="#241408" opacity="0.85" />
            <circle cx="55" cy="60" r="18" fill="#201107" opacity="0.9" />
            <circle cx="68" cy="22" r="11" fill="#291609" opacity="0.75" />
            <circle cx="28" cy="65" r="12" fill="#1b0e06" opacity="0.8" />
            
            {/* Lighter sandy mud speckles */}
            <circle cx="40" cy="35" r="13" fill="#54351b" opacity="0.9" />
            <circle cx="25" cy="42" r="8" fill="#664121" opacity="0.85" />
            <circle cx="62" cy="40" r="9" fill="#754b27" opacity="0.7" />
            <circle cx="48" cy="12" r="7" fill="#5e391d" opacity="0.75" />
            
            {/* Micro dirt specks */}
            <circle cx="10" cy="38" r="3" fill="#150b05" />
            <circle cx="32" cy="15" r="2.5" fill="#80532b" />
            <circle cx="70" cy="55" r="3.5" fill="#180c05" />
            <circle cx="52" cy="72" r="2" fill="#8a5a30" />
            <circle cx="78" cy="8" r="3" fill="#2d190b" />
            <circle cx="6" cy="74" r="2.5" fill="#704724" />

            {/* Jagged mud smudge strokes */}
            <path d="M 5,20 Q 25,35 45,15 T 75,30" stroke="#1c0f06" strokeWidth="5" fill="none" opacity="0.65" strokeLinecap="round" />
            <path d="M 12,65 Q 38,50 62,68" stroke="#4a2e16" strokeWidth="4" fill="none" opacity="0.7" strokeLinecap="round" />
          </pattern>

          {/* Linear gradient for subtle 3D lighting */}
          <linearGradient id="mudLighting" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87572e" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3d2412" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#120803" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* 1. BACKGROUND EXPLOSIVE MUD SPLATTERS (Behind the text) */}
        <g fill="#3e2512" opacity="0.95">
          {/* LEFT EXPLOSION CLOUD */}
          <path d="M 80,70 Q 110,40 140,55 Q 170,30 200,60 Q 220,40 215,80 Q 245,95 220,120 Q 235,145 200,145 Q 175,175 140,150 Q 105,170 90,135 Q 65,125 75,95 Q 55,80 80,70 Z" />
          <path d="M 50,90 Q 30,110 45,130 Q 20,140 35,160 Q 60,155 70,140 Z" />
          <path d="M 110,35 Q 130,15 155,25 Q 140,45 125,40 Z" />
          
          {/* Left flying droplets */}
          <circle cx="45" cy="65" r="5" />
          <circle cx="30" cy="85" r="7.5" />
          <circle cx="20" cy="115" r="4.5" />
          <circle cx="15" cy="140" r="6" />
          <circle cx="35" cy="175" r="4" />
          <circle cx="60" cy="40" r="6" />
          <circle cx="85" cy="25" r="5" />
          <circle cx="115" cy="18" r="4" />
          <circle cx="145" cy="12" r="7" />
          <circle cx="175" cy="16" r="4.5" />
          <circle cx="195" cy="8" r="3.5" />
          <circle cx="70" cy="185" r="5" />
          <circle cx="95" cy="195" r="3.5" />

          {/* TOP CENTER MUD SPLATTERS */}
          <path d="M 330,55 Q 355,25 385,45 Q 410,20 435,50 Q 425,75 395,70 Q 365,85 330,55 Z" />
          <circle cx="310" cy="35" r="5" />
          <circle cx="340" cy="18" r="6.5" />
          <circle cx="370" cy="10" r="5" />
          <circle cx="410" cy="14" r="7" />
          <circle cx="445" cy="22" r="4.5" />

          <path d="M 520,50 Q 550,22 585,40 Q 615,15 645,45 Q 660,70 635,85 Q 600,75 570,90 Q 535,80 520,50 Z" />
          <circle cx="495" cy="28" r="5.5" />
          <circle cx="530" cy="12" r="7" />
          <circle cx="568" cy="8" r="8.5" />
          <circle cx="605" cy="10" r="6" />
          <circle cx="640" cy="16" r="7.5" />
          <circle cx="675" cy="30" r="5" />
          <circle cx="585" cy="2" r="4" />

          <path d="M 720,55 Q 750,28 780,48 Q 810,25 830,55 Q 820,80 790,75 Q 755,90 720,55 Z" />
          <circle cx="705" cy="35" r="4.5" />
          <circle cx="738" cy="18" r="6" />
          <circle cx="770" cy="12" r="7.5" />
          <circle cx="808" cy="15" r="5" />
          <circle cx="842" cy="25" r="6" />

          {/* RIGHT EXPLOSION CLOUD */}
          <path d="M 900,65 Q 930,35 965,55 Q 1000,30 1025,65 Q 1055,85 1030,120 Q 1045,150 1010,155 Q 980,180 945,150 Q 915,168 895,135 Q 875,115 890,85 Z" />
          <path d="M 1040,85 Q 1075,105 1060,135 Q 1085,150 1070,170 Q 1045,165 1035,145 Z" />
          
          {/* Right flying droplets */}
          <circle cx="925" cy="18" r="5.5" />
          <circle cx="960" cy="10" r="7" />
          <circle cx="995" cy="12" r="5" />
          <circle cx="1030" cy="20" r="6.5" />
          <circle cx="1055" cy="38" r="5" />
          <circle cx="1080" cy="65" r="6" />
          <circle cx="1095" cy="95" r="7.5" />
          <circle cx="1105" cy="130" r="5" />
          <circle cx="1088" cy="160" r="6.5" />
          <circle cx="1065" cy="188" r="4" />
          <circle cx="1040" cy="200" r="5.5" />
          <circle cx="995" cy="195" r="4" />
        </g>

        {/* 2. THE TEXT TRIPLE-CONTOUR LAYERS */}
        
        {/* Layer A: Heavy Deep Dark Mud Base Stroke & Outer Border */}
        <text
          x="560"
          y="162"
          textAnchor="middle"
          fontFamily="'Alfa Slab One', 'Arial Black', Impact, serif"
          fontSize="92"
          fontWeight="900"
          letterSpacing="4"
          stroke="#160c04"
          strokeWidth="18"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="#160c04"
        >
          {displayText}
        </text>

        {/* Layer B: Crisp Ivory / Off-White Inline Contour */}
        <text
          x="560"
          y="162"
          textAnchor="middle"
          fontFamily="'Alfa Slab One', 'Arial Black', Impact, serif"
          fontSize="92"
          fontWeight="900"
          letterSpacing="4"
          stroke="#fffaf0"
          strokeWidth="8"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        >
          {displayText}
        </text>

        {/* Layer C: Mud Pattern Inner Fill with Tight Dark Inner Stroke */}
        <text
          x="560"
          y="162"
          textAnchor="middle"
          fontFamily="'Alfa Slab One', 'Arial Black', Impact, serif"
          fontSize="92"
          fontWeight="900"
          letterSpacing="4"
          stroke="#2d1b0e"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="url(#dirtyMudPattern)"
        >
          {displayText}
        </text>

        {/* Layer D: Subtle 3D Mud Shading Overlay */}
        <text
          x="560"
          y="162"
          textAnchor="middle"
          fontFamily="'Alfa Slab One', 'Arial Black', Impact, serif"
          fontSize="92"
          fontWeight="900"
          letterSpacing="4"
          fill="url(#mudLighting)"
          style={{ mixBlendMode: 'overlay' }}
        >
          {displayText}
        </text>

        {/* 3. FOREGROUND MUD SPLATTERS, SMEARS & BOTTOM TIRE-SKID SPLASH */}
        <g fill="#3e2512" opacity="0.95">
          {/* Horizontal Base Mud Smear / Splash across bottom edge of letters */}
          <path d="M 120,175 Q 240,168 380,176 Q 560,170 740,177 Q 920,168 1000,175 Q 1025,178 995,188 Q 860,192 710,186 Q 530,191 360,187 Q 220,190 135,184 Q 105,180 120,175 Z" />

          {/* Drips hanging down from letters and smear */}
          {/* Drip 1 (Under W) */}
          <path d="M 175,184 Q 179,208 182,224 Q 180,228 176,225 Q 173,208 171,184 Z" />
          <circle cx="183" cy="235" r="4" />
          <circle cx="184" cy="248" r="2.5" />

          {/* Drip 2 (Under E) */}
          <path d="M 270,184 Q 274,204 276,216 Q 274,219 271,216 Q 268,202 267,184 Z" />
          <circle cx="277" cy="225" r="3.5" />

          {/* Drip 3 (Under L) */}
          <path d="M 370,185 Q 375,212 378,228 Q 376,232 372,229 Q 369,210 367,185 Z" />
          <circle cx="379" cy="239" r="4.5" />
          <circle cx="380" cy="254" r="3" />

          {/* Drip 4 (Under OF) */}
          <path d="M 525,186 Q 530,214 534,230 Q 531,234 527,231 Q 523,212 522,186 Z" />
          <circle cx="535" cy="242" r="4" />

          {/* Drip 5 (Under D) */}
          <path d="M 675,185 Q 679,206 682,220 Q 680,223 677,220 Q 674,204 673,185 Z" />
          <circle cx="683" cy="230" r="3.5" />

          {/* Drip 6 (Under A/T) */}
          <path d="M 830,185 Q 835,215 839,232 Q 836,236 832,233 Q 828,212 827,185 Z" />
          <circle cx="840" cy="244" r="4.5" />
          <circle cx="841" cy="258" r="3" />

          {/* Drip 7 (Under H) */}
          <path d="M 950,184 Q 955,208 958,222 Q 955,225 952,222 Q 949,205 947,184 Z" />
          <circle cx="959" cy="232" r="4" />

          {/* Mud Splatters directly crossing over letters (creating realistic dirty overlay) */}
          {/* Splatter on W */}
          <ellipse cx="205" cy="140" rx="14" ry="10" transform="rotate(-15 205 140)" />
          <circle cx="225" cy="130" r="5" />
          <circle cx="188" cy="148" r="4" />

          {/* Splatter on L */}
          <ellipse cx="400" cy="120" rx="12" ry="16" transform="rotate(20 400 120)" />
          <circle cx="418" cy="105" r="4" />
          <circle cx="388" cy="138" r="5" />

          {/* Splatter on O */}
          <ellipse cx="505" cy="135" rx="16" ry="12" transform="rotate(10 505 135)" />
          <circle cx="485" cy="125" r="4.5" />
          <circle cx="528" cy="145" r="5" />

          {/* Splatter on E */}
          <ellipse cx="735" cy="125" rx="15" ry="11" transform="rotate(-25 735 125)" />
          <circle cx="755" cy="112" r="4" />
          <circle cx="720" cy="140" r="5.5" />

          {/* Splatter on T */}
          <ellipse cx="885" cy="115" rx="13" ry="15" transform="rotate(15 885 115)" />
          <circle cx="905" cy="100" r="4.5" />
          <circle cx="870" cy="132" r="5" />

          {/* Fine dirt specks scattered across entire baseline */}
          <circle cx="150" cy="202" r="2" />
          <circle cx="230" cy="208" r="3" />
          <circle cx="320" cy="200" r="2.5" />
          <circle cx="440" cy="205" r="3.5" />
          <circle cx="600" cy="202" r="2" />
          <circle cx="760" cy="206" r="3" />
          <circle cx="895" cy="204" r="2.5" />
          <circle cx="985" cy="200" r="3" />
        </g>
      </svg>
    </div>
  );
};
