import React, { useState, useEffect } from 'react';

export const RightBowtieDog: React.FC = () => {
  const [isWinking, setIsWinking] = useState(false);

  // Natural winking loop
  useEffect(() => {
    const winkInterval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 240);
    }, 4500 + Math.random() * 2500);
    return () => clearInterval(winkInterval);
  }, []);

  return (
    <div 
      className="absolute -right-8 sm:-right-12 md:-right-16 lg:-right-20 -bottom-10 sm:-bottom-12 md:-bottom-16 lg:-bottom-20 z-20 select-none pointer-events-none"
      style={{ width: 'clamp(150px, 24vw, 260px)' }}
    >
      {/* Main Vector Dog Illustration matching PNG exactly */}
      <div className="transform transition-transform duration-500">
        <svg 
          viewBox="0 0 300 320" 
          className="w-full h-auto drop-shadow-md overflow-visible animate-dog-right"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="dog-body-right">
            {/* Fluffy Wagging Tail in Background */}
            <path
              d="M230 180 Q270 140 250 110 Q225 125 220 160"
              fill="#F5D7B7"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinecap="round"
              className="animate-tail-wag origin-bottom-left"
            />

            {/* Left Ear */}
            <path
              d="M95 130 C60 115, 45 160, 65 205 C80 235, 115 220, 110 180 Z"
              fill="#EAC49D"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinejoin="round"
              className="animate-ear-wiggle"
            />
            <path d="M72 155 C60 178, 75 208, 95 200" stroke="#DDA87B" strokeWidth="6" strokeLinecap="round" />

            {/* Right Ear */}
            <path
              d="M225 130 C260 115, 275 160, 255 205 C240 235, 205 220, 210 180 Z"
              fill="#EAC49D"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinejoin="round"
              className="animate-ear-wiggle-delayed"
            />
            <path d="M248 155 C260 178, 245 208, 225 200" stroke="#DDA87B" strokeWidth="6" strokeLinecap="round" />

            {/* Fluffy Head Base Contour */}
            <path
              d="M100 170 
                 C70 155, 70 105, 105 90
                 C95 55, 135 35, 160 55
                 C185 35, 230 55, 220 95
                 C255 110, 255 160, 225 180
                 C245 215, 210 255, 175 245
                 C140 260, 90 240, 100 170 Z"
              fill="#F5D7B7"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Head Highlights & Texture */}
            <ellipse cx="160" cy="140" rx="65" ry="58" fill="#F8DFCA" />
            <path d="M130 70 C145 60, 165 60, 180 70" stroke="#E3B38B" strokeWidth="4" strokeLinecap="round" />
            <path d="M105 110 C95 125, 95 140, 105 155" stroke="#E3B38B" strokeWidth="4" strokeLinecap="round" />
            <path d="M215 110 C225 125, 225 140, 215 155" stroke="#E3B38B" strokeWidth="4" strokeLinecap="round" />

            {/* Rosy Cheeks */}
            <ellipse cx="120" cy="180" rx="16" ry="10" fill="#F7A898" opacity="0.65" />
            <ellipse cx="205" cy="180" rx="16" ry="10" fill="#F7A898" opacity="0.65" />

            {/* Eyes */}
            {/* Left Eye */}
            <ellipse cx="136" cy="152" rx="8.5" ry="10" fill="#2E1B13" />
            <circle cx="133" cy="148" r="3.2" fill="#FFFFFF" />
            <circle cx="139" cy="156" r="1.4" fill="#FFFFFF" />

            {/* Right Eye (winks or looks) */}
            {!isWinking ? (
              <g>
                <ellipse cx="188" cy="152" rx="8.5" ry="10" fill="#2E1B13" />
                <circle cx="185" cy="148" r="3.2" fill="#FFFFFF" />
                <circle cx="191" cy="156" r="1.4" fill="#FFFFFF" />
              </g>
            ) : (
              <path d="M178 154 Q188 162 198 154" stroke="#2E1B13" strokeWidth="4" strokeLinecap="round" fill="none" />
            )}

            {/* Nose */}
            <ellipse cx="162" cy="168" rx="6.5" ry="4.5" fill="#2E1B13" />
            <ellipse cx="160.5" cy="166.5" rx="2" ry="1.2" fill="#FFFFFF" opacity="0.8" />

            {/* Sweet Smiling Mouth & Tiny Tongue */}
            <path
              d="M155 174 Q162 180 169 174"
              stroke="#2E1B13"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M159 178 C159 184, 165 184, 165 178 Z"
              fill="#F78C8C"
              stroke="#2E1B13"
              strokeWidth="1.5"
            />

            {/* Sky-Blue Bowtie */}
            <g className="bowtie animate-bowtie-sway">
              {/* Left Loop */}
              <path
                d="M162 215 C145 200, 115 195, 125 218 C115 240, 145 235, 162 220 Z"
                fill="#3D97CA"
                stroke="#2E1B13"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path d="M136 210 Q148 215 155 217" stroke="#68B4DF" strokeWidth="3" strokeLinecap="round" />

              {/* Right Loop */}
              <path
                d="M162 215 C179 200, 209 195, 199 218 C209 240, 179 235, 162 220 Z"
                fill="#3D97CA"
                stroke="#2E1B13"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path d="M188 210 Q176 215 169 217" stroke="#68B4DF" strokeWidth="3" strokeLinecap="round" />

              {/* Center Knot */}
              <ellipse 
                cx="162" 
                cy="217" 
                rx="8" 
                ry="7" 
                fill="#2A7AA8" 
                stroke="#2E1B13" 
                strokeWidth="4" 
              />
              <circle cx="160" cy="215" r="2" fill="#88CAEE" />
            </g>

            {/* Paws Resting on Bottom Border of Card */}
            {/* Left Paw */}
            <g className="animate-paw-tap">
              <ellipse 
                cx="110" 
                cy="245" 
                rx="22" 
                ry="24" 
                fill="#F5D7B7" 
                stroke="#2E1B13" 
                strokeWidth="5" 
                transform="rotate(-5 110 245)"
              />
              <ellipse cx="110" cy="245" rx="16" ry="18" fill="#F8DFCA" transform="rotate(-5 110 245)" />
              <path d="M103 240 C103 246, 105 252, 107 256" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
              <path d="M115 240 C116 246, 117 252, 117 256" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Right Paw */}
            <g className="animate-paw-tap-delayed">
              <ellipse 
                cx="215" 
                cy="245" 
                rx="22" 
                ry="24" 
                fill="#F5D7B7" 
                stroke="#2E1B13" 
                strokeWidth="5" 
                transform="rotate(5 215 245)"
              />
              <ellipse cx="215" cy="245" rx="16" ry="18" fill="#F8DFCA" transform="rotate(5 215 245)" />
              <path d="M208 240 C208 246, 210 252, 212 256" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
              <path d="M220 240 C221 246, 222 252, 222 256" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
